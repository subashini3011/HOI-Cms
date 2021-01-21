import {
  GET_USER_FIELDS,
  GET_USER_FIELDS_RESPONSE,
  GET_USER_FIELDS_UPDATE_VALUE,
  GET_USER_FIELDS_UPDATE_VALUE_RESPONSE,
  ADD_USER,
  ADD_USER_RESPONSE,
  GET_USER,
  GET_USER_RESPONSE,
  GET_ROLES,
  GET_ROLES_RESPONSE,
  EDIT_USER,
  EDIT_USER_RESPONSE,
  DELETE_USER,
  DELETE_USER_RESPONSE,
  DOWNLOAD_USERS,
  DOWNLOAD_USERS_RESPONSE
} from "./actionTypes";

// get user fields
export const getUserFields = data => ({
  type: GET_USER_FIELDS,
  data
});
export const getUserFieldsResponse = data => ({
  type: GET_USER_FIELDS_RESPONSE,
  response: data
});

export const getUserFieldsUpdateValue = data => ({
  type: GET_USER_FIELDS_UPDATE_VALUE,
  data
});

export const getUserFieldsUpdateValueResponse = data => ({
  type: GET_USER_FIELDS_UPDATE_VALUE_RESPONSE,
  response: data
});

// get users
export const getUser = data => ({
  type: GET_USER,
  data
});
export const getUserResponse = data => ({
  type: GET_USER_RESPONSE,
  response: data
});

// add user
export const addUser = data => ({
  type: ADD_USER,
  data
});
export const addUserResponse = data => ({
  type: ADD_USER_RESPONSE,
  response: data
});

// edit user
export const editUser = data => ({
  type: EDIT_USER,
  data
});
export const editUserResponse = data => ({
  type: EDIT_USER_RESPONSE,
  response: data
});

// delete user
export const deleteUser = data => ({
  type: DELETE_USER,
  data
});
export const deleteUserResponse = data => ({
  type: DELETE_USER_RESPONSE,
  response: data
});

// get roles
export const getRoles = data => ({
  type: GET_ROLES,
  data
});
export const getRolesResponse = data => ({
  type: GET_ROLES_RESPONSE,
  response: data
});

//download users

export const downloadUsers = data => ({
  type: DOWNLOAD_USERS,
  data
});

export const downloadUsersResponse = data => ({
  type: DOWNLOAD_USERS_RESPONSE,
  response: data
});
