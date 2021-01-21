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
} from '../actions/actionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case AIRLINE_PUNCTUALITY:
      return {
        ...state,
        isLoading: true
      };
    case AIRLINE_PUNCTUALITY_RESPONSE:
      return {
        ...state,
        isLoading: false,
        airlinePunctualityResponse: action.data
      };
    case AIRLINE_PUNCTUALITY_FIELDS:
      return {
        ...state,
        isLoading: true
      };
    case AIRLINE_PUNCTUALITY_FIELDS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        airlinePunctualityFieldsResponse: action.data
      };
    case AIRLINE_PUNCTUALITY_FIELDS_UPDATE_VALUE:
      return {
        ...state,
        isLoading: true
      };
    case AIRLINE_PUNCTUALITY_FIELDS_UPDATE_VALUE_RESPONSE:
      return {
        ...state,
        isLoading: false,
        airlinePunctualityFieldsUpdateValueResponse: action.data
      };

    case ADD_AIRLINE_PUNCTUALITY:
      return {
        ...state,
        isLoading: true
      };
    case ADD_AIRLINE_PUNCTUALITY_RESPONSE:
      return {
        ...state,
        isLoading: false,
        addAirlinePunctualityResponse: action.response
      };

    case EDIT_AIRLINE_PUNCTUALITY:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_AIRLINE_PUNCTUALITY_RESPONSE:
      return {
        ...state,
        isLoading: false,
        editAirlinePunctualityResponse: action.response
      };

    case DELETE_AIRLINE_PUNCTUALITY:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_AIRLINE_PUNCTUALITY_RESPONSE:
      return {
        ...state,
        isLoading: false,
        deleteAirlinePunctualityResponse: action.response
      };

    case AIRBUS_INFO:
      return {
        ...state,
        isLoading: true
      };
    case AIRBUS_INFO_RESPONSE:
      return {
        ...state,
        isLoading: false,
        airbusInfoResponse: action.data
      };
    case AIRBUS_INFO_FIELDS:
      return {
        ...state,
        isLoading: true
      };
    case AIRBUS_INFO_FIELDS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        airbusInfoFieldsResponse: action.data
      };
    case AIRBUS_INFO_FIELDS_UPDATE_VALUE:
      return {
        ...state,
        isLoading: true
      };
    case AIRBUS_INFO_FIELDS_UPDATE_VALUE_RESPONSE:
      return {
        ...state,
        isLoading: false,
        airbusInfoFieldsUpdateValueResponse: action.data
      };

    case ADD_AIRBUS_INFO:
      return {
        ...state,
        isLoading: true
      };
    case ADD_AIRBUS_INFO_RESPONSE:
      return {
        ...state,
        isLoading: false,
        addAirbusInfoResponse: action.response
      };

    case EDIT_AIRBUS_INFO:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_AIRBUS_INFO_RESPONSE:
      return {
        ...state,
        isLoading: false,
        editAirbusInfoResponse: action.response
      };

    case DELETE_AIRBUS_INFO:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_AIRBUS_INFO_RESPONSE:
      return {
        ...state,
        isLoading: false,
        deleteAirbusInfoResponse: action.response
      };

    case AIRLINE_DETAILS:
      return {
        ...state,
        isLoading: true
      };
    case AIRLINE_DETAILS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        airlineDetailsResponse: action.data
      };
    case AIRLINE_DETAILS_FIELDS:
      return {
        ...state,
        isLoading: true
      };
    case AIRLINE_DETAILS_FIELDS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        airlineDetailsFieldsResponse: action.data
      };
    case AIRLINE_DETAILS_FIELDS_UPDATE_VALUE:
      return {
        ...state,
        isLoading: true
      };
    case AIRLINE_DETAILS_FIELDS_UPDATE_VALUE_RESPONSE:
      return {
        ...state,
        isLoading: false,
        airlineDetailsFieldsUpdateValueResponse: action.data
      };

    case ADD_AIRLINE_DETAILS:
      return {
        ...state,
        isLoading: true
      };
    case ADD_AIRLINE_DETAILS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        addAirlineDetailsResponse: action.response
      };

    case EDIT_AIRLINE_DETAILS:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_AIRLINE_DETAILS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        editAirlineDetailsResponse: action.response
      };

    case DELETE_AIRLINE_DETAILS:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_AIRLINE_DETAILS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        deleteAirlineDetailsResponse: action.response
      };

    default:
      return state;
  }
}
