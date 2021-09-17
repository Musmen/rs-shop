import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

import { UserService } from '@core/services/user/user.service';

import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { checkLoginStatus, setNewUser, setUserLoginStatus } from '../actions/user.actions';

@Injectable({ providedIn: 'any' })
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  updateLoginStatus$: Observable<Action> = createEffect(() => this.actions$
    .pipe(
      ofType(checkLoginStatus.type),
      switchMap(() => this.userService.updateLoginStatus$()
        .pipe(
          take(1),
          switchMap(
            (user) => {
              this.userService.goToMainPage();
              return [setNewUser({ user }), setUserLoginStatus({ isLogged: true })];
            },
          ),
          catchError(
            () => {
              console.log('Error login attempt!');
              this.userService.clearToken();
              return of(setUserLoginStatus({ isLogged: false }));
            },
          ),
        )),
    ));
}
