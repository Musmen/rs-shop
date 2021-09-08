import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CategoriesRoutingModule } from './categories-routing.module';

import { CategoryInfoComponent } from './components/category-info/category-info.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';

@NgModule({
  declarations: [
    CategoryInfoComponent,
    CategoriesPageComponent,
  ],
  imports: [
    SharedModule,
    CategoriesRoutingModule,
  ],
})
export class CategoriesModule { }
