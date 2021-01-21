import {
  COUNTRY_DETAILS_FIELDS,
  COUNTRY_DETAILS_FIELDS_RESPONSE,
  COUNTRY_DETAILS_FIELDS_UPDATE_VALUE,
  COUNTRY_DETAILS_FIELDS_UPDATE_VALUE_RESPONSE,
  COUNTRY_DETAILS,
  COUNTRY_DETAILS_RESPONSE,
  ADD_COUNTRY_DETAILS,
  ADD_COUNTRY_DETAILS_RESPONSE,
  EDIT_COUNTRY_DETAILS,
  EDIT_COUNTRY_DETAILS_RESPONSE,
  DELETE_COUNTRY_DETAILS,
  DELETE_COUNTRY_DETAILS_RESPONSE
} from './actionTypes';

// get countryDetails fields
export const countryDetailsFields = data => ({
  type: COUNTRY_DETAILS_FIELDS,
  data
});
export const countryDetailsFieldsResponse = data => ({
  type: COUNTRY_DETAILS_FIELDS_RESPONSE,
  response: data
});

//get countryDetails fields value
export const countryDetailsFieldsUpdateValue = data => ({
  type: COUNTRY_DETAILS_FIELDS_UPDATE_VALUE,
  data
});
export const countryDetailsFieldsUpdateValueResponse = data => ({
  type: COUNTRY_DETAILS_FIELDS_UPDATE_VALUE_RESPONSE,
  response: data
});

export const countryDetails = data => ({
  type: COUNTRY_DETAILS,
  data: data
});

export const countryDetailsResponse = data => ({
  type: COUNTRY_DETAILS_RESPONSE,
  response: data
});

//add countryDetails
export const addCountryDetails = data => ({
  type: ADD_COUNTRY_DETAILS,
  data
});
export const addCountryDetailsResponse = data => ({
  type: ADD_COUNTRY_DETAILS_RESPONSE,
  response: data
});

//edit CountryDetails
export const editCountryDetails = data => ({
  type: EDIT_COUNTRY_DETAILS,
  data
});
export const editCountryDetailsResponse = data => ({
  type: EDIT_COUNTRY_DETAILS_RESPONSE,
  response: data
});

//delete CountryDetails
export const deleteCountryDetails = data => ({
  type: DELETE_COUNTRY_DETAILS,
  data
});
export const deleteCountryDetailsResponse = data => ({
  type: DELETE_COUNTRY_DETAILS_RESPONSE,
  response: data
});
