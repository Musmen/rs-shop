import { categoriesReducer } from './reducers/categories.reducer';
import { usersReducer } from './reducers/users.reducer';
import { goodsReducer } from './reducers/goods.reducer';
import { stateReducer } from './reducers/state.reducer';

export const appState = {
  users: usersReducer,
  categories: categoriesReducer,
  goods: goodsReducer,
  state: stateReducer,
};
