export default abstract class BaseProvider {
    dbName: string;
    dbVersion: number;

    constructor(dbName: string, dbVersion: number) {
        this.dbName = dbName;
        this.dbVersion = dbVersion;
    }

    abstract get<T>(path: string): Promise<T>;
    abstract create<T>(path: string, data: T): Promise<T & { id: string }>;
    abstract createMany<T>(dataArray: { path: string, data: T }[]): Promise<void>;
    abstract update<T>(path: string, data: Partial<T>): Promise<T>;
    abstract delete(path: string): Promise<void>;
}