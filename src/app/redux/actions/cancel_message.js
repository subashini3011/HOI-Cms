import {
  GET_CANCEL_MESSAGE_FIELDS,
  GET_CANCEL_MESSAGE_FIELDS_RESPONSE,
  GET_CANCEL_MESSAGE_FIELDS_UPDATE_VALUE,
  GET_CANCEL_MESSAGE_FIELDS_UPDATE_VALUE_RESPONSE,
  GET_CANCEL_MESSAGE,
  GET_CANCEL_MESSAGE_RESPONSE,
  ADD_CANCEL_MESSAGE,
  ADD_CANCEL_MESSAGE_RESPONSE,
  EDIT_CANCEL_MESSAGE,
  EDIT_CANCEL_MESSAGE_RESPONSE,
  DELETE_CANCEL_MESSAGE,
  DELETE_CANCEL_MESSAGE_RESPONSE
} from "./actionTypes";

export const getCancelMessageFields = data => ({
  type: GET_CANCEL_MESSAGE_FIELDS,
  data
});

export const getCancelMessageFieldsResponse = data => ({
  type: GET_CANCEL_MESSAGE_FIELDS_RESPONSE,
  response: data
});

export const getCancelMessageFieldsUpdateValue = data => ({
  type: GET_CANCEL_MESSAGE_FIELDS_UPDATE_VALUE,
  data
});

export const getCancelMessageFieldsUpdateValueResponse = data => ({
  type: GET_CANCEL_MESSAGE_FIELDS_UPDATE_VALUE_RESPONSE,
  response: data
});

export const getCancelMessage = data => ({
  type: GET_CANCEL_MESSAGE,
  data
});

export const getCancelMessageResponse = data => ({
  type: GET_CANCEL_MESSAGE_RESPONSE,
  response: data
});

export const getCancelMessageDetails = data => ({
  type: GET_CANCEL_MESSAGE_DETAILS,
  data
});

export const getCancelMessageDetailsResponse = data => ({
  type: GET_CANCEL_MESSAGE_DETAILS_RESPONSE,
  response: data
});

export const addCancelMessage = data => ({
  type: ADD_CANCEL_MESSAGE,
  data
});

export const addCancelMessageResponse = data => ({
  type: ADD_CANCEL_MESSAGE_RESPONSE,
  response: data
});

// export const downloadCancelMessage = data => ({
//   type: DOWNLOAD_CANCEL_MESSAGE,
//   data
// });
// export const downloadCancelMessageResponse = data => ({
//   type: DOWNLOAD_CANCEL_MESSAGE_RESPONSE,
//   response: data
// });

// edit CANCEL_MESSAGE
export const editCancelMessage = data => ({
  type: EDIT_CANCEL_MESSAGE,
  data
});

export const editCancelMessageResponse = data => ({
  type: EDIT_CANCEL_MESSAGE_RESPONSE,
  response: data
});

export const deleteCancelMessage = data => ({
  type: DELETE_CANCEL_MESSAGE,
  data
});

export const deleteCancelMessageResponse = data => ({
  type: DELETE_CANCEL_MESSAGE_RESPONSE,
  response: data
});
