import { IOrder } from '../models/order.model';
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

const LOCATION_API_KEY: string = '5a65799648ff433f9696f1a5b4fcf670';
export const LOCATION_API_URL: string = `https://api.ipgeolocation.io/ipgeo?apiKey=${LOCATION_API_KEY}`;

const TRANSLATE_API_KEY: string = 'a84e7714346540f4bc27dafd56e6e281';
export const TRANSLATE_API_URL: string = `https://api.opencagedata.com/geocode/v1/json?key=${TRANSLATE_API_KEY}&language=ru&pretty=1&q=`;

const BASE_MAIN_DB_API_URL = 'http://localhost:3004/';

export const MAIN_DB_API_URL = {
  CATEGORIES: `${BASE_MAIN_DB_API_URL}categories`,
  SEARCH_GOODS: `${BASE_MAIN_DB_API_URL}goods/search?text=`,
  GOODS_ITEM: `${BASE_MAIN_DB_API_URL}goods/item/`,
  REGISTER: `${BASE_MAIN_DB_API_URL}users/register`,
  LOGIN: `${BASE_MAIN_DB_API_URL}users/login`,
  USER_INFO: `${BASE_MAIN_DB_API_URL}users/userInfo`,
  FAVORITES: `${BASE_MAIN_DB_API_URL}users/favorites`,
  FAVORITES_DELETE: `${BASE_MAIN_DB_API_URL}users/favorites?id=`,
  CART: `${BASE_MAIN_DB_API_URL}users/cart`,
  CART_DELETE: `${BASE_MAIN_DB_API_URL}users/cart?id=`,
  ORDER: `${BASE_MAIN_DB_API_URL}users/order`,
  ORDER_DELETE: `${BASE_MAIN_DB_API_URL}users/order?id=`,
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
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken-rs-shop',
  USER: 'user-rs-shop',
};

export const DEFAULT_USER_FULL_NAME = 'Неизвестный посетитель';

export const DEFAULT_ORDER: IOrder = {
  items: [],
  details: {
    name: '',
    address: '',
    phone: '',
    dateToDeliver: '',
    timeToDeliver: '',
    comment: '',
  },
};
