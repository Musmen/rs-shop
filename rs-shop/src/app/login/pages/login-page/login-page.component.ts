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

  constructor(private userService: UserService) { }

  login(credentials: ICredentials): void {
    this.userService.login(credentials);
  }

  register(credentials: ICredentials): void {
    this.userService.register(credentials);
  }

  logout(): void {
    this.userService.logout();
  }
}
