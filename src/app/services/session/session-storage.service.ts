import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  private readonly sessionStorageKey = 'pokemon-trainer-session';

  constructor() {}

  /**
   * Overrides currently saved session (if any)
   */
  public saveSession(values: Object[] | string): void {
    sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(values));
  }

  public appendSession<T>(values: Object[] | string): void {
    sessionStorage.setItem(
      this.sessionStorageKey,
      JSON.stringify([...this.loadSession<T>(), ...values])
    );
  }

  public loadSession<T>(): T[] {
    const item = sessionStorage.getItem(this.sessionStorageKey);
    if (item) {
      return JSON.parse(item);
    }
    return [];
  }

  get hasSessionSet(): boolean {
    return sessionStorage.getItem(this.sessionStorageKey) ? true : false;
  }
}
