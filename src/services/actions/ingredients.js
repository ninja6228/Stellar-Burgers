import { request } from '../../utils/apiConfig'

export const GET_INGREDIENTS_REQUEST = "GET_ITEMS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_ITEMS_FAILED";
export const SET_SELECTED_INGREDIENT = 'SET_SELECTED_INGREDIENT';
export const REMOVE_SELECTED_INGREDIENT = 'REMOVE_SELECTED_INGREDIENT';

export const getIngredients = () => {
  return function (dispatch) {
    dispatch({ type: GET_INGREDIENTS_REQUEST })
    request("ingredients")
      .then(data => {
        if (data) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: data
          })
        }
      })
      .catch(error => {
        dispatch({ type: GET_INGREDIENTS_FAILED })
        console.log(`Произошла ошибка: ${error}`);
      })
  }
}