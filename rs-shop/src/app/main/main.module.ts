import { SwiperModule } from 'swiper/angular';

import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MainRoutingModule } from './main-routing.module';

import { MainPageComponent } from './pages/main-page/main-page.component';
import { PopularGoodsSliderComponent } from './components/popular-goods-slider/popular-goods-slider.component';
import { MainSliderComponent } from './components/main-slider/main-slider.component';

@NgModule({
  declarations: [
    PopularGoodsSliderComponent,
    MainSliderComponent,
    MainPageComponent,
  ],
  imports: [
    SharedModule,
    MainRoutingModule,
    SwiperModule,
  ],
})
export class MainModule { }
