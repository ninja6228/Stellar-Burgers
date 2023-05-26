import {
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST
} from '../actions/reset-password'

const initialState = {
  emailRequest: false,
  emailRequestFailed: false,
  resetPasswordRequest: false,
  resetPasswordRequestFailed: false,
  verification: false,
  err: ''
};

export const passwordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        emailRequest: true,
        emailRequestFailed: false,
        err: ''
      }
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        emailRequest: false,
        verification: action.payload,
      }
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        emailRequest: false,
        emailRequestFailed: true,
        err: action,
      }
    }
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        resetPasswordRequest: true,
      }
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordRequestFailed: false,
        verification: false
      }
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordRequestFailed: true,
      }
    default:
      return state;
  }
}

