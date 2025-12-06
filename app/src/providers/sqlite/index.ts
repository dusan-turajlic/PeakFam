import BaseProvider, { type IBaseSearchQuary, type ProviderOptions } from "@/providers/base";
import { v4 as uuidv4 } from 'uuid';
import { initSQLite } from '@subframe7536/sqlite-wasm';
import { useIdbStorage } from '@subframe7536/sqlite-wasm/idb';

const DB_STORE_NAME = 'app_store';
const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

const createNoDataError = () => new Error('No Data Found');

type SQLiteFunctions = {
    run: (sql: string, params?: any[]) => Promise<any[]>;
    close: () => Promise<void>;
};

export default class SQLiteProvider extends BaseProvider {
    private sqlite: SQLiteFunctions | null = null;
    private initPromise: Promise<SQLiteFunctions> | null = null;
    private inactivityTimer: ReturnType<typeof setTimeout> | null = null;
    private readonly options: ProviderOptions | undefined;

    constructor(dbName?: string, dbVersion?: number, options?: ProviderOptions) {
        super(dbName ?? 'APP_DB', dbVersion ?? 1);
        this.options = options;
        // Don't initialize on construction - use lazy initialization
    }

    private async initDB(): Promise<SQLiteFunctions> {
        if (this.initPromise) {
            return this.initPromise;
        }

        this.initPromise = (async () => {
            try {
                // Default WASM URL - served from public folder
                // Can be overridden via options.wasmUrl
                const defaultWasmUrl = '/wa-sqlite-async.wasm';
                const storageOptions = { url: this.options?.wasmUrl ?? defaultWasmUrl };
                const { run, close } = await initSQLite(
                    useIdbStorage(`${this.dbName}.db`, storageOptions)
                );

                // Create table if it doesn't exist
                await run(`
                    CREATE TABLE IF NOT EXISTS ${DB_STORE_NAME} (
                        path TEXT PRIMARY KEY,
                        data TEXT NOT NULL,
                        timestamp INTEGER NOT NULL
                    )
                `);

                // Create index on path for faster queries
                await run(`
                    CREATE INDEX IF NOT EXISTS idx_path ON ${DB_STORE_NAME}(path)
                `);

                this.sqlite = { run, close };
                this.resetInactivityTimer();
                return this.sqlite;
            } catch (error) {
                throw new Error(`Failed to initialize SQLite: ${error}`);
            }
        })();

        return this.initPromise;
    }

    private resetInactivityTimer(): void {
        // Clear existing timer
        if (this.inactivityTimer) {
            clearTimeout(this.inactivityTimer);
            this.inactivityTimer = null;
        }

        // Set new timer to close connection after inactivity
        this.inactivityTimer = setTimeout(() => {
            this.closeConnection().catch(console.error);
        }, INACTIVITY_TIMEOUT_MS);
    }

    private async closeConnection(): Promise<void> {
        if (this.sqlite) {
            try {
                await this.sqlite.close();
            } catch (error) {
                console.error('Error closing SQLite connection:', error);
            } finally {
                this.sqlite = null;
                this.initPromise = null;
                if (this.inactivityTimer) {
                    clearTimeout(this.inactivityTimer);
                    this.inactivityTimer = null;
                }
            }
        }
    }

    private async getSQLite(): Promise<SQLiteFunctions> {
        // If connection is closed, reinitialize
        if (this.sqlite) {
            // Reset inactivity timer on each use
            this.resetInactivityTimer();
            return this.sqlite;
        }
        await this.initDB();
        return this.sqlite!;
    }

    /**
     * Manually close the database connection.
     * Useful for cleanup or when you know the connection won't be used for a while.
     */
    async close(): Promise<void> {
        await this.closeConnection();
    }

