import { createAction, props } from '@ngrx/store';
import { ICategory } from '@core/models/category.model';

export const updateCategories = createAction(
  '[INIT APP] UPDATE CATEGORIES',
);

export const updateCategoriesSuccessfully = createAction(
  '[MAIN API FETCH] UPDATE CATEGORIES SUCCESSFULLY',
  props<{ categories: ICategory[] }>(),
);   

export const updateCategoriesFailed = createAction(
  '[MAIN API FETCH] UPDATE CATEGORIES FAILED',
);  
