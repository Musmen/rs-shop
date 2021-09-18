import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';

@NgModule({
  declarations: [
    FavoritesPageComponent,
  ],
  imports: [
    SharedModule,
    FavoritesRoutingModule,
  ],
})
export class FavoritesModule { }
