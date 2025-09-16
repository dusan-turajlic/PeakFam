import BaseProvider from "../base";
import { v4 as uuidv4 } from 'uuid';
import storage from '@/providers/localstorage/storage';

export const STORE_ROOT = 'APP_ROOT';
export const STORE_VERSION = 1;

const createNoDataError = () => new Error('No Data Found');

function handlePath(path: string) {
    return path.split('/').filter(item => item !== '');
}

export default class LocalStorageProvider extends BaseProvider {
    store = storage;

    constructor(dbName?: string, dbVersion?: number) {
        super(dbName ?? STORE_ROOT, dbVersion ?? STORE_VERSION);

    }

    private _getRoot() {
        const item = this.store.getItem(this.dbName);
        if (!item) {
            this.store.setItem(this.dbName, '{}');
            return {};
        }
        return JSON.parse(item);
    }

    async get<T>(path: string): Promise<T> {
        return new Promise((resolve, reject) => {
            const root = this._getRoot();
            const keys = handlePath(path);

            let current = root;
            for (const key of keys) {
                if (!current[key]) {
                    reject(createNoDataError());
                    break;
                }

                current = current[key];
            }

            if (current) {
                resolve(current as T);
            } else {
                reject(createNoDataError());
            }
        });
    }

    async create<T>(path: string, data: T): Promise<T & { id: string }> {
        return new Promise((resolve, reject) => {
            const root = this._getRoot();
            const keys = handlePath(path);

            try {
                let current = root;
                for (let i = 0; i < keys.length - 1; i++) {
                    if (!current[keys[i]]) {
                        current[keys[i]] = {};
                    }
                    current = current[keys[i]] as Record<string, unknown>;
                }

                const id = uuidv4();
                if (!current[keys[keys.length - 1]]) {
                    current[keys[keys.length - 1]] = {};
                }
                const newData = { ...data, id };
                (current[keys[keys.length - 1]] as Record<string, unknown>)[id] = newData;
                this.store.setItem(this.dbName, JSON.stringify(root));
                resolve(newData);
            } catch (error) {
                console.error(`cannot find ${path} in storage`, error);
                reject(error);
            }
        });
    }

    async createMany<T>(dataArray: { path: string, data: T }[]): Promise<void> {
        for (const item of dataArray) {
            await this.create(item.path, item.data);
        }
        return;
    }

    async update<T>(path: string, data: Partial<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            const root = this._getRoot();
            const keys = handlePath(path);

            try {
                let current = root;
                for (let i = 0; i < keys.length - 1; i++) {
                    const item = current[keys[i]] as Record<string, unknown>;
                    if (!item) {
                        reject(createNoDataError());
                        return;
                    }
                    current = item;
                }

                if (!current[keys[keys.length - 1]]) {
                    reject(createNoDataError());
                    return;
                }

                const newData = JSON.parse(JSON.stringify({ ...current[keys[keys.length - 1]], ...data }));
                current[keys[keys.length - 1]] = newData;
                this.store.setItem(this.dbName, JSON.stringify(root));
                resolve(current[keys[keys.length - 1]] as T);
            } catch (error) {
                console.error(`cannot find ${path} in storage`, error);
                reject(error);
            }
        });
    }

    async delete(path: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const root = this._getRoot();
            const keys = handlePath(path);

            try {
                let current = root;
                for (let i = 0; i < keys.length - 1; i++) {
                    current = current[keys[i]] as Record<string, unknown>;
                }

                delete current[keys[keys.length - 1]];
                this.store.setItem(this.dbName, JSON.stringify(root));
                resolve(void 0);
            } catch (error) {
                console.error(`cannot find ${path} in storage`, error);
                reject(error);
            }
        });
    }
}