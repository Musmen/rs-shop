import { IUser } from '@core/models/user.model';
import { ICategory } from '@core/models/category.model';
import { IGoods } from '@core/models/goods.model';

import ISortState from '@core/models/sort-state.model';
import { initialSortState } from '@common/constants';

export interface IAppState {
  users: IUsersState,
  categories: ICategoriesState,
  goods: IGoodsState,
  state: IState,
}

export interface IUsersState {
  users: IUser[],
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

export const initialUsersState: IUsersState = {
  users: [],
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
  users: initialUsersState,
  categories: initialCategoriesState,
  goods: initialGoodsState,
  state: initialState,
};
