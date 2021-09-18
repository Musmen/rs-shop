import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation,
} from '@angular/core';
import { CartService } from '@app/core/services/goods/cart/cart.service';
import { IGoods } from '@core/models/goods.model';

@Component({
  selector: 'app-favorites-item',
  templateUrl: './favorites-item.component.html',
  styleUrls: ['./favorites-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FavoritesItemComponent implements OnInit {
  @Input() favoriteGoodsItem?: IGoods;
  @Output() deleteFavoriteGoodsItemEvent = new EventEmitter<string>();
  @Output() cartButtonClickEvent = new EventEmitter<IGoods>();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    if (!this.favoriteGoodsItem) return;

    this.favoriteGoodsItem.isInCart = this.cartService
      .checkIsGoodsItemInCart(this.favoriteGoodsItem.id);
  }

  onFavoriteButtonClick(favoriteGoodsItemId: string): void {
    this.deleteFavoriteGoodsItemEvent.emit(favoriteGoodsItemId);
  }

  onCartButtonClick(favoriteGoodsItem?: IGoods): void {
    if (!this.favoriteGoodsItem) return;

    this.cartButtonClickEvent.emit(favoriteGoodsItem);
    this.favoriteGoodsItem.isInCart = !this.favoriteGoodsItem.isInCart;
  }
}
