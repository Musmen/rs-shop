import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageGuard } from './core/guards/login-page/login-page.guard';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  { path: 'home', redirectTo: 'main' },
  { path: 'categories', redirectTo: 'catalog' },
  { path: 'auth', redirectTo: 'login' },
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
    path: 'cart',
    loadChildren: () => import('@cart/cart.module')
      .then((m) => m.CartModule),
  },
  {
    path: 'orders',
    loadChildren: () => import('@orders/orders.module')
      .then((m) => m.OrdersModule),
  },
  {
    path: 'catalog',
    loadChildren: () => import('@catalog/catalog.module')
      .then((m) => m.CatalogModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
