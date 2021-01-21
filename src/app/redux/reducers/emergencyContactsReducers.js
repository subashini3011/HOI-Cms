import {
  GET_EMERGENCY_CONTACTS,
  GET_EMERGENCY_CONTACTS_RESPONSE,
  ADD_EMERGENCY_CONTACTS,
  ADD_EMERGENCY_CONTACTS_RESPONSE,
  UPDATE_EMERGENCY_CONTACTS,
  UPDATE_EMERGENCY_CONTACTS_RESPONSE,
  DELETE_EMERGENCY_CONTACTS,
  DELETE_EMERGENCY_CONTACTS_RESPONSE,
  ADD_EMERGENCY_CONTACTS_DETAILS,
  ADD_EMERGENCY_CONTACTS_DETAILS_RESPONSE,
  UPDATE_EMERGENCY_CONTACTS_DETAILS,
  UPDATE_EMERGENCY_CONTACTS_DETAILS_RESPONSE,
  DELETE_EMERGENCY_CONTACTS_DETAILS,
  DELETE_EMERGENCY_CONTACTS_DETAILS_RESPONSE
} from "../actions/actionTypes";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    // get users fields
    case GET_EMERGENCY_CONTACTS:
      return {
        ...state,
        isLoading: true
      };
    case GET_EMERGENCY_CONTACTS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getEmergencyContactsResponse: action.response
      };

    case ADD_EMERGENCY_CONTACTS:
      return {
        ...state,
        isLoading: true
      };
    case ADD_EMERGENCY_CONTACTS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        addEmergencyContactsResponse: action.response
      };

    case UPDATE_EMERGENCY_CONTACTS:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_EMERGENCY_CONTACTS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        updateEmergencyContactsResponse: action.response
      };

    case DELETE_EMERGENCY_CONTACTS:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_EMERGENCY_CONTACTS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        deleteEmergencyContactsResponse: action.response
      };

    case ADD_EMERGENCY_CONTACTS_DETAILS:
      return {
        ...state,
        isLoading: true
      };
    case ADD_EMERGENCY_CONTACTS_DETAILS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        addEmergencyContactsDetailsResponse: action.response
      };

    case UPDATE_EMERGENCY_CONTACTS_DETAILS:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_EMERGENCY_CONTACTS_DETAILS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        updateEmergencyContactsDetailsResponse: action.response
      };

    case DELETE_EMERGENCY_CONTACTS_DETAILS:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_EMERGENCY_CONTACTS_DETAILS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        deleteEmergencyContactsDetailsResponse: action.response
      };

    default:
      return state;
  }
}
