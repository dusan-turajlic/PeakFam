import type { IOpenFoodDexObject, Product } from "@/modals";

const API_URL = import.meta.env.VITE_OPEN_FOOD_DEX_API_URL;

function ndjsonObjectsFromGzip(gzipReadable: ReadableStream, freeText: string) {
    const decompressed = gzipReadable.pipeThrough(new DecompressionStream('gzip'));
    let buf = '';
    return decompressed
        .pipeThrough(new TextDecoderStream())
        .pipeThrough(new TransformStream({
            transform(chunk, controller) {
                buf += chunk;
                const lines = buf.split(/\r?\n/);
                buf = lines.pop() ?? '';
                for (const line of lines) {
                    if (!line) continue;
                    const obj = JSON.parse(line) as IOpenFoodDexObject;
                    const hasMacrosAndCalories = obj.k && obj.p && obj.f && obj.c;
                    if (
                        hasMacrosAndCalories && (
                            obj.n?.toLowerCase().includes(freeText.toLowerCase()) ||
                            obj.b?.toLowerCase().includes(freeText.toLowerCase())
                        )
                    ) {
                        controller.enqueue(obj);
                    }
                }
            },
            flush(controller) {
                const last = buf.trim();
                if (last) controller.enqueue(JSON.parse(last));
            }
        }));
}

export async function* searchGenerator(freeText: string): AsyncGenerator<IOpenFoodDexObject, void, unknown> {
    const res = await fetch(`${API_URL}/indexes/catalog.jsonl.gz`);
    if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

    if (typeof DecompressionStream !== 'function') {
        throw new Error('DecompressionStream is not supported');
    }

    const objStream = ndjsonObjectsFromGzip(res.body, freeText);
    const reader = objStream.getReader();

    try {
        let result = await reader.read();
        while (!result.done) {
            yield result.value; // Yield each result as it's found
            result = await reader.read();
        }
    } finally {
        reader.releaseLock();
    }
}

export async function searchByBarcode(barcode: string): Promise<Product | null> {
    const res = await fetch(`${API_URL}/products/${barcode}.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}