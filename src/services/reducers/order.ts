import {
  GET_ORDER_ITEMS_REQUEST,
  GET_ORDER_ITEMS_SUCCESS,
  GET_ORDER_ITEMS_FAILED,
  ORDER_ITEMS_RESET,
  ADD_INGREDIENT,
  ADD_BUN,
  REMOVE_INGREDIENT,
  MOVE_INGREDIENT
} from '../../utils/constants/orders'
import { TOrderActions } from '../actions/order'
import { ITypeIngredient } from '../../types/types'

type TOrderState = {
  list: Array<ITypeIngredient>,
  bun: ITypeIngredient | undefined,
  orderDetails: number | undefined,
  request: boolean,
  failed: boolean,
  isLoaded: boolean
}

const initialState: TOrderState = {
  list: [],
  bun: undefined,
  orderDetails: undefined,
  request: false,
  failed: false,
  isLoaded: false
};

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case GET_ORDER_ITEMS_REQUEST:
      return {
        ...state,
        request: true,
        failed: false
      }
    case GET_ORDER_ITEMS_SUCCESS:
      return {
        ...state,
        request: false,
        orderDetails: action.orderDetails.number,
      }
    case GET_ORDER_ITEMS_FAILED:
      return {
        ...state,
        failed: true,
        request: false
      }
    case ADD_INGREDIENT:
      return {
        ...state,
        list: [...state.list, action.item]
      }
    case ADD_BUN:
      return {
        ...state,
        bun: action.item,
      }
    case REMOVE_INGREDIENT:
      return {
        ...state,
        list: [...state.list.filter((item) => item.uniqueId !== action.id)]
      }
    case ORDER_ITEMS_RESET:
      return {
        ...state,
        isLoaded: false,
        orderDetails: undefined,
        list: [],
        bun: undefined
      }
    case MOVE_INGREDIENT:
      let ingredients = [...state.list];
      const dragCard = ingredients[action.dragIndex];
      ingredients.splice(action.dragIndex, 1);
      ingredients.splice(action.hoverIndex, 0, dragCard)
      return {
        ...state,
        list: ingredients
      }
    default: {
      return state;
    }
  }
}