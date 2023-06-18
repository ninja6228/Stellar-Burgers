import { request } from '../../utils/apiConfig'
import { getCookie } from '../../utils/cookie'

export const GET_ORDER_ITEMS_REQUEST = 'ORDER_ITEMS_REQUEST'
export const GET_ORDER_ITEMS_SUCCESS = 'ORDER_ITEMS_SUCCESS'
export const GET_ORDER_ITEMS_FAILED = 'ORDER_ITEMS_FAILED'
export const ORDER_ITEMS_RESET = 'ORDER_ITEMS_RESET'

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

export const postOrder = (ingredientsOder) => {
  return function (dispatch) {
    dispatch({ type: GET_ORDER_ITEMS_REQUEST })
    request('orders', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + getCookie('accessToken')
      },
      body: JSON.stringify({
        ingredients: ingredientsOder,
      })
    })
      .then(data => {
        if (data) {
          dispatch({
            type: GET_ORDER_ITEMS_SUCCESS,
            orderDetails: data
          });
        }
      })
      .catch(error => {
        dispatch({ type: GET_ORDER_ITEMS_FAILED });
        console.log(`Ошибка: ${error}`);
      })
  }
}
