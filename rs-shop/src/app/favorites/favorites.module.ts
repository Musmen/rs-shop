import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { FavoritesItemComponent } from './components/favorites-item/favorites-item.component';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';

@NgModule({
  declarations: [
    FavoritesPageComponent,
    FavoritesItemComponent,
    FavoritesListComponent,
  ],
  imports: [
    SharedModule,
    FavoritesRoutingModule,
  ],
})
export class FavoritesModule { }