    async getAll<T>(path: string): Promise<T[]> {
        const sqlite = await this.getSQLite();
        const pathPrefix = `${path}/`;

        // Query all records where path starts with the given path prefix
        const results = await sqlite.run(
            `SELECT path, data, timestamp FROM ${DB_STORE_NAME} WHERE path LIKE ? ORDER BY timestamp DESC`,
            [`${pathPrefix}%`]
        );

        if (!results || results.length === 0) {
            throw createNoDataError();
        }

        // Filter results that start with the given path (extra safety check)
        // Parse JSON data and create object with id as key
        const entries = results
            .filter((row: any) => row.path?.startsWith(pathPrefix))
            .sort((a: any, b: any) => b.timestamp - a.timestamp)
            .map((row: any) => {
                const data = JSON.parse(row.data);
                return [data.id, data];
            });

        return Object.fromEntries(entries) as T[];
    }

    async get<T>(path: string): Promise<T> {
        const sqlite = await this.getSQLite();

        const results = await sqlite.run(
            `SELECT path, data FROM ${DB_STORE_NAME} WHERE path = ?`,
            [path]
        );

        if (!results || results.length === 0) {
            throw createNoDataError();
        }

        return JSON.parse(results[0].data) as T;
    }

    async *search<T>(path: string, query: IBaseSearchQuary): AsyncGenerator<T> {
        const sqlite = await this.getSQLite();
        const pathPrefix = `${path}/`;

        // Query all records where path starts with the given path prefix
        const results = await sqlite.run(
            `SELECT path, data FROM ${DB_STORE_NAME} WHERE path LIKE ?`,
            [`%${pathPrefix}%`]
        );

        const [key] = Object.keys(query);
        console.log('key', key);
        const queryValue = query[key];

        for (const row of results) {
            if (!row.path?.startsWith(pathPrefix)) {
                continue;
            }

            const data = JSON.parse(row.data);

            if (queryValue.fuzzy) {
                if (data[key]?.includes(queryValue.fuzzy)) {
                    yield data;
                }
            }
            if (queryValue.exact) {
                if (data[key] === queryValue.exact) {
                    yield data;
                }
            }
        }
    }

    async create<T>(path: string, data: T, generateId: boolean = true): Promise<T & { id: string }> {
        const sqlite = await this.getSQLite();
        const { fullPath, newData } = this._createRecord(path, data, generateId);

        await sqlite.run(
            `INSERT OR REPLACE INTO ${DB_STORE_NAME} (path, data, timestamp) VALUES (?, ?, ?)`,
            [fullPath, JSON.stringify(newData), Date.now()]
        );

        return newData as T & { id: string };
    }

    async createMany<T>(dataArray: { path: string, data: T }[], generateId: boolean = true): Promise<void> {
        const sqlite = await this.getSQLite();

        for (const item of dataArray) {
            const { fullPath, newData } = this._createRecord(item.path, item.data, generateId);

            await sqlite.run(
                `INSERT OR REPLACE INTO ${DB_STORE_NAME} (path, data, timestamp) VALUES (?, ?, ?)`,
                [fullPath, JSON.stringify(newData), Date.now()]
            );
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
        const sqlite = await this.getSQLite();

        // Get existing record
        const results = await sqlite.run(
            `SELECT data FROM ${DB_STORE_NAME} WHERE path = ?`,
            [path]
        );

        if (!results || results.length === 0 || !results[0].data) {
            throw createNoDataError();
        }

        const existingData = JSON.parse(results[0].data);

        // Merge with existing data (deep copy to avoid reference issues)
        const newData = structuredClone({ ...existingData, ...data });

        await sqlite.run(
            `UPDATE ${DB_STORE_NAME} SET data = ?, timestamp = ? WHERE path = ?`,
            [JSON.stringify(newData), Date.now(), path]
        );

        return newData as T & { id: string };
    }

    async delete(path: string): Promise<void> {
        const sqlite = await this.getSQLite();

        await sqlite.run(
            `DELETE FROM ${DB_STORE_NAME} WHERE path = ?`,
            [path]
        );
    }
}

(globalThis as any).SQLiteProvider = SQLiteProvider;