import BaseProvider from "@/providers/base";
import IndexDBProvider from "@/providers/indexDB";
import LocalStorageProvider from "@/providers/localstorage";

const ACTIVE_PROVIDERS: Record<string, BaseProvider> = {}

export type ProviderType = 'local' | 'indexDB';

export default function createProvider(provider: ProviderType = 'indexDB', dbName?: string, dbVersion?: number) {
    if (ACTIVE_PROVIDERS[provider]) {
        return ACTIVE_PROVIDERS[provider];
    }

    switch (provider) {
        case 'local':
            ACTIVE_PROVIDERS.local = new LocalStorageProvider(dbName, dbVersion);
            return ACTIVE_PROVIDERS.local;
        case 'indexDB':
            ACTIVE_PROVIDERS.indexDB = new IndexDBProvider(dbName, dbVersion);
            return ACTIVE_PROVIDERS.indexDB;
        default:
            return ACTIVE_PROVIDERS.local;
    }
}