import { call, put, takeLatest } from "redux-saga/effects";
import { debug } from "util";
import {
  GET_STORE_FIELDS,
  GET_STORE_FIELDS_UPDATE_VALUE,
  ADD_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  ADD_SUB_CATEGORY,
  EDIT_SUB_CATEGORY,
  DELETE_SUB_CATEGORY,
  GET_OUTLETS,
  ADD_OUTLETS,
  EDIT_OUTLETS,
  DELETE_OUTLETS,
  GET_SUB_CATEGORY
} from "constants/api-constants";
import * as dataAccess from "../../utils/ajax";

import actions from "../actions/actionTypes";

import {
  getStoreFieldsResponse,
  addCategoryResponse,
  editCategoryResponse,
  deleteCategoryResponse,
  addSubCategoryResponse,
  deleteSubCategoryResponse,
  editSubCategoryResponse,
  getOutletsResponse,
  addOutletsResponse,
  editOutletsResponse,
  deleteOutletsResponse,
  getSubCategoryResponse,
  getStoreFieldsUpdateValueResponse
} from "../actions/outletsActions";
import * as User from "../../shared/app-data/user";
const userInfo = User.getUserData();
const getRequest = async (url, payload) => await dataAccess.get(url, payload);

const postRequest = async (url, payload) => await dataAccess.post(url, payload);

export function* getStoreFields(data) {
  const payload = data;
  const url = GET_STORE_FIELDS;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(getStoreFieldsResponse(response));
  } catch (error) {
    yield put(getStoreFieldsResponse(error));
  }
}

export function* getStoreFieldsUpdateValue(data) {
  const payload = data;
  const url = GET_STORE_FIELDS_UPDATE_VALUE;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(getStoreFieldsUpdateValueResponse(response));
  } catch (error) {
    yield put(getStoreFieldsUpdateValueResponse(error));
  }
}

export function* getOutlets(data) {
  const payload = data;
  const url = GET_OUTLETS;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(getOutletsResponse(response));
  } catch (error) {
    yield put(getOutletsResponse(error));
  }
}

export function* getSubCategory(data) {
  const payload = data;
  const url = GET_SUB_CATEGORY;
  try {
    const response = yield call(getRequest, url, payload);
   
    yield put(getSubCategoryResponse(response));
  } catch (error) {
    yield put(getSubCategoryResponse(error));
  }
}

export function* addCategory(data) {
  const payload = data;
  const url = ADD_CATEGORY;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(addCategoryResponse(response));
  } catch (error) {
    yield put(addCategoryResponse(error));
  }
}

export function* editCategory(data) {
  const payload = data;
  const url = EDIT_CATEGORY;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(editCategoryResponse(response));
  } catch (error) {
    yield put(editCategoryResponse(error));
  }
}

export function* deleteCategory(data) {
  const payload = data;
  const url = DELETE_CATEGORY;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(deleteCategoryResponse(response));
  } catch (error) {
    yield put(deleteCategoryResponse(error));
  }
}

export function* addSubCategory(data) {
  const payload = data;
  const url = ADD_SUB_CATEGORY;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(addSubCategoryResponse(response));
  } catch (error) {
    yield put(addSubCategoryResponse(error));
  }
}

export function* editSubCategory(data) {
  const payload = data;
  const url = EDIT_SUB_CATEGORY;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(editSubCategoryResponse(response));
  } catch (error) {
    yield put(editSubCategoryResponse(error));
  }
}

export function* deleteSubCategory(data) {
  const payload = data;
  const url = DELETE_SUB_CATEGORY;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(deleteSubCategoryResponse(response));
  } catch (error) {
    yield put(deleteSubCategoryResponse(error));
  }
}

export function* addOutlets(data) {
  const payload = data;
  const url = ADD_OUTLETS;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(addOutletsResponse(response));
  } catch (error) {
    yield put(addOutletsResponse(error));
  }
}

export function* editOutlets(data) {
  const payload = data;
  const url = EDIT_OUTLETS;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(editOutletsResponse(response));
  } catch (error) {
    yield put(editOutletsResponse(error));
  }
}

export function* deleteOutlets(data) {
  const payload = data;
  const url = DELETE_OUTLETS;
  try {
    const response = yield call(postRequest, url, payload);
   
    yield put(deleteOutletsResponse(response));
  } catch (error) {
    yield put(deleteOutletsResponse(error));
  }
}

export function* outletsSaga() {
  yield takeLatest(actions.GET_STORE_FIELDS, getStoreFields),
    yield takeLatest(
      actions.GET_STORE_FIELDS_UPDATE_VALUE,
      getStoreFieldsUpdateValue
    ),
    yield takeLatest(actions.GET_OUTLETS, getOutlets),
    yield takeLatest(actions.GET_SUB_CATEGORY, getSubCategory),
    yield takeLatest(actions.ADD_CATEGORY, addCategory),
    yield takeLatest(actions.EDIT_CATEGORY, editCategory),
    yield takeLatest(actions.DELETE_CATEGORY, deleteCategory),
    yield takeLatest(actions.ADD_SUB_CATEGORY, addSubCategory),
    yield takeLatest(actions.EDIT_SUB_CATEGORY, editSubCategory),
    yield takeLatest(actions.DELETE_SUB_CATEGORY, deleteSubCategory),
    yield takeLatest(actions.ADD_OUTLETS, addOutlets),
    yield takeLatest(actions.EDIT_OUTLETS, editOutlets),
    yield takeLatest(actions.DELETE_OUTLETS, deleteOutlets);
}
