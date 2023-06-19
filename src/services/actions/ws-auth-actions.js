export const WS_AUTH_CONNECTION_START = 'WS_AUTH_CONNECTION_START';
export const WS_AUTH_CONNECTION_SUCCESS = 'WS_AUTH_CONNECTION_SUCCESS';
export const WS_AUTH_CONNECTION_ERROR = 'WS_AUTH_CONNECTION_ERROR';
export const WS_AUTH_CONNECTION_CLOSED = 'WS_AUTH_CONNECTION_CLOSED';
export const WS_GET_AUTH_ORDERS = 'WS_GET_AUTH_ORDERS';

export const wsAuthConnectionStart = (wss) => ({ type: WS_AUTH_CONNECTION_START, payload: wss });
export const wsAuthConnectionClosed = () => ({ type: WS_AUTH_CONNECTION_CLOSED });