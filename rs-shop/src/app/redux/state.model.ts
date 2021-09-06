import { ICategoryWithSubCategories, IGood, IUser } from './models';

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
  categories: ICategoryWithSubCategories[],
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