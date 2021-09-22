import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IGoodsState } from '../state.model';

export const selectGoods = createFeatureSelector<IGoodsState>('goods');

export const selectPopularGoods = createSelector(
  selectGoods,
  (state: IGoodsState) => state.popular,
);

export const selectPromoGoods = createSelector(
  selectGoods,
  (state: IGoodsState) => state.promo,
);
