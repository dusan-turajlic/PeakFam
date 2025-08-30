import { indexedDB as fakeIndexedDB } from "fake-indexeddb";
import { describe, it, expect, beforeEach, vi } from 'vitest';
import IndexDBProvider from '@/providers/indexDB';

vi.mock('../indexDB', () => ({
  default: fakeIndexedDB,
}));

/** This method helps call any method on the class for test purposes */
function callPrivateWrapper(classInstance: unknown) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return classInstance as any;
}

describe('IndexDBProvider', () => {
  let provider: IndexDBProvider;

  beforeEach(() => {
    provider = new IndexDBProvider();
  });

  describe('initialization', () => {
    it('should successfully initialize the database with correct structure', async () => {
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
      expect(retrieved).toEqual({[created.id]: created});
    });

    it('should handle concurrent initialization requests', async () => {
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

  describe('CRUD operations', () => {
    describe('CREATE operations', () => {
      it('should create a simple item with generated ID', async () => {
        const testData = { name: 'Test Item', value: 42 };
        const created = await provider.create('/items', testData);
        
        expect(created).toHaveProperty('id');
        expect(created.name).toBe('Test Item');
        expect(created.value).toBe(42);
        expect(typeof created.id).toBe('string');
        expect(created.id.length).toBeGreaterThan(0);
      });

      it('should create complex nested objects', async () => {
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
        
        expect(created).toHaveProperty('id');
        expect(created.user.name).toBe('John Doe');
        expect(created.user.preferences.theme).toBe('dark');
        expect(created.metadata.tags).toEqual(['important', 'urgent']);
      });

      it('should create multiple items under the same path', async () => {
        const item1 = await provider.create('/products', { name: 'Product 1', price: 10 });
        const item2 = await provider.create('/products', { name: 'Product 2', price: 20 });
        
        expect(item1.id).not.toBe(item2.id);
        expect(item1.name).toBe('Product 1');
        expect(item2.name).toBe('Product 2');
      });
    });

    describe('READ operations', () => {
      it('should read a single item by exact path', async () => {
        const testData = { name: 'Single Item', value: 100 };
        const created = await provider.create('/single', testData);
        
        // Store the item directly at the path for single item retrieval
        const store = await callPrivateWrapper(provider).getStore('readwrite');
        await callPrivateWrapper(provider).wrap(store.put({
          path: '/single',
          data: created,
          timestamp: Date.now()
        }));
        
        const retrieved = await provider.get('/single');
        expect(retrieved).toEqual(created);
      });

      it('should read multiple items under a path', async () => {
        const item1 = await provider.create('/collection', { name: 'Item 1', order: 1 });
        const item2 = await provider.create('/collection', { name: 'Item 2', order: 2 });
        const item3 = await provider.create('/collection', { name: 'Item 3', order: 3 });
        
        const retrieved: Record<string, { name: string; order: number }> = await provider.get('/collection');
        
        expect(retrieved).toHaveProperty(item1.id);
        expect(retrieved).toHaveProperty(item2.id);
        expect(retrieved).toHaveProperty(item3.id);
        expect(retrieved[item1.id].name).toBe('Item 1');
        expect(retrieved[item2.id].name).toBe('Item 2');
        expect(retrieved[item3.id].name).toBe('Item 3');
      });

      it('should throw error when reading non-existent item', async () => {
        await expect(provider.get('/non-existent')).rejects.toThrow('No Data Found');
      });
    });

    describe('UPDATE operations', () => {
      it('should update an existing item', async () => {
        // Store the item directly at the path for update
        const store = await callPrivateWrapper(provider).getStore('readwrite');
        await callPrivateWrapper(provider).wrap(store.put({
          path: '/update-test',
          data: { name: 'Original', value: 1 },
          timestamp: Date.now()
        }));
        
        const updated = await provider.update('/update-test', { value: 2, newField: 'added' });
        
        expect(updated).toEqual({name: 'Original', value: 2, newField: 'added'});
      });

      it('should perform partial updates', async () => {
        // Store the item directly at the path for update
        const store = await callPrivateWrapper(provider).getStore('readwrite');
        await callPrivateWrapper(provider).wrap(store.put({
          path: '/partial-update',
          data: { name: 'Original', value: 1, nested: { prop: 'old' } },
          timestamp: Date.now()
        }));
        
        const updated = await provider.update('/partial-update', { value: 2 });
        
        expect(updated).toEqual({name: 'Original', value: 2, nested: { prop: 'old' }});
      });

      it('should throw error when updating non-existent item', async () => {
        await expect(provider.update('/non-existent', { value: 1 })).rejects.toThrow('No Data Found');
      });
    });

    describe('DELETE operations', () => {
      it('should delete an existing item', async () => {
        // Store the item directly at the path for deletion
        const store = await callPrivateWrapper(provider).getStore('readwrite');
        await callPrivateWrapper(provider).wrap(store.put({
          path: '/delete-test',
          data: { name: 'To Delete' },
          timestamp: Date.now()
        }));
        
        await provider.delete('/delete-test');
        
        // Verify it's deleted
        await expect(provider.get('/delete-test')).rejects.toThrow('No Data Found');
      });

      it('should not throw when deleting non-existent item', async () => {
        await expect(provider.delete('/non-existent')).resolves.not.toThrow();
      });
    });
  });
});
