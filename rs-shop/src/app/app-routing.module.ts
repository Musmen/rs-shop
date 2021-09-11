import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'categories', redirectTo: '' },
  // { path: 'auth', redirectTo: 'login' },
  { path: 'home', redirectTo: 'main' },
  {
    path: 'main',
    loadChildren: () => import('@main/main.module')
      .then((m) => m.MainModule),
  },
  {
    path: '',
    loadChildren: () => import('@categories/categories.module')
      .then((m) => m.CategoriesModule),
  },
  // {
  //   path: 'admin',
  //   loadChildren: () => import('@admin/admin.module')
  //     .then((m) => m.AdminModule),
  //   canLoad: [AuthGuard],
  //   canActivate: [AuthGuard],
  // },
  // { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
