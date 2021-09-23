import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';

import { OrderComponent } from './components/order/order.component';
import { OrderGoodsItemComponent } from './components/order-goods-item/order-goods-item.component';
import { OrderGoodsListComponent } from './components/order-goods-list/order-goods-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';

import { OrdersService } from './services/orders/orders.service';

@NgModule({
  declarations: [
    OrderComponent,
    OrderGoodsItemComponent,
    OrderGoodsListComponent,
    OrderFormComponent,
    OrdersPageComponent,
  ],
  imports: [
    SharedModule,
    OrdersRoutingModule,
  ],
  providers: [OrdersService],
})
export class OrdersModule { }
