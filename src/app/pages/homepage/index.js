import React, { Component } from 'react';

import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Loadable from 'react-loadable';
import Loader from 'components/loader';

// path constants
import { pathConstants } from 'constants/path-constants';

// containers
import HOIHeader from 'containers/header';
import HOISideNav from 'containers/sideNav';

// components
import { Layout, message } from 'components/ui';
import NewUserForm from 'components/forms/new-user-form';
import * as User from '../../shared/app-data/user';

const { Content } = Layout;

const Dashboard = Loadable({
  loader: () => import('containers/dashboard'),
  loading: Loader,
  timeout: 8000
});

const CMSUsers = Loadable({
  loader: () => import('containers/cms-users'),
  loading: Loader,
  timeout: 8000
});

const Airport = Loadable({
  loader: () => import('containers/airport'),
  loading: Loader,
  timeout: 8000
});

// const AirportTerminals = Loadable({
//   loader: () => import("containers/airport-terminals"),
//   loading: Loader,
//   timeout: 8000
// });

const AirportTerminals = Loadable({
  loader: () => import('containers/airport-terminals'),
  loading: Loader,
  timeout: 8000
});

const CategoryList = Loadable({
  loader: () => import('containers/category-list'),
  loading: Loader,
  timeout: 8000
});

const Stores = Loadable({
  loader: () => import('containers/stores'),
  loading: Loader,
  timeout: 8000
});

const UpdateRequests = Loadable({
  loader: () => import('containers/update-requests'),
  loading: Loader,
  timeout: 8000
});

const DynamicCategoryList = Loadable({
  loader: () => import('containers/dynamic-category-list'),
  loading: Loader,
  timeout: 8000
});

const EmergencyContacts = Loadable({
  loader: () => import('containers/emergency-contacts'),
  loading: Loader,
  timeout: 8000
});

const Seamless = Loadable({
  loader: () => import('containers/seamless'),
  loading: Loader,
  timeout: 8000
});

const Exciting = Loadable({
  loader: () => import('containers/exciting'),
  loading: Loader,
  timeout: 8000
});

const AirlinePunctuality = Loadable({
  loader: () => import('containers/airline-punctuality'),
  loading: Loader,
  timeout: 8000
});

const AirbusInfo = Loadable({
  loader: () => import('containers/airbus-info'),
  loading: Loader,
  timeout: 8000
});

const AirlineDetails = Loadable({
  loader: () => import('containers/airline-details'),
  loading: Loader,
  timeout: 8000
});

const UpcomingStores = Loadable({
  loader: () => import('containers/upcoming-stores'),
  loading: Loader,
  timeout: 8000
});

const StoresOffer = Loadable({
  loader: () => import('containers/stores-offer'),
  loading: Loader,
  timeout: 8000
});

const BaggageInfo = Loadable({
  loader: () => import('containers/baggage-info'),
  loading: Loader,
  timeout: 8000
});

const EtaTrip = Loadable({
  loader: () => import('containers/eta-trip'),
  loading: Loader,
  timeout: 8000
});

const CountryDetails = Loadable({
  loader: () => import('containers/country-details'),
  loading: Loader,
  timeout: 8000
});

const Reports = Loadable({
  loader: () => import('containers/reports'),
  loading: Loader,
  timeout: 8000
});

const CancelMessage = Loadable({
  loader: () => import('containers/cancel-message'),
  loading: Loader,
  timeout: 8000
});


class HomePage extends Component {
  constructor(props) {
    super(props);
    const { history } = this.props;
    this.state = {
      selectedAirport: '',
      selectedCategory: history.location.pathname
        ? history.location.pathname.replace(/\D/g, '')
        : '',
      isProfileEdit: false,
      dashboardTimeFilterValue: { value: 1 },
      userInfo: ''
    };
  }

  componentDidMount() {
    let { userInfo } = this.state;
    const { history } = this.props;
    userInfo = User.getUserData();
    if (!userInfo || !userInfo.id) {
      message.warning('Please login to continue...');
      history.push(pathConstants.LOGIN);
    }
    this.setState({ userInfo });
  }

  handleSelectedCategory = val => {
    this.setState({ selectedCategory: val });
  };

  onAirportChange = value => {
    this.setState({ selectedAirport: value });
  };

  onProfileEdit = () => {
    this.setState({ isProfileEdit: true });
  };

  handleCancel = () => {
    this.setState({ isProfileEdit: false });
  };

  AfterUserProfileEdit = editedUserRecord => {
    let role;
    if (editedUserRecord.role === 2) {
      role = 'Admin';
    } else {
      role = 'User';
    }
    const data = {
      email: editedUserRecord.email,
      first_name: editedUserRecord.first_name,
      id: editedUserRecord.user_id,
      last_name: editedUserRecord.last_name,
      modified_on: editedUserRecord.modified_on,
      profile_pic: editedUserRecord.profile_pic,
      role,
      status: editedUserRecord.status,
      user_name: editedUserRecord.user_name
    };
    // localStorage.setItem("userInfo", JSON.stringify(data));
    this.setState({ userInfo: data, isProfileEdit: false });
  };

