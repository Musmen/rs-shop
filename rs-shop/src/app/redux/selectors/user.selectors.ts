import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IUsersState } from '../state.model';

export const selectState = createFeatureSelector<IUsersState>('user');

export const selectUser = createSelector(
  selectState,
  (state: IUsersState) => state.user,
);

export const selectIsUserLogged = createSelector(
  selectState,
  (state: IUsersState) => state.isUserLogged,
);
