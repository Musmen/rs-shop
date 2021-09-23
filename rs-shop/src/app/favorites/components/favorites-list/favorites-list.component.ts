import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { IGoods } from '@core/models/goods.model';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesListComponent {
  @Input() favoritesGoods$?: Observable<IGoods[]>;
  @Output() deleteFavoriteGoodsItemEvent = new EventEmitter<string>();
  @Output() cartButtonClickEvent = new EventEmitter<IGoods>();

  onFavoriteButtonClick(favoriteGoodsItemId: string) {
    this.deleteFavoriteGoodsItemEvent.emit(favoriteGoodsItemId);
  }

  onCartButtonClick(favoriteGoodsItem: IGoods): void {
    this.cartButtonClickEvent.emit(favoriteGoodsItem);
  }
}
