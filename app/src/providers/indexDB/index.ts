import BaseProvider from "../base";
import { v4 as uuidv4 } from 'uuid';
import IndexDB from './indexDB';

const DB_NAME = 'APP_DB';
const DB_VERSION = 1;
const DB_STORE_NAME = 'APP_STORE';

const createNoDataError = () => new Error('No Data Found');

export default class IndexDBProvider extends BaseProvider {
    private db: IDBDatabase | null = null;
    private dbPromise: Promise<IDBDatabase> | null = null;

    constructor() {
        super();
        this.initDB();
    }

    private initDB(): Promise<IDBDatabase> {
        if (this.dbPromise) {
            return this.dbPromise;
        }

        this.dbPromise = new Promise((resolve, reject) => {
            const request = IndexDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => {
                reject(new Error('Failed to open IndexDB'));
            };

            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                
                // Create object store if it doesn't exist
                if (!db.objectStoreNames.contains(DB_STORE_NAME)) {
                    const store = db.createObjectStore(DB_STORE_NAME, { keyPath: 'path' });
                    store.createIndex('path', 'path', { unique: true });
                }
            };
        });

        return this.dbPromise;
    }

    private async wrap<T>(request: IDBRequest<T>): Promise<T> {
        return new Promise<T>((resolve, reject) => {
          const onSuccess = (ev: Event) => {
            cleanup();
            resolve((ev.target as IDBRequest<T>).result);
          };
          const onError = (ev: Event) => {
            cleanup();
            reject((ev.target as IDBRequest<T>).error ?? new DOMException("IDB request failed"));
          };
          const cleanup = () => {
            request.removeEventListener("success", onSuccess);
            request.removeEventListener("error", onError);
          };
      
          request.addEventListener("success", onSuccess);
          request.addEventListener("error", onError);
        });
      }

    private async getDB(): Promise<IDBDatabase> {
        if (!this.db) {
            await this.initDB();
        }
        return this.db!;
    }

    private async getTransaction(mode: IDBTransactionMode = 'readonly') {
        const db = await this.getDB();
        return db.transaction([DB_STORE_NAME], mode);
    }

    private async getStore(mode: IDBTransactionMode = 'readonly') {
        const transaction = await this.getTransaction(mode);
        return transaction.objectStore(DB_STORE_NAME);
    }

    async get<T>(path: string): Promise<T> {
        const store = await this.getStore('readonly');
        const lookForPath = await this.wrap(store.get(path));
        if (lookForPath && lookForPath.data) {
            return lookForPath.data as T;
        }

        const result = await this.wrap(store.getAll());

        if (!result) {
            throw createNoDataError();
        }

        // Filter results that start with the given path
        const filteredResults = Object.fromEntries(result
            .filter(item => item.path.startsWith(path + '/'))
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(item => [item.data.id, item.data]));
            
        if (Object.keys(filteredResults).length === 0) {
            throw createNoDataError();
        }
            
        return filteredResults as T;
    }

    async create<T>(path: string, data: T) {
        const store = await this.getStore('readwrite');
        const id = uuidv4();
        const fullPath = `${path}/${id}`;
        const newData = {...data, id};
        const request = store.put({
            path: fullPath,
            data: newData,
            timestamp: Date.now()
        });

        await this.wrap(request);

        return newData as T & {id: string};
    }

    async update<T>(path: string, data: Partial<T>): Promise<T> {
        const store = await this.getStore('readwrite');
        const result = await this.wrap(store.get(path));
        
        if (!result || !result.data) {
            throw createNoDataError();
        }

        const newData = JSON.parse(JSON.stringify({...result.data, ...data}));
        const request = store.put({
            path: path,
            data: newData,
            timestamp: Date.now()
        });

        await this.wrap(request);

        return newData as T;
    }

    async delete(path: string): Promise<void> {
        const store = await this.getStore('readwrite');
        const request = store.delete(path);

        await this.wrap(request);

        return;
    }
}