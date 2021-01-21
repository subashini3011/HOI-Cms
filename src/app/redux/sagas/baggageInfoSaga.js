import { call, put, takeLatest } from 'redux-saga/effects';
import { debug } from 'util';
import {
  GET_BAGGAGE_INFO_FIELDS,
  GET_BAGGAGE_INFO_FIELDS_UPDATE_VALUE,
  GET_BAGGAGE_INFO,
  ADD_BAGGAGE_INFO,
  EDIT_BAGGAGE_INFO,
  DELETE_BAGGAGE_INFO
} from 'constants/api-constants';
import * as dataAccess from '../../utils/ajax';

import actions from '../actions/actionTypes';

import {
  getBaggageInfoFieldsResponse,
  getBaggageInfoFieldsUpdateValueResponse,
  getBaggageInfoResponse,
  addBaggageInfoResponse,
  editBaggageInfoResponse,
  deleteBaggageInfoResponse
} from '../actions/baggageInfoActions';

const getRequest = async (url, payload) => await dataAccess.get(url, payload);

const postRequest = async (url, payload) => await dataAccess.post(url, payload);

export function* getBaggageInfoFields(data) {
  const payload = data;
  const url = GET_BAGGAGE_INFO_FIELDS;
  try {
    const response = yield call(getRequest, url, payload);
    yield put(getBaggageInfoFieldsResponse(response));
  } catch (error) {
    yield put(getBaggageInfoFieldsResponse(error));
  }
}

export function* getBaggageInfoFieldsUpdateValue(data) {
  const payload = data;
  const url = GET_BAGGAGE_INFO_FIELDS_UPDATE_VALUE;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(getBaggageInfoFieldsUpdateValueResponse(response));
  } catch (error) {
    yield put(getBaggageInfoFieldsUpdateValueResponse(error));
  }
}

export function* getBaggageInfo(data) {
  const payload = data;
  const url = GET_BAGGAGE_INFO;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(getBaggageInfoResponse(response));
  } catch (error) {
    yield put(getBaggageInfoResponse(error));
  }
}

export function* addBaggageInfo(data) {
  const payload = data;
  const url = ADD_BAGGAGE_INFO;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(addBaggageInfoResponse(response));
  } catch (error) {
    yield put(addBaggageInfoResponse(error));
  }
}

export function* editBaggageInfo(data) {
  const payload = data;
  const url = EDIT_BAGGAGE_INFO;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(editBaggageInfoResponse(response));
  } catch (error) {
    yield put(editBaggageInfoResponse(error));
  }
}

export function* deleteBaggageInfo(data) {
  const payload = data;
  const url = DELETE_BAGGAGE_INFO;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(deleteBaggageInfoResponse(response));
  } catch (error) {
    yield put(deleteBaggageInfoResponse(error));
  }
}

export function* baggageInfoSaga() {
  yield takeLatest(actions.GET_BAGGAGE_INFO_FIELDS, getBaggageInfoFields),
    yield takeLatest(
      actions.GET_BAGGAGE_INFO_FIELDS_UPDATE_VALUE,
      getBaggageInfoFieldsUpdateValue
    ),
    yield takeLatest(actions.GET_BAGGAGE_INFO, getBaggageInfo),
    yield takeLatest(actions.ADD_BAGGAGE_INFO, addBaggageInfo),
    yield takeLatest(actions.EDIT_BAGGAGE_INFO, editBaggageInfo),
    yield takeLatest(actions.DELETE_BAGGAGE_INFO, deleteBaggageInfo);
}
