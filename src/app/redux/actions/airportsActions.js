import {
  GET_AIRPORT_FIELDS,
  GET_AIRPORT_FIELDS_RESPONSE,
  GET_AIRPORT_FIELDS_UPDATE_VALUE,
  GET_AIRPORT_FIELDS_UPDATE_VALUE_RESPONSE,
  GET_ACTIVE_AIRPORTS,
  GET_ACTIVE_AIRPORTS_RESPONSE,
  GET_AIRPORTS,
  GET_AIRPORTS_RESPONSE,
  GET_AIRPORTS_DETAILS,
  GET_AIRPORTS_DETAILS_RESPONSE,
  ADD_AIRPORT,
  ADD_AIRPORT_RESPONSE,
  DOWNLOAD_AIRPORTS,
  DOWNLOAD_AIRPORTS_RESPONSE,
  EDIT_AIRPORT,
  EDIT_AIRPORT_RESPONSE,
  DELETE_AIRPORT,
  DELETE_AIRPORT_RESPONSE
} from "./actionTypes";

export const getAirportFields = data => ({
  type: GET_AIRPORT_FIELDS,
  data
});

export const getAirportFieldsResponse = data => ({
  type: GET_AIRPORT_FIELDS_RESPONSE,
  response: data
});

export const getAirportFieldsUpdateValue = data => ({
  type: GET_AIRPORT_FIELDS_UPDATE_VALUE,
  data
});

export const getAirportFieldsUpdateValueResponse = data => ({
  type: GET_AIRPORT_FIELDS_UPDATE_VALUE_RESPONSE,
  response: data
});

export const getActiveAirports = data => ({
  type: GET_ACTIVE_AIRPORTS,
  data
});

export const getActiveAirportsResponse = data => ({
  type: GET_ACTIVE_AIRPORTS_RESPONSE,
  response: data
});

export const getAirports = data => ({
  type: GET_AIRPORTS,
  data
});

export const getAirportsResponse = data => ({
  type: GET_AIRPORTS_RESPONSE,
  response: data
});

export const getAirportsDetails = data => ({
  type: GET_AIRPORTS_DETAILS,
  data
});

export const getAirportsDetailsResponse = data => ({
  type: GET_AIRPORTS_DETAILS_RESPONSE,
  response: data
});

export const addAirport = data => ({
  type: ADD_AIRPORT,
  data
});

export const addAirportResponse = data => ({
  type: ADD_AIRPORT_RESPONSE,
  response: data
});

export const downloadAirports = data => ({
  type: DOWNLOAD_AIRPORTS,
  data
});
export const downloadAirportsResponse = data => ({
  type: DOWNLOAD_AIRPORTS_RESPONSE,
  response: data
});

// edit airport
export const editAirport = data => ({
  type: EDIT_AIRPORT,
  data
});

export const editAirportResponse = data => ({
  type: EDIT_AIRPORT_RESPONSE,
  response: data
});

export const deleteAirport = data => ({
  type: DELETE_AIRPORT,
  data
});

export const deleteAirportResponse = data => ({
  type: DELETE_AIRPORT_RESPONSE,
  response: data
});
