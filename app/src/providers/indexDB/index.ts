import BaseProvider, { type IBaseSearchQuary } from "@/providers/base";
import { v4 as uuidv4 } from 'uuid';
import IndexDB from '@/providers/indexDB/db';

const DB_NAME = 'APP_DB';
const DB_VERSION = 1;
const DB_STORE_NAME = 'APP_STORE';

const createNoDataError = () => new Error('No Data Found');

export default class IndexDBProvider extends BaseProvider {
    private db: IDBDatabase | null = null;
    private dbPromise: Promise<IDBDatabase> | null = null;

    constructor(dbName?: string, dbVersion?: number) {
        super(dbName ?? DB_NAME, dbVersion ?? DB_VERSION);
        this.initDB();
    }

    private initDB(): Promise<IDBDatabase> {
        if (this.dbPromise) {
            return this.dbPromise;
        }

        this.dbPromise = new Promise((resolve, reject) => {
            const request = IndexDB.open(this.dbName, this.dbVersion);

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

    async getAll<T>(path: string): Promise<T[]> {
        const store = await this.getStore('readonly');
        const result = await this.wrap(store.getAll());

        if (!result) {
            throw createNoDataError();
        }

        // Filter results that start with the given path
        return Object.fromEntries(result.filter(item => item.path.startsWith(path + '/'))
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(item => [item.data.id, item.data])) as T[];
    }

    async get<T>(path: string): Promise<T> {
        const store = await this.getStore('readonly');
        const lookForPath = await this.wrap(store.get(path));
        if (!lookForPath || !lookForPath.path.startsWith(path + '/')) {
            throw createNoDataError();
        }

        return lookForPath.data as T;
    }

    async *search<T>(path: string, query: IBaseSearchQuary): AsyncGenerator<T> {
        const store = await this.getStore('readonly');
        const index = store.index('path');

        const range = IDBKeyRange.bound(path, path + '\uffff');

        for await (const cursorPromise of this._iterateCursor(index, range)) {
            const cursor = await cursorPromise;
            if (!cursor) {
                break;
            }

            const data = cursor.value.data;
            const [key] = Object.keys(query);
            const queryValue = query[key];
            if (queryValue.fuzzy) {
                if (data[key].includes(queryValue.fuzzy)) {
                    console.log('fuzzy', data);
                    yield data;
                }
            }
            if (queryValue.exact) {
                if (data[key] === queryValue.exact) {
                    console.log('exact', data);
                    yield data;
                }
            }
        }
    }

    private async *_iterateCursor(source: IDBObjectStore | IDBIndex, range: IDBKeyRange | null) {
        const cursorPromise = this.wrap(source.openCursor(range));
        yield cursorPromise;
        const cursor = await cursorPromise;

        while (cursor) {
            debugger;
            cursor?.continue();
            yield this.wrap(cursor?.request);
        }
    }

    async create<T>(path: string, data: T, generateId: boolean = true) {
        const store = await this.getStore('readwrite');
        const { fullPath, newData } = this._createRecord(path, data, generateId);
        const request = store.put({
            path: fullPath,
            data: newData,
            timestamp: Date.now()
        });

        await this.wrap(request);

        return newData as T & { id: string };
    }

    async createMany<T>(dataArray: { path: string, data: T }[], generateId: boolean = true): Promise<void> {
        const store = await this.getStore('readwrite');

        for await (const item of dataArray) {
            const { fullPath, newData } = this._createRecord(item.path, item.data, generateId);

            const request = store.put({
                path: fullPath,
                data: newData,
                timestamp: Date.now()
            });

            await this.wrap(request);
        }
    }

    private _createRecord<T>(path: string, data: T, generateId: boolean = true) {
        if (!generateId) {
            return {
                fullPath: path,
                newData: data
            };
        }
        const id = uuidv4();
        return {
            fullPath: `${path}/${id}`,
            newData: { ...data, id }
        };
    }

    async update<T>(path: string, data: Partial<T>): Promise<T & { id: string }> {
        const store = await this.getStore('readwrite');
        const result = await this.wrap(store.get(path));

        if (!result || !result.data) {
            throw createNoDataError();
        }

        const existingData = result.data;

        // This is needed incase we store nested objects in the data
        // otherwise we are saving references to the original object
        const newData = JSON.parse(JSON.stringify({ ...existingData, ...data }));
        const request = store.put({
            path: path,
            data: newData,
            timestamp: Date.now()
        });

        await this.wrap(request);

        return newData as T & { id: string };
    }

    async delete(path: string): Promise<void> {
        const store = await this.getStore('readwrite');
        const request = store.delete(path);

        await this.wrap(request);

        return;
    }
}