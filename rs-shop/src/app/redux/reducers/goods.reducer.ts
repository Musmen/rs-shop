import { createReducer } from '@ngrx/store';
import { initialGoodsState } from '../state.model';

export const goodsReducer = createReducer(
  initialGoodsState,
);
