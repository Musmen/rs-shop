import { SortingValues } from '@common/constants';
import { IGoods } from '@core/models/goods.model';

type CompareFunctionType = (
  firstCompareItem: number, secondCompareItem: number, ascending: number,
) => number;

export const compare: CompareFunctionType = (
  firstCompareItem: number, secondCompareItem: number, ascending: number,
) => (firstCompareItem - secondCompareItem) * ascending;

type GetCompareValue = (goodsItem: IGoods, sortingBy: string) => number;

export const getCompareValue: GetCompareValue = (
  goodsItem: IGoods, sortingBy: string,
) => {
  switch (sortingBy) {
    case SortingValues.rating: {
      return Number(goodsItem.rating);
    }
    case SortingValues.availableAmount: {
      return Number(goodsItem.availableAmount);
    }
    default: {
      return Number(goodsItem.price);
    }
  }
};
