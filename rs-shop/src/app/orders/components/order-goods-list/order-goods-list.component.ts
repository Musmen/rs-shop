import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output,
} from '@angular/core';
import { Observable } from 'rxjs';

import { IOrder } from '@core/models/order.model';
import { IGoods } from '@core/models/goods.model';

@Component({
  selector: 'app-order-goods-list',
  templateUrl: './order-goods-list.component.html',
  styleUrls: ['./order-goods-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderGoodsListComponent {
  @Input() cartGoods!: IGoods[];
  @Input() order?: IOrder;
  @Input() deliverDataDescription$?: Observable<string>;

  @Output() deleteCartGoodsItemEvent = new EventEmitter<number>();
  @Output() decreaseAmountEvent = new EventEmitter<number>();
  @Output() increaseAmountEvent = new EventEmitter<number>();

  onDeleteButtonClick(cartGoodsItemId: string) {
    const currentItemIndex = this.cartGoods.findIndex(
      (goodsItem) => goodsItem.id === cartGoodsItemId,
    );

    this.deleteCartGoodsItemEvent.emit(currentItemIndex);
  }

  onDecreaseAmountButtonClick(cartGoodsItemIndex: number) {
    this.decreaseAmountEvent.emit(cartGoodsItemIndex);
  }

  onIncreaseAmountButtonClick(cartGoodsItemIndex: number) {
    this.increaseAmountEvent.emit(cartGoodsItemIndex);
  }
}
