import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
} from '../actions/ws-actions';

const initialState = {
  wsConnected: false,
  wsError: undefined,
  orders: null,
  total: 0,
  totalToday: 0
}

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {

    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsError: undefined,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsError: action.payload,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsError: undefined,
        wsConnected: false,
        orders: null,
      };

    case WS_GET_ORDERS:
      return {
        ...state,
        wsError: undefined,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday
      };
    default:
      return state;
  }
};