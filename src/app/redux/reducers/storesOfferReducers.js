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
  UPLOAD_BARCODE_RESPONSE
} from "../actions/actionTypes";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STORES_OFFER_FIELDS:
      return {
        ...state,
        isLoading: true
      };
    case GET_STORES_OFFER_FIELDS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getStoresOfferFieldsResponse: action.response
      };
    case GET_STORES_OFFER_FIELDS_UPDATE_VALUE:
      return {
        ...state,
        isLoading: true
      };
    case GET_STORES_OFFER_FIELDS_UPDATE_VALUE_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getStoresOfferFieldsUpdateValueResponse: action.response
      };
    case GET_STORES_OFFER:
      return {
        ...state,
        isLoading: true
      };
    case GET_STORES_OFFER_RESPONSE:
      return {
        ...state,
        isLoading: false,
        getStoresOfferResponse: action.response
      };

    case ADD_STORES_OFFER:
      return {
        ...state,
        isLoading: true
      };
    case ADD_STORES_OFFER_RESPONSE:
      return {
        ...state,
        isLoading: false,
        addStoresOfferResponse: action.response
      };
    case EDIT_STORES_OFFER:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_STORES_OFFER_RESPONSE:
      return {
        ...state,
        isLoading: false,
        editStoresOfferResponse: action.response
      };
    case DELETE_STORES_OFFER:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_STORES_OFFER_RESPONSE:
      return {
        ...state,
        isLoading: false,
        deleteStoresOfferResponse: action.response
      };

    case UPLOAD_REDEEM:
      return {
        ...state,
        isLoading: true
      };
    case UPLOAD_REDEEM_RESPONSE:
      return {
        ...state,
        isLoading: false,
        uploadRedeemResponse: action.response
      };
    case UPLOAD_BARCODE:
      return {
        ...state,
        isLoading: true
      };
    case UPLOAD_BARCODE_RESPONSE:
      return {
        ...state,
        isLoading: false,
        uploadBarcodeResponse: action.response
      };
    default:
      return state;
  }
}
