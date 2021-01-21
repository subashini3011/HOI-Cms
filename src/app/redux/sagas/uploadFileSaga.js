import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import * as dataAccess from "../../utils/ajax";

import actions from "../actions/actionTypes";

import {
  uploadFileResponse,
  bulkUploadResponse
} from "../actions/uploadFileActions";

import { BULK_UPLOAD_DEL, BULK_UPLOAD_HYD } from "constants/api-constants";

const postFile = async (url, payload) =>
  await dataAccess.postFile(url, payload);

export function* uploadFile(data) {
  const payload = {
    data: data.data.data,
    type: data.type
  };
  let url = data.data.url;
  try {
    const response = yield call(postFile, url, payload);

    yield put(uploadFileResponse(response));
  } catch (error) {
    yield put(uploadFileResponse(error));
  }
}

export function* bulkUpload(data) {
  const payload = {
    data: data.data.data,
    type: data.type
  };

  let url =
    data.data.airport_name === "DEL" ? BULK_UPLOAD_DEL : BULK_UPLOAD_HYD;
  try {
    const response = yield call(postFile, url, payload);

    yield put(bulkUploadResponse(response));
  } catch (error) {
    yield put(bulkUploadResponse(error));
  }
}

export function* uploadFileSaga() {
  yield takeEvery(actions.UPLOAD_FILE, uploadFile); // this one we use takeEvery()
  yield takeLatest(actions.BULK_UPLOAD, bulkUpload);
}
