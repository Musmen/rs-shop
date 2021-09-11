import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-goods-card',
  templateUrl: './goods-card.component.html',
  styleUrls: ['./goods-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoodsCardComponent { }
