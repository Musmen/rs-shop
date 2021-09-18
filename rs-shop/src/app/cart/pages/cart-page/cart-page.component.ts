import {
  ChangeDetectionStrategy, Component, OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';

import { CartService } from '@core/services/goods/cart/cart.service';
import { UserService } from '@core/services/user/user.service';

import { IGoods } from '@core/models/goods.model';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPageComponent implements OnInit {
  cartGoods$?: Observable<IGoods[]>;

  constructor(
    private cartService: CartService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.cartGoods$ = this.cartService.getCartGoods$();
  }

  onDeleteButtonClick(goodsItemId: string): void {
    this.cartService.deleteCartGoodsItem(this.userService.getIsUserLogged(), goodsItemId);
  }
}
