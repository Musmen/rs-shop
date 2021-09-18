import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { IGoods } from '@core/models/goods.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartListComponent {
  @Input() cartGoods$?: Observable<IGoods[]>;
  @Output() deleteCartGoodsItemEvent = new EventEmitter<string>();

  onDeleteButtonClick(cartGoodsItemId: string) {
    this.deleteCartGoodsItemEvent.emit(cartGoodsItemId);
  }
}
