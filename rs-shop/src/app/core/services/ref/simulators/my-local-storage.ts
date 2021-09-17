export class MyLocalStorage implements Storage {
  private storage: Map<string, string | null> = new Map();

  get length(): number {
    return this.storage.size;
  }

  clear(): void {
    this.storage.clear();
  }

  key(index: number): string | null {
    return Array.from(this.storage.values())[index];
  }

  getItem(key: string): string | null {
    return this.storage.get(key) || null;
  }

  setItem(key: string, value: string | null): void {
    this.storage.set(key, value);
  }

  removeItem(key: string): void {
    this.storage.delete(key);
  }
}
