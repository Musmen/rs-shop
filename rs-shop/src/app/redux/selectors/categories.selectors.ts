import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ICategory } from '@core/models/category.model';
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

export const selectSubcategoryById = (id: string) => createSelector(
  selectAllCategories,
  (categories: ICategory[]) => categories
    .find(
      (category) => category.subCategories && category.subCategories
        .find((subcategory) => subcategory.id === id),
    )?.subCategories?.find((subcategory) => subcategory.id === id)
     || null,
);
