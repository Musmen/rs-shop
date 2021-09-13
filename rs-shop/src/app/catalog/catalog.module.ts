import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CatalogRoutingModule } from './catalog-routing.module';

import { CategoryInfoComponent } from './components/category-info/category-info.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { SubcategoryPageComponent } from './pages/subcategory-page/subcategory-page.component';
import { GoodsListComponent } from './components/goods-list/goods-list.component';
import { GoodsItemCardComponent } from './components/goods-item-card/goods-item-card.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { AmountVisualizationDirective } from './directives/amount-visualization/amount-visualization.directive';
import { SortPipe } from './pipes/sort/sort.pipe';
import { GoodsItemPageComponent } from './pages/goods-item-page/goods-item-page.component';

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
  ],
})
export class CatalogModule { }
