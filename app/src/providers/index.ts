import BaseProvider from "@/providers/base";
import IndexDBProvider from "@/providers/indexDB";
import LocalStorageProvider from "@/providers/localstorage";

const ACTIVE_PROVIDERS: Record<string, BaseProvider> = {}

export type ProviderType = 'local' | 'api' | 'indexDB';

export default function createProvider(provider: ProviderType = 'indexDB') {
    if (ACTIVE_PROVIDERS[provider]) {
        return ACTIVE_PROVIDERS[provider];
    }

    switch (provider) {
        case 'local':
            ACTIVE_PROVIDERS.local = new LocalStorageProvider();
            return ACTIVE_PROVIDERS.local;
        case 'indexDB':
            ACTIVE_PROVIDERS.indexDB = new IndexDBProvider();
            return ACTIVE_PROVIDERS.indexDB;
        case 'api':
            console.log('API Provider not implemented yet');
            return ACTIVE_PROVIDERS.local;
        default:
            return ACTIVE_PROVIDERS.local;
    }
}