import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IGood } from '@app/core/models/good.model';

import { IAppState } from '@app/redux/state.model';
import { Store } from '@ngrx/store';

import { GOODS } from '@app/mock-data/goods';
import { ICategory } from '@app/core/models/category.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
  private categories$?: ICategory[];
  promoGoods?: IGood[] = [];

  constructor(private store: Store<IAppState>) {
    this.promoGoods = Object.values(GOODS)
      .map((subcategoryObj) => Object.values(subcategoryObj))
      .map((subcategories) => subcategories.map((goods) => goods[0]))
      .reduce(
        (
          currentSubCategoryPromoGoods,
          previousSubCategoryPromoGoods,
        ) => currentSubCategoryPromoGoods.concat(previousSubCategoryPromoGoods),
      )
      .filter((item, index) => index % 3 === 0)
      .slice(-10);

    // Object.values(goods).map(subcategoryObj => Object.values(subcategoryObj))
    // .flat(2) так забираем все товары

    // for (let category in GOODS) {
    //   for (let subcategory in GOODS.category) {
    //     this.promoGoods?.push(GOODS.category.subcategory[0]);
    //   }
    // }
  }
}
