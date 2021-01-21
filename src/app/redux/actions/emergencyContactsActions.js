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
} from "./actionTypes";

export const getEmergencyContacts = data => ({
  type: GET_EMERGENCY_CONTACTS,
  data
});

export const getEmergencyContactsResponse = data => ({
  type: GET_EMERGENCY_CONTACTS_RESPONSE,
  response: data
});

export const addEmergencyContacts = data => ({
  type: ADD_EMERGENCY_CONTACTS,
  data
});

export const addEmergencyContactsResponse = data => ({
  type: ADD_EMERGENCY_CONTACTS_RESPONSE,
  response: data
});

export const updateEmergencyContacts = data => ({
  type: UPDATE_EMERGENCY_CONTACTS,
  data
});

export const updateEmergencyContactsResponse = data => ({
  type: UPDATE_EMERGENCY_CONTACTS_RESPONSE,
  response: data
});

export const deleteEmergencyContacts = data => ({
  type: DELETE_EMERGENCY_CONTACTS,
  data
});

export const deleteEmergencyContactsResponse = data => ({
  type: DELETE_EMERGENCY_CONTACTS_RESPONSE,
  response: data
});

export const addEmergencyContactsDetails = data => ({
  type: ADD_EMERGENCY_CONTACTS_DETAILS,
  data
});

export const addEmergencyContactsDetailsResponse = data => ({
  type: ADD_EMERGENCY_CONTACTS_DETAILS_RESPONSE,
  response: data
});

export const updateEmergencyContactsDetails = data => ({
  type: UPDATE_EMERGENCY_CONTACTS_DETAILS,
  data
});

export const updateEmergencyContactsDetailsResponse = data => ({
  type: UPDATE_EMERGENCY_CONTACTS_DETAILS_RESPONSE,
  response: data
});

export const deleteEmergencyContactsDetails = data => ({
  type: DELETE_EMERGENCY_CONTACTS_DETAILS,
  data
});

export const deleteEmergencyContactsDetailsResponse = data => ({
  type: DELETE_EMERGENCY_CONTACTS_DETAILS_RESPONSE,
  response: data
});
