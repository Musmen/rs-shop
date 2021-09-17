import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { LocationService } from './services/location/location.service';

import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';

import { InfoBlockComponent } from './components/info-block/info-block.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    InfoBlockComponent,
    HeaderComponent,
    MainMenuComponent,
    NavBarComponent,
    FooterComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
  providers: [LocationService],
})
export class CoreModule { }
