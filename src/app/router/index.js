import React, { Component } from "react";

import { withRouter } from "react-router";
import { Switch, Route } from "react-router-dom";

import Loadable from "react-loadable";
import Loader from "components/loader";

// path constants
import { pathConstants } from "constants/path-constants";

const Login = Loadable({
  loader: () => import("pages/login"),
  loading: Loader,
  timeout: 8000
});

const HomePage = Loadable({
  loader: () => import("pages/homepage"),
  loading: Loader,
  timeout: 8000
});

class Router extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path={pathConstants.LOGIN} component={Login} />
          <Route exact path={pathConstants.DASHBOARD} component={HomePage} />
          <Route exact path="" component={HomePage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Router);
