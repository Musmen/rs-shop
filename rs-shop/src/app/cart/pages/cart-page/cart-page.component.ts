import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { CartService } from '@core/services/goods/cart/cart.service';
import { UserService } from '@core/services/user/user.service';
import { OrderService } from '@core/services/order/order.service';

import { IGoods } from '@core/models/goods.model';
import { IOrder } from '@core/models/order.model';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPageComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  cartGoods?: IGoods[];

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private orderService: OrderService,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    const subscription = this.cartService.getCartGoods$()
      .subscribe(
        (cartGoods) => {
          this.cartGoods = cartGoods;
          this.orderService.initOrder(cartGoods);
          this.ref.detectChanges();
        },
      );

    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getOrder(): IOrder {
    return this.orderService.getOrder();
  }

  getOrderDescription(): string {
    return this.orderService.getOrderDescription();
  }

  onDeleteButtonClick(сartGoodsItemId: string): void {
    this.cartService.deleteCartGoodsItem(this.userService.getIsUserLogged(), сartGoodsItemId);
  }

  increaseGoodsItemAmount(goodsItemIndex: number): void {
    this.orderService.increaseAmount(goodsItemIndex);
  }

  decreaseGoodsItemAmount(goodsItemIndex: number): void {
    this.orderService.decreaseAmount(goodsItemIndex);
  }
}
