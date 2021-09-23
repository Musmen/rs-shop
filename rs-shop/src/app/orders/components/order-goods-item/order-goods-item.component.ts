import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation,
} from '@angular/core';
import { IGoods } from '@core/models/goods.model';

@Component({
  selector: 'app-order-goods-item',
  templateUrl: './order-goods-item.component.html',
  styleUrls: ['./order-goods-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class OrderGoodsItemComponent {
  @Input() cartGoodsItem?: IGoods;
  @Output() deleteCartGoodsItemEvent = new EventEmitter<string>();

  onDeleteButtonClick(cartGoodsItemId: string) {
    this.deleteCartGoodsItemEvent.emit(cartGoodsItemId);
  }
}
