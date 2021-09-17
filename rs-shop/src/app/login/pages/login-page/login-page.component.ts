import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from '@app/core/services/user/user.service';
import { ICredentials } from '@app/core/models/user.model';
import { DEFAULT_CREDENTIALS } from '@common/constants';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  credentials: ICredentials = DEFAULT_CREDENTIALS;

  // myUserCredentials: ICredentials = {
  //   firstName: 'Igor',
  //   lastName: 'Sam',
  //   login: 'Musmen',
  //   password: '123',
  //   token: '',
  // };

  constructor(private userService: UserService) {
    // debugger;
    // this.userService.getUserInfo$('qzn9d58sym0vn2qs936uwuqq').subscribe(
    //   (userInfo) => console.log(userInfo),
    // );
    // this.register(this.myUserCredentials);
  }

  login(credentials: ICredentials): void {
    this.userService.login(credentials);
  }

  register(credentials: ICredentials): void {
    this.userService.register(credentials);
  }

  logout(): void {
    this.userService.logout();
  }

  // getIsUserLogged$(): Observable<boolean> {
  //   return this._loginService.getIsUserLogged$();
  // }
}
