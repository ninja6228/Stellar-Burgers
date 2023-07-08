import { TIngredientsActions } from '../actions/ingredients'
import { ITypeIngredient } from '../../types/types'
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_SELECTED_INGREDIENT,
  REMOVE_SELECTED_INGREDIENT
} from '../../utils/constants/ingredients'

export type TIngredientsState = {
  ingredients: Array<ITypeIngredient>,
  loaded: boolean,
  error: boolean,
  selectedIngredient: ITypeIngredient | null
}

const initialState: TIngredientsState = {
  ingredients: [],
  loaded: false,
  error: false,
  selectedIngredient: null,
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
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
        ingredients: action.ingredients, 
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
        selectedIngredient: action.ingredients
      }
    case REMOVE_SELECTED_INGREDIENT:
      return {
        ...state,
        selectedIngredient: null
      }
    default: {
      return state;
    }
  }
}