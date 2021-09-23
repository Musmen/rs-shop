import { createSelector, createFeatureSelector } from '@ngrx/store';

import { DEFAULT_USER_FULL_NAME } from '@common/constants';
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

export const selectUserFullName = createSelector(
  selectState,
  (state: IUsersState) => `${state.user.lastName ? `${state.user.lastName} ` : ''}${state.user.firstName}`
    || DEFAULT_USER_FULL_NAME,
);

export const selectFavoritesGoodsIds = createSelector(
  selectState,
  (state: IUsersState) => state.user.favorites,
);

export const selectCartGoodsIds = createSelector(
  selectState,
  (state: IUsersState) => state.user.cart,
);

export const selectOrders = createSelector(
  selectState,
  (state: IUsersState) => state.user.orders,
);
