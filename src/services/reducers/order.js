import {
  GET_ORDER_ITEMS_REQUEST,
  GET_ORDER_ITEMS_SUCCESS,
  GET_ORDER_ITEMS_FAILED,
  ORDER_ITEMS_RESET,
  ADD_INGREDIENT,
  ADD_BUN,
  REMOVE_INGREDIENT,
  MOVE_INGREDIENT
} from '../actions/order'

const initialState = {
  active: false,
  list: [],
  bun: null,
  orderDetails: [],
  request: false,
  failed: false,
};

export const orderReducer = (state = initialState, action) => {
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
        active: true,
        orderDetails: action.orderDetails,
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
        list: [...state.list.filter((item) => item.id !== action.id)]
      }
    case ORDER_ITEMS_RESET:
      return {
        ...state,
        isLoaded: false,
        orderDetails: [],
        active: false,
        list: [],
        bun: null
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