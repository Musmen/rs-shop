import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation,
} from '@angular/core';
import { IGoods } from '@core/models/goods.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CartItemComponent {
  @Input() cartGoodsItem?: IGoods;
  @Output() deleteCartGoodsItemEvent = new EventEmitter<string>();

  onDeleteButtonClick(cartGoodsItemId: string) {
    this.deleteCartGoodsItemEvent.emit(cartGoodsItemId);
  }
}
