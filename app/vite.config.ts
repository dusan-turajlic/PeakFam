/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import { playwright } from '@vitest/browser-playwright'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    projects: [
      // Unit tests - run with jsdom
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['**/*.{spec,test}.{ts,tsx}'],
          exclude: ['**/node_modules/**', '**/dist/**', '**/*.e2e.*'],
          environment: 'jsdom',
          setupFiles: './src/test/setup.ts',
        },
      },
      // E2E tests - run in browser with Playwright
      {
        extends: true,
        test: {
          name: 'e2e',
          include: ['**/*.e2e.{ts,tsx}'],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
  optimizeDeps: {
    exclude: ['@preflower/barcode-detector-polyfill', '@subframe7536/sqlite-wasm']
  },
  assetsInclude: ['**/*.wasm'],
  server: {
    // Only load HTTPS certs when not running tests (certs may not be accessible in test environment)
    ...(process.env.VITEST ? {} : {
      https: {
        key: fs.readFileSync(path.resolve(__dirname, 'certs/key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, 'certs/cert.pem')),
      },
    }),
    allowedHosts: ['localhost', '127.0.0.1', '0.0.0.0', '::1', 'peakfam.net'],
  }
})
