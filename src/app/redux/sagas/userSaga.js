import { call, put, takeLatest } from "redux-saga/effects";
import { debug } from "util";
import * as dataAccess from "../../utils/ajax";

import actions from "../actions/actionTypes";

import {
  getUserFieldsResponse,
  getUserFieldsUpdateValueResponse,
  getUserResponse,
  addUserResponse,
  editUserResponse,
  deleteUserResponse,
  getRolesResponse,
  downloadUsersResponse
} from "../actions/userActions";

import {
  GET_USER_FIELDS,
  GET_USER_FIELDS_UPDATE_VALUE,
  GET_USER,
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
  GET_ROLES,
  DOWNLOAD_USERS
} from "constants/api-constants";

const getRequest = async (url, payload) => await dataAccess.get(url, payload);

const postRequest = async (url, payload) => await dataAccess.post(url, payload);
const postRequestDownload = async (url, payload) =>
  await dataAccess.postRequestDownload(url, payload);

export function* getUserFields(data) {
  const payload = data;
  const url = GET_USER_FIELDS;
  try {
    const response = yield call(postRequest, url, payload);
  
    yield put(getUserFieldsResponse(response));
  } catch (error) {
    yield put(getUserFieldsResponse(error));
  }
}

export function* getUserFieldsUpdateValue(data) {
  const payload = data;
  const url = GET_USER_FIELDS_UPDATE_VALUE;
  try {
    const response = yield call(postRequest, url, payload);
  
    yield put(getUserFieldsUpdateValueResponse(response));
  } catch (error) {
    yield put(getUserFieldsUpdateValueResponse(error));
  }
}

export function* getUser(data) {
  const payload = data;
  const url = GET_USER;
  try {
    const response = yield call(postRequest, url, payload);
  
    yield put(getUserResponse(response));
  } catch (error) {
    yield put(getUserResponse(error));
  }
}

export function* addUser(data) {
  const payload = data;
  const url = ADD_USER;
  try {
    const response = yield call(postRequest, url, payload);
  
    yield put(addUserResponse(response));
  } catch (error) {
    yield put(addUserResponse(error));
  }
}

export function* editUser(data) {
  const payload = data;
 
  const url = EDIT_USER;
  try {
    const response = yield call(postRequest, url, payload);
  
    yield put(editUserResponse(response));
  } catch (error) {
    yield put(editUserResponse(error));
  }
}

export function* deleteUser(data) {
  const payload = data;
 
  const url = DELETE_USER;
  try {
    const response = yield call(postRequest, url, payload);
  
    yield put(deleteUserResponse(response));
  } catch (error) {
    yield put(deleteUserResponse(error));
  }
}

export function* getRoles(data) {
  const payload = data;
  const url = GET_ROLES;
  try {
    const response = yield call(getRequest, url, payload);
  
    yield put(getRolesResponse(response));
  } catch (error) {
    yield put(getRolesResponse(error));
  }
}

export function* downloadUsers(data) {
  const payload = data;
  const url = DOWNLOAD_USERS;
  try {
    const response = yield call(postRequestDownload, url, payload);
  
    yield put(downloadUsersResponse(response));
  } catch (error) {
    yield put(downloadUsersResponse(error));
  }
}

export function* userSaga() {
  yield takeLatest(actions.GET_USER_FIELDS, getUserFields),
    yield takeLatest(
      actions.GET_USER_FIELDS_UPDATE_VALUE,
      getUserFieldsUpdateValue
    ),
    yield takeLatest(actions.GET_USER, getUser),
    yield takeLatest(actions.ADD_USER, addUser),
    yield takeLatest(actions.EDIT_USER, editUser),
    yield takeLatest(actions.DELETE_USER, deleteUser),
    yield takeLatest(actions.GET_ROLES, getRoles),
    yield takeLatest(actions.DOWNLOAD_USERS, downloadUsers);
}
