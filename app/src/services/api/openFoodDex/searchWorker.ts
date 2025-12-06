import type { IOpenFoodDexObject } from "@/modals";
import createProvider from "@/providers";
import { DB_NAME, DB_VERSION } from ".";

const provider = createProvider("sqlite", DB_NAME, DB_VERSION); // create once

self.addEventListener("message", async (e: MessageEvent<{ type: "search"; freeText: string }>) => {
    const { freeText } = e.data;
    await startSearchWorker(freeText);
});

export async function startSearchWorker(freeText: string): Promise<void> {
    const res = await provider.search<IOpenFoodDexObject>(`name-${freeText}`, {
        name: {
            fuzzy: freeText
        }
    });



}