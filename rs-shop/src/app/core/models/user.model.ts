import { IOrder } from './order.model';

export interface IUser {
  firstName: string,
  lastName: string,
  cart: string[],
  favorites: string[],
  orders: IOrder[]
}

export interface ICredentials extends ILoginCredentials {
  firstName: string,
  lastName: string,
}

export interface ILoginCredentials {
  login: string,
  password: string,
  token?: string,
}

export interface IToken {
  token: string,
}
