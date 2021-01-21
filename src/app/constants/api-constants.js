// developing DIVUM servers
// export const USER_MANAGEMENT_URL = 'http://35.200.188.122:8080/api/';
// export const MCOMMERCE_MANAGEMENT_URL = 'http://35.200.188.122:8082/api/';
// export const AIRPORTS_INFO = 'http://35.200.188.122:8081/api/';
// export const MAGENTO_URL = 'http://35.200.188.122:8082/api/v1/mc/magento';
// export const MAGENTO_POST_DATA_URL =
//   'https://staging.mcommerce.hoi.in/index.php/cusstore/index/';

//staging server
// export const USER_MANAGEMENT_URL = "http://staging.userservice.hoi.in/api/";
// export const MCOMMERCE_MANAGEMENT_URL =
//   "http://staging.mcommerceservice.hoi.in/api/";
// export const AIRPORTS_INFO = "http://staging.flightservice.hoi.in/api/";
// export const MAGENTO_URL =
//   "http://staging.mcommerceservice.hoi.in/api/v1/mc/magento";
// export const MAGENTO_POST_DATA_URL =
//   "https://staging.mcommerce.hoi.in/index.php/cusstore/index/";

// export const USER_MANAGEMENT_URL =
//   process.env.NODE_ENV === "production"
//     ? "https://userservice.hoi.in/api/"
//     : "http://staging.userservice.hoi.in/api/";
// export const MCOMMERCE_MANAGEMENT_URL =
//   process.env.NODE_ENV === "production"
//     ? "https://mcommerceservice.hoi.in/api/"
//     : "http://staging.mcommerceservice.hoi.in/api/";
// export const AIRPORTS_INFO =
//   process.env.NODE_ENV === "production"
//     ? "https://flightservice.hoi.in/api/"
//     : "http://staging.flightservice.hoi.in/api/";
// export const MAGENTO_URL =
//   process.env.NODE_ENV === "production"
//     ? "https://mcommerceservice.hoi.in/api/v1/mc/magento"
//     : "http://staging.mcommerceservice.hoi.in/api/v1/mc/magento";
// export const MAGENTO_POST_DATA_URL =
//   process.env.NODE_ENV === "production"
//     ? "https://mcommerce.hoi.in/index.php/cusstore/index/"
//     : "https://staging.mcommerce.hoi.in/index.php/cusstore/index/";

// production server
export const USER_MANAGEMENT_URL = 'https://userservice.hoi.in/api/';
export const MCOMMERCE_MANAGEMENT_URL = 'https://mcommerceservice.hoi.in/api/';
export const AIRPORTS_INFO = 'https://flightservice.hoi.in/api/';
export const MAGENTO_URL = 'https://mcommerceservice.hoi.in/api/v1/mc/magento';
export const MAGENTO_POST_DATA_URL =
  'https://mcommerce.hoi.in/index.php/cusstore/index/';

// login
export const LOGIN = `${USER_MANAGEMENT_URL}v1/admin/login`;
export const FORGOT_PASSWORD = `${USER_MANAGEMENT_URL}v1/admin/forgotPassword`;

// dashboard
export const LAST_ORDERS = MAGENTO_URL;
export const REVENUE_CHART_DATA = MAGENTO_URL;
export const STORE_FILTER = MAGENTO_URL;
export const EXPORT_LAST_ORDERS = "";

// users
export const GET_USER_FIELDS = `${USER_MANAGEMENT_URL}v1/admin/getuserfields`;
export const GET_USER_FIELDS_UPDATE_VALUE = `${USER_MANAGEMENT_URL}v1/admin/getUserDataField`;
export const GET_USER = `${USER_MANAGEMENT_URL}v1/admin/getUser`;
export const ADD_USER = `${USER_MANAGEMENT_URL}v1/admin/addUser`;
export const GET_ROLES = `${USER_MANAGEMENT_URL}v1/admin/getRoles`;
export const EDIT_USER = `${USER_MANAGEMENT_URL}v1/admin/updateUser`;
export const DELETE_USER = `${USER_MANAGEMENT_URL}v1/admin/deleteUser`;

