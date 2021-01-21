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
} from '../actions/actionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case COUNTRY_DETAILS_FIELDS:
      return {
        ...state,
        isLoading: true
      };
    case COUNTRY_DETAILS_FIELDS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        countryDetailsFieldsResponse: action.response
      };
    case COUNTRY_DETAILS_FIELDS_UPDATE_VALUE:
      return {
        ...state,
        isLoading: true
      };
    case COUNTRY_DETAILS_FIELDS_UPDATE_VALUE_RESPONSE:
      return {
        ...state,
        isLoading: false,
        countryDetailsFieldsUpdateValueResponse: action.response
      };
    case COUNTRY_DETAILS:
      return {
        ...state,
        isLoading: true
      };
    case COUNTRY_DETAILS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        countryDetailsResponse: action.response
      };

    case ADD_COUNTRY_DETAILS:
      return {
        ...state,
        isLoading: true
      };
    case ADD_COUNTRY_DETAILS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        addCountryDetailsResponse: action.response
      };
    case EDIT_COUNTRY_DETAILS:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_COUNTRY_DETAILS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        editCountryDetailsResponse: action.response
      };
    case DELETE_COUNTRY_DETAILS:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_COUNTRY_DETAILS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        deleteCountryDetailsResponse: action.response
      };
    default:
      return state;
  }
}
