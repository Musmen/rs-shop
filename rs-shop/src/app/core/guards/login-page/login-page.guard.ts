import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { selectIsUserLogged } from '@redux/selectors/user.selectors';
import { IAppState } from '@redux/state.model';

@Injectable({ providedIn: 'root' })
export class LoginPageGuard implements CanActivate, CanLoad {
  constructor(private store: Store<IAppState>, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.store.select(selectIsUserLogged).pipe(
      switchMap((isUserLogged) => {
        if (isUserLogged) this.router.navigate(['main']);
        return of(!isUserLogged);
      }),
    );
  }

  canLoad(): Observable<boolean> {
    return this.canActivate();
  }
}
