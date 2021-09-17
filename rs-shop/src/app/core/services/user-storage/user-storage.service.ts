import { Injectable } from '@angular/core';
import { IUser } from '@app/core/models/user.model';

import { DEFAULT_USER, STORAGE_KEYS } from '@core/common/constants';

import { RefService } from '../ref/ref.service';

@Injectable({ providedIn: 'root' })
export class UserStorageService {
  private localStorage: Storage;

  constructor(private refService: RefService) {
    this.localStorage = this.refService.localStorage;
  }

  getUserStorage(): IUser {
    return JSON.parse(
      this.localStorage.getItem(STORAGE_KEYS.USER) || JSON.stringify(DEFAULT_USER),
    );
  }

  setUserStorage(user: IUser): void {
    this.localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  getTokenStorage(): string {
    return JSON.parse(
      this.localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) || '{}',
    );
  }

  setTokenStorage(token: string): void {
    this.localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, JSON.stringify(token));
  }

  clearUserStorage(): void {
    this.localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    this.localStorage.removeItem(STORAGE_KEYS.USER);
  }
}
