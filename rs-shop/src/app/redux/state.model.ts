import { IUser } from '@core/models/user.model';
import { ICategory } from '@core/models/category.model';
import { IGood } from '@core/models/good.model';

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
  goods: IGood[],
}

export interface IState {
  location: string,
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
};

export const initialAppState: IAppState = {
  users: initialUsersState,
  categories: initialCategoriesState,
  goods: initialGoodsState,
  state: initialState,
};