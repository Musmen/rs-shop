import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation,
} from '@angular/core';
import { IGoods } from '@core/models/goods.model';

@Component({
  selector: 'app-favorites-item',
  templateUrl: './favorites-item.component.html',
  styleUrls: ['./favorites-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FavoritesItemComponent {
  @Input() favoriteGoodsItem?: IGoods;
  @Output() deleteFavoriteGoodsItemEvent = new EventEmitter<string>();

  onFavoriteButtonClick(favoriteGoodsItemId: string) {
    this.deleteFavoriteGoodsItemEvent.emit(favoriteGoodsItemId);
  }
}
