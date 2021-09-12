import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IState } from '../state.model';

export const selectState = createFeatureSelector<IState>('state');

export const selectLocation = createSelector(
  selectState,
  (state: IState) => state.location,
);

export const selectSortState = createSelector(
  selectState,
  (state: IState) => state.sort,
);
