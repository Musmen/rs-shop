import ISortState from '../models/sort-state.model';
import { ICredentials, IUser } from '../models/user.model';

export const CITIES = ['Минск', 'Могилев', 'Гомель', 'Витебск', 'Гродно', 'Брест'];

export enum SortingValues {
  price = 'price',
  rating = 'rating',
  availableAmount = 'availableAmount',
}

export const initialSortState: ISortState = {
  ascending: 1,
  sortingBy: SortingValues.price,
};

export const LOCATION_API_URL: string = 'http://ip-api.com/json?lang=ru';

const BASE_MAIN_DB_API_URL = 'http://localhost:3004/';

export const MAIN_DB_API_URL = {
  CATEGORIES: `${BASE_MAIN_DB_API_URL}categories`,
  SEARCH_GOODS: `${BASE_MAIN_DB_API_URL}goods/search?text=`,
  REGISTER: `${BASE_MAIN_DB_API_URL}users/register`,
  LOGIN: `${BASE_MAIN_DB_API_URL}users/login`,
  USER_INFO: `${BASE_MAIN_DB_API_URL}users/userInfo`,
};

export const DEBOUNCE_TIME_IN_MS: number = 700;

export const MIN_SEARCH_VALUE_LENGTH: number = 3;

export const DEFAULT_USER: IUser = {
  firstName: '',
  lastName: '',
  cart: [],
  favorites: [],
  orders: [],
};

export const DEFAULT_CREDENTIALS: ICredentials = {
  firstName: '',
  lastName: '',
  login: '',
  password: '',
  token: '',
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken-rs-shop',
  USER: 'user-rs-shop',
};
