import BaseProvider from "./base";
import IndexDBProvider from "./indexDB";
import LocalStorageProvider from "./localstorage";

const DEFAULT_PROVIDER = new LocalStorageProvider();
const ACTIVE_PROVIDERS: Record<string, BaseProvider> = {}

export default function createProvider(provider: 'local' | 'api' | 'indexDB' = 'indexDB') {
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
            return DEFAULT_PROVIDER;
        default:
            return DEFAULT_PROVIDER;
    }
}