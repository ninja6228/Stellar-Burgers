import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { usersReducer } from './user';
import { passwordReducer } from './reset-password';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  user: usersReducer,
  password: passwordReducer
}) 