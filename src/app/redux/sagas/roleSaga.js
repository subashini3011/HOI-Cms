import { call, put, takeLatest } from "redux-saga/effects";
import { debug } from "util";
import * as dataAccess from "../../utils/ajax";

import actions from "../actions/actionTypes";

import {
  getStoresResponse,
  getStoreUpdateRequestsResponse,
  storeUpdateApprovedResponse,
  storeUpdateRejectedResponse
} from "../actions/roleActions";
import {
  GET_STORES,
  GET_STORE_UPDATE_REQUESTS,
  STORE_UPDATE_APPROVED,
  STORE_UPDATE_REJECTED
} from "constants/api-constants";

const postRequest = async (url, payload) => await dataAccess.post(url, payload);

export function* getStores(data) {
  const payload = data;
  const url = GET_STORES;
  try {
    const response = yield call(postRequest, url, payload);
  
    yield put(getStoresResponse(response));
  } catch (error) {
    yield put(getStoresResponse(error));
  }
}

export function* getStoreUpdateRequests(data) {
  const payload = data;
  const url = GET_STORE_UPDATE_REQUESTS;
  try {
    const response = yield call(postRequest, url, payload);
  
    yield put(getStoreUpdateRequestsResponse(response));
  } catch (error) {
    yield put(getStoreUpdateRequestsResponse(error));
  }
}

export function* storeUpdateApproved(data) {
  const payload = data;
  const url = STORE_UPDATE_APPROVED;
  try {
    const response = yield call(postRequest, url, payload);
  
    yield put(storeUpdateApprovedResponse(response));
  } catch (error) {
    yield put(storeUpdateApprovedResponse(error));
  }
}

export function* storeUpdateRejected(data) {
  const payload = data;
  const url = STORE_UPDATE_REJECTED;
  try {
    const response = yield call(postRequest, url, payload);
  
    yield put(storeUpdateRejectedResponse(response));
  } catch (error) {
    yield put(storeUpdateRejectedResponse(error));
  }
}

export function* roleSaga() {
  yield takeLatest(actions.GET_STORES, getStores),
    yield takeLatest(actions.GET_STORE_UPDATE_REQUESTS, getStoreUpdateRequests),
    yield takeLatest(actions.STORE_UPDATE_APPROVED, storeUpdateApproved),
    yield takeLatest(actions.STORE_UPDATE_REJECTED, storeUpdateRejected);
}
