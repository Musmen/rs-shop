import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation,
} from '@angular/core';

import { FavoritesService } from '@core/services/goods/favorites/favorites.service';
import { CartService } from '@core/services/goods/cart/cart.service';
import { UserService } from '@core/services/user/user.service';

import { IGoods } from '@core/models/goods.model';

@Component({
  selector: 'app-goods-item-card',
  templateUrl: './goods-item-card.component.html',
  styleUrls: ['./goods-item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GoodsItemCardComponent implements OnInit {
  @Input() goodsItem?: IGoods;
  @Output() openDetailedPageEvent = new EventEmitter<IGoods>();

  constructor(
    private favoritesService: FavoritesService,
    private cartService: CartService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    if (!this.goodsItem) return;

    this.goodsItem.isFavorite = this.favoritesService
      .checkIsGoodsItemInFavorites(this.goodsItem.id);
    this.goodsItem.isInCart = this.cartService
      .checkIsGoodsItemInCart(this.goodsItem.id);
  }

  onCartButtonClick(): void {
    if (!this.goodsItem) return;
    const isUserLogged = this.userService.getIsUserLogged();

    if (this.goodsItem.isInCart) {
      this.cartService.deleteCartGoodsItem(isUserLogged, this.goodsItem.id);
    } else {
      this.cartService.addCartGoodsItem(isUserLogged, this.goodsItem.id);
    }
    this.goodsItem.isInCart = !this.goodsItem.isInCart;
  }

  onFavoriteButtonClick(): void {
    if (!this.goodsItem) return;
    const isUserLogged = this.userService.getIsUserLogged();

    if (this.goodsItem.isFavorite) {
      this.favoritesService.deleteFavoriteGoodsItem(isUserLogged, this.goodsItem.id);
    } else {
      this.favoritesService.addFavoriteGoodsItem(isUserLogged, this.goodsItem.id);
    }
    this.goodsItem.isFavorite = !this.goodsItem.isFavorite;
  }

  onOpenDetailedPageClick(goodsItem: IGoods): void {
    this.openDetailedPageEvent.emit(goodsItem);
  }
}
