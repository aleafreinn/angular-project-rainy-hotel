import { InjectionToken } from '@angular/core';

export const localStorageToken = new InjectionToken<any>('local storage', {
  providedIn: 'root', // because we are going to make sure the particular
  // service is "tree shakable"
  factory() {
    return localStorage;
  },
});
