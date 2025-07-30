import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Token {
  readonly TOKEN_KEY = 'appToken';

  constructor() {}

  // Store the token in local storage
  setToken(token: any): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Retrieve the token from local storage
  getToken(): any {
    const data = localStorage.getItem(this.TOKEN_KEY);

    return data;
  }

  // Remove the token from local storage
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
