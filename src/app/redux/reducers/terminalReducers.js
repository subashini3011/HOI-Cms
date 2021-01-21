import {
  GET_TERMINAL_FIELDS,
  GET_TERMINAL_FIELDS_RESPONSE,
  GET_TERMINAL_FIELDS_UPDATE_VALUE,
  GET_TERMINAL_FIELDS_UPDATE_VALUE_RESPONSE,
  GET_TERMINALS,
  GET_TERMINALS_RESPONSE,
  ADD_TERMINAL,
  ADD_TERMINAL_RESPONSE,
  EDIT_TERMINAL,
  EDIT_TERMINAL_RESPONSE,
  DELETE_TERMINAL,
  DELETE_TERMINAL_RESPONSE
} from "../actions/actionTypes";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TERMINAL_FIELDS:
      return {
        ...state,
        isLoading: true
      };
    case GET_TERMINAL_FIELDS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getTerminalFieldsResponse: action.response
      };
    case GET_TERMINAL_FIELDS_UPDATE_VALUE:
      return {
        ...state,
        isLoading: true
      };
    case GET_TERMINAL_FIELDS_UPDATE_VALUE_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getTerminalFieldsUpdateValueResponse: action.response
      };
    case GET_TERMINALS:
      return {
        ...state,
        isLoading: true
      };
    case GET_TERMINALS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getTerminalsResponse: action.response
      };

    case ADD_TERMINAL:
      return {
        ...state,
        isLoading: true
      };
    case ADD_TERMINAL_RESPONSE:
      return {
        ...state,
        isLoading: false,
        addTerminalResponse: action.response
      };
    case EDIT_TERMINAL:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_TERMINAL_RESPONSE:
      return {
        ...state,
        isLoading: false,
        editTerminalResponse: action.response
      };
    case DELETE_TERMINAL:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_TERMINAL_RESPONSE:
      return {
        ...state,
        isLoading: false,
        deleteTerminalResponse: action.response
      };
    default:
      return state;
  }
}
