import { call, put, takeLatest } from 'redux-saga/effects';
import {
  AIRLINE_PUNCTUALITY,
  AIRLINE_PUNCTUALITY_FIELDS,
  AIRLINE_PUNCTUALITY_FIELDS_UPDATE_VALUE,
  ADD_AIRLINE_PUNCTUALITY,
  EDIT_AIRLINE_PUNCTUALITY,
  DELETE_AIRLINE_PUNCTUALITY,
  AIRBUS_INFO,
  AIRBUS_INFO_FIELDS,
  AIRBUS_INFO_FIELDS_UPDATE_VALUE,
  ADD_AIRBUS_INFO,
  EDIT_AIRBUS_INFO,
  DELETE_AIRBUS_INFO,
  AIRLINE_DETAILS,
  AIRLINE_DETAILS_FIELDS,
  AIRLINE_DETAILS_FIELDS_UPDATE_VALUE,
  ADD_AIRLINE_DETAILS,
  EDIT_AIRLINE_DETAILS,
  DELETE_AIRLINE_DETAILS
} from 'constants/api-constants';
import * as dataAccess from '../../utils/ajax';

import actions from '../actions/actionTypes';

import {
  airlinePunctualityResponse,
  airlinePunctualityFieldsResponse,
  airlinePunctualityFieldsUpdateValueResponse,
  addAirlinePunctualityResponse,
  editAirlinePunctualityResponse,
  deleteAirlinePunctualityResponse,
  airbusInfoResponse,
  airbusInfoFieldsResponse,
  airbusInfoFieldsUpdateValueResponse,
  addAirbusInfoResponse,
  editAirbusInfoResponse,
  deleteAirbusInfoResponse,
  airlineDetailsResponse,
  airlineDetailsFieldsResponse,
  airlineDetailsFieldsUpdateValueResponse,
  addAirlineDetailsResponse,
  editAirlineDetailsResponse,
  deleteAirlineDetailsResponse
} from '../actions/flightServiceActions';

const getRequest = async (url, payload) => await dataAccess.get(url, payload);

const postRequest = async (url, payload) => await dataAccess.post(url, payload);

export function* airlinePunctuality(data) {
  const payload = data;
  const url = AIRLINE_PUNCTUALITY;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(airlinePunctualityResponse(response));
  } catch (error) {
    yield put(airlinePunctualityResponse(error));
  }
}

export function* airlinePunctualityFields(data) {
  const payload = data;
  const url = AIRLINE_PUNCTUALITY_FIELDS;
  try {
    const response = yield call(getRequest, url, payload);
    yield put(airlinePunctualityFieldsResponse(response));
  } catch (error) {
    yield put(airlinePunctualityFieldsResponse(error));
  }
}

export function* airlinePunctualityFieldsUpdateValue(data) {
  const payload = data;
  const url = AIRLINE_PUNCTUALITY_FIELDS_UPDATE_VALUE;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(airlinePunctualityFieldsUpdateValueResponse(response));
  } catch (error) {
    yield put(airlinePunctualityFieldsUpdateValueResponse(error));
  }
}

export function* addAirlinePunctuality(data) {
  const payload = data;
  const url = ADD_AIRLINE_PUNCTUALITY;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(addAirlinePunctualityResponse(response));
  } catch (error) {
    yield put(addAirlinePunctualityResponse(error));
  }
}

export function* editAirlinePunctuality(data) {
  const payload = data;
  const url = EDIT_AIRLINE_PUNCTUALITY;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(editAirlinePunctualityResponse(response));
  } catch (error) {
    yield put(editAirlinePunctualityResponse(error));
  }
}

export function* deleteAirlinePunctuality(data) {
  const payload = data;
  const url = DELETE_AIRLINE_PUNCTUALITY;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(deleteAirlinePunctualityResponse(response));
  } catch (error) {
    yield put(deleteAirlinePunctualityResponse(error));
  }
}

export function* airbusInfo(data) {
  const payload = data;
  const url = AIRBUS_INFO;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(airbusInfoResponse(response));
  } catch (error) {
    yield put(airbusInfoResponse(error));
  }
}

export function* airbusInfoFields(data) {
  const payload = data;
  const url = AIRBUS_INFO_FIELDS;
  try {
    const response = yield call(getRequest, url, payload);
    yield put(airbusInfoFieldsResponse(response));
  } catch (error) {
    yield put(airbusInfoFieldsResponse(error));
  }
}

export function* airbusInfoFieldsUpdateValue(data) {
  const payload = data;
  const url = AIRBUS_INFO_FIELDS_UPDATE_VALUE;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(airbusInfoFieldsUpdateValueResponse(response));
  } catch (error) {
    yield put(airbusInfoFieldsUpdateValueResponse(error));
  }
}

