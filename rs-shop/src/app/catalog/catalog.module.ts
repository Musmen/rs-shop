import { SwiperModule } from 'swiper/angular';

import { SharedModule } from '@shared/shared.module';

import { NgModule } from '@angular/core';
import { CatalogRoutingModule } from './catalog-routing.module';

import { AmountVisualizationDirective } from './directives/amount-visualization/amount-visualization.directive';

import { SortPipe } from './pipes/sort/sort.pipe';

import { GoodsItemPageComponent } from './pages/goods-item-page/goods-item-page.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { SubcategoryPageComponent } from './pages/subcategory-page/subcategory-page.component';

import { CategoryInfoComponent } from './components/category-info/category-info.component';
import { GoodsListComponent } from './components/goods-list/goods-list.component';
import { GoodsItemCardComponent } from './components/goods-item-card/goods-item-card.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    CategoryInfoComponent,
    CatalogComponent,
    CategoryPageComponent,
    SubcategoryPageComponent,
    GoodsListComponent,
    GoodsItemCardComponent,
    BreadcrumbsComponent,
    AmountVisualizationDirective,
    SortPipe,
    GoodsItemPageComponent,
  ],
  imports: [
    SharedModule,
    CatalogRoutingModule,
    SwiperModule,
  ],
})
export class CatalogModule { }
