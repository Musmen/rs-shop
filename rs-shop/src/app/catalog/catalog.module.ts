import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CatalogRoutingModule } from './catalog-routing.module';

import { CategoryInfoComponent } from './components/category-info/category-info.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { SubcategoryPageComponent } from './pages/subcategory-page/subcategory-page.component';
import { GoodsListComponent } from './components/goods-list/goods-list.component';
import { GoodsCardComponent } from './components/goods-card/goods-card.component';

@NgModule({
  declarations: [
    CategoryInfoComponent,
    CatalogComponent,
    CategoryPageComponent,
    SubcategoryPageComponent,
    GoodsListComponent,
    GoodsCardComponent,
  ],
  imports: [
    SharedModule,
    CatalogRoutingModule,
  ],
})
export class CatalogModule { }
