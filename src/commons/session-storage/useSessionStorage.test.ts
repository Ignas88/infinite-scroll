import { renderHook, act } from '@testing-library/react';
import { useSessionStorage } from './useSessionStorage';


export const mockStorage = (): void => {
  class StorageMock implements Omit<Storage, 'key' | 'length'> {
    store: Record<string, string> = {};

    clear() {
      this.store = {};
    }

    getItem(key: string) {
      return this.store[key] || null;
    }

    setItem(key: string, value: unknown) {
      this.store[key] = value + '';
    }
  }

  Object.defineProperty(window, 'sessionStorage', {
    value: new StorageMock(),
  });
};
mockStorage();

describe('useSessionStorage()', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should accept initial state as an array', () => {
    const {result} = renderHook(() => useSessionStorage('test', [1, 2]));
    expect(result.current[0]).toEqual([1, 2]);
  });
  it('setValue should store now state in window.sessionStorage as serialised JSON', () => {
    const {result} = renderHook(() => useSessionStorage('test', [1, 2]));

    act(() => {
      const setValue = result.current[1];
      setValue([1, 2, 3]);
    });
    expect(window.sessionStorage.getItem('test')).toBe(JSON.stringify([1, 2, 3]));
  });
});