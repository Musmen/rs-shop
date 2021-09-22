import { Pipe, PipeTransform } from '@angular/core';

import { compare, getCompareValue } from '@catalog/common/helper';
import SortState from '@core/models/sort-state.model';
import { IGoods } from '@core/models/goods.model';

@Pipe({ name: 'sort' })
export class SortPipe implements PipeTransform {
  transform(goodsList: IGoods[] | null, sortState?: SortState): IGoods[] | null {
    if (!sortState) return goodsList;

    return [...(goodsList || [])].sort(
      (firstCompareItem: IGoods, secondCompareItem: IGoods) => compare(
        getCompareValue(firstCompareItem, sortState.sortingBy),
        getCompareValue(secondCompareItem, sortState.sortingBy),
        sortState.ascending,
      ),
    );
  }
}
