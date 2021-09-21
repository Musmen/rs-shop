import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { LocationService } from './services/location/location.service';

import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';

import { InfoBlockComponent } from './components/info-block/info-block.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    InfoBlockComponent,
    HeaderComponent,
    MainMenuComponent,
    NavBarComponent,
    FooterComponent,
    NotFoundComponent,
    SpinnerComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    SpinnerComponent,
  ],
  providers: [LocationService],
})
export class CoreModule { }
