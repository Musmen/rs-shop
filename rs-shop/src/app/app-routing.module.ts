import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: 'main' },
  // { path: 'auth', redirectTo: 'login' },
  // { path: 'home', redirectTo: 'main' },
  {
    path: 'categories',
    loadChildren: () => import('@categories/categories.module')
      .then((m) => m.CategoriesModule),
  },
  // {
  //   path: 'main',
  //   loadChildren: () => import('@youtube/youtube.module')
  //     .then((m) => m.YoutubeModule),
  //   canLoad: [AuthGuard],
  //   canActivate: [AuthGuard],
  // },
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
