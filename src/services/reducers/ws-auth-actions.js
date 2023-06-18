import {
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_CLOSED,
  WS_GET_AUTH_ORDERS
} from '../actions/ws-auth-actions';

const initialState = {
  wsAuthConnected: false,
  wsAuthError: false,
  authOrders: null,
}

export const wsAuthReducer = (state = initialState, action) => {
  switch (action.type) {

    case WS_AUTH_CONNECTION_SUCCESS:
      return {
        ...state,
        wsAuthError: false,
        wsAuthConnected: true
      };

    case WS_AUTH_CONNECTION_ERROR:
      return {
        ...state,
        wsAuthError: action.payload,
        wsAuthConnected: false
      };

    case WS_AUTH_CONNECTION_CLOSED:
      return {
        ...state,
        wsAuthError: false,
        wsAuthConnected: false,
        authOrders: null,
      };

    case WS_GET_AUTH_ORDERS:
      return {
        ...state,
        wsAuthError: false,
        authOrders: action.payload.orders,
      };
    default:
      return state;
  }
};
