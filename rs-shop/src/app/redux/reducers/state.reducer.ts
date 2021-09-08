import { createReducer, on } from '@ngrx/store';
import { detectLocationSuccessfully, setNewLocation } from '../actions/state.actions';
import { initialState } from '../state.model';

export const stateReducer = createReducer(
  initialState,
  on(detectLocationSuccessfully,
    (state, { location }) => ({
      ...state,
      location: location.city || location.regionName || '',
    })),
  on(setNewLocation,
    (state, { newLocation }) => ({
      ...state,
      location: newLocation,
    })),
);
