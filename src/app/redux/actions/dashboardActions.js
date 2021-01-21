import {
  LAST_ORDERS,
  LAST_ORDERS_RESPONSE,
  REVENUE_CHART_DATA,
  REVENUE_CHART_DATA_RESPONSE,
  EXPORT_LAST_ORDERS,
  EXPORT_LAST_ORDERS_RESPONSE
} from './actionTypes';

export const lastOrders = data => ({
  type: LAST_ORDERS,
  data: data
});
export const lastOrdersResponse = data => ({
  type: LAST_ORDERS_RESPONSE,
  response: data
});

export const revenueChartData = data => ({
  type: REVENUE_CHART_DATA,
  data: data
});
export const revenueChartDataResponse = data => ({
  type: REVENUE_CHART_DATA_RESPONSE,
  response: data
});

export const exportLastOrders = data => ({
  type: EXPORT_LAST_ORDERS,
  data: data
});
export const exportLastOrdersResponse = data => ({
  type: EXPORT_LAST_ORDERS_RESPONSE,
  response: data
});
