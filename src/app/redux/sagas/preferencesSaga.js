import { call, put, takeLatest } from 'redux-saga/effects';
import { debug } from 'util';
import * as dataAccess from '../../utils/ajax';

import actions from '../actions/actionTypes';
import {
  seamlessFieldsResponse,
  seamlessFieldsUpdateValueResponse,
  seamlessValuesFieldsResponse,
  seamlessValuesFieldsUpdateValueResponse,
  seamlessResponse,
  addSeamlessResponse,
  updateSeamlessResponse,
  deleteSeamlessResponse,
  addSeamlessValuesResponse,
  updateSeamlessValuesResponse,
  deleteSeamlessValuesResponse,
  excitingFieldsResponse,
  excitingFieldsUpdateValueResponse,
  excitingValuesFieldsResponse,
  excitingValuesFieldsUpdateValueResponse,
  excitingResponse,
  addExcitingResponse,
  updateExcitingResponse,
  deleteExcitingResponse,
  addExcitingValuesResponse,
  updateExcitingValuesResponse,
  deleteExcitingValuesResponse
} from '../actions/preferencesActions';

import {
  SEAMLESS_FIELDS,
  SEAMLESS_FIELDS_UPDATE_VALUE,
  SEAMLESS_VALUES_FIELDS,
  SEAMLESS_VALUES_FIELDS_UPDATE_VALUE,
  SEAMLESS,
  ADD_SEAMLESS,
  UPDATE_SEAMLESS,
  DELETE_SEAMLESS,
  ADD_SEAMLESS_VALUES,
  UPDATE_SEAMLESS_VALUES,
  DELETE_SEAMLESS_VALUES,
  EXCITING_FIELDS,
  EXCITING_FIELDS_UPDATE_VALUE,
  EXCITING_VALUES_FIELDS,
  EXCITING_VALUES_FIELDS_UPDATE_VALUE,
  EXCITING,
  ADD_EXCITING,
  UPDATE_EXCITING,
  DELETE_EXCITING,
  ADD_EXCITING_VALUES,
  UPDATE_EXCITING_VALUES,
  DELETE_EXCITING_VALUES
} from 'constants/api-constants';

const getRequest = async (url, payload) => await dataAccess.get(url, payload);

const postRequest = async (url, payload) => await dataAccess.post(url, payload);

export function* seamlessFields(data) {
  const payload = data;
 
  const url = SEAMLESS_FIELDS;
  try {
    const response = yield call(getRequest, url, payload);
   
    yield put(seamlessFieldsResponse(response));
  } catch (error) {
    yield put(seamlessFieldsResponse(error));
  }
}

export function* seamlessFieldsUpdateValue(data) {
  const payload = data;
 
  const url = SEAMLESS_FIELDS_UPDATE_VALUE;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(seamlessFieldsUpdateValueResponse(response));
  } catch (error) {
    yield put(seamlessFieldsUpdateValueResponse(error));
  }
}

export function* seamlessValuesFields(data) {
  const payload = data;
 
  const url = SEAMLESS_VALUES_FIELDS;
  try {
    const response = yield call(getRequest, url, payload);
   
    yield put(seamlessValuesFieldsResponse(response));
  } catch (error) {
    yield put(seamlessValuesFieldsResponse(error));
  }
}

export function* seamlessValuesFieldsUpdateValue(data) {
  const payload = data;
 
  const url = SEAMLESS_VALUES_FIELDS_UPDATE_VALUE;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(seamlessValuesFieldsUpdateValueResponse(response));
  } catch (error) {
    yield put(seamlessValuesFieldsUpdateValueResponse(error));
  }
}

export function* seamless(data) {
  const payload = data;
 
  const url = SEAMLESS;
  try {
    const response = yield call(getRequest, url, payload);
   
    yield put(seamlessResponse(response));
  } catch (error) {
    yield put(seamlessResponse(error));
  }
}

export function* addSeamless(data) {
  const payload = data;
 
  const url = ADD_SEAMLESS;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(addSeamlessResponse(response));
  } catch (error) {
    yield put(addSeamlessResponse(error));
  }
}

export function* updateSeamless(data) {
  const payload = data;
 
  const url = UPDATE_SEAMLESS;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(updateSeamlessResponse(response));
  } catch (error) {
    yield put(updateSeamlessResponse(error));
  }
}

export function* deleteSeamless(data) {
  const payload = data;
 
  const url = DELETE_SEAMLESS;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(deleteSeamlessResponse(response));
  } catch (error) {
    yield put(deleteSeamlessResponse(error));
  }
}

export function* addSeamlessValues(data) {
  const payload = data;
 
  const url = ADD_SEAMLESS_VALUES;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(addSeamlessValuesResponse(response));
  } catch (error) {
    yield put(addSeamlessValuesResponse(error));
  }
}

export function* updateSeamlessValues(data) {
  const payload = data;
 
  const url = UPDATE_SEAMLESS_VALUES;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(updateSeamlessValuesResponse(response));
  } catch (error) {
    yield put(updateSeamlessValuesResponse(error));
  }
}

export function* deleteSeamlessValues(data) {
  const payload = data;
 
  const url = DELETE_SEAMLESS_VALUES;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(deleteSeamlessValuesResponse(response));
  } catch (error) {
    yield put(deleteSeamlessValuesResponse(error));
  }
}

