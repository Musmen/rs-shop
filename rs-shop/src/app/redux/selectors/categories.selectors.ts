import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ICategoriesState } from '../state.model';

export const selectCategories = createFeatureSelector<ICategoriesState>('categories');

export const selectAllCategories = createSelector(
  selectCategories,
  (state: ICategoriesState) => state.categories,
);

export const selectCategoryById = (id: string) => createSelector(
  selectCategories,
  (state: ICategoriesState) => state.categories.find((category) => id === category.id) || null,
);
