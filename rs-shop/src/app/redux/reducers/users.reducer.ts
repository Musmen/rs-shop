import { createReducer } from '@ngrx/store';
import { initialUsersState } from '../state.model';

export const usersReducer = createReducer(
  initialUsersState,
);
