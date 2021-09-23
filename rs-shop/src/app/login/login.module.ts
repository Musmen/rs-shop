import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';

import { LoginPageComponent } from './pages/login-page/login-page.component';

@NgModule({
  declarations: [
    LoginPageComponent,
  ],
  imports: [
    SharedModule,
    LoginRoutingModule,
  ],
})
export class LoginModule { }