  render() {
    const {
      isProfileEdit,
      selectedCategory,
      selectedAirport,
      userInfo
    } = this.state;
    return (
      <div className="home">
        {userInfo && userInfo.id && (
          <Layout style={{ height: '100%' }}>
            <HOISideNav handleSelectedCategory={this.handleSelectedCategory} />
            <Layout>
              <HOIHeader
                onAirportChange={this.onAirportChange}
                selectedAirport={selectedAirport}
                onProfileEdit={this.onProfileEdit}
                onTimeFilterChange={this.onTimeFilterChange}
                userInfo={userInfo}
              />
              <Content
                style={{
                  background: '#eeeef4',
                  padding: '2.2rem',
                  overflowY: 'auto'
                }}
              >
                {isProfileEdit && (
                  <NewUserForm
                    isProfileEdit={isProfileEdit}
                    handleCancel={this.handleCancel}
                    editRecord={userInfo}
                    AfterUserProfileEdit={this.AfterUserProfileEdit}
                  />
                )}

                {!isProfileEdit && (
                  <Switch>
                    <Route
                      exact
                      path={pathConstants.DASHBOARD}
                      component={() => (
                        <Dashboard selectedAirport={selectedAirport} />
                      )}
                    />
                    <Route
                      exact
                      path={pathConstants.UPDATE_REQUESTS}
                      component={() => (
                        <UpdateRequests selectedAirport={selectedAirport} />
                      )}
                    />
                    <Route
                      exact
                      path={pathConstants.CMSUSERS}
                      component={() => (
                        <CMSUsers selectedAirport={selectedAirport} />
                      )}
                    />
                    <Route
                      exact
                      path={pathConstants.AIRPORT}
                      component={() => (
                        <Airport selectedAirport={selectedAirport} />
                      )}
                    />
                    <Route
                      exact
                      path={pathConstants.TERMINAL}
                      component={() => (
                        <AirportTerminals selectedAirport={selectedAirport} />
                      )}
                    />
                    <Route
                      exact
                      path={pathConstants.CATEGORY_LIST}
                      component={() => (
                        <CategoryList
                          selectedAirport={selectedAirport}
                          // handleGetCategoryList={this.handleGetCategoryList}
                        />
                      )}
                    />
                    <Route
                      exact
                      path={pathConstants.STORES}
                      component={() => (
                        <Stores
                          selectedAirport={selectedAirport}
                          selectedCategory={selectedCategory}
                        />
                      )}
                    />
                    {selectedCategory && (
                      <Route
                        exact
                        path=""
                        component={() => (
                          <DynamicCategoryList
                            selectedAirport={selectedAirport}
                            selectedCategory={selectedCategory}
                          />
                        )}
                      />
                    )}
                    <Route
                      exact
                      path={pathConstants.REPORTS}
                      component={() => (
                        <Reports selectedAirport={selectedAirport} />
                      )}
                    />
                    <Route
                      exact
                      path={pathConstants.EMERGENCY_CONTACTS}
                      component={() => (
                        <EmergencyContacts selectedAirport={selectedAirport} />
                      )}
                    />
                    <Route
                      exact
                      path={pathConstants.SEAMLESS}
                      component={() => (
                        <Seamless selectedAirport={selectedAirport} />
                      )}
                    />
                    <Route
                      exact
                      path={pathConstants.EXCITING}
                      component={() => (
                        <Exciting selectedAirport={selectedAirport} />
                      )}
                    />
                    <Route
                      exact
                      path={pathConstants.AIRLINE_PUNCTUALITY}
                      component={() => (
                        <AirlinePunctuality selectedAirport={selectedAirport} />
                      )}
                    />
                    <Route
                      exact
                      path={pathConstants.AIRBUS_INFO}
                      component={() => (
                        <AirbusInfo selectedAirport={selectedAirport} />
                      )}
                    />
                    <Route
                      exact
                      path={pathConstants.AIRLINE_DETAILS}
                      component={() => (
                        <AirlineDetails selectedAirport={selectedAirport} />
                      )}
                    />
                    <Route
                      exact
                      path={pathConstants.UPCOMING_STORES}
                      component={() => (
                        <UpcomingStores selectedAirport={selectedAirport} />
                      )}
                    />
                    <Route
                      exact
                      path={pathConstants.STORES_OFFER}
                      selectedAirport={selectedAirport}
                      component={() => (
                        <StoresOffer selectedAirport={selectedAirport} />
                      )}
                    />
                    <Route
                      exact
                      path={pathConstants.BAGGAGE_INFO}
                      selectedAirport={selectedAirport}
                      component={() => (
                        <BaggageInfo selectedAirport={selectedAirport} />
                      )}
                    />
                    <Route
                      exact
                      path={pathConstants.ETA_TRIP}
                      selectedAirport={selectedAirport}
                      component={() => (
                        <EtaTrip selectedAirport={selectedAirport} />
                      )}
                    />
                    <Route
                      exact
                      path={pathConstants.COUNTRY_DETAILS}
                      selectedAirport={selectedAirport}
                      component={() => (
                        <CountryDetails selectedAirport={selectedAirport} />
                      )}
                    />
                    <Route
                      exact
                      path={pathConstants.CANCEL_MESSAGE}
                      selectedAirport={selectedAirport}
                      component={() => (
                        <CancelMessage selectedAirport={selectedAirport} />
                      )}
                    />

                  </Switch>
                )}
              </Content>
            </Layout>
          </Layout>
        )}
      </div>
    );
  }
}
export default withRouter(HomePage);

// HomePage.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func.isRequired,
//     location: PropTypes.object.isRequired
//   }).isRequired
// };

// HomePage.defaultProps = {
//   // history: PropTypes.Object
// };
