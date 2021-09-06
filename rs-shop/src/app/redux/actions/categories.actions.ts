import { createAction, props } from '@ngrx/store';
import { ICategoryWithSubCategories } from '../models';

export const updateCategories = createAction(
  '[INIT APP] UPDATE CATEGORIES',
);

export const updateCategoriesSuccessfully = createAction(
  '[MAIN API FETCH] UPDATE CATEGORIES SUCCESSFULLY',
  props<{ categories: ICategoryWithSubCategories[] }>(),
);   

export const updateCategoriesFailed = createAction(
  '[MAIN API FETCH] UPDATE CATEGORIES FAILED',
);  
