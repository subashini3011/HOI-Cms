import {
  GET_USER_FIELDS,
  GET_USER_FIELDS_RESPONSE,
  GET_USER_FIELDS_UPDATE_VALUE,
  GET_USER_FIELDS_UPDATE_VALUE_RESPONSE,
  GET_USER,
  GET_USER_RESPONSE,
  ADD_USER,
  ADD_USER_RESPONSE,
  EDIT_USER,
  EDIT_USER_RESPONSE,
  DELETE_USER,
  DELETE_USER_RESPONSE,
  GET_ROLES,
  GET_ROLES_RESPONSE,
  DOWNLOAD_USERS,
  DOWNLOAD_USERS_RESPONSE
} from "../actions/actionTypes";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    // get users fields
    case GET_USER_FIELDS:
      return {
        ...state,
        isLoading: true
      };
    case GET_USER_FIELDS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getUserFieldsResponse: action.response
      };

    case GET_USER_FIELDS_UPDATE_VALUE:
      return {
        ...state,
        isLoading: true
      };
    case GET_USER_FIELDS_UPDATE_VALUE_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getUserFieldsUpdateValueResponse: action.response
      };

    // get users
    case GET_USER:
      return {
        ...state,
        isLoading: true
      };
    case GET_USER_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getUserResponse: action.response
      };

    // add user
    case ADD_USER:
      return {
        ...state,
        isLoading: true
      };
    case ADD_USER_RESPONSE:
      return {
        ...state,
        isLoading: false,
        addUserResponse: action.response
      };

    // edit user
    case EDIT_USER:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_USER_RESPONSE:
      return {
        ...state,
        isLoading: false,
        editUserResponse: action.response
      };

    // delete user
    case DELETE_USER:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_USER_RESPONSE:
      return {
        ...state,
        isLoading: false,
        deleteUserResponse: action.response
      };

    // get roles
    case GET_ROLES:
      return {
        ...state,
        isLoading: true
      };
    case GET_ROLES_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getRolesResponse: action.response
      };

    case DOWNLOAD_USERS:
      return {
        ...state,
        isLoading: true
      };
    case DOWNLOAD_USERS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        downloadUsersResponse: action.response
      };

    default:
      return state;
  }
}
