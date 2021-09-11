import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoodsListComponent { }
