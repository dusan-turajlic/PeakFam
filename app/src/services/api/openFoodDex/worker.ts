// src/worker.ts
import createProvider from "@/providers";
import type { IOpenFoodDexObject } from "@/modals";

type Msg =
    | { type: "start"; url: string }
    | { type: "stop" };

const BATCH_SIZE = 50;
const DB_NAME = "OPEN_FOOD_DEX_DB";
const DB_VERSION = 1;

interface IOpenFoodDexObjectWithPath {
    path: string;
    data: IOpenFoodDexObject;
}

const provider = createProvider("indexDB", DB_NAME, DB_VERSION); // create once

self.addEventListener("message", (e: MessageEvent<Msg>) => {
    console.log("worker onmessage", e.data);
    if (e.data?.type === "start") {
        run(e.data.url).catch((err) => {
            postMessage({ type: "error", data: { message: String(err?.message ?? err) } });
        });
    }
});

async function run(url: string) {
    const res = await fetch(url);
    if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

    if (typeof (globalThis as any).DecompressionStream !== "function") {
        throw new Error("DecompressionStream is not supported in this context");
    }

    const readable = res.body
        .pipeThrough(new DecompressionStream("gzip"))
        .pipeThrough(new TextDecoderStream())
        .pipeThrough(linesToObjects());

    let count = 0;
    const batch: IOpenFoodDexObjectWithPath[] = [];

    await readable.pipeTo(new WritableStream<IOpenFoodDexObjectWithPath>({
        async write(obj) {
            batch.push(obj);
            if (batch.length >= BATCH_SIZE) {
                await provider.createMany(batch);
                count += batch.length;
                batch.length = 0;
                postMessage({ type: "progress", data: { count } });
            }
        },
        async close() {
            if (batch.length) {
                await provider.createMany(batch);
                count += batch.length;
                batch.length = 0;
                postMessage({ type: "progress", data: { count } });
            }
            postMessage({ type: "done" });
        },
        abort(reason) {
            postMessage({ type: "error", data: { message: String(reason) } });
        }
    }));
}

function linesToObjects() {
    let buf = "";
    return new TransformStream<string, IOpenFoodDexObjectWithPath>({
        transform(chunk, controller) {
            buf += chunk;
            const lines = buf.split(/\r?\n/);
            buf = lines.pop() ?? "";
            for (const line of lines) {
                if (!line) continue;
                const obj = JSON.parse(line) as IOpenFoodDexObject;
                // The object code should always be defined
                let path = `/products/${obj.code}`;
                // Name is defined most of the time, but in the case where it isent we don't want to have `null` in the path
                if (obj.name) {
                    path += `/name-${obj.name}`;
                }

                // Brand is defined most of the time, but in the case where it isent we don't want to have `null` in the path
                if (obj.brand) {
                    path += `/brand-${obj.brand}`;
                }
                controller.enqueue({ path: `/products/${obj.code}`, data: obj });
            }
        },
        flush(controller) {
            const last = buf.trim();
            if (last) controller.enqueue(JSON.parse(last));
        }
    });
}