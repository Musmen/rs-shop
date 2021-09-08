import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryInfoComponent } from './components/category-info/category-info.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';

const routes: Routes = [
  { path: '', component: CategoriesPageComponent },
  { path: ':id', component: CategoryInfoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule { }
