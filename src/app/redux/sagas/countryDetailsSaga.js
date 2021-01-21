import { call, put, takeLatest } from 'redux-saga/effects';
import { debug } from 'util';
import {
  COUNTRY_DETAILS_FIELDS,
  COUNTRY_DETAILS_FIELDS_UPDATE_VALUE,
  COUNTRY_DETAILS,
  ADD_COUNTRY_DETAILS,
  EDIT_COUNTRY_DETAILS,
  DELETE_COUNTRY_DETAILS
} from 'constants/api-constants';
import * as dataAccess from '../../utils/ajax';

import actions from '../actions/actionTypes';

import {
  countryDetailsFieldsResponse,
  countryDetailsFieldsUpdateValueResponse,
  countryDetailsResponse,
  addCountryDetailsResponse,
  editCountryDetailsResponse,
  deleteCountryDetailsResponse
} from '../actions/countryDetailsActions';

const getRequest = async (url, payload) => await dataAccess.get(url, payload);

const postRequest = async (url, payload) => await dataAccess.post(url, payload);

export function* countryDetailsFields(data) {
  const payload = data;
  const url = COUNTRY_DETAILS_FIELDS;
  try {
    const response = yield call(getRequest, url, payload);
    yield put(countryDetailsFieldsResponse(response));
  } catch (error) {
    yield put(countryDetailsFieldsResponse(error));
  }
}

export function* countryDetailsFieldsUpdateValue(data) {
  const payload = data;
  const url = COUNTRY_DETAILS_FIELDS_UPDATE_VALUE;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(countryDetailsFieldsUpdateValueResponse(response));
  } catch (error) {
    yield put(countryDetailsFieldsUpdateValueResponse(error));
  }
}

export function* countryDetails(data) {
  const payload = data;
  const url = COUNTRY_DETAILS;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(countryDetailsResponse(response));
  } catch (error) {
    yield put(countryDetailsResponse(error));
  }
}

export function* addCountryDetails(data) {
  const payload = data;
  const url = ADD_COUNTRY_DETAILS;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(addCountryDetailsResponse(response));
  } catch (error) {
    yield put(addCountryDetailsResponse(error));
  }
}

export function* editCountryDetails(data) {
  const payload = data;
  const url = EDIT_COUNTRY_DETAILS;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(editCountryDetailsResponse(response));
  } catch (error) {
    yield put(editCountryDetailsResponse(error));
  }
}

export function* deleteCountryDetails(data) {
  const payload = data;
  const url = DELETE_COUNTRY_DETAILS;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(deleteCountryDetailsResponse(response));
  } catch (error) {
    yield put(deleteCountryDetailsResponse(error));
  }
}

export function* countryDetailsSaga() {
  yield takeLatest(actions.COUNTRY_DETAILS_FIELDS, countryDetailsFields),
    yield takeLatest(
      actions.COUNTRY_DETAILS_FIELDS_UPDATE_VALUE,
      countryDetailsFieldsUpdateValue
    ),
    yield takeLatest(actions.COUNTRY_DETAILS, countryDetails),
    yield takeLatest(actions.ADD_COUNTRY_DETAILS, addCountryDetails),
    yield takeLatest(actions.EDIT_COUNTRY_DETAILS, editCountryDetails),
    yield takeLatest(actions.DELETE_COUNTRY_DETAILS, deleteCountryDetails);
}
