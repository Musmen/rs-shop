import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartFormComponent } from './components/cart-form/cart-form.component';

@NgModule({
  declarations: [
    CartPageComponent,
    CartItemComponent,
    CartListComponent,
    CartFormComponent,
  ],
  imports: [
    SharedModule,
    CartRoutingModule,
  ],
})
export class CartModule { }
