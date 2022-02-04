import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly localStorageKey = 'pokemon-trainer-storage';
  constructor() {}

  /**
   * Saves and overrides currenly saved localStorage
   */
  public save(values: Object | string): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(values));
  }

  /**
   * Loads data from localStorage.
   * @returns Objects of specified type
   */
  public load<T>(): T | null {
    const item = localStorage.getItem(this.localStorageKey);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  }

  /**
   * Checks if there is current storage set
   */
  get hasStored(): boolean {
    return localStorage.getItem(this.localStorageKey) ? true : false;
  }
}