export function* excitingFields(data) {
  const payload = data;
 
  const url = EXCITING_FIELDS;
  try {
    const response = yield call(getRequest, url, payload);
   
    yield put(excitingFieldsResponse(response));
  } catch (error) {
    yield put(excitingFieldsResponse(error));
  }
}

export function* excitingFieldsUpdateValue(data) {
  const payload = data;
 
  const url = EXCITING_FIELDS_UPDATE_VALUE;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(excitingFieldsUpdateValueResponse(response));
  } catch (error) {
    yield put(excitingFieldsUpdateValueResponse(error));
  }
}

export function* excitingValuesFields(data) {
  const payload = data;
 
  const url = EXCITING_VALUES_FIELDS;
  try {
    const response = yield call(getRequest, url, payload);
   
    yield put(excitingValuesFieldsResponse(response));
  } catch (error) {
    yield put(excitingValuesFieldsResponse(error));
  }
}

export function* excitingValuesFieldsUpdateValue(data) {
  const payload = data;
 
  const url = EXCITING_VALUES_FIELDS_UPDATE_VALUE;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(excitingValuesFieldsUpdateValueResponse(response));
  } catch (error) {
    yield put(excitingValuesFieldsUpdateValueResponse(error));
  }
}

export function* exciting(data) {
  const payload = data;
 
  const url = EXCITING;
  try {
    const response = yield call(getRequest, url, payload);
   
    yield put(excitingResponse(response));
  } catch (error) {
    yield put(excitingResponse(error));
  }
}

export function* addExciting(data) {
  const payload = data;
 
  const url = ADD_EXCITING;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(addExcitingResponse(response));
  } catch (error) {
    yield put(addExcitingResponse(error));
  }
}

export function* updateExciting(data) {
  const payload = data;
 
  const url = UPDATE_EXCITING;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(updateExcitingResponse(response));
  } catch (error) {
    yield put(updateExcitingResponse(error));
  }
}

export function* deleteExciting(data) {
  const payload = data;
 
  const url = DELETE_EXCITING;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(deleteExcitingResponse(response));
  } catch (error) {
    yield put(deleteExcitingResponse(error));
  }
}

export function* addExcitingValues(data) {
  const payload = data;
 
  const url = ADD_EXCITING_VALUES;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(addExcitingValuesResponse(response));
  } catch (error) {
    yield put(addExcitingValuesResponse(error));
  }
}

export function* updateExcitingValues(data) {
  const payload = data;
 
  const url = UPDATE_EXCITING_VALUES;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(updateExcitingValuesResponse(response));
  } catch (error) {
    yield put(updateExcitingValuesResponse(error));
  }
}

export function* deleteExcitingValues(data) {
  const payload = data;
 
  const url = DELETE_EXCITING_VALUES;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(deleteExcitingValuesResponse(response));
  } catch (error) {
    yield put(deleteExcitingValuesResponse(error));
  }
}

export function* preferencesSaga() {
  yield takeLatest(actions.SEAMLESS_FIELDS, seamlessFields),
    yield takeLatest(
      actions.SEAMLESS_FIELDS_UPDATE_VALUE,
      seamlessFieldsUpdateValue
    ),
    yield takeLatest(actions.SEAMLESS_VALUES_FIELDS, seamlessValuesFields),
    yield takeLatest(
      actions.SEAMLESS_VALUES_FIELDS_UPDATE_VALUE,
      seamlessValuesFieldsUpdateValue
    ),
    yield takeLatest(actions.SEAMLESS, seamless),
    yield takeLatest(actions.ADD_SEAMLESS, addSeamless),
    yield takeLatest(actions.UPDATE_SEAMLESS, updateSeamless),
    yield takeLatest(actions.DELETE_SEAMLESS, deleteSeamless),
    yield takeLatest(actions.ADD_SEAMLESS_VALUES, addSeamlessValues),
    yield takeLatest(actions.UPDATE_SEAMLESS_VALUES, updateSeamlessValues),
    yield takeLatest(actions.DELETE_SEAMLESS_VALUES, deleteSeamlessValues),
    yield takeLatest(actions.EXCITING_FIELDS, excitingFields),
    yield takeLatest(
      actions.EXCITING_FIELDS_UPDATE_VALUE,
      excitingFieldsUpdateValue
    ),
    yield takeLatest(actions.EXCITING_VALUES_FIELDS, excitingValuesFields),
    yield takeLatest(
      actions.EXCITING_VALUES_FIELDS_UPDATE_VALUE,
      excitingValuesFieldsUpdateValue
    ),
    yield takeLatest(actions.EXCITING, exciting),
    yield takeLatest(actions.ADD_EXCITING, addExciting),
    yield takeLatest(actions.UPDATE_EXCITING, updateExciting),
    yield takeLatest(actions.DELETE_EXCITING, deleteExciting),
    yield takeLatest(actions.ADD_EXCITING_VALUES, addExcitingValues),
    yield takeLatest(actions.UPDATE_EXCITING_VALUES, updateExcitingValues),
    yield takeLatest(actions.DELETE_EXCITING_VALUES, deleteExcitingValues);
}
