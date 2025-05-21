import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public updateItem<T>(key: string, updateFn: (data: T) => T): void {
    const raw = localStorage.getItem(key);
    if (!raw) return;

    const parsed = JSON.parse(raw);
    const updated = updateFn(parsed);
    localStorage.setItem(key, JSON.stringify(updated));
  }

  public clear(): void {
    localStorage.clear();
  }
}
