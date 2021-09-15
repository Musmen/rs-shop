import { Router } from '@angular/router';
import {
  Component, ChangeDetectionStrategy, Input, ViewEncapsulation,
} from '@angular/core';
import { IGoods } from '@core/models/goods.model';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SlideComponent {
  @Input() content?: IGoods;

  constructor(private router: Router) { }

  goToGoodsItemDetailedPage(goodsItem: IGoods): void {
    this.router.navigate(['/', goodsItem.category || '.', goodsItem.subCategory || '', goodsItem.id]);
  }
}
