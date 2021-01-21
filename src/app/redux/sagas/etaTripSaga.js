import { call, put, takeLatest } from 'redux-saga/effects';
import { debug } from 'util';
import {
  ETA_TRIP_FIELDS,
  ETA_TRIP_FIELDS_UPDATE_VALUE,
  ETA_TRIP,
  ADD_ETA_TRIP,
  EDIT_ETA_TRIP,
  DELETE_ETA_TRIP
} from 'constants/api-constants';
import * as dataAccess from '../../utils/ajax';

import actions from '../actions/actionTypes';

import {
  etaTripFieldsResponse,
  etaTripFieldsUpdateValueResponse,
  etaTripResponse,
  addEtaTripResponse,
  editEtaTripResponse,
  deleteEtaTripResponse
} from '../actions/etaTripActions';

const getRequest = async (url, payload) => await dataAccess.get(url, payload);

const postRequest = async (url, payload) => await dataAccess.post(url, payload);

export function* etaTripFields(data) {
  const payload = data;
  const url = ETA_TRIP_FIELDS;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(etaTripFieldsResponse(response));
  } catch (error) {
    yield put(etaTripFieldsResponse(error));
  }
}

export function* etaTripFieldsUpdateValue(data) {
  const payload = data;
  const url = ETA_TRIP_FIELDS_UPDATE_VALUE;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(etaTripFieldsUpdateValueResponse(response));
  } catch (error) {
    yield put(etaTripFieldsUpdateValueResponse(error));
  }
}

export function* etaTrip(data) {
  const payload = data;
  const url = ETA_TRIP;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(etaTripResponse(response));
  } catch (error) {
    yield put(etaTripResponse(error));
  }
}

export function* addEtaTrip(data) {
  const payload = data;
  const url = ADD_ETA_TRIP;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(addEtaTripResponse(response));
  } catch (error) {
    yield put(addEtaTripResponse(error));
  }
}

export function* editEtaTrip(data) {
  const payload = data;
  const url = EDIT_ETA_TRIP;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(editEtaTripResponse(response));
  } catch (error) {
    yield put(editEtaTripResponse(error));
  }
}

export function* deleteEtaTrip(data) {
  const payload = data;
  const url = DELETE_ETA_TRIP;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(deleteEtaTripResponse(response));
  } catch (error) {
    yield put(deleteEtaTripResponse(error));
  }
}

export function* etaTripSaga() {
  yield takeLatest(actions.ETA_TRIP_FIELDS, etaTripFields),
    yield takeLatest(
      actions.ETA_TRIP_FIELDS_UPDATE_VALUE,
      etaTripFieldsUpdateValue
    ),
    yield takeLatest(actions.ETA_TRIP, etaTrip),
    yield takeLatest(actions.ADD_ETA_TRIP, addEtaTrip),
    yield takeLatest(actions.EDIT_ETA_TRIP, editEtaTrip),
    yield takeLatest(actions.DELETE_ETA_TRIP, deleteEtaTrip);
}
