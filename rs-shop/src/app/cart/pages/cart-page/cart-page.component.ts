import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit,
  TemplateRef, ViewChild, ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { IAppState } from '@redux/state.model';
import { selectLocation } from '@redux/selectors/state.selectors';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '@core/services/goods/cart/cart.service';
import { UserService } from '@core/services/user/user.service';
import { OrderService } from '@core/services/order/order.service';

import { getDefaultDeliverData } from '@common/helpers';
import { IGoods } from '@core/models/goods.model';
import { IOrder, IOrderDetails } from '@core/models/order.model';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CartPageComponent implements OnInit, OnDestroy {
  @ViewChild('modal') modal?: TemplateRef<NgbModal>;

  private subscriptions = new Subscription();

  defaultCity$?: Observable<string>;
  deliverDataDescription$: BehaviorSubject<string>;

  cartGoods?: IGoods[];

  constructor(
    private store: Store<IAppState>,
    private cartService: CartService,
    private userService: UserService,
    private orderService: OrderService,
    private modelService: NgbModal,
    private ref: ChangeDetectorRef,
    private router: Router,
  ) {
    this.deliverDataDescription$ = new BehaviorSubject<string>(`не ранее ${getDefaultDeliverData()}`);
    this.defaultCity$ = this.store.select(selectLocation);
  }

  ngOnInit(): void {
    const cartGoodsSubscription = this.cartService.getCartGoods$()
      .subscribe(
        (cartGoods) => {
          this.cartGoods = cartGoods;
          this.orderService.initOrder(cartGoods);
          this.ref.detectChanges();
        },
      );

    this.subscriptions.add(cartGoodsSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getIsUserLogged$(): Observable<boolean> {
    return this.userService.getIsUserLogged$();
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

  cartFormSubmit(orderDetails: IOrderDetails): void {
    this.orderService.addOrder(orderDetails);
    this.modelService.open(
      this.modal,
      {
        centered: true,
        backdropClass: 'brand-backdrop',
        windowClass: 'gray-modal',
        size: 'lg',
      },
    );
    this.router.navigate(['main']);
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
