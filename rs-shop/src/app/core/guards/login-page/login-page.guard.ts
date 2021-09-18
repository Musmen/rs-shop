import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { UserService } from '@app/core/services/user/user.service';

@Injectable({ providedIn: 'root' })
export class LoginPageGuard implements CanActivate, CanLoad {
  constructor(private userService: UserService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.userService.getIsUserLogged$().pipe(
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
