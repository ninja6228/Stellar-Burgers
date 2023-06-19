import { getCookie } from "../../utils/cookie";

export const socketMiddleware = (wsActions, auth) => {

  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsStart, onOpen, onClose, onError, getOrders } = wsActions;
      
      if (type === wsStart) {
        socket = (!auth)
          ? new WebSocket(payload)
          : new WebSocket(`${payload}?token=${getCookie("accessToken")}`)
      }
      
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: getOrders, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };
      }
      next(action);
    };
  };
}; 