export const GET_STORES = `${USER_MANAGEMENT_URL}v1/admin/getRoleStores`;
export const GET_STORE_UPDATE_REQUESTS = `${MCOMMERCE_MANAGEMENT_URL}v1/stores/getUpdateRequests`;
export const STORE_UPDATE_APPROVED = `${MCOMMERCE_MANAGEMENT_URL}v1/stores/storeUpdateApproved`;
export const STORE_UPDATE_REJECTED = `${MCOMMERCE_MANAGEMENT_URL}v1/stores/storeUpdateReject`;

// emergency contacts
export const GET_EMERGENCY_CONTACTS = `${USER_MANAGEMENT_URL}v1/airport/getEmergencyContacts`;

export const ADD_EMERGENCY_CONTACTS = `${USER_MANAGEMENT_URL}v1/airport/createEmergencyContact`;
export const UPDATE_EMERGENCY_CONTACTS = `${USER_MANAGEMENT_URL}v1/airport/updateEmergencyContact`;
export const DELETE_EMERGENCY_CONTACTS = `${USER_MANAGEMENT_URL}v1/airport/deleteEmergencyContact`;

export const ADD_EMERGENCY_CONTACTS_DETAILS = `${USER_MANAGEMENT_URL}v1/airport/createContactDetails`;
export const UPDATE_EMERGENCY_CONTACTS_DETAILS = `${USER_MANAGEMENT_URL}v1/airport/updateContactDetails`;
export const DELETE_EMERGENCY_CONTACTS_DETAILS = `${USER_MANAGEMENT_URL}v1/airport/deleteContactDetails`;

// common users

export const GET_COMMON_USERS = `${USER_MANAGEMENT_URL}v1/admin/getCommonDashboard`;

// airport
export const GET_AIRPORT_FIELDS = `${USER_MANAGEMENT_URL}v1/airport/getAirportField`;
export const GET_AIRPORT_FIELDS_UPDATE_VALUE = `${USER_MANAGEMENT_URL}v1/airport/getAirportDataField`;
export const GET_AIRPORTS_DETAILS = `${AIRPORTS_INFO}v1/flightapp/flightstats/airport/details`;
export const GET_ACTIVE_AIRPORTS = `${USER_MANAGEMENT_URL}v1/airport/getActiveAirports`;
export const GET_AIRPORTS = `${USER_MANAGEMENT_URL}v1/airport/getAirports`;
export const ADD_AIRPORT = `${USER_MANAGEMENT_URL}v1/airport/addAirport`;
export const EDIT_AIRPORT = `${USER_MANAGEMENT_URL}v1/airport/updateAirport`;
export const DELETE_AIRPORT = `${USER_MANAGEMENT_URL}v1/airport/deleteAirport`;

// flight service
export const AIRLINE_PUNCTUALITY_FIELDS = `${AIRPORTS_INFO}v3/airline/getAirlineField`;
export const AIRLINE_PUNCTUALITY_FIELDS_UPDATE_VALUE = `${AIRPORTS_INFO}v3/airline/updateAirlineField`;
export const AIRLINE_PUNCTUALITY = `${AIRPORTS_INFO}v3/airline/fetchAirlinePunctuality`;
export const ADD_AIRLINE_PUNCTUALITY = `${AIRPORTS_INFO}v3/airline/createAirlinePunctuality`;
export const EDIT_AIRLINE_PUNCTUALITY = `${AIRPORTS_INFO}v3/airline/updateAirlinePunctuality`;
export const DELETE_AIRLINE_PUNCTUALITY = `${AIRPORTS_INFO}v3/airline/deleteAirlinePunctuality`;

