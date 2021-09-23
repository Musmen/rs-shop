import { IUser } from '@app/core/models/user.model';
import { createAction, props } from '@ngrx/store';

export const checkLoginStatus = createAction(
  '[INIT HEADER] CHECK LOGIN STATUS',
);

export const setNewUser = createAction(
  '[MAIN API FETCH] SET NEW USER',
  props<{ user: IUser }>(),
);

export const setUserLoginStatus = createAction(
  '[MAIN API FETCH] SET USER LOGIN STATUS',
  props<{ isLogged: boolean }>(),
);

export const setFavoriteGoodsIds = createAction(
  '[USER SERVICE] SET FAVORITE GOODS IDS',
  props<{ favoritesGoodsItemsIds: string[] }>(),
);

export const setCartGoodsIds = createAction(
  '[USER SERVICE] SET CART GOODS IDS',
  props<{ cartGoodsItemsIds: string[] }>(),
);
