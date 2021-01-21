import {
  GET_STORES_OFFER_FIELDS,
  GET_STORES_OFFER_FIELDS_RESPONSE,
  GET_STORES_OFFER_FIELDS_UPDATE_VALUE,
  GET_STORES_OFFER_FIELDS_UPDATE_VALUE_RESPONSE,
  GET_STORES_OFFER,
  GET_STORES_OFFER_RESPONSE,
  ADD_STORES_OFFER,
  ADD_STORES_OFFER_RESPONSE,
  EDIT_STORES_OFFER,
  EDIT_STORES_OFFER_RESPONSE,
  DELETE_STORES_OFFER,
  DELETE_STORES_OFFER_RESPONSE,
  UPLOAD_REDEEM,
  UPLOAD_REDEEM_RESPONSE,
  UPLOAD_BARCODE,
  UPLOAD_OFFER_RESPONSE
} from "./actionTypes";

// get StoresOffer fields
export const getStoresOfferFields = data => ({
  type: GET_STORES_OFFER_FIELDS,
  data
});
export const getStoresOfferFieldsResponse = data => ({
  type: GET_STORES_OFFER_FIELDS_RESPONSE,
  response: data
});

//get StoresOffer fields value
export const getStoresOfferFieldsUpdateValue = data => ({
  type: GET_STORES_OFFER_FIELDS_UPDATE_VALUE,
  data
});
export const getStoresOfferFieldsUpdateValueResponse = data => ({
  type: GET_STORES_OFFER_FIELDS_UPDATE_VALUE_RESPONSE,
  response: data
});

export const getStoresOffer = data => ({
  type: GET_STORES_OFFER,
  data: data
});

export const getStoresOfferResponse = data => ({
  type: GET_STORES_OFFER_RESPONSE,
  response: data
});

//add StoresOffer
export const addStoresOffer = data => ({
  type: ADD_STORES_OFFER,
  data
});
export const addStoresOfferResponse = data => ({
  type: ADD_STORES_OFFER_RESPONSE,
  response: data
});

//edit StoresOffer
export const editStoresOffer = data => ({
  type: EDIT_STORES_OFFER,
  data
});
export const editStoresOfferResponse = data => ({
  type: EDIT_STORES_OFFER_RESPONSE,
  response: data
});

//delete StoresOffer
export const deleteStoresOffer = data => ({
  type: DELETE_STORES_OFFER,
  data
});
export const deleteStoresOfferResponse = data => ({
  type: DELETE_STORES_OFFER_RESPONSE,
  response: data
});

export const uploadBarcode = data => ({
  type: UPLOAD_BARCODE,
  data
});
export const uploadBarcodeResponse = data => ({
  type: UPLOAD_BARCODE_RESPONSE,
  response: data
});

export const uploadRedeem = data => ({
  type: UPLOAD_REDEEM,
  data
});
export const uploadRedeemResponse = data => ({
  type: UPLOAD_REDEEM_RESPONSE,
  response: data
});
