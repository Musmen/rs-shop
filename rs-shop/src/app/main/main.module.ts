import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';

@NgModule({
  declarations: [
    MainPageComponent,
  ],
  imports: [
    SharedModule,
    MainRoutingModule,
  ],
})
export class MainModule { }
