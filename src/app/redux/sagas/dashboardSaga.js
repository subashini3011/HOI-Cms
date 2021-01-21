import { call, put, takeLatest } from 'redux-saga/effects';
import * as dataAccess from '../../utils/ajax';

import actions from '../actions/actionTypes';

import {
  lastOrdersResponse,
  revenueChartDataResponse,
  exportLastOrdersResponse
} from '../actions/dashboardActions';
import { debug } from 'util';

import {
  LAST_ORDERS,
  REVENUE_CHART_DATA,
  EXPORT_LAST_ORDERS
} from 'constants/api-constants';

const postRequest = async (url, payload) => await dataAccess.post(url, payload);
const postRequestDownload = async (url, payload) =>
  await dataAccess.postRequestDownload(url, payload);
export function* lastOrders(data) {
  const payload = data;
  let url = LAST_ORDERS;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(lastOrdersResponse(response));
  } catch (error) {
    yield put(lastOrdersResponse(error));
  }
}

export function* revenueChartData(data) {
  const payload = data;
  let url = REVENUE_CHART_DATA;
  try {
    const response = yield call(postRequest, url, payload);
    yield put(revenueChartDataResponse(response));
  } catch (error) {
    yield put(revenueChartDataResponse(error));
  }
}

export function* exportLastOrders(data) {
  const payload = data;
  let url = EXPORT_LAST_ORDERS;
  try {
    const response = yield call(postRequestDownload, url, payload);
    yield put(exportLastOrdersResponse(response));
  } catch (error) {
    yield put(exportLastOrdersResponse(error));
  }
}

export function* dashboardSaga() {
  yield takeLatest(actions.LAST_ORDERS, lastOrders),
    yield takeLatest(actions.REVENUE_CHART_DATA, revenueChartData),
    yield takeLatest(actions.EXPORT_LAST_ORDERS, exportLastOrders);
}
