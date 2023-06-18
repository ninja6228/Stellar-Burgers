import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { usersReducer } from './user';
import { passwordReducer } from './reset-password';
import { wsReducer } from './ws-actions';
import { wsAuthReducer } from './ws-auth-actions';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  user: usersReducer,
  password: passwordReducer,
  wsOrders: wsReducer,
  wsAuthOrders: wsAuthReducer
}) 