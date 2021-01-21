import { call, put, takeLatest } from "redux-saga/effects";
import { debug } from "util";
import {
  GET_TERMINAL_FIELDS,
  GET_TERMINAL_FIELDS_UPDATE_VALUE,
  GET_TERMINALS,
  ADD_TERMINAL,
  EDIT_TERMINAL,
  DELETE_TERMINAL
} from "constants/api-constants";
import * as dataAccess from "../../utils/ajax";

import actions from "../actions/actionTypes";

import {
  getTerminalFieldsResponse,
  getTerminalFieldsUpdateValueResponse,
  getTerminalsResponse,
  addTerminalResponse,
  editTerminalResponse,
  deleteTerminalResponse
} from "../actions/terminalActions";

const getRequest = async (url, payload) => await dataAccess.get(url, payload);

const postRequest = async (url, payload) => await dataAccess.post(url, payload);

export function* getTerminalFields(data) {
  const payload = data;
  const url = GET_TERMINAL_FIELDS;
  try {
    const response = yield call(getRequest, url, payload);
  
    yield put(getTerminalFieldsResponse(response));
  } catch (error) {
    yield put(getTerminalFieldsResponse(error));
  }
}

export function* getTerminalFieldsUpdateValue(data) {
  const payload = data;
  const url = GET_TERMINAL_FIELDS_UPDATE_VALUE;
  try {
    const response = yield call(postRequest, url, payload);
  
    yield put(getTerminalFieldsUpdateValueResponse(response));
  } catch (error) {
    yield put(getTerminalFieldsUpdateValueResponse(error));
  }
}

export function* getTerminals(data) {
  const payload = data;
  const url = GET_TERMINALS;
  try {
    const response = yield call(postRequest, url, payload);
  
    yield put(getTerminalsResponse(response));
  } catch (error) {
    yield put(getTerminalsResponse(error));
  }
}

export function* addTerminal(data) {
  const payload = data;
  const url = ADD_TERMINAL;
  try {
    const response = yield call(postRequest, url, payload);
  
    yield put(addTerminalResponse(response));
  } catch (error) {
    yield put(addTerminalResponse(error));
  }
}

export function* editTerminal(data) {
  const payload = data;
  const url = EDIT_TERMINAL;
  try {
    const response = yield call(postRequest, url, payload);
  
    yield put(editTerminalResponse(response));
  } catch (error) {
    yield put(editTerminalResponse(error));
  }
}

export function* deleteTerminal(data) {
  const payload = data;
  const url = DELETE_TERMINAL;
  try {
    const response = yield call(postRequest, url, payload);
  
    yield put(deleteTerminalResponse(response));
  } catch (error) {
    yield put(deleteTerminalResponse(error));
  }
}

export function* terminalSaga() {
  yield takeLatest(actions.GET_TERMINAL_FIELDS, getTerminalFields),
    yield takeLatest(
      actions.GET_TERMINAL_FIELDS_UPDATE_VALUE,
      getTerminalFieldsUpdateValue
    ),
    yield takeLatest(actions.GET_TERMINALS, getTerminals),
    yield takeLatest(actions.ADD_TERMINAL, addTerminal),
    yield takeLatest(actions.EDIT_TERMINAL, editTerminal),
    yield takeLatest(actions.DELETE_TERMINAL, deleteTerminal);
}
