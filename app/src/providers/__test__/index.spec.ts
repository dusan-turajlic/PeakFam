import { indexedDB as fakeIndexedDB } from "fake-indexeddb";
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import IndexDBProvider from '@/providers/indexDB';
import createProvider, { type ProviderType } from "@/providers";
import BaseProvider from "@/providers/base";

vi.mock('@/providers/indexDB/db', () => ({
  default: fakeIndexedDB,
}));

let storage: Record<string, string> = {};

const localStorageMock = {
  getItem: vi.fn((key: string) => {
    return storage[key];
  }),
  setItem: vi.fn((key: string, value: string) => {
    storage[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete storage[key];
  }),
  clear: vi.fn(() => {
    storage = {};
  }),
};

vi.mock('@/providers/localstorage/localStorage', () => ({
  default: localStorageMock,
}));

describe.each(['local', 'indexDB'])('createProvider($0)', (providerType) => {
  let provider: BaseProvider;

  beforeEach(() => {
    provider = createProvider(providerType as ProviderType);
  });

  describe(`(${providerType}) initialization`, () => {
    it(`(${providerType}) should successfully initialize the database with correct structure`, async () => {
      // Act: Initialize the provider (happens in beforeEach)

      // Assert: Database should be created and accessible
      expect(provider).toBeDefined();

      // Verify database structure by attempting a simple operation
      // This will trigger the database initialization if not already done
      const testData = { name: 'test', value: 123 };
      const created = await provider.create('/test', testData);

      // Verify the data was stored correctly
      expect(created).toHaveProperty('id');
      expect(created.name).toBe('test');
      expect(created.value).toBe(123);

      // Verify we can retrieve the data
      const retrieved = await provider.get('/test');
      expect(retrieved).toEqual(expect.objectContaining({ [created.id]: created }));
    });

    it(`(${providerType}) should handle concurrent initialization requests`, async () => {
      // Act: Create multiple provider instances simultaneously
      const provider1 = new IndexDBProvider();
      const provider2 = new IndexDBProvider();

      // Assert: Both should initialize successfully
      const data1 = await provider1.create('/concurrent1', { test: 'data1' });
      const data2 = await provider2.create('/concurrent2', { test: 'data2' });

      expect(data1).toBeDefined();
      expect(data2).toBeDefined();
      expect(data1.test).toBe('data1');
      expect(data2.test).toBe('data2');
    });
  });

  describe(`(${providerType}) CRUD operations`, () => {
    describe(`(${providerType}) CREATE operations`, () => {
      it(`(${providerType}) should create a simple item with generated ID`, async () => {
        const testData = { name: 'Test Item', value: 42 };
        const created = await provider.create('/items', testData);

        expect(created).toEqual(expect.objectContaining({
          name: 'Test Item',
          value: 42,
          id: expect.any(String)
        }));
      });

      it(`(${providerType}) should create complex nested objects`, async () => {
        const complexData = {
          user: {
            name: 'John Doe',
            preferences: {
              theme: 'dark',
              notifications: true
            }
          },
          metadata: {
            createdAt: new Date().toISOString(),
            tags: ['important', 'urgent']
          }
        };

        const created = await provider.create('/users', complexData);

        expect(created).toEqual(expect.objectContaining({
          user: expect.objectContaining({
            name: 'John Doe',
            preferences: expect.objectContaining({
              theme: 'dark'
            })
          })
        }));
      });

      it(`(${providerType}) should create multiple items under the same path`, async () => {
        const item1 = await provider.create('/products', { name: 'Product 1', price: 10 });
        const item2 = await provider.create('/products', { name: 'Product 2', price: 20 });

        expect(item1).toEqual(expect.objectContaining({
          name: 'Product 1',
          price: 10,
          id: expect.any(String)
        }));
        expect(item2).toEqual(expect.objectContaining({
          name: 'Product 2',
          price: 20,
          id: expect.any(String)
        }));
      });
    });

    describe(`(${providerType}) READ operations`, () => {
      it(`(${providerType}) should read a single item by exact path`, async () => {
        const testData = { name: 'Single Item', value: 100 };
        const created = await provider.create('/single', testData);
        const retrieved = await provider.get(`/single/${created.id}`);

        expect(retrieved).toEqual(created);
      });

      it(`(${providerType}) should read multiple items under a path`, async () => {
        const item1 = await provider.create('/collection', { name: 'Item 1', order: 1 });
        const item2 = await provider.create('/collection', { name: 'Item 2', order: 2 });
        const item3 = await provider.create('/collection', { name: 'Item 3', order: 3 });

        const retrieved: Record<string, { name: string; order: number }> = await provider.get('/collection');

        expect(retrieved).toEqual(expect.objectContaining({
          [item1.id]: expect.objectContaining({
            name: 'Item 1',
            order: 1
          }),
          [item2.id]: expect.objectContaining({
            name: 'Item 2',
            order: 2
          }),
          [item3.id]: expect.objectContaining({
            name: 'Item 3',
            order: 3
          })
        }));
      });

      it(`(${providerType}) should throw error when reading non-existent item`, async () => {
        await expect(provider.get('/non-existent')).rejects.toThrow('No Data Found');
      });
    });

    describe(`(${providerType}) UPDATE operations`, () => {
      it(`(${providerType}) should update an existing item`, async () => {
        const { id } = await provider.create('/update-test', { name: 'Original', value: 1 });
        const updated = await provider.update(`/update-test/${id}`, { value: 2, newField: 'added' });

        expect(updated).toEqual(expect.objectContaining({ name: 'Original', value: 2, newField: 'added' }));
      });

      it(`(${providerType}) should perform partial updates`, async () => {
        const { id } = await provider.create('/partial-update', { name: 'Original', value: 1, nested: { prop: 'old' } });
        const updated = await provider.update(`/partial-update/${id}`, { value: 2 });

        expect(updated).toEqual(
          expect.objectContaining({ id, name: 'Original', value: 2, nested: { prop: 'old' } })
        );
      });

      it(`(${providerType}) should throw error when updating non-existent item`, async () => {
        await expect(provider.update('/non-existent', { value: 1 })).rejects.toThrow('No Data Found');
      });
    });

    describe(`(${providerType}) DELETE operations`, () => {
      it(`(${providerType}) should delete an existing item`, async () => {
        const { id } = await provider.create('/delete-test', { name: 'To Delete' });
        await provider.delete(`/delete-test/${id}`);

        // Verify it's deleted
        await expect(provider.get(`/delete-test/${id}`)).rejects.toThrow('No Data Found');
      });

      it(`(${providerType}) should not throw when deleting non-existent item`, async () => {
        await expect(provider.delete('/non-existent')).resolves.not.toThrow();
      });
    });
  });
});
