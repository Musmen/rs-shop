import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageGuard } from './core/guards/login-page/login-page.guard';

const routes: Routes = [
  { path: 'categories', redirectTo: '' },
  { path: 'auth', redirectTo: 'login' },
  { path: 'home', redirectTo: 'main' },
  {
    path: 'main',
    loadChildren: () => import('@main/main.module')
      .then((m) => m.MainModule),
  },
  {
    path: 'login',
    loadChildren: () => import('@login/login.module')
      .then((m) => m.LoginModule),
    canLoad: [LoginPageGuard],
    canActivate: [LoginPageGuard],
  },
  {
    path: 'favorites',
    loadChildren: () => import('@favorites/favorites.module')
      .then((m) => m.FavoritesModule),
  },
  {
    path: '',
    loadChildren: () => import('@catalog/catalog.module')
      .then((m) => m.CatalogModule),
  },
  // { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
