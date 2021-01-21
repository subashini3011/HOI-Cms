import {
  SEAMLESS_FIELDS,
  SEAMLESS_FIELDS_RESPONSE,
  SEAMLESS_FIELDS_UPDATE_VALUE,
  SEAMLESS_FIELDS_UPDATE_VALUE_RESPONSE,
  SEAMLESS_VALUES_FIELDS,
  SEAMLESS_VALUES_FIELDS_RESPONSE,
  SEAMLESS_VALUES_FIELDS_UPDATE_VALUE,
  SEAMLESS_VALUES_FIELDS_UPDATE_VALUE_RESPONSE,
  SEAMLESS,
  SEAMLESS_RESPONSE,
  ADD_SEAMLESS,
  ADD_SEAMLESS_RESPONSE,
  UPDATE_SEAMLESS,
  UPDATE_SEAMLESS_RESPONSE,
  DELETE_SEAMLESS,
  DELETE_SEAMLESS_RESPONSE,
  ADD_SEAMLESS_VALUES,
  ADD_SEAMLESS_VALUES_RESPONSE,
  UPDATE_SEAMLESS_VALUES,
  UPDATE_SEAMLESS_VALUES_RESPONSE,
  DELETE_SEAMLESS_VALUES,
  DELETE_SEAMLESS_VALUES_RESPONSE,
  EXCITING_FIELDS,
  EXCITING_FIELDS_RESPONSE,
  EXCITING_FIELDS_UPDATE_VALUE,
  EXCITING_FIELDS_UPDATE_VALUE_RESPONSE,
  EXCITING_VALUES_FIELDS,
  EXCITING_VALUES_FIELDS_RESPONSE,
  EXCITING_VALUES_FIELDS_UPDATE_VALUE,
  EXCITING_VALUES_FIELDS_UPDATE_VALUE_RESPONSE,
  EXCITING,
  EXCITING_RESPONSE,
  ADD_EXCITING,
  ADD_EXCITING_RESPONSE,
  UPDATE_EXCITING,
  UPDATE_EXCITING_RESPONSE,
  DELETE_EXCITING,
  DELETE_EXCITING_RESPONSE,
  ADD_EXCITING_VALUES,
  ADD_EXCITING_VALUES_RESPONSE,
  UPDATE_EXCITING_VALUES,
  UPDATE_EXCITING_VALUES_RESPONSE,
  DELETE_EXCITING_VALUES,
  DELETE_EXCITING_VALUES_RESPONSE
} from '../actions/actionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    // get users fields

    case SEAMLESS_FIELDS:
      return {
        ...state,
        isLoading: true
      };
    case SEAMLESS_FIELDS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        seamlessFieldsResponse: action.response
      };
    case SEAMLESS_FIELDS_UPDATE_VALUE:
      return {
        ...state,
        isLoading: true
      };
    case SEAMLESS_FIELDS_UPDATE_VALUE_RESPONSE:
      return {
        ...state,
        isLoading: false,
        seamlessFieldsUpdateValueResponse: action.response
      };

    case SEAMLESS_VALUES_FIELDS:
      return {
        ...state,
        isLoading: true
      };
    case SEAMLESS_VALUES_FIELDS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        seamlessValuesFieldsResponse: action.response
      };
    case SEAMLESS_VALUES_FIELDS_UPDATE_VALUE:
      return {
        ...state,
        isLoading: true
      };
    case SEAMLESS_VALUES_FIELDS_UPDATE_VALUE_RESPONSE:
      return {
        ...state,
        isLoading: false,
        seamlessValuesFieldsUpdateValueResponse: action.response
      };

    case SEAMLESS:
      return {
        ...state,
        isLoading: true
      };
    case SEAMLESS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        seamlessResponse: action.response
      };

    case ADD_SEAMLESS:
      return {
        ...state,
        isLoading: true
      };
    case ADD_SEAMLESS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        addSeamlessResponse: action.response
      };

    case UPDATE_SEAMLESS:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_SEAMLESS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        updateSeamlessResponse: action.response
      };

    case DELETE_SEAMLESS:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_SEAMLESS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        deleteSeamlessResponse: action.response
      };

    case ADD_SEAMLESS_VALUES:
      return {
        ...state,
        isLoading: true
      };
    case ADD_SEAMLESS_VALUES_RESPONSE:
      return {
        ...state,
        isLoading: false,
        addSeamlessValuesResponse: action.response
      };

    case UPDATE_SEAMLESS_VALUES:
      return {
        ...state,
        isLoading: true
      };

    case UPDATE_SEAMLESS_VALUES_RESPONSE:
      return {
        ...state,
        isLoading: false,
        updateSeamlessValuesResponse: action.response
      };

    case DELETE_SEAMLESS_VALUES:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_SEAMLESS_VALUES_RESPONSE:
      return {
        ...state,
        isLoading: false,
        deleteSeamlessValuesResponse: action.response
      };

    case EXCITING_FIELDS:
      return {
        ...state,
        isLoading: true
      };
    case EXCITING_FIELDS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        excitingFieldsResponse: action.response
      };
    case EXCITING_FIELDS_UPDATE_VALUE:
      return {
        ...state,
        isLoading: true
      };
    case EXCITING_FIELDS_UPDATE_VALUE_RESPONSE:
      return {
        ...state,
        isLoading: false,
        excitingFieldsUpdateValueResponse: action.response
      };

    case EXCITING_VALUES_FIELDS:
      return {
        ...state,
        isLoading: true
      };
    case EXCITING_VALUES_FIELDS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        excitingValuesFieldsResponse: action.response
      };
    case EXCITING_VALUES_FIELDS_UPDATE_VALUE:
      return {
        ...state,
        isLoading: true
      };
    case EXCITING_VALUES_FIELDS_UPDATE_VALUE_RESPONSE:
      return {
        ...state,
        isLoading: false,
        excitingValuesFieldsUpdateValueResponse: action.response
      };
    case EXCITING:
      return {
        ...state,
        isLoading: true
      };
    case EXCITING_RESPONSE:
      return {
        ...state,
        isLoading: false,
        excitingResponse: action.response
      };

    case ADD_EXCITING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_EXCITING_RESPONSE:
      return {
        ...state,
        isLoading: false,
        addExcitingResponse: action.response
      };

    case UPDATE_EXCITING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_EXCITING_RESPONSE:
      return {
        ...state,
        isLoading: false,
        updateExcitingResponse: action.response
      };

    case DELETE_EXCITING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_EXCITING_RESPONSE:
      return {
        ...state,
        isLoading: false,
        deleteExcitingResponse: action.response
      };

    case ADD_EXCITING_VALUES:
      return {
        ...state,
        isLoading: true
      };
    case ADD_EXCITING_VALUES_RESPONSE:
      return {
        ...state,
        isLoading: false,
        addExcitingValuesResponse: action.response
      };

    case UPDATE_EXCITING_VALUES:
      return {
        ...state,
        isLoading: true
      };

    case UPDATE_EXCITING_VALUES_RESPONSE:
      return {
        ...state,
        isLoading: false,
        updateExcitingValuesResponse: action.response
      };

    case DELETE_EXCITING_VALUES:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_EXCITING_VALUES_RESPONSE:
      return {
        ...state,
        isLoading: false,
        deleteExcitingValuesResponse: action.response
      };

    default:
      return state;
  }
}
