import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit,
  TemplateRef, ViewChild, ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdersItemService } from '@orders/services/orders-item/orders-item.service';
import { OrdersService } from '@orders/services/orders/orders.service';

import { getDefaultDeliverData } from '@common/helpers';
import { IGoods } from '@core/models/goods.model';
import { IOrder, IOrderDetails } from '@core/models/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [OrdersItemService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class OrderComponent implements OnInit, OnDestroy {
  @ViewChild('modal') modal?: TemplateRef<NgbModal>;
  @Input() order!: IOrder;

  private subscriptions = new Subscription();

  deliverDataDescription$: BehaviorSubject<string>;
  orderDescription: string = '';

  cartGoods!: IGoods[];

  constructor(
    private ordersService: OrdersService,
    private ordersItemService: OrdersItemService,
    private modelService: NgbModal,
    private ref: ChangeDetectorRef,
  ) {
    this.deliverDataDescription$ = new BehaviorSubject<string>(`не ранее ${getDefaultDeliverData()}`);
  }

  ngOnInit(): void {
    this.ordersItemService.init(this.order!);

    const cartGoodsSubscription = this.ordersItemService.getCartGoods$()
      .subscribe(
        (cartGoods) => {
          this.cartGoods = cartGoods;
          this.ordersItemService.setCartGoods(cartGoods);
          this.ordersItemService.setMaxGoodsAmounts(cartGoods);
          this.ordersItemService.updateOrderData();
          this.ref.detectChanges();
        },
      );
    this.subscriptions.add(cartGoodsSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getOrderDescription$(): Observable<string> {
    return this.ordersItemService.getOrderDescription$();
  }

  onDeleteButtonClick(goodsItemIndex: number): void {
    this.cartGoods = this.cartGoods?.filter(
      (cartGoodsItem, cartGoodsIndex) => cartGoodsIndex !== goodsItemIndex,
    );

    if (!this.cartGoods.length) this.ordersService.deleteOrder(this.order.id!);

    this.ordersItemService.setCartGoods(this.cartGoods);
    this.ordersItemService.deleteMaxGoodsAmountsItem(goodsItemIndex);

    this.order.items = this.order.items.filter(
      (orderGoodsItem, orderGoodsIndex) => orderGoodsIndex !== goodsItemIndex,
    );
    this.ordersItemService.updateOrderData();
  }

  increaseGoodsItemAmount(goodsItemIndex: number): void {
    this.ordersItemService.increaseAmount(goodsItemIndex);
  }

  decreaseGoodsItemAmount(goodsItemIndex: number): void {
    this.ordersItemService.decreaseAmount(goodsItemIndex);
  }

  cartFormSubmit(orderDetails: IOrderDetails): void {
    this.ordersService.changeOrder({ ...this.order, details: orderDetails });
    this.modelService.open(
      this.modal,
      {
        centered: true,
        backdropClass: 'brand-backdrop',
        windowClass: 'gray-modal',
        size: 'lg',
      },
    );
  }

  changeDeliverData(deliverDataDescription: string): void {
    this.deliverDataDescription$.next(deliverDataDescription);
  }

  getDeliverDataDescription$(): Observable<string> {
    return this.deliverDataDescription$.asObservable();
  }

  closeModal(): void {
    this.modelService.dismissAll();
  }
}
