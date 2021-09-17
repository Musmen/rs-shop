import { createReducer, on } from '@ngrx/store';
import { setNewUser, setUserLoginStatus } from '../actions/user.actions';
import { initialUserState } from '../state.model';

export const userReducer = createReducer(
  initialUserState,

  on(setNewUser,
    (state, { user }) => ({
      ...state, user,
    })),

  on(setUserLoginStatus,
    (state, { isLogged }) => ({
      ...state,
      isUserLogged: isLogged,
    })),
);
