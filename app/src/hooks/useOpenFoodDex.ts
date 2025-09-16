// src/useOpenFoodDex.ts (example hook you call once on app load)
import createProvider from "@/providers";
import { useEffect, useRef } from "react";

const provider = createProvider('local');
const PATH_LOCAL_APP_DATA = '/local/app-data';
const PATH_OPEN_FOOD_DEX = `${PATH_LOCAL_APP_DATA}/open-food-dex`;

async function startOpenFoodDexWorker(url: string, worker: Worker) {
    const { exists } = await provider.get<{ exists: boolean }>(PATH_OPEN_FOOD_DEX)
        .catch(() => ({ exists: false }));

    console.log('exists', exists);
    if (exists) {
        return;
    }

    worker.addEventListener('message', async (e) => {
        console.log('worker onmessage', e.data);
        if (e.data?.type === 'done') {
            await provider.create(PATH_OPEN_FOOD_DEX, { exists: true });
        }
    });

    worker.postMessage({ type: "start", url });
}

export function useOpenFoodDex(url: string) {
    const workerRef = useRef<Worker | null>(null);

    useEffect(() => {
        workerRef.current = new Worker(new URL("@/services/api/openFoodDex/worker.ts", import.meta.url), { type: "module" });
        void startOpenFoodDexWorker(url, workerRef.current);

        return () => {
            workerRef.current?.terminate();
            workerRef.current = null;
        };
    }, [url]);

    return { workerRef };
}