export const AIRBUS_INFO_FIELDS = `${AIRPORTS_INFO}v3/airline/getAirbusField`;
export const AIRBUS_INFO_FIELDS_UPDATE_VALUE = `${AIRPORTS_INFO}v3/airline/updateAirbusField`;
export const AIRBUS_INFO = `${AIRPORTS_INFO}v3/airline/fetchAirbusInfo`;
export const ADD_AIRBUS_INFO = `${AIRPORTS_INFO}v3/airline/createAirbusInfo`;
export const EDIT_AIRBUS_INFO = `${AIRPORTS_INFO}v3/airline/updateAirbusInfo`;
export const DELETE_AIRBUS_INFO = `${AIRPORTS_INFO}v3/airline/deleteAirbusInfo`;

// upload file
export const UPLOAD_FILE = `${USER_MANAGEMENT_URL}v1/admin/uploadFile`;
export const UPLOAD_FILE_MCOMMERCE = `${USER_MANAGEMENT_URL}v1/admin/uploadOutletImage?type=`;

// terminal
export const GET_TERMINAL_FIELDS = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/getTerminalFields`;
export const GET_TERMINAL_FIELDS_UPDATE_VALUE = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/getTerminalDataField`;
export const GET_TERMINALS = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/getterminalsListCMS`;
export const ADD_TERMINAL = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/addTerminal`;
export const EDIT_TERMINAL = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/updateTerminal`;
export const DELETE_TERMINAL = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/deleteTerminal`;

// category
export const ADD_CATEGORY = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/category/add`;
export const EDIT_CATEGORY = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/category/edit`;
export const DELETE_CATEGORY = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/category/delete`;

// sub-category
export const ADD_SUB_CATEGORY = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/category/add`;
export const EDIT_SUB_CATEGORY = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/sub_category/edit`;
export const DELETE_SUB_CATEGORY = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/sub_category/delete`;

// outlets
export const GET_STORE_FIELDS = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/getStoreFields`;
export const GET_STORE_FIELDS_UPDATE_VALUE = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/store/dynamic/update`;

