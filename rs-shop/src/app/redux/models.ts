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

export interface ICategoryWithSubCategories extends ICategory {
  subCategories: ICategory[],
}

export interface ICategory {
  id: string,
  name: string,
}

export interface IGood {
  id: string,
  name: string,
  imageUrls: string[],
  availableAmount: number,
  price: number,
  rating: number,
  description: string,
}