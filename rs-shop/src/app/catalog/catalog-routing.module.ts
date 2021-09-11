import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CatalogComponent } from './pages/catalog/catalog.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { SubcategoryPageComponent } from './pages/subcategory-page/subcategory-page.component';

const routes: Routes = [
  { path: '', component: CatalogComponent },
  { path: ':categoryId', component: CategoryPageComponent },
  { path: ':categoryId/:subcategoryId', component: SubcategoryPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule { }
