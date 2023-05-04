import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_SELECTED_INGREDIENT,
  REMOVE_SELECTED_INGREDIENTL
} from '../actions/ingredients'

const initialState = {
  ingredients: [],
  loaded: false,
  error: false,
  selectedIngredient: null,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        loaded: true,
      }
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        loaded: false,
        ingredients: action.ingredients.data,
      }
    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      }
    case SET_SELECTED_INGREDIENT:
      return {
        ...state,
        error: false,
        selectedIngredient: action.ingadient
      }
    case REMOVE_SELECTED_INGREDIENTL:
      return {
        ...state,
        selectedIngredient: null
      }
    default: {
      return state;
    }
  }
}