import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { IAppState } from '@redux/state.model';
import { setNewUser, setUserLoginStatus } from '@redux/actions/user.actions';

import {
  ICredentials, IToken, IUser,
} from '@core/models/user.model';
import { DEFAULT_USER } from '@common/constants';

import { MainDbService } from '../main-db/main-db.service';
import { UserStorageService } from '../user-storage/user-storage.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private token: string = '';

  constructor(
    private userStorageService: UserStorageService,
    private mainDB: MainDbService,
    private store: Store<IAppState>,
    private router: Router,
  ) { }

  private setToken(token: string): void {
    this.token = token;
  }

  private setTokenFromStorage(): void {
    const token: string = this.userStorageService.getTokenStorage();
    this.token = token;
  }

  private setTokenAndUserSubscriber(tokenResponse$: Observable<IToken>): void {
    tokenResponse$.pipe(
      switchMap(
        ({ token }) => {
          this.setToken(token);
          return this.getUserInfo$(token);
        },
      ),
      take(1),
    ).subscribe(
      (user: IUser) => {
        this.userStorageService.setTokenStorage(this.token);
        this.userStorageService.setUserStorage(user);
        this.store.dispatch(setNewUser({ user }));
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

  clearToken(): void {
    this.token = '';
  }

  getUserInfo$(token: string): Observable<IUser> {
    return this.mainDB.fetchUserInfo$(token);
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
    this.store.dispatch(setNewUser({ user: DEFAULT_USER }));
  }

  updateLoginStatus$(): Observable<IUser> {
    this.setTokenFromStorage();
    return this.getUserInfo$(this.token);
  }

  // ************************************
  // checkIsUserLogged(): boolean {
  //   return this.isUserLogged$.getValue();
  // }
  // getIsUserLogged$(): Observable<boolean> {
  //   return this.isUserLogged$.asObservable();
  // }

  // setUser(user: IUser): void {
  //   this.user = { ...user };
  // }

  goToMainPage(): void {
    if (this.router.url === '/login') this.router.navigate(['main']);
  }
  // getUser(): UserModel {
  //   return this.user;
  // }
  // getUserLogin(): UserModel['login'] {
  //   return this.getUser().login || DEFAULT_USER_LOGIN_TITLE;
  // }
  // checkIsUserToken(): boolean {
  //   return Boolean(this.user.token);
  // }

  // setUserStorage(user: UserModel): void {
  //   this.userStorageService.setUserStorage(user);
  // }
  // getUserStorage(): UserModel {
  //   return this.userStorageService.getUserStorage();
  // }
  // clearUserStorage(): void {
  //   this.userStorageService.clearUserStorage();
  // }

  // setLoginStatus(): void {
  //   this.isUserLogged$.next(true);
  // }
  // setLogoutStatus(): void {
  //   this.isUserLogged$.next(false);
  // }
  // updateUserLoginStatus(): void {
  //   if (this.checkIsUserToken()) this.setLoginStatus();
  // }

  // login(user: UserModel = this.user): void {
  //   this.setAuthToken();
  //   this.setUser(user);
  //   this.setUserStorage(user);
  //   this.setLoginStatus();
  //   this.locationService.goToMainPage();
  // }
}
