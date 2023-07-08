import { request } from '../../utils/apiConfig';
import { getCookie } from '../../utils/cookie';
import {
  GET_ORDER_ITEMS_REQUEST,
  GET_ORDER_ITEMS_SUCCESS,
  GET_ORDER_ITEMS_FAILED,
  ORDER_ITEMS_RESET,
  ADD_INGREDIENT,
  ADD_BUN,
  REMOVE_INGREDIENT,
  MOVE_INGREDIENT
} from '../../utils/constants/orders';
import { IOrderType, ITypeIngredient } from '../../types/types';
import { AppDispatch, AppThunk } from '../../types/index';

export interface IGetOrderItemsRequest {
  readonly type: typeof GET_ORDER_ITEMS_REQUEST
};
export interface IGetOrderItemsSuccess {
  readonly type: typeof GET_ORDER_ITEMS_SUCCESS
  orderDetails: IOrderType
};
export interface IGetOrderItemsFailed {
  readonly type: typeof GET_ORDER_ITEMS_FAILED
};
export interface IOrderItemsReset {
  readonly type: typeof ORDER_ITEMS_RESET
};
export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT,
  item: ITypeIngredient
};
export interface IAddBun {
  readonly type: typeof ADD_BUN
  item: ITypeIngredient
};
export interface IRemoveIngredient {
  readonly type: typeof REMOVE_INGREDIENT
  id: string
};
export interface IMoveIngredient {
  readonly type: typeof MOVE_INGREDIENT,
  dragIndex: number,
  hoverIndex: number
};

export type TOrderActions = IGetOrderItemsRequest | IGetOrderItemsSuccess | IGetOrderItemsFailed | IOrderItemsReset | IAddIngredient | IAddBun | IRemoveIngredient | IMoveIngredient;

export const getOrderItemsRequest = (): IGetOrderItemsRequest => ({
  type: GET_ORDER_ITEMS_REQUEST
});
export const getOrderItemsSuccess = (data: IOrderType): IGetOrderItemsSuccess => ({
  type: GET_ORDER_ITEMS_SUCCESS,
  orderDetails: data
});
export const getOrderItemsFailed = (): IGetOrderItemsFailed => ({
  type: GET_ORDER_ITEMS_FAILED
});
export const orderItemsReset = (): IOrderItemsReset => ({
  type: ORDER_ITEMS_RESET
});
export const addIngredient = (item: ITypeIngredient): IAddIngredient => ({
  type: ADD_INGREDIENT,
  item: item
});
export const addBun = (item: ITypeIngredient): IAddBun => ({
  type: ADD_BUN,
  item: item
});
export const removeIngredient = (id: string): IRemoveIngredient => ({
  type: REMOVE_INGREDIENT,
  id: id
});
export const moveIngredient = (dragIndex: number, hoverIndex: number): IMoveIngredient => ({
  type: MOVE_INGREDIENT,
  dragIndex: dragIndex,
  hoverIndex: hoverIndex
});

export const postOrder: AppThunk = (ingredientsOder: Array<string>) => {
  return function (dispatch: AppDispatch) {
    dispatch(getOrderItemsRequest())
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
        if (data && data.success) {
          dispatch(getOrderItemsSuccess(data.order));
        }
      })
      .catch(error => {
        dispatch(getOrderItemsFailed());
        console.log(`Ошибка: ${error}`);
      })
  }
}
