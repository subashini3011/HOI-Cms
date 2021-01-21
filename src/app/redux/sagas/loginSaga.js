import { call, put, takeLatest } from "redux-saga/effects";
import * as dataAccess from "../../utils/ajax";

import actions from "../actions/actionTypes";

import { loginResponse, forgotPasswordResponse } from "../actions/loginActions";
import { debug } from "util";

import { LOGIN, FORGOT_PASSWORD } from "constants/api-constants";

const postRequest = async (url, payload) => await dataAccess.post(url, payload);

export function* login(data) {
  const payload = data;
  let url = LOGIN;
  try {
    const response = yield call(postRequest, url, payload);
  
    yield put(loginResponse(response));
  } catch (error) {
    yield put(loginResponse(error));
  }
}

export function* forgotPassword(data) {
  const payload = data;
  let url = FORGOT_PASSWORD;
  try {
    const response = yield call(postRequest, url, payload);
  
    yield put(forgotPasswordResponse(response));
  } catch (error) {
    yield put(forgotPasswordResponse(error));
  }
}

export function* loginSaga() {
  yield takeLatest(actions.LOGIN, login),
    yield takeLatest(actions.FORGOT_PASSWORD, forgotPassword);
}
