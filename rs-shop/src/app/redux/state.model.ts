import { IUser } from '@core/models/user.model';
import { ICategory } from '@core/models/category.model';

import ISortState from '@core/models/sort-state.model';
import { DEFAULT_USER, initialSortState } from '@common/constants';
import { POPULAR_GOODS_IDS, PROMO_GOODS_IDS } from './common/constants';

export interface IAppState {
  user: IUsersState,
  categories: ICategoriesState,
  goods: IGoodsState,
  state: IState,
}

export interface IUsersState {
  user: IUser,
  isUserLogged: boolean,
}

export interface ICategoriesState {
  categories: ICategory[],
}

export interface IGoodsState {
  promo: string[],
  popular: string[],
}

export interface IState {
  location: string,
  sort: ISortState,
}

export const initialUserState: IUsersState = {
  user: DEFAULT_USER,
  isUserLogged: false,
};

export const initialCategoriesState: ICategoriesState = {
  categories: [],
};

export const initialGoodsState: IGoodsState = {
  promo: PROMO_GOODS_IDS,
  popular: POPULAR_GOODS_IDS,
};

export const initialState: IState = {
  location: '',
  sort: initialSortState,
};

export const initialAppState: IAppState = {
  user: initialUserState,
  categories: initialCategoriesState,
  goods: initialGoodsState,
  state: initialState,
};
