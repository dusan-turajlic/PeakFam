import { FOOD_DEX_URL } from "@/constants";
import type { IOpenFoodDexObject, Product } from "@/modals";
import createProvider from "@/providers";

export const DB_NAME = "OPEN_FOOD_DEX_DB";
export const DB_VERSION = 1;

const provider = createProvider("indexDB", DB_NAME, DB_VERSION); // create once

export async function* searchGenerator(freeText: string): AsyncGenerator<IOpenFoodDexObject> {
    for await (const item of await provider.search<IOpenFoodDexObject>(`name-${freeText}`, {
        name: {
            fuzzy: freeText
        }
    })) {
        yield item;
    }

}

export async function searchByBarcode(barcode: string): Promise<Product | null> {
    const res = await fetch(`${FOOD_DEX_URL}/products/${barcode}.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}