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

export const setFavoriteGoodsIdsInLoggedUser = createAction(
  '[USER SERVICE] SET FAVORITE GOODS IDS IN LOGGED USER',
  props<{ favoritesGoodsItemsIds: string[] }>(),
);

export const setFavoriteGoodsIdsInNotloggedUser = createAction(
  '[USER SERVICE] SET FAVORITE GOODS IDS IN NOT LOGGED USER',
  props<{ favoritesGoodsItemsIds: string[] }>(),
);
