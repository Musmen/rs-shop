import {
  Component, ChangeDetectionStrategy, Input, ViewEncapsulation,
} from '@angular/core';
import { IGoods } from '@core/models/goods.model';

@Component({
  selector: 'app-goods-item-minimal-card',
  templateUrl: './goods-item-minimal-card.component.html',
  styleUrls: ['./goods-item-minimal-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GoodsItemMinimalCardComponent {
  @Input() goodsItem?: IGoods;
}
