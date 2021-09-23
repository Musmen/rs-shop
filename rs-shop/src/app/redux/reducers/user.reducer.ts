import { createReducer, on } from '@ngrx/store';
import {
  setCartGoodsIds,
  setFavoriteGoodsIds, setNewUser, setUserLoginStatus,
} from '../actions/user.actions';
import { initialUserState } from '../state.model';

export const userReducer = createReducer(
  initialUserState,

  on(setNewUser,
    (state, { user }) => ({
      ...state, user,
    })),

  on(setUserLoginStatus,
    (state, { isLogged }) => ({
      ...state,
      isUserLogged: isLogged,
    })),

  on(setFavoriteGoodsIds,
    (state, { favoritesGoodsItemsIds }) => ({
      ...state,
      user: { ...state.user, favorites: favoritesGoodsItemsIds },
    })),

  on(setCartGoodsIds,
    (state, { cartGoodsItemsIds }) => ({
      ...state,
      user: { ...state.user, cart: cartGoodsItemsIds },
    })),
);
