import { all } from "redux-saga/effects";
import { loginSaga } from "./loginSaga";
import { userSaga } from "./userSaga";
import { dashboardSaga } from "./dashboardSaga";
import { commonUsersSaga } from "./commonUsersSaga";
import { outletsSaga } from "./outletsSaga";
import { airportsSaga } from "./airportsSaga";
import { terminalSaga } from "./terminalSaga";
import { uploadFileSaga } from "./uploadFileSaga";
import { roleSaga } from "./roleSaga";
import { emergencyContactsSaga } from "./emergencyContactsSaga";
import { preferencesSaga } from "./preferencesSaga";
import { flightServiceSaga } from "./flightServiceSaga";
import { upcomingStoresSaga } from "./upcomingStoresSaga";
import { storesOfferSaga } from "./storesOfferSaga";
import { baggageInfoSaga } from "./baggageInfoSaga";
import { etaTripSaga } from "./etaTripSaga";
import { countryDetailsSaga } from "./countryDetailsSaga";
import { cancelMessageSaga } from "./cancelMessageSaga";

export default function* rootSaga() {
  yield all([
    loginSaga(),
    userSaga(),
    dashboardSaga(),
    commonUsersSaga(),
    outletsSaga(),
    airportsSaga(),
    terminalSaga(),
    uploadFileSaga(),
    roleSaga(),
    emergencyContactsSaga(),
    preferencesSaga(),
    flightServiceSaga(),
    upcomingStoresSaga(),
    storesOfferSaga(),
    baggageInfoSaga(),
    etaTripSaga(),
    countryDetailsSaga(),
    cancelMessageSaga()
  ]);
}
