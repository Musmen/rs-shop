import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IGoods } from '@core/models/goods.model';

@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoodsListComponent {
  @Input() goods$?: Observable<IGoods[]>;
}
