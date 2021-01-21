import { call, put, takeLatest } from "redux-saga/effects";
import { debug } from "util";
import {
  GET_UPCOMING_STORES_FIELDS,
  GET_UPCOMING_STORES_FIELDS_UPDATE_VALUE,
  GET_UPCOMING_STORES,
  ADD_UPCOMING_STORES,
  EDIT_UPCOMING_STORES,
  DELETE_UPCOMING_STORES
} from "constants/api-constants";
import * as dataAccess from "../../utils/ajax";

import actions from "../actions/actionTypes";

import {
  getUpcomingStoresFieldsResponse,
  getUpcomingStoresFieldsUpdateValueResponse,
  getUpcomingStoresResponse,
  addUpcomingStoresResponse,
  editUpcomingStoresResponse,
  deleteUpcomingStoresResponse
} from "../actions/upcomingStoresActions";

const getRequest = async (url, payload) => await dataAccess.get(url, payload);

const postRequest = async (url, payload) => await dataAccess.post(url, payload);

export function* getUpcomingStoresFields(data) {
  const payload = data;
  const url = GET_UPCOMING_STORES_FIELDS;
  try {
    const response = yield call(getRequest, url, payload);
  
    yield put(getUpcomingStoresFieldsResponse(response));
  } catch (error) {
    yield put(getUpcomingStoresFieldsResponse(error));
  }
}

export function* getUpcomingStoresFieldsUpdateValue(data) {
  const payload = data;
  const url = GET_UPCOMING_STORES_FIELDS_UPDATE_VALUE;
  try {
    const response = yield call(postRequest, url, payload);
  
    yield put(getUpcomingStoresFieldsUpdateValueResponse(response));
  } catch (error) {
    yield put(getUpcomingStoresFieldsUpdateValueResponse(error));
  }
}

export function* getUpcomingStores(data) {
  const payload = data;
  const url = GET_UPCOMING_STORES;
  try {
    const response = yield call(getRequest, url, payload);
  
    yield put(getUpcomingStoresResponse(response));
  } catch (error) {
    yield put(getUpcomingStoresResponse(error));
  }
}

export function* addUpcomingStores(data) {
  const payload = data;
  const url = ADD_UPCOMING_STORES;
  try {
    const response = yield call(postRequest, url, payload);
  
    yield put(addUpcomingStoresResponse(response));
  } catch (error) {
    yield put(addUpcomingStoresResponse(error));
  }
}

export function* editUpcomingStores(data) {
  const payload = data;
  const url = EDIT_UPCOMING_STORES;
  try {
    const response = yield call(postRequest, url, payload);
  
    yield put(editUpcomingStoresResponse(response));
  } catch (error) {
    yield put(editUpcomingStoresResponse(error));
  }
}

export function* deleteUpcomingStores(data) {
  const payload = data;
  const url = DELETE_UPCOMING_STORES;
  try {
    const response = yield call(postRequest, url, payload);
  
    yield put(deleteUpcomingStoresResponse(response));
  } catch (error) {
    yield put(deleteUpcomingStoresResponse(error));
  }
}

export function* upcomingStoresSaga() {
  yield takeLatest(actions.GET_UPCOMING_STORES_FIELDS, getUpcomingStoresFields),
    yield takeLatest(
      actions.GET_UPCOMING_STORES_FIELDS_UPDATE_VALUE,
      getUpcomingStoresFieldsUpdateValue
    ),
    yield takeLatest(actions.GET_UPCOMING_STORES, getUpcomingStores),
    yield takeLatest(actions.ADD_UPCOMING_STORES, addUpcomingStores),
    yield takeLatest(actions.EDIT_UPCOMING_STORES, editUpcomingStores),
    yield takeLatest(actions.DELETE_UPCOMING_STORES, deleteUpcomingStores);
}
