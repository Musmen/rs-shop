import { IGoods } from './goods.model';

export interface IUser {
  firstName: string,
  lastName: string,
  token: string,
  login: string,
  password: string,
  cart: IGoods[],
  favorites: IGoods[],
  orders: IGoods[]
}
