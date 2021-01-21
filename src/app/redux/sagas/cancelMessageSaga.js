import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_CANCEL_MESSAGE_FIELDS,
  GET_CANCEL_MESSAGE_FIELDS_UPDATE_VALUE,
  GET_CANCEL_MESSAGE,
  ADD_CANCEL_MESSAGE,
  EDIT_CANCEL_MESSAGE,
  DELETE_CANCEL_MESSAGE
} from "constants/api-constants";
import * as dataAccess from "../../utils/ajax";

import actions from "../actions/actionTypes";

import {
  getCancelMessageFieldsResponse,
  getCancelMessageFieldsUpdateValueResponse,
  getCancelMessageResponse,
  addCancelMessageResponse,
  editCancelMessageResponse,
  deleteCancelMessageResponse
} from "../actions/cancel_message";

const getRequest = async (url, payload) => await dataAccess.get(url, payload);

const postRequest = async (url, payload) => await dataAccess.post(url, payload);
//  called for field

export function* getCancelMessageFields(data) {
  const payload = data;
  const url = GET_CANCEL_MESSAGE_FIELDS;
  try {
    const response = yield call(getRequest, url, payload);
    yield put(getCancelMessageFieldsResponse(response));
  } catch (error) {
    yield put(getCancelMessageFieldsResponse(error));
  }
}

export function* getCancelMessageFieldsUpdateValue(data) {
  const payload = data;
  const url = GET_CANCEL_MESSAGE_FIELDS_UPDATE_VALUE;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(getCancelMessageFieldsUpdateValueResponse(response));
  } catch (error) {
    yield put(getCancelMessageFieldsUpdateValueResponse(error));
  }
}

export function* getCancelMessage(data) {
  const payload = data;
  const url = GET_CANCEL_MESSAGE;

  try {
    const response = yield call(getRequest, url, payload);
    yield put(getCancelMessageResponse(response));
  } catch (error) {
    yield put(getCancelMessageResponse(error));
  }
}

export function* addCancelMessage(data) {
  const payload = data;
  const url = ADD_CANCEL_MESSAGE;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(addCancelMessageResponse(response));
  } catch (error) {
    yield put(addCancelMessageResponse(error));
  }
}

export function* editCancelMessage(data) {
  const payload = data;
  const url = EDIT_CANCEL_MESSAGE;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(editCancelMessageResponse(response));
  } catch (error) {
    yield put(editCancelMessageResponse(error));
  }
}

export function* deleteCancelMessage(data) {
  const payload = data;
  const url = DELETE_CANCEL_MESSAGE;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(deleteCancelMessageResponse(response));
  } catch (error) {
    yield put(deleteCancelMessageResponse(error));
  }
}

export function* cancelMessageSaga() {
  yield takeLatest(actions.GET_CANCEL_MESSAGE_FIELDS, getCancelMessageFields),
    yield takeLatest(
      actions.GET_CANCEL_MESSAGE_FIELDS_UPDATE_VALUE,
      getCancelMessageFieldsUpdateValue
    ),
    yield takeLatest(actions.GET_CANCEL_MESSAGE, getCancelMessage),
    yield takeLatest(actions.ADD_CANCEL_MESSAGE, addCancelMessage),
    yield takeLatest(actions.DELETE_CANCEL_MESSAGE, deleteCancelMessage);
  yield takeLatest(actions.EDIT_CANCEL_MESSAGE, editCancelMessage);
}
