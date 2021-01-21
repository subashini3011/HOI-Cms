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
} from "../actions/actionTypes";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_AIRPORT_FIELDS:
      return {
        ...state,
        isLoading: true
      };
    case GET_AIRPORT_FIELDS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getAirportFieldsResponse: action.response
      };
    case GET_AIRPORT_FIELDS_UPDATE_VALUE:
      return {
        ...state,
        isLoading: true
      };
    case GET_AIRPORT_FIELDS_UPDATE_VALUE_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getAirportFieldsUpdateValueResponse: action.response
      };

    case GET_ACTIVE_AIRPORTS:
      return {
        ...state,
        isLoading: true
      };
    case GET_ACTIVE_AIRPORTS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getActiveAirportsResponse: action.response
      };

    case GET_AIRPORTS:
      return {
        ...state,
        isLoading: true
      };
    case GET_AIRPORTS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getAirportsResponse: action.response
      };

    case GET_AIRPORTS_DETAILS:
      return {
        ...state,
        isLoading: true
      };
    case GET_AIRPORTS_DETAILS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getAirportsDetailsResponse: action.response
      };

    case ADD_AIRPORT:
      return {
        ...state,
        isLoading: true
      };
    case ADD_AIRPORT_RESPONSE:
      return {
        ...state,
        isLoading: false,
        addAirportResponse: action.response
      };

    case DOWNLOAD_AIRPORTS:
      return {
        ...state,
        isLoading: true
      };
    case DOWNLOAD_AIRPORTS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        downloadAirportsResponse: action.response
      };

    case EDIT_AIRPORT:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_AIRPORT_RESPONSE:
      return {
        ...state,
        isLoading: false,
        editAirportResponse: action.response
      };

    case DELETE_AIRPORT:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_AIRPORT_RESPONSE:
      return {
        ...state,
        isLoading: false,
        deleteAirportResponse: action.response
      };

    default:
      return state;
  }
}
