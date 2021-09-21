import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { OrdersService } from '@orders/services/orders/orders.service';
import { UserService } from '@core/services/user/user.service';

import { IOrder } from '@core/models/order.model';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class OrdersPageComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  orders: IOrder[] = [];

  constructor(
    private userService: UserService,
    private ordersService: OrdersService,
    private ref: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const subscription = this.ordersService.getOrders$()
      .subscribe(
        (orders) => {
          this.orders = JSON.parse(JSON.stringify(orders)) as IOrder[];
          this.ref.detectChanges();
        },
      );

    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getIsUserLogged$(): Observable<boolean> {
    return this.userService.getIsUserLogged$();
  }

  deleteOrder(orderId: string): void {
    this.ordersService.deleteOrder(orderId);
  }
}
