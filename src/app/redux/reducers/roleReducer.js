import {
  GET_STORES,
  GET_STORES_RESPONSE,
  GET_STORE_UPDATE_REQUESTS,
  GET_STORE_UPDATE_REQUESTS_RESPONSE,
  STORE_UPDATE_APPROVED,
  STORE_UPDATE_APPROVED_RESPONSE,
  STORE_UPDATE_REJECTED,
  STORE_UPDATE_REJECTED_RESPONSE
} from "../actions/actionTypes";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STORES:
      return {
        ...state,
        isLoading: true
      };
    case GET_STORES_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getStoresResponse: action.response
      };
    case GET_STORE_UPDATE_REQUESTS:
      return {
        ...state,
        isLoading: true
      };
    case GET_STORE_UPDATE_REQUESTS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getStoreUpdateRequestsResponse: action.response
      };
    case STORE_UPDATE_APPROVED:
      return {
        ...state,
        isLoading: true
      };
    case STORE_UPDATE_APPROVED_RESPONSE:
      return {
        ...state,
        isLoading: false,
        storeUpdateApprovedResponse: action.response
      };
    case STORE_UPDATE_REJECTED:
      return {
        ...state,
        isLoading: true
      };
    case STORE_UPDATE_REJECTED_RESPONSE:
      return {
        ...state,
        isLoading: false,
        storeUpdateRejectedResponse: action.response
      };

    default:
      return state;
  }
}
