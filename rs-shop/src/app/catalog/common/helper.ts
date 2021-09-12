import { IGoods } from '@core/models/goods.model';

type CompareFunctionType = (
  firstCompareItem: number,
  secondCompareItem: number,
  ascending: number,
) => number;

export const compare: CompareFunctionType = (
  firstCompareItem: number,
  secondCompareItem: number,
  ascending: number,
) => (firstCompareItem - secondCompareItem) * ascending;

type GetValueType = (item: IGoods) => number;

export const getPriceToCompare: GetValueType = (
  goodsItem: IGoods,
) => Number(goodsItem.price);

export const getRatingToCompare: GetValueType = (
  goodsItem: IGoods,
) => Number(goodsItem.rating);
