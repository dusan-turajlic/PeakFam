import BaseProvider, { type ProviderOptions } from "@/providers/base";
import IndexDBProvider from "@/providers/indexDB";
import LocalStorageProvider from "@/providers/localstorage";
import SQLiteProvider from "@/providers/sqlite";

export type ProviderType = 'local' | 'indexDB' | 'sqlite';

export default function createProvider(
    provider: ProviderType = 'indexDB',
    dbName?: string,
    dbVersion?: number,
    options?: ProviderOptions
): BaseProvider {
    switch (provider) {
        case 'local':
            return new LocalStorageProvider(
                dbName,
                dbVersion,
                options
            );
        case 'indexDB':
            return new IndexDBProvider(
                dbName,
                dbVersion,
                options
            );
        case 'sqlite':
            return new SQLiteProvider(
                dbName,
                dbVersion,
                options
            );
        default:
            throw new Error(`Unsupported provider: ${provider}`);
    }
}