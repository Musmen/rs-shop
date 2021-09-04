import { categoriesReducer } from './reducers/categories.reducer';
import { usersReducer } from './reducers/users.reducer';
import { goodsReducer } from './reducers/goods.reducer';

export const appState = {
  users: usersReducer,
  categories: categoriesReducer,
  goods: goodsReducer,
};