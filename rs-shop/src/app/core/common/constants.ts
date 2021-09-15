import ISortState from '../models/sort-state.model';

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

const BASE_MAIN_DB_API_URL = 'http://localhost:3004/';

export const MAIN_DB_API_URL = {
  SEARCH_GOODS: `${BASE_MAIN_DB_API_URL}goods/search?text=`,
};

export const DEBOUNCE_TIME_IN_MS: number = 700;

export const MIN_SEARCH_VALUE_LENGTH: number = 3;
