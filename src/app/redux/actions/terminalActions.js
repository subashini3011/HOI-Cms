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
} from "./actionTypes";

// get terminal fields
export const getTerminalFields = data => ({
  type: GET_TERMINAL_FIELDS,
  data
});
export const getTerminalFieldsResponse = data => ({
  type: GET_TERMINAL_FIELDS_RESPONSE,
  response: data
});

//get terminal fields value
export const getTerminalFieldsUpdateValue = data => ({
  type: GET_TERMINAL_FIELDS_UPDATE_VALUE,
  data
});
export const getTerminalFieldsUpdateValueResponse = data => ({
  type: GET_TERMINAL_FIELDS_UPDATE_VALUE_RESPONSE,
  response: data
});

export const getTerminals = data => ({
  type: GET_TERMINALS,
  data: data
});

export const getTerminalsResponse = data => ({
  type: GET_TERMINALS_RESPONSE,
  response: data
});

//add terminal
export const addTerminal = data => ({
  type: ADD_TERMINAL,
  data
});
export const addTerminalResponse = data => ({
  type: ADD_TERMINAL_RESPONSE,
  response: data
});

//edit terminal
export const editTerminal = data => ({
  type: EDIT_TERMINAL,
  data
});
export const editTerminalResponse = data => ({
  type: EDIT_TERMINAL_RESPONSE,
  response: data
});

//delete terminal
export const deleteTerminal = data => ({
  type: DELETE_TERMINAL,
  data
});
export const deleteTerminalResponse = data => ({
  type: DELETE_TERMINAL_RESPONSE,
  response: data
});
