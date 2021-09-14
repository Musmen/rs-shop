import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation,
} from '@angular/core';
import { IGoods } from '@core/models/goods.model';

@Component({
  selector: 'app-goods-item-card',
  templateUrl: './goods-item-card.component.html',
  styleUrls: ['./goods-item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GoodsItemCardComponent {
  @Input() goodsItem?: IGoods;
  @Output() openDetailedPageEvent = new EventEmitter<IGoods>();

  onCartButtonClick(): void {
    if (!this.goodsItem) return;
    this.goodsItem.isInCart = !this.goodsItem.isInCart;
  }

  onFavoriteButtonClick(): void {
    if (!this.goodsItem) return;
    this.goodsItem.isFavorite = !this.goodsItem.isFavorite;
  }

  onOpenDetailedPageClick(goodsItem: IGoods): void {
    this.openDetailedPageEvent.emit(goodsItem);
  }
}
