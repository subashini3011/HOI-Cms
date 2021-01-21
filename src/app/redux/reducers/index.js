import { combineReducers } from 'redux';
import login from './loginReducer';
import users from './userReducer';
import dashboard from './dashboardReducers';
import commonUsers from './commonUsersReducers';
import outlets from './outletsReducers';
import airports from './airportsReducer';
import terminal from './terminalReducers';
import uploadFile from './uploadFileReducers';
import role from './roleReducer';
import emergencyContacts from './emergencyContactsReducers';
import preferences from './preferencesReducers';
import flightService from './flightServiceReducers';
import nonApiStore from './nonApiReducers';
import upcomingStores from './upcomingStoresReducers';
import storesOffer from './storesOfferReducers';
import baggageInfo from './baggageInfoReducers';
import etaTrip from './etaTripReducers';
import countryDetails from './countryDetailsReducers';
import cancelmessage from './cancelmessage'

const rootReducer = combineReducers({
  login,
  users,
  dashboard,
  commonUsers,
  outlets,
  airports,
  terminal,
  uploadFile,
  nonApiStore,
  role,
  emergencyContacts,
  preferences,
  flightService,
  upcomingStores,
  storesOffer,
  baggageInfo,
  etaTrip,
  countryDetails,
  cancelmessage
});

export default rootReducer;
