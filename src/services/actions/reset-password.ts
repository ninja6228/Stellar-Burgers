import { request } from "../../utils/apiConfig";
import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
} from '../../utils/constants/reset-password';
import { AppDispatch, AppThunk } from '../../types/index';

type TForgotPasswordSuccess = {
  success: boolean,
  message: string
};

export interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST
};
export interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS
  payload: TForgotPasswordSuccess
};
export interface IForgotPasswordFailed {
  readonly type: typeof FORGOT_PASSWORD_FAILED
  err: string
};
export interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST
};
export interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS
};
export interface IResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED
};

export type TresetPasswordActions = IForgotPasswordRequest | IForgotPasswordSuccess | IForgotPasswordFailed | IResetPasswordRequest | IResetPasswordSuccess | IResetPasswordFailed;

export const forgotPasswordRequest = (): IForgotPasswordRequest => ({
  type: FORGOT_PASSWORD_REQUEST
});
export const forgotPasswordSuccess = (res: TForgotPasswordSuccess): IForgotPasswordSuccess => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: res
});
export const forgotPasswordFailed = (error: string): IForgotPasswordFailed => ({
  type: FORGOT_PASSWORD_FAILED,
  err: error
});
export const resetPasswordRequest = (): IResetPasswordRequest => ({
  type: RESET_PASSWORD_REQUEST
});
export const resetPasswordSuccess = (): IResetPasswordSuccess => ({
  type: RESET_PASSWORD_SUCCESS
});
export const resetPasswordFailed = (): IResetPasswordFailed => ({
  type: RESET_PASSWORD_FAILED
});

export const forgotPassword: AppThunk = (formData: { email: string }) => {
  return function (dispatch: AppDispatch) {
    dispatch(forgotPasswordRequest())
    request('password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (res && res.success) {
          dispatch(forgotPasswordSuccess(res))
        }
      })
      .catch(error => {
        dispatch(forgotPasswordFailed(error))
        console.log(`Ошибка: ${error}`);
      })
  }
};
export const resetPassword: AppThunk = (formData: { token: string, password: string }) => {
  return function (dispatch: AppDispatch) {
    dispatch(resetPasswordRequest());
    request('password-reset/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: formData.password,
        token: formData.token
      })
    })
      .then(res => {
        if (res && res.success) {
          dispatch(resetPasswordSuccess())
        }
      })
      .catch(error => {
        dispatch(resetPasswordFailed());
        console.log(`Ошибка: ${error}`);
      })
  }
};
