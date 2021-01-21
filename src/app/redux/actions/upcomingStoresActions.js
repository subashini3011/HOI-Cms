import {
  GET_UPCOMING_STORES_FIELDS,
  GET_UPCOMING_STORES_FIELDS_RESPONSE,
  GET_UPCOMING_STORES_FIELDS_UPDATE_VALUE,
  GET_UPCOMING_STORES_FIELDS_UPDATE_VALUE_RESPONSE,
  GET_UPCOMING_STORES,
  GET_UPCOMING_STORES_RESPONSE,
  ADD_UPCOMING_STORES,
  ADD_UPCOMING_STORES_RESPONSE,
  EDIT_UPCOMING_STORES,
  EDIT_UPCOMING_STORES_RESPONSE,
  DELETE_UPCOMING_STORES,
  DELETE_UPCOMING_STORES_RESPONSE
} from "./actionTypes";

// get UpcomingStores fields
export const getUpcomingStoresFields = data => ({
  type: GET_UPCOMING_STORES_FIELDS,
  data
});
export const getUpcomingStoresFieldsResponse = data => ({
  type: GET_UPCOMING_STORES_FIELDS_RESPONSE,
  response: data
});

//get UpcomingStores fields value
export const getUpcomingStoresFieldsUpdateValue = data => ({
  type: GET_UPCOMING_STORES_FIELDS_UPDATE_VALUE,
  data
});
export const getUpcomingStoresFieldsUpdateValueResponse = data => ({
  type: GET_UPCOMING_STORES_FIELDS_UPDATE_VALUE_RESPONSE,
  response: data
});

export const getUpcomingStores = data => ({
  type: GET_UPCOMING_STORES,
  data: data
});

export const getUpcomingStoresResponse = data => ({
  type: GET_UPCOMING_STORES_RESPONSE,
  response: data
});

//add UpcomingStores
export const addUpcomingStores = data => ({
  type: ADD_UPCOMING_STORES,
  data
});
export const addUpcomingStoresResponse = data => ({
  type: ADD_UPCOMING_STORES_RESPONSE,
  response: data
});

//edit UpcomingStores
export const editUpcomingStores = data => ({
  type: EDIT_UPCOMING_STORES,
  data
});
export const editUpcomingStoresResponse = data => ({
  type: EDIT_UPCOMING_STORES_RESPONSE,
  response: data
});

//delete UpcomingStores
export const deleteUpcomingStores = data => ({
  type: DELETE_UPCOMING_STORES,
  data
});
export const deleteUpcomingStoresResponse = data => ({
  type: DELETE_UPCOMING_STORES_RESPONSE,
  response: data
});
