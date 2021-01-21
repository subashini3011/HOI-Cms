import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { debug } from "util";
import {
  GET_STORES_OFFER_FIELDS,
  GET_STORES_OFFER_FIELDS_UPDATE_VALUE,
  GET_STORES_OFFER,
  ADD_STORES_OFFER,
  EDIT_STORES_OFFER,
  DELETE_STORES_OFFER,
  UPLOAD_BARCODE,
  UPLOAD_REDEEM
} from "constants/api-constants";

import * as dataAccess from "../../utils/ajax";

import actions from "../actions/actionTypes";

import {
  getStoresOfferFieldsResponse,
  getStoresOfferFieldsUpdateValueResponse,
  getStoresOfferResponse,
  addStoresOfferResponse,
  editStoresOfferResponse,
  deleteStoresOfferResponse,
  uploadRedeemResponse,
  uploadBarcodeResponse
} from "../actions/storesOfferActions";

const getRequest = async (url, payload) => await dataAccess.get(url, payload);
const postRequest = async (url, payload) => await dataAccess.post(url, payload);
const postFile = async (url, payload) =>
  await dataAccess.postFile(url, payload);

export function* getStoresOfferFields(data) {
  const payload = data;
  const url = GET_STORES_OFFER_FIELDS;
  try {
    const response = yield call(getRequest, url, payload);

    yield put(getStoresOfferFieldsResponse(response));
  } catch (error) {
    yield put(getStoresOfferFieldsResponse(error));
  }
}

export function* getStoresOfferFieldsUpdateValue(data) {
  const payload = data;
  const url = GET_STORES_OFFER_FIELDS_UPDATE_VALUE;
  try {
    const response = yield call(postRequest, url, payload);

    yield put(getStoresOfferFieldsUpdateValueResponse(response));
  } catch (error) {
    yield put(getStoresOfferFieldsUpdateValueResponse(error));
  }
}

export function* getStoresOffer(data) {
  const payload = data;
  const url = GET_STORES_OFFER;
  try {
    const response = yield call(postRequest, url, payload);

    yield put(getStoresOfferResponse(response));
  } catch (error) {
    yield put(getStoresOfferResponse(error));
  }
}

export function* addStoresOffer(data) {
  const payload = data;
  const url = ADD_STORES_OFFER;
  try {
    const response = yield call(postRequest, url, payload);

    yield put(addStoresOfferResponse(response));
  } catch (error) {
    yield put(addStoresOfferResponse(error));
  }
}

export function* editStoresOffer(data) {
  const payload = data;
  const url = EDIT_STORES_OFFER;
  try {
    const response = yield call(postRequest, url, payload);

    yield put(editStoresOfferResponse(response));
  } catch (error) {
    yield put(editStoresOfferResponse(error));
  }
}

export function* deleteStoresOffer(data) {
  const payload = data;
  const url = DELETE_STORES_OFFER;
  try {
    const response = yield call(postRequest, url, payload);

    yield put(deleteStoresOfferResponse(response));
  } catch (error) {
    yield put(deleteStoresOfferResponse(error));
  }
}

export function* uploadBarcode(data) {
  // let payloadData = {
  //   fileUpload: data.data.fileUpload,
  //   offer_id: data.data.offer_id
  // };
  // let payload = { data: payloadData };
  // const payload = data.data;
  // const payload = data.data;

  const payload = {
    data: data.data
    // type: data.type
  };
  let url = UPLOAD_BARCODE;
  try {
    const response = yield call(postFile, url, payload);
    yield put(uploadBarcodeResponse(response));
  } catch (error) {
    yield put(uploadBarcodeResponse(error));
  }
}

export function* uploadRedeem(data) {
  const payload = {
    data: data.data.data,
    type: data.type
  };
  let url = UPLOAD_REDEEM;
  try {
    const response = yield call(postFile, url, payload);

    yield put(uploadRedeemResponse(response));
  } catch (error) {
    yield put(uploadRedeemResponse(error));
  }
}

export function* storesOfferSaga() {
  yield takeLatest(actions.GET_STORES_OFFER_FIELDS, getStoresOfferFields),
    yield takeLatest(
      actions.GET_STORES_OFFER_FIELDS_UPDATE_VALUE,
      getStoresOfferFieldsUpdateValue
    ),
    yield takeLatest(actions.GET_STORES_OFFER, getStoresOffer),
    yield takeLatest(actions.ADD_STORES_OFFER, addStoresOffer),
    yield takeLatest(actions.EDIT_STORES_OFFER, editStoresOffer),
    yield takeLatest(actions.DELETE_STORES_OFFER, deleteStoresOffer);
  yield takeEvery(actions.UPLOAD_BARCODE, uploadBarcode),
    yield takeEvery(actions.UPLOAD_REDEEM, uploadRedeem);
}
