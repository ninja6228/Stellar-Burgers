import { baseUrl, checkResponse } from "../../utils/apiConfig";

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
    fetch(`${baseUrl}password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: formData })
    })
      .then(res => checkResponse(res))
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: res
          })
        } else {
          dispatch({
            type: FORGOT_PASSWORD_FAILED,
            err: res
          })
        }
      }
      )
      .catch(err => {
        console.log(err)
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
          err: err
        })
      })
  }
}

export function resetPassword(formData) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });
    fetch(`${baseUrl}password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: formData.password,
        token: formData.token
      })
    })
      .then(res => checkResponse(res))
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: RESET_PASSWORD_SUCCESS
          })
        } else {
          dispatch({
            type: RESET_PASSWORD_FAILED
          })
        }
      })
      .catch(error => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
        console.log(`Ошибка: ${error}`);
      })
  }
}