import { Injectable } from '@angular/core';

import { IGoods } from '@core/models/goods.model';
import { IOrder, IOrderDetails, IOrderGoodsItem } from '@core/models/order.model';
import { DEFAULT_ORDER } from '@common/constants';

import { MainDbService } from '../main-db/main-db.service';

@Injectable({ providedIn: 'root' })
export class OrderService {
  cartGoods!: IGoods[];
  order: IOrder = DEFAULT_ORDER;

  totalAmount: number = 0;
  totalCost: number = 0;

  constructor(private mainDBService: MainDbService) { }

  private updateOrderData(): void {
    this.totalAmount = 0;
    this.totalCost = 0;

    this.order.items.forEach((orderItem: IOrderGoodsItem, goodsItemIndex: number) => {
      this.totalAmount += orderItem.amount;
      this.totalCost += orderItem.amount * this.cartGoods[goodsItemIndex].price;
    });
  }

  initOrder(cartGoods: IGoods[]): void {
    this.cartGoods = cartGoods;

    let orderIdsList = this.order.items.map((goodsItem) => goodsItem.id);
    if (!this.order.items.length) {
      this.order.items = cartGoods.map(
        (cartGoodsItem) => ({
          id: cartGoodsItem.id,
          amount: (cartGoodsItem.availableAmount && 1) || 0,
        }),
      );
    } else {
      this.cartGoods.forEach(
        (cartGoodsItem) => {
          if (!orderIdsList.includes(cartGoodsItem.id)) {
            this.order.items.push({
              id: cartGoodsItem.id,
              amount: (cartGoodsItem.availableAmount && 1) || 0,
            });
          } else {
            orderIdsList = orderIdsList.filter(
              (item) => item !== cartGoodsItem.id,
            );
          }
        },
      );

      if (orderIdsList.length) {
        orderIdsList.forEach(
          (itemIdToDelete) => {
            this.order.items = this.order.items.filter(
              (item) => item.id !== itemIdToDelete,
            );
          },
        );
      }
    }
    this.updateOrderData();
  }

  getOrder(): IOrder {
    return this.order;
  }

  getOrderDescription(): string {
    return `В заказе ${this.getTotalProducts()} товарных позиций (штук всего: ${this.totalAmount}) общей стоимостью ${this.totalCost.toFixed(2)} бел. рублей`;
  }

  getTotalProducts(): number {
    return this.order.items.length;
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
      this.order.items[goodsItemIndex].amount < this.cartGoods[goodsItemIndex].availableAmount!
    )
      ? this.order.items[goodsItemIndex].amount + 1
      : this.order.items[goodsItemIndex].amount;

    this.updateOrderData();
  }

  addOrder(orderDetails: IOrderDetails): void {
    this.mainDBService.addOrder({
      ...this.order,
      details: orderDetails,
    });
  }
}
