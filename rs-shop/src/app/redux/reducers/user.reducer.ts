import { createReducer, on } from '@ngrx/store';
import {
  setFavoriteGoodsIdsInNotloggedUser, setFavoriteGoodsIdsInLoggedUser, setNewUser,
  setUserLoginStatus,
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

  on(setFavoriteGoodsIdsInLoggedUser,
    (state, { favoritesGoodsItemsIds }) => ({
      ...state,
      user: { ...state.user, favorites: favoritesGoodsItemsIds },
    })),

  on(setFavoriteGoodsIdsInNotloggedUser,
    (state, { favoritesGoodsItemsIds }) => ({
      ...state,
      favorites: favoritesGoodsItemsIds,
    })),
);
