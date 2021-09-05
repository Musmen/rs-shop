import { createAction, props } from '@ngrx/store';
import { ICategoryWithSubCategories } from '../models';

export const updateCategories = createAction(
  '[INIT APP] UPDATE CATEGORIES',
);

export const updateCategoriesSuccessfully = createAction(
  '[INIT APP] UPDATE CATEGORIES SUCCESSFULLY',
  props<{ categories: ICategoryWithSubCategories[] }>(),
);     