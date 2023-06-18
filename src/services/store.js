import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../services/reducers/index';
import thunk from "redux-thunk";
import { socketMiddleware } from './middleware/socketMiddleware';

import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS
} from "../services/actions/ws-actions";

import {
  WS_AUTH_CONNECTION_START,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_CLOSED,
  WS_GET_AUTH_ORDERS
} from "../services/actions/ws-auth-actions";

const wsActions = {
  wsStart: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  getOrders: WS_GET_ORDERS
};

const wsAuthActions = {
  wsStart: WS_AUTH_CONNECTION_START,
  onOpen: WS_AUTH_CONNECTION_SUCCESS,
  onClose: WS_AUTH_CONNECTION_CLOSED,
  onError: WS_AUTH_CONNECTION_ERROR,
  getOrders: WS_GET_AUTH_ORDERS
};

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions, false), socketMiddleware(wsAuthActions, true)));
const store = createStore(rootReducer, enhancer);

export default store;