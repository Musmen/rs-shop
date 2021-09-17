import { categoriesReducer } from './reducers/categories.reducer';
import { userReducer } from './reducers/user.reducer';
import { goodsReducer } from './reducers/goods.reducer';
import { stateReducer } from './reducers/state.reducer';

export const appState = {
  user: userReducer,
  categories: categoriesReducer,
  goods: goodsReducer,
  state: stateReducer,
};
