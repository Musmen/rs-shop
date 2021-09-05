import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { LocationService } from './services/location/location.service';
import { InfoBlockComponent } from './components/info-block/info-block.component';
import { HeaderComponent } from './pages/header/header.component';

@NgModule({
  declarations: [
    InfoBlockComponent,
    HeaderComponent,
  ],
  imports: [ SharedModule ],
  exports: [ HeaderComponent ],
  providers: [ LocationService ],
})
export class CoreModule { }
