import {
  GET_STORE_FIELDS,
  GET_STORE_FIELDS_RESPONSE,
  GET_STORE_FIELDS_UPDATE_VALUE,
  GET_STORE_FIELDS_UPDATE_VALUE_RESPONSE,
  GET_OUTLETS,
  GET_OUTLETS_RESPONSE,
  ADD_CATEGORY,
  ADD_CATEGORY_RESPONSE,
  EDIT_CATEGORY,
  EDIT_CATEGORY_RESPONSE,
  DELETE_CATEGORY,
  DELETE_CATEGORY_RESPONSE,
  ADD_SUB_CATEGORY,
  ADD_SUB_CATEGORY_RESPONSE,
  EDIT_SUB_CATEGORY,
  EDIT_SUB_CATEGORY_RESPONSE,
  DELETE_SUB_CATEGORY,
  DELETE_SUB_CATEGORY_RESPONSE,
  GET_SUB_CATEGORY,
  GET_SUB_CATEGORY_RESPONSE,
  ADD_OUTLETS,
  ADD_OUTLETS_RESPONSE,
  EDIT_OUTLETS,
  EDIT_OUTLETS_RESPONSE,
  DELETE_OUTLETS,
  DELETE_OUTLETS_RESPONSE
} from "../actions/actionTypes";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STORE_FIELDS:
      return {
        ...state,
        isLoading: true
      };
    case GET_STORE_FIELDS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getStoreFieldsResponse: action.response
      };

    case GET_STORE_FIELDS_UPDATE_VALUE:
      return {
        ...state,
        isLoading: true
      };
    case GET_STORE_FIELDS_UPDATE_VALUE_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getStoreFieldsUpdateValueResponse: action.response
      };

    case GET_OUTLETS:
      return {
        ...state,
        isLoading: true
      };
    case GET_OUTLETS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getOutletsResponse: action.response
      };

    case GET_SUB_CATEGORY:
      return {
        ...state,
        isLoading: true
      };
    case GET_SUB_CATEGORY_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getSubCategoryResponse: action.response
      };

    case ADD_OUTLETS:
      return {
        ...state,
        isLoading: true
      };
    case ADD_OUTLETS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        addOutletsResponse: action.response
      };

    case ADD_CATEGORY:
      return {
        ...state,
        isLoading: true
      };

    case ADD_CATEGORY_RESPONSE:
      return {
        ...state,
        isLoading: false,
        addCategoryResponse: action.response
      };

    case EDIT_CATEGORY:
      return {
        ...state,
        isLoading: true
      };

    case EDIT_CATEGORY_RESPONSE:
      return {
        ...state,
        isLoading: false,
        editCategoryResponse: action.response
      };

    case DELETE_CATEGORY:
      return {
        ...state,
        isLoading: true
      };

    case DELETE_CATEGORY_RESPONSE:
      return {
        ...state,
        isLoading: false,
        deleteCategoryResponse: action.response
      };

    case ADD_SUB_CATEGORY:
      return {
        ...state,
        isLoading: true
      };

    case ADD_SUB_CATEGORY_RESPONSE:
      return {
        ...state,
        isLoading: false,
        addSubCategoryResponse: action.response
      };

    case EDIT_SUB_CATEGORY:
      return {
        ...state,
        isLoading: true
      };

    case EDIT_SUB_CATEGORY_RESPONSE:
      return {
        ...state,
        isLoading: false,
        editSubCategoryResponse: action.response
      };

    case DELETE_SUB_CATEGORY:
      return {
        ...state,
        isLoading: true
      };

    case DELETE_SUB_CATEGORY_RESPONSE:
      return {
        ...state,
        isLoading: false,
        deleteSubCategoryResponse: action.response
      };

    case EDIT_OUTLETS:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_OUTLETS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        editOutletsResponse: action.response
      };

    case DELETE_OUTLETS:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_OUTLETS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        deleteOutletsResponse: action.response
      };

    default:
      return state;
  }
}
