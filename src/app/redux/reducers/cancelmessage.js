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
} from "../actions/actionTypes";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CANCEL_MESSAGE_FIELDS:
      return {
        ...state,
        isLoading: true
      };
    case GET_CANCEL_MESSAGE_FIELDS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getCancelMessageFieldsResponse: action.response
      };
    case GET_CANCEL_MESSAGE_FIELDS_UPDATE_VALUE:
      return {
        ...state,
        isLoading: true
      };
    case GET_CANCEL_MESSAGE_FIELDS_UPDATE_VALUE_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getCancelMessageFieldsUpdateValueResponse: action.response
      };

    case GET_CANCEL_MESSAGE:
      return {
        ...state,
        isLoading: true
      };
    case GET_CANCEL_MESSAGE_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getCancelMessageResponse: action.response
      };


    case ADD_CANCEL_MESSAGE:
      return {
        ...state,
        isLoading: true
      };
    case ADD_CANCEL_MESSAGE_RESPONSE:
      return {
        ...state,
        isLoading: false,
        addCancelMessageResponse: action.response
      };


    case EDIT_CANCEL_MESSAGE:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_CANCEL_MESSAGE_RESPONSE:
      return {
        ...state,
        isLoading: false,
        editCancelMessageResponse: action.response
      };

    case DELETE_CANCEL_MESSAGE:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_CANCEL_MESSAGE_RESPONSE:
      return {
        ...state,
        isLoading: false,
        deleteCancelMessageResponse: action.response
      };

    default:
      return state;
  }
}
