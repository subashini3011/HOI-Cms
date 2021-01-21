import {
  ETA_TRIP_FIELDS,
  ETA_TRIP_FIELDS_RESPONSE,
  ETA_TRIP_FIELDS_UPDATE_VALUE,
  ETA_TRIP_FIELDS_UPDATE_VALUE_RESPONSE,
  ETA_TRIP,
  ETA_TRIP_RESPONSE,
  ADD_ETA_TRIP,
  ADD_ETA_TRIP_RESPONSE,
  EDIT_ETA_TRIP,
  EDIT_ETA_TRIP_RESPONSE,
  DELETE_ETA_TRIP,
  DELETE_ETA_TRIP_RESPONSE
} from '../actions/actionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case ETA_TRIP_FIELDS:
      return {
        ...state,
        isLoading: true
      };
    case ETA_TRIP_FIELDS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        etaTripFieldsResponse: action.response
      };
    case ETA_TRIP_FIELDS_UPDATE_VALUE:
      return {
        ...state,
        isLoading: true
      };
    case ETA_TRIP_FIELDS_UPDATE_VALUE_RESPONSE:
      return {
        ...state,
        isLoading: false,
        etaTripFieldsUpdateValueResponse: action.response
      };
    case ETA_TRIP:
      return {
        ...state,
        isLoading: true
      };
    case ETA_TRIP_RESPONSE:
      return {
        ...state,
        isLoading: false,
        etaTripResponse: action.response
      };

    case ADD_ETA_TRIP:
      return {
        ...state,
        isLoading: true
      };
    case ADD_ETA_TRIP_RESPONSE:
      return {
        ...state,
        isLoading: false,
        addEtaTripResponse: action.response
      };
    case EDIT_ETA_TRIP:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_ETA_TRIP_RESPONSE:
      return {
        ...state,
        isLoading: false,
        editEtaTripResponse: action.response
      };
    case DELETE_ETA_TRIP:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_ETA_TRIP_RESPONSE:
      return {
        ...state,
        isLoading: false,
        deleteEtaTripResponse: action.response
      };
    default:
      return state;
  }
}
