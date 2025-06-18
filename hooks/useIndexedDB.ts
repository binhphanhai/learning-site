import { useCallback, useEffect, useState } from 'react';

interface DBStore {
  name: string;
  keyPath?: string;
  autoIncrement?: boolean;
}

class IndexedDBManager {
  private dbName: string;
  private version: number;
  private stores: DBStore[];
  private db: IDBDatabase | null = null;

  constructor(dbName: string, version: number = 1, stores: DBStore[] = []) {
    this.dbName = dbName;
    this.version = version;
    this.stores = stores;
  }

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        reject(new Error('IndexedDB not available'));
        return;
      }

      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        this.stores.forEach((store) => {
          if (!db.objectStoreNames.contains(store.name)) {
            db.createObjectStore(store.name, {
              keyPath: store.keyPath,
              autoIncrement: store.autoIncrement,
            });
          }
        });
      };
    });
  }

  async get<T>(storeName: string, key: string): Promise<T | null> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  }

  async set<T>(storeName: string, key: string, value: T): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put({ id: key, data: value });

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async delete(storeName: string, key: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async clear(storeName: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

// Default stores for the learning hub
const defaultStores: DBStore[] = [
  { name: 'progress', keyPath: 'id' },
  { name: 'notes', keyPath: 'id' },
  { name: 'settings', keyPath: 'id' },
];

let dbManager: IndexedDBManager | null = null;

export const useIndexedDB = () => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initDB = async () => {
      try {
        if (!dbManager) {
          dbManager = new IndexedDBManager('LearningHubDB', 1, defaultStores);
        }
        await dbManager.init();
        setIsReady(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize database');
        console.error('IndexedDB initialization error:', err);
      }
    };

    initDB();
  }, []);

  const getItem = useCallback(async <T>(storeName: string, key: string): Promise<T | null> => {
    if (!isReady || !dbManager) return null;
    try {
      const result = await dbManager.get<{ id: string; data: T }>(storeName, key);
      return result?.data || null;
    } catch (err) {
      console.error('Error getting item from IndexedDB:', err);
      return null;
    }
  }, [isReady]);

  const setItem = useCallback(async <T>(storeName: string, key: string, value: T): Promise<void> => {
    if (!isReady || !dbManager) return;
    try {
      await dbManager.set(storeName, key, value);
    } catch (err) {
      console.error('Error setting item in IndexedDB:', err);
    }
  }, [isReady]);

  const removeItem = useCallback(async (storeName: string, key: string): Promise<void> => {
    if (!isReady || !dbManager) return;
    try {
      await dbManager.delete(storeName, key);
    } catch (err) {
      console.error('Error removing item from IndexedDB:', err);
    }
  }, [isReady]);

  const clearStore = useCallback(async (storeName: string): Promise<void> => {
    if (!isReady || !dbManager) return;
    try {
      await dbManager.clear(storeName);
    } catch (err) {
      console.error('Error clearing IndexedDB store:', err);
    }
  }, [isReady]);

  // Fallback to localStorage if IndexedDB fails
  const getItemWithFallback = useCallback(async <T>(storeName: string, key: string): Promise<T | null> => {
    if (isReady) {
      return getItem<T>(storeName, key);
    }
    
    // Fallback to localStorage
    try {
      const item = localStorage.getItem(`${storeName}_${key}`);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }, [isReady, getItem]);

  const setItemWithFallback = useCallback(async <T>(storeName: string, key: string, value: T): Promise<void> => {
    if (isReady) {
      return setItem(storeName, key, value);
    }
    
    // Fallback to localStorage
    try {
      localStorage.setItem(`${storeName}_${key}`, JSON.stringify(value));
    } catch (err) {
      console.error('Error saving to localStorage:', err);
    }
  }, [isReady, setItem]);

  return {
    isReady,
    error,
    getItem: getItemWithFallback,
    setItem: setItemWithFallback,
    removeItem,
    clearStore,
  };
}; 