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
} from './actionTypes';

export const seamlessFields = data => ({
  type: SEAMLESS_FIELDS,
  data
});
export const seamlessFieldsResponse = data => ({
  type: SEAMLESS_FIELDS_RESPONSE,
  response: data
});

//get StoresOffer fields value
export const seamlessFieldsUpdateValue = data => ({
  type: SEAMLESS_FIELDS_UPDATE_VALUE,
  data
});
export const seamlessFieldsUpdateValueResponse = data => ({
  type: SEAMLESS_FIELDS_UPDATE_VALUE_RESPONSE,
  response: data
});

export const seamlessValuesFields = data => ({
  type: SEAMLESS_VALUES_FIELDS,
  data
});
export const seamlessValuesFieldsResponse = data => ({
  type: SEAMLESS_VALUES_FIELDS_RESPONSE,
  response: data
});

//get StoresOffer fields value
export const seamlessValuesFieldsUpdateValue = data => ({
  type: SEAMLESS_VALUES_FIELDS_UPDATE_VALUE,
  data
});
export const seamlessValuesFieldsUpdateValueResponse = data => ({
  type: SEAMLESS_VALUES_FIELDS_UPDATE_VALUE_RESPONSE,
  response: data
});

export const seamless = data => ({
  type: SEAMLESS,
  data
});

export const seamlessResponse = data => ({
  type: SEAMLESS_RESPONSE,
  response: data
});

export const addSeamless = data => ({
  type: ADD_SEAMLESS,
  data
});

export const addSeamlessResponse = data => ({
  type: ADD_SEAMLESS_RESPONSE,
  response: data
});

export const updateSeamless = data => ({
  type: UPDATE_SEAMLESS,
  data
});

export const updateSeamlessResponse = data => ({
  type: UPDATE_SEAMLESS_RESPONSE,
  response: data
});

export const deleteSeamless = data => ({
  type: DELETE_SEAMLESS,
  data
});

export const deleteSeamlessResponse = data => ({
  type: DELETE_SEAMLESS_RESPONSE,
  response: data
});

export const addSeamlessValues = data => ({
  type: ADD_SEAMLESS_VALUES,
  data
});

export const addSeamlessValuesResponse = data => ({
  type: ADD_SEAMLESS_VALUES_RESPONSE,
  response: data
});

export const updateSeamlessValues = data => ({
  type: UPDATE_SEAMLESS_VALUES,
  data
});

export const updateSeamlessValuesResponse = data => ({
  type: UPDATE_SEAMLESS_VALUES_RESPONSE,
  response: data
});

export const deleteSeamlessValues = data => ({
  type: DELETE_SEAMLESS_VALUES,
  data
});

export const deleteSeamlessValuesResponse = data => ({
  type: DELETE_SEAMLESS_VALUES_RESPONSE,
  response: data
});

//exciting

export const excitingFields = data => ({
  type: EXCITING_FIELDS,
  data
});
export const excitingFieldsResponse = data => ({
  type: EXCITING_FIELDS_RESPONSE,
  response: data
});

//get StoresOffer fields value
export const excitingFieldsUpdateValue = data => ({
  type: EXCITING_FIELDS_UPDATE_VALUE,
  data
});
export const excitingFieldsUpdateValueResponse = data => ({
  type: EXCITING_FIELDS_UPDATE_VALUE_RESPONSE,
  response: data
});

export const excitingValuesFields = data => ({
  type: EXCITING_VALUES_FIELDS,
  data
});
export const excitingValuesFieldsResponse = data => ({
  type: EXCITING_VALUES_FIELDS_RESPONSE,
  response: data
});

//get StoresOffer fields value
export const excitingValuesFieldsUpdateValue = data => ({
  type: EXCITING_VALUES_FIELDS_UPDATE_VALUE,
  data
});
export const excitingValuesFieldsUpdateValueResponse = data => ({
  type: EXCITING_VALUES_FIELDS_UPDATE_VALUE_RESPONSE,
  response: data
});

export const exciting = data => ({
  type: EXCITING,
  data
});

export const excitingResponse = data => ({
  type: EXCITING_RESPONSE,
  response: data
});

export const addExciting = data => ({
  type: ADD_EXCITING,
  data
});

export const addExcitingResponse = data => ({
  type: ADD_EXCITING_RESPONSE,
  response: data
});

export const updateExciting = data => ({
  type: UPDATE_EXCITING,
  data
});

export const updateExcitingResponse = data => ({
  type: UPDATE_EXCITING_RESPONSE,
  response: data
});

export const deleteExciting = data => ({
  type: DELETE_EXCITING,
  data
});

export const deleteExcitingResponse = data => ({
  type: DELETE_EXCITING_RESPONSE,
  response: data
});

export const addExcitingValues = data => ({
  type: ADD_EXCITING_VALUES,
  data
});

export const addExcitingValuesResponse = data => ({
  type: ADD_EXCITING_VALUES_RESPONSE,
  response: data
});

export const updateExcitingValues = data => ({
  type: UPDATE_EXCITING_VALUES,
  data
});

export const updateExcitingValuesResponse = data => ({
  type: UPDATE_EXCITING_VALUES_RESPONSE,
  response: data
});

export const deleteExcitingValues = data => ({
  type: DELETE_EXCITING_VALUES,
  data
});

export const deleteExcitingValuesResponse = data => ({
  type: DELETE_EXCITING_VALUES_RESPONSE,
  response: data
});
