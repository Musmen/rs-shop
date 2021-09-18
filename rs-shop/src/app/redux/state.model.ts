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
  cart: string[],
  favorites: string[],
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
  cart: [],
  // favorites: ['612e05c56742548b362d68d6', 'CSMV5335MC0S', '612d405989b79567be73e3f0', '612d43650149cb2bb33cc369', '612e05c56742548b362d68d6', '612e05c56742548b362d68d6', '61332374196654275c25311d', '612e05c56742548b362d68d6', '6131427698b2fd5519c8dd46', '613327be55fd9c1b80d64571', '612e05c56742548b362d68d6', '61346ec11e6b89690e604978', '613327be55fd9c1b80d64571', '61346ec1af9f599759ac33d9', '613327be55fd9c1b80d64571'],
  favorites: [],
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