export function* addAirbusInfo(data) {
  const payload = data;
  const url = ADD_AIRBUS_INFO;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(addAirbusInfoResponse(response));
  } catch (error) {
    yield put(addAirbusInfoResponse(error));
  }
}

export function* editAirbusInfo(data) {
  const payload = data;
  const url = EDIT_AIRBUS_INFO;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(editAirbusInfoResponse(response));
  } catch (error) {
    yield put(editAirbusInfoResponse(error));
  }
}

export function* deleteAirbusInfo(data) {
  const payload = data;
  const url = DELETE_AIRBUS_INFO;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(deleteAirbusInfoResponse(response));
  } catch (error) {
    yield put(deleteAirbusInfoResponse(error));
  }
}

export function* airlineDetails(data) {
  const payload = data;
  const url = AIRLINE_DETAILS;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(airlineDetailsResponse(response));
  } catch (error) {
    yield put(airlineDetailsResponse(error));
  }
}

export function* airlineDetailsFields(data) {
  const payload = data;
  const url = AIRLINE_DETAILS_FIELDS;
  try {
    const response = yield call(getRequest, url, payload);
    yield put(airlineDetailsFieldsResponse(response));
  } catch (error) {
    yield put(airlineDetailsFieldsResponse(error));
  }
}

export function* airlineDetailsFieldsUpdateValue(data) {
  const payload = data;
  const url = AIRLINE_DETAILS_FIELDS_UPDATE_VALUE;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(airlineDetailsFieldsUpdateValueResponse(response));
  } catch (error) {
    yield put(airlineDetailsFieldsUpdateValueResponse(error));
  }
}

export function* addAirlineDetails(data) {
  const payload = data;
  const url = ADD_AIRLINE_DETAILS;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(addAirlineDetailsResponse(response));
  } catch (error) {
    yield put(addAirlineDetailsResponse(error));
  }
}

export function* editAirlineDetails(data) {
  const payload = data;
  const url = EDIT_AIRLINE_DETAILS;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(editAirlineDetailsResponse(response));
  } catch (error) {
    yield put(editAirlineDetailsResponse(error));
  }
}

export function* deleteAirlineDetails(data) {
  const payload = data;
  const url = DELETE_AIRLINE_DETAILS;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(deleteAirlineDetailsResponse(response));
  } catch (error) {
    yield put(deleteAirlineDetailsResponse(error));
  }
}

export function* flightServiceSaga() {
  yield takeLatest(actions.AIRLINE_PUNCTUALITY, airlinePunctuality),
    yield takeLatest(
      actions.AIRLINE_PUNCTUALITY_FIELDS,
      airlinePunctualityFields
    ),
    yield takeLatest(
      actions.AIRLINE_PUNCTUALITY_FIELDS_UPDATE_VALUE,
      airlinePunctualityFieldsUpdateValue
    ),
    yield takeLatest(actions.ADD_AIRLINE_PUNCTUALITY, addAirlinePunctuality),
    yield takeLatest(actions.EDIT_AIRLINE_PUNCTUALITY, editAirlinePunctuality),
    yield takeLatest(
      actions.DELETE_AIRLINE_PUNCTUALITY,
      deleteAirlinePunctuality
    );
  yield takeLatest(actions.AIRBUS_INFO, airbusInfo),
    yield takeLatest(actions.AIRBUS_INFO_FIELDS, airbusInfoFields),
    yield takeLatest(
      actions.AIRBUS_INFO_FIELDS_UPDATE_VALUE,
      airbusInfoFieldsUpdateValue
    ),
    yield takeLatest(actions.ADD_AIRBUS_INFO, addAirbusInfo),
    yield takeLatest(actions.EDIT_AIRBUS_INFO, editAirbusInfo),
    yield takeLatest(actions.DELETE_AIRBUS_INFO, deleteAirbusInfo),
    yield takeLatest(actions.AIRLINE_DETAILS, airlineDetails),
    yield takeLatest(actions.AIRLINE_DETAILS_FIELDS, airlineDetailsFields),
    yield takeLatest(
      actions.AIRLINE_DETAILS_FIELDS_UPDATE_VALUE,
      airlineDetailsFieldsUpdateValue
    ),
    yield takeLatest(actions.ADD_AIRLINE_DETAILS, addAirlineDetails),
    yield takeLatest(actions.EDIT_AIRLINE_DETAILS, editAirlineDetails),
    yield takeLatest(actions.DELETE_AIRLINE_DETAILS, deleteAirlineDetails);
}
