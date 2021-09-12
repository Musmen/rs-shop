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
