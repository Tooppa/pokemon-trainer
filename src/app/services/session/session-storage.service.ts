import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  private readonly sessionStorageKey = 'pokemon-trainer-session';

  constructor() {}

  /**
   * Saves and overrides currently saved session
   */
  public saveSession(values: Object[] | string): void {
    sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(values));
  }

  /**
   * Appends data to currently saved session
   */
  public appendSession<T>(values: Object[] | string): void {
    sessionStorage.setItem(
      this.sessionStorageKey,
      JSON.stringify([...this.loadSession<T>(), ...values])
    );
  }

  /** 
   * Loads data from the currently saved session.
   * @returns Returns an empty array if there is no stored session
   */
  public loadSession<T>(): T[] {
    const item = sessionStorage.getItem(this.sessionStorageKey);
    if (item) {
      return JSON.parse(item);
    }
    return [];
  }

  /**
   * Checks if session has been set
   */
  get hasSessionSet(): boolean {
    return sessionStorage.getItem(this.sessionStorageKey) ? true : false;
  }
}
