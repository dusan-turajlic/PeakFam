const API_URL = import.meta.env.VITE_OPEN_FOOD_DEX_API_URL;

export interface OpenFoodDexObject {
    code: string;
    name?: string;
    brand?: string;
    creator?: string;
    main_category?: string;
    path: string;
    categories?: string[];
    macros?: {
        kcal?: number;
        serving_size?: string;
        p: number;
        f?: number;
        c?: number;
    };
}

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
                    const obj = JSON.parse(line) as OpenFoodDexObject;
                    if (
                        obj.name?.toLowerCase() === freeText.toLowerCase()
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

export async function* searchGenerator(freeText: string): AsyncGenerator<OpenFoodDexObject, void, unknown> {
    const res = await fetch(`${API_URL}/indexes/catalog.jsonl.gz`);
    if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

    if (typeof DecompressionStream !== 'function') {
        throw new Error('DecompressionStream is not supported');
    }

    const objStream = ndjsonObjectsFromGzip(res.body, freeText);
    const reader = objStream.getReader();

    try {
        while (true) {
            const { value: obj, done } = await reader.read();
            if (done) break;
            yield obj; // Yield each result as it's found
        }
    } finally {
        reader.releaseLock();
    }
}