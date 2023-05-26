import { baseUrl, checkResponse } from "../../utils/apiConfig";
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

export const register = (form) => {
  return function (dispatch) {
    dispatch({
      type: USER_REGISTER_REQUEST
    })
    fetch(`${baseUrl}auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(res => checkResponse(res))
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: USER_REGISTER_SUCCESS,
            form: res.user
          });
          setCookie('token', res.accessToken);
          localStorage.setItem('token', res.refreshToken);
        } else {
          dispatch({
            type: USER_REGISTER_FAILED
          })
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: USER_REGISTER_FAILED
        })
      })
  }
};

export const login = (form) => {
  return function (dispatch) {
    dispatch({
      type: USER_LOGIN_REQUEST
    })
    fetch(`${baseUrl}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(res => checkResponse(res))
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: USER_LOGIN_SUCCESS,
            form: res.user
          })
          setCookie('token', res.accessToken);
          localStorage.setItem('token', res.refreshToken);

        } else {
          dispatch({
            type: USER_LOGIN_FAILED,
            error: res
          })
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: USER_LOGIN_FAILED,
          error: err
        })
      })
  }
};

export const logout = () => {
  return function (dispatch) {
    dispatch({
      type: USER_LOGOUT_REQUEST
    })
    fetch(`${baseUrl}auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
      })
    })
      .then(res => checkResponse(res))
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: USER_LOGOUT_SUCCESS,
          })
          deleteCookie('token');
          localStorage.removeItem('token');
        } else {
          dispatch({
            type: USER_LOGOUT_FAILED
          })
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: USER_LOGOUT_FAILED
        })
      })
  }
};

export function getUser() {
  return function (dispatch) {
    dispatch({
      type: USER_GET_REQUEST
    })
    fetch(`${baseUrl}auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('token')
      }
    })
      .then(res => checkResponse(res))
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: USER_GET_SUCCESS,
            form: res.user
          })
        } else {
          dispatch(updateToken())
            .then(() => {
              dispatch(getUser())
            })
        }
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: USER_GET_FAILED
        });
      })
  }
};

export function updateUser(form) {
  return function (dispatch) {
    dispatch({
      type: USER_UPDATE_REQUEST
    })
    fetch(`${baseUrl}auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('token')
      },
      body: JSON.stringify(form)
    })
      .then(res => checkResponse(res))
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: USER_UPDATE_SUCCESS,
            form: res.user
          })
        } else {
          dispatch({
            type: USER_UPDATE_FAILED
          });
        }
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: USER_UPDATE_FAILED
        });
      })
  }
};

export function updateToken() {
  return function (dispatch) {
    dispatch({
      type: USER_UPDATE_TOKEN_REQUEST
    })
    fetch(`${baseUrl}auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
      })
    })
      .then(res => checkResponse(res))
      .then(res => {
        if (res && res.success) {
          setCookie('token', res.accessToken);
          localStorage.setItem('token', res.refreshToken);
          dispatch({
            type: USER_UPDATE_TOKEN_SUCCESS
          })
        } else {
          dispatch({
            type: USER_UPDATE_TOKEN_FAILED
          })
        }
      })
      .catch((err) => {
        console.log(err)
        dispatch({
          type: USER_UPDATE_TOKEN_FAILED
        })
      })
  }
};