import { request } from "../../utils/apiConfig";

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const forgotPassword = (formData) => {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST
    })
    request('password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (res) {
          dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: res
          })
        }
      })
      .catch(error => {
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
          err: error
        })
        console.log(`Ошибка: ${error}`);
      })
  }
};

export const resetPassword = (formData) => {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });
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
        if (res) {
          dispatch({
            type: RESET_PASSWORD_SUCCESS
          })
        }
      })
      .catch(error => {
        dispatch({ type: RESET_PASSWORD_FAILED, });
        console.log(`Ошибка: ${error}`);
      })
  }
};
