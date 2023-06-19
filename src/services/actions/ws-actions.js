export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS = 'WS_GET_ORDERS';

export const wsConnectionStart = (wss) => ({ type: WS_CONNECTION_START, payload: wss });
export const wsConnectionClosed = () => ({ type: WS_CONNECTION_CLOSED });