export const GET_OUTLETS = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/category/store`;

export const GET_SUB_CATEGORY = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/category/list`;
export const ADD_OUTLETS = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/store/add`;
export const EDIT_OUTLETS = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/store/update`;
export const DELETE_OUTLETS = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/store/delete`;

// preferences

// seamless
export const SEAMLESS_FIELDS = `${USER_MANAGEMENT_URL}v3/settings/getSeamlessField`;
export const SEAMLESS_FIELDS_UPDATE_VALUE = `${USER_MANAGEMENT_URL}v3/settings/updateSeamlessField`;
export const SEAMLESS_VALUES_FIELDS = `${USER_MANAGEMENT_URL}v3/settings/getSeamlessValuesField`;
export const SEAMLESS_VALUES_FIELDS_UPDATE_VALUE = `${USER_MANAGEMENT_URL}v3/settings/updateSeamlessValuesField`;

export const SEAMLESS = `${USER_MANAGEMENT_URL}v3/settings/getSeamless`;
export const ADD_SEAMLESS = `${USER_MANAGEMENT_URL}v3/settings/createSeamless`;
export const UPDATE_SEAMLESS = `${USER_MANAGEMENT_URL}v3/settings/seamlessUpdate`;
export const DELETE_SEAMLESS = `${USER_MANAGEMENT_URL}v3/settings/seamlessDelete`;
export const ADD_SEAMLESS_VALUES = `${USER_MANAGEMENT_URL}v3/settings/createSeamlessValues`;
export const UPDATE_SEAMLESS_VALUES = `${USER_MANAGEMENT_URL}v3/settings/seamlessValuesUpdate`;
export const DELETE_SEAMLESS_VALUES = `${USER_MANAGEMENT_URL}v3/settings/seamlessValuesDelete`;

// exciting

export const EXCITING_FIELDS = `${USER_MANAGEMENT_URL}v3/settings/getExcitingField`;
export const EXCITING_FIELDS_UPDATE_VALUE = `${USER_MANAGEMENT_URL}v3/settings/updateExcitingField`;
export const EXCITING_VALUES_FIELDS = `${USER_MANAGEMENT_URL}v3/settings/getExcitingValuesField`;
export const EXCITING_VALUES_FIELDS_UPDATE_VALUE = `${USER_MANAGEMENT_URL}v3/settings/updateExcitingValuesField`;

export const EXCITING = `${USER_MANAGEMENT_URL}v3/settings/getExciting`;
export const ADD_EXCITING = `${USER_MANAGEMENT_URL}v3/settings/createExciting`;
export const UPDATE_EXCITING = `${USER_MANAGEMENT_URL}v3/settings/excitingUpdate`;
export const DELETE_EXCITING = `${USER_MANAGEMENT_URL}v3/settings/excitingDelete`;
export const ADD_EXCITING_VALUES = `${USER_MANAGEMENT_URL}v3/settings/createExcitingValues`;
export const UPDATE_EXCITING_VALUES = `${USER_MANAGEMENT_URL}v3/settings/excitingValuesUpdate`;
export const DELETE_EXCITING_VALUES = `${USER_MANAGEMENT_URL}v3/settings/excitingValuesDelete`;

// upcoming stores
export const GET_UPCOMING_STORES_FIELDS = `${MCOMMERCE_MANAGEMENT_URL}v3/outlet/getUpcomingStoresField`;
export const GET_UPCOMING_STORES_FIELDS_UPDATE_VALUE = `${MCOMMERCE_MANAGEMENT_URL}v3/outlet/updateUpcomingStoresFeild`;
export const GET_UPCOMING_STORES = `${MCOMMERCE_MANAGEMENT_URL}v3/outlet/getUpcomingStores`;
export const ADD_UPCOMING_STORES = `${MCOMMERCE_MANAGEMENT_URL}v3/outlet/addUpcomingStores`;
export const EDIT_UPCOMING_STORES = `${MCOMMERCE_MANAGEMENT_URL}v3/outlet/updateUpcomingStores`;
export const DELETE_UPCOMING_STORES = `${MCOMMERCE_MANAGEMENT_URL}v3/outlet/deleteUpcomingStores`;

// stores offer

export const GET_STORES_OFFER_FIELDS = `${MCOMMERCE_MANAGEMENT_URL}v3/outlet/getStoreOffersField`;
export const GET_STORES_OFFER_FIELDS_UPDATE_VALUE = `${MCOMMERCE_MANAGEMENT_URL}v3/outlet/updateStoreOffersField`;
export const GET_STORES_OFFER = `${MCOMMERCE_MANAGEMENT_URL}v3/outlet/getStoreOffers`;
export const ADD_STORES_OFFER = `${MCOMMERCE_MANAGEMENT_URL}v3/outlet/insertStoreOffers`;
export const EDIT_STORES_OFFER = `${MCOMMERCE_MANAGEMENT_URL}v3/outlet/updateStoreOffers`;
export const DELETE_STORES_OFFER = `${MCOMMERCE_MANAGEMENT_URL}v3/outlet/deleteStoreOffers`;

export const UPLOAD_BARCODE = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/uploadBarcodes`;
export const UPLOAD_REDEEM = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/updateIsRedeem`;

// baggage-info

export const GET_BAGGAGE_INFO_FIELDS = `${AIRPORTS_INFO}v3/airline/getBaggageInfoField`;
export const GET_BAGGAGE_INFO_FIELDS_UPDATE_VALUE = `${AIRPORTS_INFO}v3/airline/updateBaggageInfoField`;
export const GET_BAGGAGE_INFO = `${AIRPORTS_INFO}v3/airline/fetchBaggageInfo`;
export const ADD_BAGGAGE_INFO = `${AIRPORTS_INFO}v3/airline/createBaggageInfo`;
export const EDIT_BAGGAGE_INFO = `${AIRPORTS_INFO}v3/airline/updateBaggageInfo`;
export const DELETE_BAGGAGE_INFO = `${AIRPORTS_INFO}v3/airline/deleteBaggageInfo`;

// ETA trip

export const ETA_TRIP_FIELDS = `${USER_MANAGEMENT_URL}v3/admin/getEtaTripFields`;
export const ETA_TRIP_FIELDS_UPDATE_VALUE = `${USER_MANAGEMENT_URL}v3/admin/updateEtaTripField`;
export const ETA_TRIP = `${USER_MANAGEMENT_URL}v3/admin/fetchEtaTrip`;
export const ADD_ETA_TRIP = `${USER_MANAGEMENT_URL}v3/admin/createEtaTrip`;
export const EDIT_ETA_TRIP = `${USER_MANAGEMENT_URL}v3/admin/updateEtaTrip`;
export const DELETE_ETA_TRIP = `${USER_MANAGEMENT_URL}v3/admin/deleteEtaTrip`;

// country details
export const COUNTRY_DETAILS_FIELDS = `${USER_MANAGEMENT_URL}v3/airport/getCountryDetailsField`;
export const COUNTRY_DETAILS_FIELDS_UPDATE_VALUE = `${USER_MANAGEMENT_URL}v3/airport/updateCountryDetailsField`;
export const COUNTRY_DETAILS = `${USER_MANAGEMENT_URL}v3/airport/fetchCountryDetails`;
export const ADD_COUNTRY_DETAILS = `${USER_MANAGEMENT_URL}v3/airport/createCountryDetails`;
export const EDIT_COUNTRY_DETAILS = `${USER_MANAGEMENT_URL}v3/airport/updateCountryDetails`;
export const DELETE_COUNTRY_DETAILS = `${USER_MANAGEMENT_URL}v3/airport/deleteCountryDetails`;

// airline
export const AIRLINE_DETAILS_FIELDS = `${AIRPORTS_INFO}v3/airline/getAirlineDetailsField`;
export const AIRLINE_DETAILS_FIELDS_UPDATE_VALUE = `${AIRPORTS_INFO}v3/airline/updateAirlineDetailsField`;
export const AIRLINE_DETAILS = `${AIRPORTS_INFO}v3/airline/fetchAirline`;
export const ADD_AIRLINE_DETAILS = `${AIRPORTS_INFO}v3/airline/createAirline`;
export const EDIT_AIRLINE_DETAILS = `${AIRPORTS_INFO}v3/airline/updateAirline`;
export const DELETE_AIRLINE_DETAILS = `${AIRPORTS_INFO}v3/airline/deleteAirline`;


// cancel message

export const GET_CANCEL_MESSAGE_FIELDS = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/getCancelField`;
export const GET_CANCEL_MESSAGE_FIELDS_UPDATE_VALUE = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/updateCancelField`;
export const GET_CANCEL_MESSAGE = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/getMessage`;
export const ADD_CANCEL_MESSAGE = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/createMessage`;
export const EDIT_CANCEL_MESSAGE = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/updateMessage`;
export const DELETE_CANCEL_MESSAGE = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/deleteMessage`;



// bulk upload
export const BULK_UPLOAD_DEL = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/dial/upload`;
export const BULK_UPLOAD_HYD = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/hial/upload`;

// downloads
export const DOWNLOAD_USERS = `${USER_MANAGEMENT_URL}v1/airport/exportUsers`;
export const DOWNLOAD_AIRPORTS = `${USER_MANAGEMENT_URL}v1/airport/exportAirports`;
export const DOWNLOAD_OUTLETS = `${MCOMMERCE_MANAGEMENT_URL}v1/mc/download/outlet?`;
