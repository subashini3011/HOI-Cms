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
} from '../actions/actionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BAGGAGE_INFO_FIELDS:
      return {
        ...state,
        isLoading: true
      };
    case GET_BAGGAGE_INFO_FIELDS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getBaggageInfoFieldsResponse: action.response
      };
    case GET_BAGGAGE_INFO_FIELDS_UPDATE_VALUE:
      return {
        ...state,
        isLoading: true
      };
    case GET_BAGGAGE_INFO_FIELDS_UPDATE_VALUE_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getBaggageInfoFieldsUpdateValueResponse: action.response
      };
    case GET_BAGGAGE_INFO:
      return {
        ...state,
        isLoading: true
      };
    case GET_BAGGAGE_INFO_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getBaggageInfoResponse: action.response
      };

    case ADD_BAGGAGE_INFO:
      return {
        ...state,
        isLoading: true
      };
    case ADD_BAGGAGE_INFO_RESPONSE:
      return {
        ...state,
        isLoading: false,
        addBaggageInfoResponse: action.response
      };
    case EDIT_BAGGAGE_INFO:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_BAGGAGE_INFO_RESPONSE:
      return {
        ...state,
        isLoading: false,
        editBaggageInfoResponse: action.response
      };
    case DELETE_BAGGAGE_INFO:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_BAGGAGE_INFO_RESPONSE:
      return {
        ...state,
        isLoading: false,
        deleteBaggageInfoResponse: action.response
      };
    default:
      return state;
  }
}
