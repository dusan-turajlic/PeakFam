export default abstract class BaseProvider {
    abstract get<T>(path: string): Promise<T>;
    abstract create<T>(path: string, data: T): Promise<T & {id: string}>;
    abstract update<T>(path: string, data: Partial<T>): Promise<T>;
    abstract delete(path: string): Promise<void>;
}