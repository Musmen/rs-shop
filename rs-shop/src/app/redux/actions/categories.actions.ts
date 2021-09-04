import { createAction, props } from '@ngrx/store';
import { ICategoryWithSubCategories } from '../models';

export const updateCategoriesSuccessfully = createAction(
  '[INIT APP] UPDATE CATEGORIES SUCCESSFULLY',
  props<{ categories: ICategoryWithSubCategories[] }>(),
);     