import { baseUrl, checkResponse } from '../../utils/apiConfig'

export const GET_INGREDIENTS_REQUEST = "GET_ITEMS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_ITEMS_FAILED";

export const SET_SELECTED_INGREDIENT = 'SET_SELECTED_INGREDIENT';
export const REMOVE_SELECTED_INGREDIENTL = 'REMOVE_SELECTED_INGREDIENTL';

export const getIngredients = () => async (dispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST })
  try {
    const res = await fetch(`${baseUrl}ingredients`);
    const data = await checkResponse(res)
    if (data) {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: data
      })
    } else {
      dispatch({ type: GET_INGREDIENTS_FAILED })
    }

  }
  catch (error) {
    dispatch({ type: GET_INGREDIENTS_FAILED })
    console.log(`Произошла ошибка: ${error}`);
  }
}


