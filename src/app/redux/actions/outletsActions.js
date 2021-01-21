import {
  GET_STORE_FIELDS,
  GET_STORE_FIELDS_RESPONSE,
  GET_STORE_FIELDS_UPDATE_VALUE,
  GET_STORE_FIELDS_UPDATE_VALUE_RESPONSE,
  GET_OUTLETS,
  GET_OUTLETS_RESPONSE,
  GET_SUB_CATEGORY,
  GET_SUB_CATEGORY_RESPONSE,
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
  ADD_OUTLETS,
  ADD_OUTLETS_RESPONSE,
  EDIT_OUTLETS,
  EDIT_OUTLETS_RESPONSE,
  DELETE_OUTLETS,
  DELETE_OUTLETS_RESPONSE
} from './actionTypes';

export const getStoreFields = data => ({
  type: GET_STORE_FIELDS,
  data
});

export const getStoreFieldsResponse = data => ({
  type: GET_STORE_FIELDS_RESPONSE,
  response: data
});

export const getStoreFieldsUpdateValue = data => ({
  type: GET_STORE_FIELDS_UPDATE_VALUE,
  data
});

export const getStoreFieldsUpdateValueResponse = data => ({
  type: GET_STORE_FIELDS_UPDATE_VALUE_RESPONSE,
  response: data
});

export const getOutlets = data => ({
  type: GET_OUTLETS,
  data
});

export const getOutletsResponse = data => ({
  type: GET_OUTLETS_RESPONSE,
  response: data
});

export const getSubCategory = data => ({
  type: GET_SUB_CATEGORY,
  data
});

export const getSubCategoryResponse = data => ({
  type: GET_SUB_CATEGORY_RESPONSE,
  response: data
});

export const addCategory = data => ({
  type: ADD_CATEGORY,
  data
});

export const addCategoryResponse = data => ({
  type: ADD_CATEGORY_RESPONSE,
  response: data
});

export const editCategory = data => ({
  type: EDIT_CATEGORY,
  data
});

export const editCategoryResponse = data => ({
  type: EDIT_CATEGORY_RESPONSE,
  response: data
});

export const deleteCategory = data => ({
  type: DELETE_CATEGORY,
  data
});

export const deleteCategoryResponse = data => ({
  type: DELETE_CATEGORY_RESPONSE,
  response: data
});

export const addSubCategory = data => ({
  type: ADD_SUB_CATEGORY,
  data
});

export const addSubCategoryResponse = data => ({
  type: ADD_SUB_CATEGORY_RESPONSE,
  response: data
});

export const editSubCategory = data => ({
  type: EDIT_SUB_CATEGORY,
  data
});

export const editSubCategoryResponse = data => ({
  type: EDIT_SUB_CATEGORY_RESPONSE,
  response: data
});

export const deleteSubCategory = data => ({
  type: DELETE_SUB_CATEGORY,
  data
});

export const deleteSubCategoryResponse = data => ({
  type: DELETE_SUB_CATEGORY_RESPONSE,
  response: data
});

export const addOutlets = data => ({
  type: ADD_OUTLETS,
  data
});

export const addOutletsResponse = data => ({
  type: ADD_OUTLETS_RESPONSE,
  response: data
});

export const editOutlets = data => ({
  type: EDIT_OUTLETS,
  data
});

export const editOutletsResponse = data => ({
  type: EDIT_OUTLETS_RESPONSE,
  response: data
});

export const deleteOutlets = data => ({
  type: DELETE_OUTLETS,
  data
});

export const deleteOutletsResponse = data => ({
  type: DELETE_OUTLETS_RESPONSE,
  response: data
});
