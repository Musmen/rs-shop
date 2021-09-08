import { createReducer, on } from '@ngrx/store';
import { updateCategoriesSuccessfully } from '../actions/categories.actions';
import { initialCategoriesState } from '../state.model';

export const categoriesReducer = createReducer(
  initialCategoriesState,
  on(updateCategoriesSuccessfully,
    (state, { categories }) => ({
      ...state,
      categories: [...categories],
    })),
);
