import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_AIRPORT_FIELDS,
  GET_ACTIVE_AIRPORTS,
  GET_AIRPORT_FIELDS_UPDATE_VALUE,
  GET_AIRPORTS,
  GET_AIRPORTS_DETAILS,
  ADD_AIRPORT,
  DOWNLOAD_AIRPORTS,
  EDIT_AIRPORT,
  DELETE_AIRPORT
} from "constants/api-constants";
import * as dataAccess from "../../utils/ajax";

import actions from "../actions/actionTypes";

import {
  getAirportFieldsResponse,
  getAirportFieldsUpdateValueResponse,
  getActiveAirportsResponse,
  getAirportsResponse,
  getAirportsDetailsResponse,
  addAirportResponse,
  downloadAirportsResponse,
  editAirportResponse,
  deleteAirportResponse
} from "../actions/airportsActions";

const getRequest = async (url, payload) => await dataAccess.get(url, payload);

const postRequest = async (url, payload) => await dataAccess.post(url, payload);

export function* getAirportFields(data) {
  const payload = data;
  const url = GET_AIRPORT_FIELDS;
  try {
    const response = yield call(getRequest, url, payload);
    yield put(getAirportFieldsResponse(response));
  } catch (error) {
    yield put(getAirportFieldsResponse(error));
  }
}

export function* getAirportFieldsUpdateValue(data) {
  const payload = data;
  const url = GET_AIRPORT_FIELDS_UPDATE_VALUE;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(getAirportFieldsUpdateValueResponse(response));
  } catch (error) {
    yield put(getAirportFieldsUpdateValueResponse(error));
  }
}

export function* getActiveAirports(data) {
  const payload = data;
  const url = GET_ACTIVE_AIRPORTS;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(getActiveAirportsResponse(response));
  } catch (error) {
    yield put(getActiveAirportsResponse(error));
  }
}

export function* getAirports(data) {
  const payload = data;
  const url = GET_AIRPORTS;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(getAirportsResponse(response));
  } catch (error) {
    yield put(getAirportsResponse(error));
  }
}

export function* getAirportsDetails(data) {
  const payload = data;
  const url = GET_AIRPORTS_DETAILS;
  try {
    const response = yield call(getRequest, url, payload);
    yield put(getAirportsDetailsResponse(response));
  } catch (error) {
    yield put(getAirportsDetailsResponse(error));
  }
}

export function* addAirport(data) {
  const payload = data;
  const url = ADD_AIRPORT;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(addAirportResponse(response));
  } catch (error) {
    yield put(addAirportResponse(error));
  }
}

export function* downloadAirports(data) {
  const payload = data;
  const url = DOWNLOAD_AIRPORTS;
  try {
    const response = yield call(getRequest, url, payload);
    yield put(downloadAirportsResponse(response));
  } catch (error) {
    yield put(downloadAirportsResponse(error));
  }
}

export function* editAirport(data) {
  const payload = data;
  const url = EDIT_AIRPORT;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(editAirportResponse(response));
  } catch (error) {
    yield put(editAirportResponse(error));
  }
}

export function* deleteAirport(data) {
  const payload = data;
  const url = DELETE_AIRPORT;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(deleteAirportResponse(response));
  } catch (error) {
    yield put(deleteAirportResponse(error));
  }
}

export function* airportsSaga() {
  yield takeLatest(actions.GET_AIRPORT_FIELDS, getAirportFields),
    yield takeLatest(
      actions.GET_AIRPORT_FIELDS_UPDATE_VALUE,
      getAirportFieldsUpdateValue
    ),
    yield takeLatest(actions.GET_ACTIVE_AIRPORTS, getActiveAirports),
    yield takeLatest(actions.GET_AIRPORTS, getAirports),
    yield takeLatest(actions.GET_AIRPORTS_DETAILS, getAirportsDetails),
    yield takeLatest(actions.ADD_AIRPORT, addAirport),
    yield takeLatest(actions.DOWNLOAD_AIRPORTS, downloadAirports),
    yield takeLatest(actions.EDIT_AIRPORT, editAirport),
    yield takeLatest(actions.DELETE_AIRPORT, deleteAirport);
}
