import { request } from "../../utils/apiConfig";
import { setCookie, getCookie, deleteCookie } from "../../utils/cookie";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILED,
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_FAILED,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILED,
  USER_UPDATE_TOKEN_REQUEST,
  USER_UPDATE_TOKEN_SUCCESS,
  USER_UPDATE_TOKEN_FAILED,
  USER_SET_IS_AUTH
} from '../../utils/constants/user'
import { AppDispatch, AppThunk } from '../../types/index';

type TUser = {
  email: string,
  name: string,
  password?: string
}

export interface IUserRegisterRequest {
  readonly type: typeof USER_REGISTER_REQUEST
};
export interface IUserRegisterSuccess {
  readonly type: typeof USER_REGISTER_SUCCESS
  form: TUser
};
export interface IUserRegisterFailed {
  readonly type: typeof USER_REGISTER_FAILED
};
export interface IUserLoginRequest {
  readonly type: typeof USER_LOGIN_REQUEST
};
export interface IUserLoginSuccess {
  readonly type: typeof USER_LOGIN_SUCCESS
  form: TUser
};
export interface IUserLoginFailed {
  readonly type: typeof USER_LOGIN_FAILED,
  error: string
};
export interface IUserLogoutRequest {
  readonly type: typeof USER_LOGOUT_REQUEST
};
export interface IUserLogoutSuccess {
  readonly type: typeof USER_LOGOUT_SUCCESS
};
export interface IUserLogoutFailed {
  readonly type: typeof USER_LOGOUT_FAILED
};
export interface IUserGetRequest {
  readonly type: typeof USER_GET_REQUEST
};
export interface IUserGetSuccess {
  readonly type: typeof USER_GET_SUCCESS,
  form: TUser
};
export interface IUserGetFailed {
  readonly type: typeof USER_GET_FAILED
};
export interface IUserUpdateRequest {
  readonly type: typeof USER_UPDATE_REQUEST
};
export interface IUserUpdateSuccess {
  readonly type: typeof USER_UPDATE_SUCCESS,
  form: TUser
};
export interface IUserUpdateFailed {
  readonly type: typeof USER_UPDATE_FAILED
};
export interface IUserUpdateTokenRequest {
  readonly type: typeof USER_UPDATE_TOKEN_REQUEST
};
export interface IUserUpdateTokenSuccess {
  readonly type: typeof USER_UPDATE_TOKEN_SUCCESS
};
export interface IUserUpdateTokenFailed {
  readonly type: typeof USER_UPDATE_TOKEN_FAILED
};
export interface IUserSetIsAuth {
  readonly type: typeof USER_SET_IS_AUTH
  payload: boolean
};

export type TUserActions =
  IUserRegisterRequest | IUserRegisterSuccess | IUserRegisterFailed |
  IUserLoginRequest | IUserLoginSuccess | IUserLoginFailed |
  IUserLogoutRequest | IUserLogoutSuccess | IUserLogoutFailed |
  IUserGetRequest | IUserGetSuccess | IUserGetFailed |
  IUserUpdateRequest | IUserUpdateSuccess | IUserUpdateFailed |
  IUserUpdateTokenRequest | IUserUpdateTokenSuccess | IUserUpdateTokenFailed |
  IUserSetIsAuth;

