import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { LocationService } from './services/location/location.service';
import { InfoBlockComponent } from './components/info-block/info-block.component';
import { HeaderComponent } from './pages/header/header.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';

@NgModule({
  declarations: [
    InfoBlockComponent,
    HeaderComponent,
    MainMenuComponent,
  ],
  imports: [ SharedModule ],
  exports: [ HeaderComponent ],
  providers: [ LocationService ],
})
export class CoreModule { }
