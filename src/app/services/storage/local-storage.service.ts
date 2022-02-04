import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly localStorageKey = 'pokemon-trainer-storage';
  constructor() {}

  /**
   * Overrides currently saved session (if any)
   */
  public save(values: Object | string): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(values));
  }

  public load<T>(): T | null {
    const item = localStorage.getItem(this.localStorageKey);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  }

  get hasStored(): boolean {
    return localStorage.getItem(this.localStorageKey) ? true : false;
  }
}
