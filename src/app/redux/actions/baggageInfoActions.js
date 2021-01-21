import {
  GET_BAGGAGE_INFO_FIELDS,
  GET_BAGGAGE_INFO_FIELDS_RESPONSE,
  GET_BAGGAGE_INFO_FIELDS_UPDATE_VALUE,
  GET_BAGGAGE_INFO_FIELDS_UPDATE_VALUE_RESPONSE,
  GET_BAGGAGE_INFO,
  GET_BAGGAGE_INFO_RESPONSE,
  ADD_BAGGAGE_INFO,
  ADD_BAGGAGE_INFO_RESPONSE,
  EDIT_BAGGAGE_INFO,
  EDIT_BAGGAGE_INFO_RESPONSE,
  DELETE_BAGGAGE_INFO,
  DELETE_BAGGAGE_INFO_RESPONSE
} from './actionTypes';

// get BaggageInfo fields
export const getBaggageInfoFields = data => ({
  type: GET_BAGGAGE_INFO_FIELDS,
  data
});
export const getBaggageInfoFieldsResponse = data => ({
  type: GET_BAGGAGE_INFO_FIELDS_RESPONSE,
  response: data
});

//get BaggageInfo fields value
export const getBaggageInfoFieldsUpdateValue = data => ({
  type: GET_BAGGAGE_INFO_FIELDS_UPDATE_VALUE,
  data
});
export const getBaggageInfoFieldsUpdateValueResponse = data => ({
  type: GET_BAGGAGE_INFO_FIELDS_UPDATE_VALUE_RESPONSE,
  response: data
});

export const getBaggageInfo = data => ({
  type: GET_BAGGAGE_INFO,
  data: data
});

export const getBaggageInfoResponse = data => ({
  type: GET_BAGGAGE_INFO_RESPONSE,
  response: data
});

//add BaggageInfo
export const addBaggageInfo = data => ({
  type: ADD_BAGGAGE_INFO,
  data
});
export const addBaggageInfoResponse = data => ({
  type: ADD_BAGGAGE_INFO_RESPONSE,
  response: data
});

//edit BaggageInfo
export const editBaggageInfo = data => ({
  type: EDIT_BAGGAGE_INFO,
  data
});
export const editBaggageInfoResponse = data => ({
  type: EDIT_BAGGAGE_INFO_RESPONSE,
  response: data
});

//delete BaggageInfo
export const deleteBaggageInfo = data => ({
  type: DELETE_BAGGAGE_INFO,
  data
});
export const deleteBaggageInfoResponse = data => ({
  type: DELETE_BAGGAGE_INFO_RESPONSE,
  response: data
});
