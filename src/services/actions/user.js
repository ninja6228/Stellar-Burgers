import { request } from "../../utils/apiConfig";
import { setCookie, getCookie, deleteCookie } from "../../utils/cookie";

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILED = 'USER_REGISTER_FAILED';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';

export const USER_GET_REQUEST = 'USER_GET_REQUEST';
export const USER_GET_SUCCESS = 'USER_GET_SUCCESS';
export const USER_GET_FAILED = 'USER_GET_FAILED';

export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_FAILED = 'USER_UPDATE_FAILED';

export const USER_UPDATE_TOKEN_REQUEST = 'USER_UPDATE_TOKEN_REQUEST';
export const USER_UPDATE_TOKEN_SUCCESS = 'USER_UPDATE_TOKEN_SUCCESS';
export const USER_UPDATE_TOKEN_FAILED = 'USER_UPDATE_TOKEN_FAILED';

export const USER_SET_IS_AUTH = 'USER_SET_IS_AUTH';

const setIsAuth = (value) => ({
  type: USER_SET_IS_AUTH,
  payload: value
});

export const checkUserAuth = () => {
  return (dispatch) => {
    if (getCookie("accessToken")) {
      dispatch(getUser())
        .catch((error) => {
          deleteCookie('accessToken');
          deleteCookie('refreshToken');
          console.log(`Ошибка: ${error}`)
        })
        .finally(() => dispatch(setIsAuth(true)));
    } else {
      dispatch(setIsAuth(true));
    }
  };
};

export const register = (form) => {
  return function (dispatch) {
    dispatch({ type: USER_REGISTER_REQUEST })
    request('auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (res) {
          dispatch({
            type: USER_REGISTER_SUCCESS,
            form: res.user
          });
          setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
          setCookie('refreshToken', res.refreshToken);
        }
      })
      .catch(error => {
        dispatch({ type: USER_REGISTER_FAILED })
        console.log(`Ошибка: ${error}`);
      })
  }
};

export const login = (form) => {
  return function (dispatch) {
    dispatch({ type: USER_LOGIN_REQUEST })
    request('auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (res) {
          dispatch({
            type: USER_LOGIN_SUCCESS,
            form: res.user
          });
          setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
          setCookie('refreshToken', res.refreshToken);
        }
      })
      .catch(error => {
        dispatch({ type: USER_LOGIN_FAILED, error: error })
        console.log(`Ошибка: ${error}`);
      })
  }
};

export const logout = () => {
  return function (dispatch) {
    dispatch({ type: USER_LOGOUT_REQUEST })
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
        if (res) {
          dispatch({
            type: USER_LOGOUT_SUCCESS
          });
          deleteCookie('accessToken');
          deleteCookie('refreshToken');
        }
      })
      .catch(error => {
        dispatch({ type: USER_LOGOUT_FAILED })
        console.log(`Ошибка: ${error}`);
      })
  }
};

export const getUser = () => {
  return function (dispatch) {
    dispatch({ type: USER_GET_REQUEST })
    return request('auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('accessToken')
      }
    })
      .then(res => {
        if (res) {
          dispatch({
            type: USER_GET_SUCCESS,
            form: res.user
          });
        } else {
          dispatch(updateToken())
            .then(() => {
              dispatch(getUser())
            })
        }
      })
      .catch(error => {
        dispatch({ type: USER_GET_FAILED })
        console.log(`Ошибка: ${error}`);
      })
  }
};

export const updateUser = (form) => {
  return function (dispatch) {
    dispatch({ type: USER_UPDATE_REQUEST })
    request('auth/user', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('accessToken')
      },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (res) {
          dispatch({
            type: USER_UPDATE_SUCCESS,
            form: res.user
          });
        }
      })
      .catch(error => {
        dispatch({ type: USER_UPDATE_FAILED })
        console.log(`Ошибка: ${error}`);
      })
  }
};

export const updateToken = () => {
  return function (dispatch) {
    dispatch({ type: USER_UPDATE_TOKEN_REQUEST })
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
        if (res) {
          dispatch({
            USER_UPDATE_TOKEN_SUCCESS
          });
          setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
          setCookie('refreshToken', res.refreshToken);
        }
      })
      .catch(error => {
        dispatch({ type: USER_UPDATE_TOKEN_FAILED })
        console.log(`Ошибка: ${error}`);
      })
  }
};
