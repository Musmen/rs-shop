import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output,
} from '@angular/core';
import { IOrder } from '@core/models/order.model';
import { IGoods } from '@core/models/goods.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartListComponent {
  @Input() cartGoods?: IGoods[];
  @Input() order?: IOrder;
  @Output() deleteCartGoodsItemEvent = new EventEmitter<string>();
  @Output() decreaseAmountEvent = new EventEmitter<number>();
  @Output() increaseAmountEvent = new EventEmitter<number>();

  onDeleteButtonClick(cartGoodsItemId: string) {
    this.deleteCartGoodsItemEvent.emit(cartGoodsItemId);
  }

  onDecreaseAmountButtonClick(cartGoodsItemIndex: number) {
    this.decreaseAmountEvent.emit(cartGoodsItemIndex);
  }

  onIncreaseAmountButtonClick(cartGoodsItemIndex: number) {
    this.increaseAmountEvent.emit(cartGoodsItemIndex);
  }
}
