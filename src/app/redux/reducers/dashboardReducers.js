import {
  LAST_ORDERS,
  LAST_ORDERS_RESPONSE,
  REVENUE_CHART_DATA,
  REVENUE_CHART_DATA_RESPONSE,
  EXPORT_LAST_ORDERS,
  EXPORT_LAST_ORDERS_RESPONSE
} from '../actions/actionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case LAST_ORDERS:
      return {
        ...state,
        isLoading: true
      };
    case LAST_ORDERS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        lastOrdersResponse: action.response
      };
    case REVENUE_CHART_DATA:
      return {
        ...state,
        isLoading: true
      };
    case REVENUE_CHART_DATA_RESPONSE:
      return {
        ...state,
        isLoading: false,
        revenueChartDataResponse: action.response
      };
    case REVENUE_CHART_DATA:
      return {
        ...state,
        isLoading: true
      };
    case REVENUE_CHART_DATA_RESPONSE:
      return {
        ...state,
        isLoading: false,
        revenueChartDataResponse: action.response
      };
    case EXPORT_LAST_ORDERS:
      return {
        ...state,
        isLoading: true
      };
    case EXPORT_LAST_ORDERS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        exportLastOrdersResponse: action.response
      };

    default:
      return state;
  }
}
