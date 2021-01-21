import {
  ETA_TRIP_FIELDS,
  ETA_TRIP_FIELDS_RESPONSE,
  ETA_TRIP_FIELDS_UPDATE_VALUE,
  ETA_TRIP_FIELDS_UPDATE_VALUE_RESPONSE,
  ETA_TRIP,
  ETA_TRIP_RESPONSE,
  ADD_ETA_TRIP,
  ADD_ETA_TRIP_RESPONSE,
  EDIT_ETA_TRIP,
  EDIT_ETA_TRIP_RESPONSE,
  DELETE_ETA_TRIP,
  DELETE_ETA_TRIP_RESPONSE
} from './actionTypes';

// get etaTrip fields
export const etaTripFields = data => ({
  type: ETA_TRIP_FIELDS,
  data
});
export const etaTripFieldsResponse = data => ({
  type: ETA_TRIP_FIELDS_RESPONSE,
  response: data
});

//get etaTrip fields value
export const etaTripFieldsUpdateValue = data => ({
  type: ETA_TRIP_FIELDS_UPDATE_VALUE,
  data
});
export const etaTripFieldsUpdateValueResponse = data => ({
  type: ETA_TRIP_FIELDS_UPDATE_VALUE_RESPONSE,
  response: data
});

export const etaTrip = data => ({
  type: ETA_TRIP,
  data: data
});

export const etaTripResponse = data => ({
  type: ETA_TRIP_RESPONSE,
  response: data
});

//add etaTrip
export const addEtaTrip = data => ({
  type: ADD_ETA_TRIP,
  data
});
export const addEtaTripResponse = data => ({
  type: ADD_ETA_TRIP_RESPONSE,
  response: data
});

//edit EtaTrip
export const editEtaTrip = data => ({
  type: EDIT_ETA_TRIP,
  data
});
export const editEtaTripResponse = data => ({
  type: EDIT_ETA_TRIP_RESPONSE,
  response: data
});

//delete EtaTrip
export const deleteEtaTrip = data => ({
  type: DELETE_ETA_TRIP,
  data
});
export const deleteEtaTripResponse = data => ({
  type: DELETE_ETA_TRIP_RESPONSE,
  response: data
});
