import { request } from '../../utils/apiConfig';
import { ITypeIngredient } from '../../types/types';
import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  SET_SELECTED_INGREDIENT,
  REMOVE_SELECTED_INGREDIENT
} from '../../utils/constants/ingredients';
import { AppDispatch, AppThunk } from '../../types/index';

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS
  ingredients: Array<ITypeIngredient>
};
export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST
};
export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED
};
export interface ISetSelectedIngredient {
  ingredients: ITypeIngredient;
  readonly type: typeof SET_SELECTED_INGREDIENT
};
export interface IRemoveSelectedIngredient {
  readonly type: typeof REMOVE_SELECTED_INGREDIENT
};

export type TIngredientsActions = IGetIngredientsSuccess | IGetIngredientsRequest | IGetIngredientsFailed | ISetSelectedIngredient | IRemoveSelectedIngredient;

export const getIngredientsSuccess = (data: Array<ITypeIngredient>): IGetIngredientsSuccess => ({
  type: GET_INGREDIENTS_SUCCESS,
  ingredients: data
});
export const getIngredientsRequest = (): IGetIngredientsRequest => ({
  type: GET_INGREDIENTS_REQUEST
});
export const getIngredientsFailed = (): IGetIngredientsFailed => ({
  type: GET_INGREDIENTS_FAILED
});
export const setSelectedIngredient = (data: ITypeIngredient): ISetSelectedIngredient => ({
  type: SET_SELECTED_INGREDIENT,
  ingredients: data
});
export const removeSelectedIngredient = (): IRemoveSelectedIngredient => ({
  type: REMOVE_SELECTED_INGREDIENT
});

export const getIngredients: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(getIngredientsRequest())
    request("ingredients")
      .then(res => {
        if (res && res.success) {
          dispatch(getIngredientsSuccess(res.data))
        }
      })
      .catch(error => {
        dispatch(getIngredientsFailed())
        console.log(`Произошла ошибка: ${error}`);
      })
  }
}