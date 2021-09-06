import { IGood } from './good.model';

export interface IUser {
  firstName: string,
  lastName: string,
  token: string,
  login: string,
  password: string,
  cart: IGood[],
  favorites: IGood[],
  orders: IGood[]
}
