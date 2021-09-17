import { IUser } from '@core/models/user.model';
import { ICategory } from '@core/models/category.model';
import { IGoods } from '@core/models/goods.model';

import ISortState from '@core/models/sort-state.model';
import { DEFAULT_USER, initialSortState } from '@common/constants';

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
  goods: IGoods[],
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
  goods: [],
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
