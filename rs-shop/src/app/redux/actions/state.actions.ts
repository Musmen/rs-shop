import { createAction, props } from '@ngrx/store';
import { ILocation } from '@app/core/models/location.model';

export const detectLocation = createAction(
  '[INIT HEADER] DETECT USER LOCATION',
);

export const detectLocationSuccessfully = createAction(
  '[LOCATION API FETCH] DETECT USER LOCATION SUCCESSFULLY',
  props<{ location: ILocation }>(),
);

export const detectLocationFailed = createAction(
  '[LOCATION API FETCH] DETECT USER LOCATION FAILED',
);

export const setNewLocation = createAction(
  '[HEADER] SET NEW USER LOCATION',
  props<{ newLocation: string }>(),
);
