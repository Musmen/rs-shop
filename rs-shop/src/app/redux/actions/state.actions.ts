import { createAction, props } from '@ngrx/store';

import ISortState from '@core/models/sort-state.model';

export const detectLocation = createAction(
  '[INIT HEADER] DETECT USER LOCATION',
);

export const detectLocationSuccessfully = createAction(
  '[LOCATION API FETCH] DETECT USER LOCATION SUCCESSFULLY',
  props<{ location: string }>(),
);

export const detectLocationFailed = createAction(
  '[LOCATION API FETCH] DETECT USER LOCATION FAILED',
);

export const setNewLocation = createAction(
  '[HEADER] SET NEW USER LOCATION',
  props<{ newLocation: string }>(),
);

export const setNewSortState = createAction(
  '[GOODS LIST] SET NEW SORT STATE',
  props<{ newSortState: ISortState }>(),
);
