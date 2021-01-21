import {
  GET_STORES,
  GET_STORES_RESPONSE,
  GET_STORE_UPDATE_REQUESTS,
  GET_STORE_UPDATE_REQUESTS_RESPONSE,
  STORE_UPDATE_APPROVED,
  STORE_UPDATE_APPROVED_RESPONSE,
  STORE_UPDATE_REJECTED,
  STORE_UPDATE_REJECTED_RESPONSE
} from "./actionTypes";

export const getStores = data => ({
  type: GET_STORES,
  data
});
export const getStoresResponse = data => ({
  type: GET_STORES_RESPONSE,
  response: data
});

export const getStoreUpdateRequests = data => ({
  type: GET_STORE_UPDATE_REQUESTS,
  data
});
export const getStoreUpdateRequestsResponse = data => ({
  type: GET_STORE_UPDATE_REQUESTS_RESPONSE,
  response: data
});

export const storeUpdateApproved = data => ({
  type: STORE_UPDATE_APPROVED,
  data
});
export const storeUpdateApprovedResponse = data => ({
  type: STORE_UPDATE_APPROVED_RESPONSE,
  response: data
});

export const storeUpdateRejected = data => ({
  type: STORE_UPDATE_REJECTED,
  data
});
export const storeUpdateRejectedResponse = data => ({
  type: STORE_UPDATE_REJECTED_RESPONSE,
  response: data
});
