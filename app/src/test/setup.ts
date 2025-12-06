import '@testing-library/jest-dom'
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { vi } from "vitest";
import createFetchMock from 'vitest-fetch-mock';

const fetchMocker = createFetchMock(vi);

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve path to the SQLite WASM file in node_modules
const wasmPath = path.resolve(
    __dirname,
    "../../node_modules/@subframe7536/sqlite-wasm/dist/wa-sqlite-async.wasm"
);

// Read the WASM file to memory
const wasmFile = readFileSync(wasmPath);

fetchMocker.mockIf(
    request => request.url.endsWith("wa-sqlite-async.wasm"),
    () => new Response(wasmFile, {
        status: 200,
        headers: {
            "Content-Type": "application/wasm",
        },
    })
);