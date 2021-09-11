import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IGoods } from '@core/models/goods.model';

@Component({
  selector: 'app-goods-item-card',
  templateUrl: './goods-item-card.component.html',
  styleUrls: ['./goods-item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoodsItemCardComponent {
  @Input() goodsItem?: IGoods;
}
