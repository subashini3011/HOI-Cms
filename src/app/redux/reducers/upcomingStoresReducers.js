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
} from "../actions/actionTypes";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_UPCOMING_STORES_FIELDS:
      return {
        ...state,
        isLoading: true
      };
    case GET_UPCOMING_STORES_FIELDS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getUpcomingStoresFieldsResponse: action.response
      };
    case GET_UPCOMING_STORES_FIELDS_UPDATE_VALUE:
      return {
        ...state,
        isLoading: true
      };
    case GET_UPCOMING_STORES_FIELDS_UPDATE_VALUE_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getUpcomingStoresFieldsUpdateValueResponse: action.response
      };
    case GET_UPCOMING_STORES:
      return {
        ...state,
        isLoading: true
      };
    case GET_UPCOMING_STORES_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getUpcomingStoresResponse: action.response
      };

    case ADD_UPCOMING_STORES:
      return {
        ...state,
        isLoading: true
      };
    case ADD_UPCOMING_STORES_RESPONSE:
      return {
        ...state,
        isLoading: false,
        addUpcomingStoresResponse: action.response
      };
    case EDIT_UPCOMING_STORES:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_UPCOMING_STORES_RESPONSE:
      return {
        ...state,
        isLoading: false,
        editUpcomingStoresResponse: action.response
      };
    case DELETE_UPCOMING_STORES:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_UPCOMING_STORES_RESPONSE:
      return {
        ...state,
        isLoading: false,
        deleteUpcomingStoresResponse: action.response
      };
    default:
      return state;
  }
}
