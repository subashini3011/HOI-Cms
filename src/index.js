import "./index.scss";
import "antd/dist/antd.less";
import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import App from "app";

import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
// import * as serviceWorker from "./serviceWorker";

import rootSaga from "./app/redux/sagas";
import rootReducer from "./app/redux/reducers";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

function changeLocation() {
  if (
    window.location.protocol === "http:" &&
    process.env.NODE_ENV === "production"
  ) {
    window.location.replace(
      `https://${window.location.host}${window.location.pathname}`
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
changeLocation();


// serviceWorker.unregister();
