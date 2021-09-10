import { NgModule } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { SharedModule } from '@shared/shared.module';
import { MainRoutingModule } from './main-routing.module';

import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SlideComponent } from './components/slide/slide.component';

@NgModule({
  declarations: [
    MainSliderComponent,
    MainPageComponent,
    SlideComponent,
  ],
  imports: [
    SharedModule,
    MainRoutingModule,
    SwiperModule,
  ],
})
export class MainModule { }
