import { call, put, takeLatest } from 'redux-saga/effects';
import { debug } from 'util';
import * as dataAccess from '../../utils/ajax';

import actions from '../actions/actionTypes';
import {
  getEmergencyContactsResponse,
  addEmergencyContactsResponse,
  updateEmergencyContactsResponse,
  deleteEmergencyContactsResponse,
  addEmergencyContactsDetailsResponse,
  updateEmergencyContactsDetailsResponse,
  deleteEmergencyContactsDetailsResponse
} from '../actions/emergencyContactsActions';

import {
  GET_EMERGENCY_CONTACTS,
  ADD_EMERGENCY_CONTACTS,
  UPDATE_EMERGENCY_CONTACTS,
  DELETE_EMERGENCY_CONTACTS,
  ADD_EMERGENCY_CONTACTS_DETAILS,
  UPDATE_EMERGENCY_CONTACTS_DETAILS,
  DELETE_EMERGENCY_CONTACTS_DETAILS
} from 'constants/api-constants';

const getRequest = async (url, payload) => await dataAccess.get(url, payload);

const postRequest = async (url, payload) => await dataAccess.post(url, payload);

export function* getEmergencyContacts(data) {
  const payload = data;
  const url = GET_EMERGENCY_CONTACTS;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(getEmergencyContactsResponse(response));
  } catch (error) {
    yield put(getEmergencyContactsResponse(error));
  }
}

export function* addEmergencyContacts(data) {
  const payload = data;
  const url = ADD_EMERGENCY_CONTACTS;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(addEmergencyContactsResponse(response));
  } catch (error) {
    yield put(addEmergencyContactsResponse(error));
  }
}

export function* updateEmergencyContacts(data) {
  const payload = data;
  const url = UPDATE_EMERGENCY_CONTACTS;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(updateEmergencyContactsResponse(response));
  } catch (error) {
    yield put(updateEmergencyContactsResponse(error));
  }
}

export function* deleteEmergencyContacts(data) {
  const payload = data;
  const url = DELETE_EMERGENCY_CONTACTS;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(deleteEmergencyContactsResponse(response));
  } catch (error) {
    yield put(deleteEmergencyContactsResponse(error));
  }
}

export function* addEmergencyContactsDetails(data) {
  const payload = data;
  const url = ADD_EMERGENCY_CONTACTS_DETAILS;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(addEmergencyContactsDetailsResponse(response));
  } catch (error) {
    yield put(addEmergencyContactsDetailsResponse(error));
  }
}

export function* updateEmergencyContactsDetails(data) {
  const payload = data;
  const url = UPDATE_EMERGENCY_CONTACTS_DETAILS;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(updateEmergencyContactsDetailsResponse(response));
  } catch (error) {
    yield put(updateEmergencyContactsDetailsResponse(error));
  }
}

export function* deleteEmergencyContactsDetails(data) {
  const payload = data;
  const url = DELETE_EMERGENCY_CONTACTS_DETAILS;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(deleteEmergencyContactsDetailsResponse(response));
  } catch (error) {
    yield put(deleteEmergencyContactsDetailsResponse(error));
  }
}

export function* emergencyContactsSaga() {
  yield takeLatest(actions.GET_EMERGENCY_CONTACTS, getEmergencyContacts),
    yield takeLatest(actions.ADD_EMERGENCY_CONTACTS, addEmergencyContacts),
    yield takeLatest(
      actions.UPDATE_EMERGENCY_CONTACTS,
      updateEmergencyContacts
    ),
    yield takeLatest(
      actions.DELETE_EMERGENCY_CONTACTS,
      deleteEmergencyContacts
    ),
    yield takeLatest(
      actions.ADD_EMERGENCY_CONTACTS_DETAILS,
      addEmergencyContactsDetails
    ),
    yield takeLatest(
      actions.UPDATE_EMERGENCY_CONTACTS_DETAILS,
      updateEmergencyContactsDetails
    ),
    yield takeLatest(
      actions.DELETE_EMERGENCY_CONTACTS_DETAILS,
      deleteEmergencyContactsDetails
    );
}
