export const FOOD_DEX_URL = import.meta.env.VITE_OPEN_FOOD_DEX_API_URL;
export const FOOD_DEX_INDEX_URL = `${FOOD_DEX_URL}/indexes/catalogs`;
export const DEFAULT_CONTRY_CODE_FROM_CATALOG = "global";

export function getLocelizedIndexUrl(contryCode: string) {
    return `${FOOD_DEX_INDEX_URL}/${contryCode}/catalog.jsonl.br`;
}