import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IGoods } from '@core/models/goods.model';

import { IAppState } from '@redux/state.model';
import { Store } from '@ngrx/store';

import { GOODS } from '@app/mock-data/goods';
import { ICategory } from '@core/models/category.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
  private categories$?: ICategory[];
  promoGoods?: IGoods[] = [];
  popularGoods?: IGoods[] = [];

  constructor(private store: Store<IAppState>) {
    const allGoods = Object.values(GOODS)
      .map((subcategoryObj) => Object.values(subcategoryObj))
      .map((subcategories) => subcategories.map((goods) => goods[1]))
      .reduce(
        (
          currentSubCategoryPromoGoods,
          previousSubCategoryPromoGoods,
        ) => currentSubCategoryPromoGoods.concat(previousSubCategoryPromoGoods),
      );
    console.log('refactor');
    this.popularGoods = allGoods;
    this.promoGoods = allGoods.filter((item, index) => index % 2 === 0).slice(-10);

    // Object.values(goods).map(subcategoryObj => Object.values(subcategoryObj))
    // .flat(2) так забираем все товары

    // for (let category in GOODS) {
    //   for (let subcategory in GOODS.category) {
    //     this.promoGoods?.push(GOODS.category.subcategory[0]);
    //   }
    // }
  }
}
