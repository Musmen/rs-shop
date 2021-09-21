import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { IAppState } from '@redux/state.model';
import { setNewUser, setUserLoginStatus } from '@redux/actions/user.actions';
import { selectIsUserLogged, selectUserFullName } from '@redux/selectors/user.selectors';

import {
  ICredentials, IToken, IUser,
} from '@core/models/user.model';
import { DEFAULT_USER } from '@common/constants';

import { MainDbService } from '../main-db/main-db.service';
import { UserStorageService } from '../user-storage/user-storage.service';
import { FavoritesService } from '../goods/favorites/favorites.service';
import { CartService } from '../goods/cart/cart.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  isUserLogged: boolean = false;

  constructor(
    private userStorageService: UserStorageService,
    private mainDB: MainDbService,
    private store: Store<IAppState>,
    private router: Router,
    private favoritesService: FavoritesService,
    private cartService: CartService,
  ) {
    this.getIsUserLogged$().subscribe(
      (isUserLogged) => {
        this.isUserLogged = isUserLogged;
      },
    );
  }

  private setToken(token: string): void {
    this.mainDB.setToken(token);
  }

  private getToken(): string {
    return this.mainDB.getToken();
  }

  clearToken(): void {
    this.mainDB.setToken('');
  }

  private setTokenFromStorage(): void {
    const token: string = this.userStorageService.getTokenStorage();
    this.setToken(token);
  }

  private setTokenAndUserSubscriber(tokenResponse$: Observable<IToken>): void {
    tokenResponse$.pipe(
      switchMap(
        ({ token }) => {
          this.setToken(token);
          return this.getUserInfo$();
        },
      ),
      take(1),
    ).subscribe(
      (user: IUser) => {
        const loggedUser = user;
        loggedUser.favorites = this.favoritesService.getUserUpdatedFavorites(loggedUser);
        loggedUser.cart = this.cartService.getUserUpdatedCart(loggedUser);
        this.userStorageService.setTokenStorage(this.getToken());
        this.userStorageService.setUserStorage(loggedUser);
        this.store.dispatch(setNewUser({ user: loggedUser }));
        this.store.dispatch(setUserLoginStatus({ isLogged: true }));
        this.goToMainPage();
      },
      () => {
        console.log('Error login/registration attempt!');
        this.store.dispatch(setUserLoginStatus({ isLogged: false }));
        this.clearToken();
      },
    );
  }

  getUserInfo$(): Observable<IUser> {
    return this.mainDB.fetchUserInfo$();
  }

  register(credentials: ICredentials): void {
    this.setTokenAndUserSubscriber(
      this.mainDB.registerUser$(credentials),
    );
  }

  login(credentials: ICredentials): void {
    this.setTokenAndUserSubscriber(
      this.mainDB.loginUser$(credentials),
    );
  }

  logout(): void {
    this.clearToken();
    this.userStorageService.clearUserStorage();
    this.store.dispatch(setUserLoginStatus({ isLogged: false }));
    this.store.dispatch(setNewUser({
      user: {
        ...DEFAULT_USER,
        favorites: this.favoritesService.favoritesGoodsItemsIds,
        cart: this.cartService.cartGoodsItemsIds,
      },
    }));
  }

  updateLoginStatus$(): Observable<IUser> {
    this.setTokenFromStorage();
    if (JSON.stringify(this.getToken()) === '{}') return throwError('');

    return this.getUserInfo$();
  }

  getIsUserLogged(): boolean {
    return this.isUserLogged;
  }

  getIsUserLogged$(): Observable<boolean> {
    return this.store.select(selectIsUserLogged);
  }

  getUserFullName$(): Observable<string> {
    return this.store.select(selectUserFullName);
  }

  goToMainPage(): void {
    if (this.router.url === '/login') this.router.navigate(['/main']);
  }
}
