import { Pipe, PipeTransform } from '@angular/core';

import { compare, getPriceToCompare, getRatingToCompare } from '@catalog/common/helper';

import SortState from '@core/models/sort-state.model';
import { IGoods } from '@app/core/models/goods.model';

import { SortingValues } from '@common/constants';

@Pipe({ name: 'sort' })
export class SortPipe implements PipeTransform {
  transform(goodsList: IGoods[] | null, sortState?: SortState): IGoods[] | null {
    if (!sortState) return goodsList;

    const getCompareValue = (sortState.sortingBy === SortingValues.price)
      ? getPriceToCompare
      : getRatingToCompare;

    return [...(goodsList || [])].sort(
      (firstCompareItem: IGoods, secondCompareItem: IGoods) => compare(
        getCompareValue(firstCompareItem),
        getCompareValue(secondCompareItem),
        sortState.ascending,
      ),
    );
  }
}