export const userRegisterRequest = (): IUserRegisterRequest => ({
  type: USER_REGISTER_REQUEST
});
export const userRegisterSuccess = (res: TUser): IUserRegisterSuccess => ({
  type: USER_REGISTER_SUCCESS,
  form: res
});
export const userRegisterFailed = (): IUserRegisterFailed => ({
  type: USER_REGISTER_FAILED
});
export const userLoginRequest = (): IUserLoginRequest => ({
  type: USER_LOGIN_REQUEST
});
export const userLoginSuccess = (res: TUser): IUserLoginSuccess => ({
  type: USER_LOGIN_SUCCESS,
  form: res
});
export const userLoginFailed = (error: string): IUserLoginFailed => ({
  type: USER_LOGIN_FAILED,
  error: error
});
export const userLogoutRequest = (): IUserLogoutRequest => ({
  type: USER_LOGOUT_REQUEST
});
export const userLogoutSuccess = (): IUserLogoutSuccess => ({
  type: USER_LOGOUT_SUCCESS
});
export const userLogoutFailed = (): IUserLogoutFailed => ({
  type: USER_LOGOUT_FAILED
});
export const userGetRequest = (): IUserGetRequest => ({
  type: USER_GET_REQUEST
});
export const userGetSuccess = (res: TUser): IUserGetSuccess => ({
  type: USER_GET_SUCCESS,
  form: res
});
export const userGetFailed = (): IUserGetFailed => ({
  type: USER_GET_FAILED
});
export const userUpdateRequest = (): IUserUpdateRequest => ({
  type: USER_UPDATE_REQUEST
});
export const userUpdateSuccess = (res: TUser): IUserUpdateSuccess => ({
  type: USER_UPDATE_SUCCESS,
  form: res
});
export const userUpdateFailed = (): IUserUpdateFailed => ({
  type: USER_UPDATE_FAILED
});
export const userUpdateTokenRequest = (): IUserUpdateTokenRequest => ({
  type: USER_UPDATE_TOKEN_REQUEST
});
export const userUpdateTokenSuccess = (): IUserUpdateTokenSuccess => ({
  type: USER_UPDATE_TOKEN_SUCCESS
});
export const userUpdateTokenFailed = (): IUserUpdateTokenFailed => ({
  type: USER_UPDATE_TOKEN_FAILED
});
export const userSetIsAuth = (value: boolean): IUserSetIsAuth => ({
  type: USER_SET_IS_AUTH,
  payload: value
})

export const register: AppThunk = (form: TUser) => {
  return function (dispatch: AppDispatch) {
    dispatch(userRegisterRequest())
    request('auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (res && res.success) {
          dispatch(userRegisterSuccess(res.user));
          setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
          setCookie('refreshToken', res.refreshToken);
        }
      })
      .catch(error => {
        dispatch(userRegisterFailed())
        console.log(`Ошибка: ${error}`);
      })
  }
};

export const login: AppThunk = (form: TUser) => {
  return function (dispatch: AppDispatch) {
    dispatch(userLoginRequest())
    request('auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (res && res.success) {
          dispatch(userLoginSuccess(res.user));
          setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
          setCookie('refreshToken', res.refreshToken);
        }
        else {
          deleteCookie('accessToken');
          deleteCookie('refreshToken');
        }
      })
      .catch(error => {
        dispatch(userLoginFailed(error))
        console.log(`Ошибка: ${error}`);
      })
  }
};

export const logout: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(userLogoutRequest())
    request('auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "token": getCookie("refreshToken"),
      })
    })
      .then(res => {
        if (res && res.success) {
          dispatch(userLogoutSuccess());
          deleteCookie('accessToken');
          deleteCookie('refreshToken');
        }
      })
      .catch(error => {
        dispatch(userLogoutFailed())
        console.log(`Ошибка: ${error}`);
      })
  }
};

export const getUser: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(userGetRequest())
    request('auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('accessToken')
      }
    })
      .then(res => {
        if (res && res.success) {
          dispatch(userGetSuccess(res.user));
        }
      })
      .catch(error => {
        dispatch(userGetFailed())
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        console.log(`Ошибка: ${error}`);
      })
  }
};

export const updateUser: AppThunk = (form: TUser) => {
  return function (dispatch: AppDispatch) {
    dispatch(userUpdateRequest())
    request('auth/user', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('accessToken')
      },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (res && res.success) {
          dispatch(userUpdateSuccess(res.user));
        }
      })
      .catch(error => {
        dispatch(userUpdateFailed())
        console.log(`Ошибка: ${error}`);
      })
  }
};

export const updateToken: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(userUpdateTokenRequest())
    request('auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "token": getCookie("refreshToken")
      })
    })
      .then(res => {
        if (res && res.success) {
          dispatch(userUpdateTokenSuccess());
          setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
          setCookie('refreshToken', res.refreshToken);
        }
      })
      .catch(error => {
        dispatch(userUpdateFailed())
        console.log(`Ошибка: ${error}`);
      })
  }
};
