import {
  LOGIN,
  LOGIN_RESPONSE,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_RESPONSE
} from "../actions/actionTypes";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    // for login
    case LOGIN:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_RESPONSE:
      return {
        ...state,
        isLoading: false,
        loginResponse: action.response
      };

    // forgot password
    case FORGOT_PASSWORD:
      return {
        ...state,
        isLoading: true
      };
    case FORGOT_PASSWORD_RESPONSE:
      return {
        ...state,
        isLoading: false,
        forgotPasswordResponse: action.response
      };

    default:
      return state;
  }
}
