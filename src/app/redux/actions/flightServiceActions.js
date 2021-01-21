import {
  AIRLINE_PUNCTUALITY_FIELDS,
  AIRLINE_PUNCTUALITY_FIELDS_RESPONSE,
  AIRLINE_PUNCTUALITY_FIELDS_UPDATE_VALUE,
  AIRLINE_PUNCTUALITY_FIELDS_UPDATE_VALUE_RESPONSE,
  AIRLINE_PUNCTUALITY,
  AIRLINE_PUNCTUALITY_RESPONSE,
  ADD_AIRLINE_PUNCTUALITY,
  ADD_AIRLINE_PUNCTUALITY_RESPONSE,
  EDIT_AIRLINE_PUNCTUALITY,
  EDIT_AIRLINE_PUNCTUALITY_RESPONSE,
  DELETE_AIRLINE_PUNCTUALITY,
  DELETE_AIRLINE_PUNCTUALITY_RESPONSE,
  AIRBUS_INFO_FIELDS,
  AIRBUS_INFO_FIELDS_RESPONSE,
  AIRBUS_INFO_FIELDS_UPDATE_VALUE,
  AIRBUS_INFO_FIELDS_UPDATE_VALUE_RESPONSE,
  AIRBUS_INFO,
  AIRBUS_INFO_RESPONSE,
  ADD_AIRBUS_INFO,
  ADD_AIRBUS_INFO_RESPONSE,
  EDIT_AIRBUS_INFO,
  EDIT_AIRBUS_INFO_RESPONSE,
  DELETE_AIRBUS_INFO,
  DELETE_AIRBUS_INFO_RESPONSE,
  AIRLINE_DETAILS_FIELDS,
  AIRLINE_DETAILS_FIELDS_RESPONSE,
  AIRLINE_DETAILS_FIELDS_UPDATE_VALUE,
  AIRLINE_DETAILS_FIELDS_UPDATE_VALUE_RESPONSE,
  AIRLINE_DETAILS,
  AIRLINE_DETAILS_RESPONSE,
  ADD_AIRLINE_DETAILS,
  ADD_AIRLINE_DETAILS_RESPONSE,
  EDIT_AIRLINE_DETAILS,
  EDIT_AIRLINE_DETAILS_RESPONSE,
  DELETE_AIRLINE_DETAILS,
  DELETE_AIRLINE_DETAILS_RESPONSE
} from './actionTypes';

export const airlinePunctualityFields = data => ({
  type: AIRLINE_PUNCTUALITY_FIELDS,
  data
});

export const airlinePunctualityFieldsResponse = data => ({
  type: AIRLINE_PUNCTUALITY_FIELDS_RESPONSE,
  data
});

export const airlinePunctualityFieldsUpdateValue = data => ({
  type: AIRLINE_PUNCTUALITY_FIELDS_UPDATE_VALUE,
  data
});

export const airlinePunctualityFieldsUpdateValueResponse = data => ({
  type: AIRLINE_PUNCTUALITY_FIELDS_UPDATE_VALUE_RESPONSE,
  data
});

export const airlinePunctuality = data => ({
  type: AIRLINE_PUNCTUALITY,
  data
});

export const airlinePunctualityResponse = data => ({
  type: AIRLINE_PUNCTUALITY_RESPONSE,
  data
});

export const addAirlinePunctuality = data => ({
  type: ADD_AIRLINE_PUNCTUALITY,
  data
});

export const addAirlinePunctualityResponse = data => ({
  type: ADD_AIRLINE_PUNCTUALITY_RESPONSE,
  response: data
});

export const editAirlinePunctuality = data => ({
  type: EDIT_AIRLINE_PUNCTUALITY,
  data
});

export const editAirlinePunctualityResponse = data => ({
  type: EDIT_AIRLINE_PUNCTUALITY_RESPONSE,
  response: data
});

export const deleteAirlinePunctuality = data => ({
  type: DELETE_AIRLINE_PUNCTUALITY,
  data
});

export const deleteAirlinePunctualityResponse = data => ({
  type: DELETE_AIRLINE_PUNCTUALITY_RESPONSE,
  response: data
});

export const airbusInfoFields = data => ({
  type: AIRBUS_INFO_FIELDS,
  data
});

export const airbusInfoFieldsResponse = data => ({
  type: AIRBUS_INFO_FIELDS_RESPONSE,
  data
});

export const airbusInfoFieldsUpdateValue = data => ({
  type: AIRBUS_INFO_FIELDS_UPDATE_VALUE,
  data
});

export const airbusInfoFieldsUpdateValueResponse = data => ({
  type: AIRBUS_INFO_FIELDS_UPDATE_VALUE_RESPONSE,
  data
});

export const airbusInfo = data => ({
  type: AIRBUS_INFO,
  data
});

export const airbusInfoResponse = data => ({
  type: AIRBUS_INFO_RESPONSE,
  data
});

export const addAirbusInfo = data => ({
  type: ADD_AIRBUS_INFO,
  data
});

export const addAirbusInfoResponse = data => ({
  type: ADD_AIRBUS_INFO_RESPONSE,
  response: data
});

export const editAirbusInfo = data => ({
  type: EDIT_AIRBUS_INFO,
  data
});

export const editAirbusInfoResponse = data => ({
  type: EDIT_AIRBUS_INFO_RESPONSE,
  response: data
});

export const deleteAirbusInfo = data => ({
  type: DELETE_AIRBUS_INFO,
  data
});

export const deleteAirbusInfoResponse = data => ({
  type: DELETE_AIRBUS_INFO_RESPONSE,
  response: data
});

export const airlineDetailsFields = data => ({
  type: AIRLINE_DETAILS_FIELDS,
  data
});

export const airlineDetailsFieldsResponse = data => ({
  type: AIRLINE_DETAILS_FIELDS_RESPONSE,
  data
});

export const airlineDetailsFieldsUpdateValue = data => ({
  type: AIRLINE_DETAILS_FIELDS_UPDATE_VALUE,
  data
});

export const airlineDetailsFieldsUpdateValueResponse = data => ({
  type: AIRLINE_DETAILS_FIELDS_UPDATE_VALUE_RESPONSE,
  data
});

export const airlineDetails = data => ({
  type: AIRLINE_DETAILS,
  data
});

export const airlineDetailsResponse = data => ({
  type: AIRLINE_DETAILS_RESPONSE,
  data
});

export const addAirlineDetails = data => ({
  type: ADD_AIRLINE_DETAILS,
  data
});

export const addAirlineDetailsResponse = data => ({
  type: ADD_AIRLINE_DETAILS_RESPONSE,
  response: data
});

export const editAirlineDetails = data => ({
  type: EDIT_AIRLINE_DETAILS,
  data
});

export const editAirlineDetailsResponse = data => ({
  type: EDIT_AIRLINE_DETAILS_RESPONSE,
  response: data
});

export const deleteAirlineDetails = data => ({
  type: DELETE_AIRLINE_DETAILS,
  data
});

export const deleteAirlineDetailsResponse = data => ({
  type: DELETE_AIRLINE_DETAILS_RESPONSE,
  response: data
});
