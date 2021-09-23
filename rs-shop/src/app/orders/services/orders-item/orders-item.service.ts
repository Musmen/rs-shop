import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';

import { MainDbService } from '@core/services/main-db/main-db.service';

import { IGoods } from '@core/models/goods.model';
import { IOrder, IOrderGoodsItem } from '@core/models/order.model';

@Injectable()
export class OrdersItemService {
  orderDescription$ = new BehaviorSubject<string>('');
  cartGoods$!: Observable<IGoods[]>;
  cartGoods!: IGoods[];
  order!: IOrder;
  maxGoodsAmounts: number[] = [];

  totalAmount: number = 0;
  totalCost: number = 0;

  constructor(private mainDBService: MainDbService) { }

  init(order: IOrder): void {
    this.order = order;

    this.cartGoods$ = forkJoin(
      order.items.map(
        (orderGoodsItem) => this.mainDBService.getGoodsItem$(orderGoodsItem.id),
      ),
    );
  }

  updateOrderData(): void {
    this.totalAmount = 0;
    this.totalCost = 0;

    this.order.items.forEach((orderItem: IOrderGoodsItem, goodsItemIndex: number) => {
      this.totalAmount += orderItem.amount;
      this.totalCost += orderItem.amount * this.cartGoods[goodsItemIndex].price;
    });

    this.orderDescription$.next(
      `В заказе ${this.getTotalProducts()} товарных позиций (штук всего: ${this.totalAmount}) общей стоимостью ${this.totalCost.toFixed(2)} бел. рублей`,
    );
  }

  getCartGoods$(): Observable<IGoods[]> {
    return this.cartGoods$;
  }

  setCartGoods(cartGoods: IGoods[]): void {
    this.cartGoods = cartGoods;
  }

  setMaxGoodsAmounts(cartGoods: IGoods[]): void {
    this.maxGoodsAmounts = cartGoods.map(
      (cartGoodsItem, cartGoodsIndex) => cartGoodsItem.availableAmount!
        + this.order.items[cartGoodsIndex].amount,
    );
  }

  deleteMaxGoodsAmountsItem(itemIndex: number): void {
    this.maxGoodsAmounts = this.maxGoodsAmounts.filter(
      (maxGoodsAmountsItem, maxGoodsAmountsIndex) => maxGoodsAmountsIndex !== itemIndex,
    );
  }

  getTotalProducts(): number {
    return this.order.items.length;
  }

  getOrderDescription$(): Observable<string> {
    return this.orderDescription$.asObservable();
  }

  decreaseAmount(goodsItemIndex: number): void {
    this.order.items[goodsItemIndex].amount = (
      this.order.items[goodsItemIndex].amount > 1
    )
      ? this.order.items[goodsItemIndex].amount - 1
      : this.order.items[goodsItemIndex].amount;

    this.updateOrderData();
  }

  increaseAmount(goodsItemIndex: number): void {
    this.order.items[goodsItemIndex].amount = (
      this.order.items[goodsItemIndex].amount < this.maxGoodsAmounts[goodsItemIndex]
    )
      ? this.order.items[goodsItemIndex].amount + 1
      : this.order.items[goodsItemIndex].amount;

    this.updateOrderData();
  }
}
