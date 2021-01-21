import React, { Component } from 'react';
import './index.scss';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

// path constants
import { pathConstants } from 'constants/path-constants';

// components
import { Layout, Menu, Icon, Tooltip } from 'components/ui';
import {
  CmsUsersSvg,
  AirportSvg,
  HomeSvg,
  OutletsSvg,
  ReportsSvg,
  LogoutSvg
} from 'components/svg-icons-component';

// images
import Logo from 'images/dashboard-logo.png';
import sidebarBackgroundImage from 'images/sidebar-background-image.png';
import * as User from '../../shared/app-data/user';

import { getSubCategory } from '../../redux/actions/outletsActions';

const { Sider } = Layout;
const { SubMenu } = Menu;

class HOISideNav extends Component {
  constructor(props) {
    super(props);
    const { history } = this.props;
    this.state = {
      defaultSelectedKey: history.location.pathname,
      collapsed: false,
      sideMenu: [],
      userInfo: ''
    };
  }

  componentDidMount() {
    let { userInfo } = this.state;
    const { getSubCategory } = this.props;
    userInfo = User.getUserData();
    getSubCategory();
    this.setState({ userInfo });
  }

  componentWillReceiveProps(nextProps) {
    const { getSubCategoryResponse, history } = this.props;
    const { defaultSelectedKey } = this.state;
    if (nextProps.history.location.pathname !== defaultSelectedKey) {
      this.setState({
        defaultSelectedKey: history.location.pathname
      });
    }
    if (
      nextProps.getSubCategoryResponse &&
      nextProps.getSubCategoryResponse !== getSubCategoryResponse
    ) {
      if (
        nextProps.getSubCategoryResponse.error === 0 &&
        nextProps.getSubCategoryResponse.content
      ) {
        const sideMenu = nextProps.getSubCategoryResponse.content;
        this.setState({ sideMenu });
      }
    }
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  handleLogoClick = () => {
    const { history } = this.props;
    if (history.location.pathname !== pathConstants.DASHBOARD) {
      history.push(pathConstants.DASHBOARD);
    }
  };

  handleClick = e => {
    const checkValue = e.key;
    const { history, handleSelectedCategory } = this.props;

    if (checkValue) {
      if (checkValue === '/logout') {
        User.setUserData(null);
        sessionStorage.clear();
        localStorage.clear();
        history.push(pathConstants.LOGIN);
      } else if (history.location.pathname !== checkValue) {
        const val = Number(checkValue);
        handleSelectedCategory(val);
        history.push(checkValue);
        this.setState({ defaultSelectedKey: checkValue });
      }
    } else {
      history.push(pathConstants.DASHBOARD);
    }
  };

  renderOutletMenu = () => {
    const { defaultSelectedKey } = this.state;
    const { sideMenu } = this.state;
    const sideMenuDom = [];
    if (sideMenu) {
      sideMenuDom.push(
        sideMenu.map(item => {
          const sideMenuOptions = [];
          sideMenuOptions.push(
            <Menu.Item key={`${item.id}`} className="menu-item">
              {item.image ? (
                <img
                  src={item.image}
                  className="menu-item__image"
                  onError={(this.src = OutletsSvg)}
                  style={{
                    color:
                      defaultSelectedKey === `/${item.id}`
                        ? '#222222'
                        : '#ffffff'
                  }}
                  alt="category"
                />
              ) : (
                <Icon
                  component={OutletsSvg}
                  style={{
                    color:
                      defaultSelectedKey === `/${item.id}`
                        ? '#222222'
                        : '#ffffff'
                  }}
                  alt="category"
                />
              )}
              <span>{item.name}</span>
            </Menu.Item>
          );
          return sideMenuOptions;
        })
      );
    }
    return sideMenuDom;
  };

  render() {
    const { userInfo, collapsed, defaultSelectedKey } = this.state;
    return (
      <Sider
        width="19.4rem"
        style={{ background: '#4a4546' }}
        breakpoint="md"
        onBreakpoint={this.onCollapse}
        collapsed={collapsed}
      >
        <div className="logo">
          <div onClick={this.handleLogoClick} role="presentation">
            <img src={Logo} alt="logo" />
            {!collapsed ? <div>HOI</div> : null}
          </div>
        </div>
        <div className="horizontal-line" />
        <Menu
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={[`${defaultSelectedKey}`]}
          // selectedKeys={[`${defaultSelectedKey}`]}
          selectedKeys={defaultSelectedKey}
          style={{
            backgroundColor: '#4a4546',
            backgroundImage: `url(${sidebarBackgroundImage})`,
            backgroundPosition: 'bottom',
            height: 'calc(100vh - 6.1rem)',
            marginTop: '0.8rem',
            overflowY: 'auto'
          }}
          onClick={this.handleClick}
        >
          {/* {userInfo && userInfo.role === 'Store Supervisor' && ( */}
          <Menu.Item key={pathConstants.DASHBOARD} className="menu-item">
            <Icon
              component={HomeSvg}
              style={{
                color:
                  defaultSelectedKey === pathConstants.DASHBOARD
                    ? '#222222'
                    : '#ffffff'
              }}
            />
            <span>Dashboard</span>
          </Menu.Item>
          {/* )} */}

          {/* {userInfo && userInfo.role !== "Store Supervisor" && ( */}

          {/* )} */}
          {userInfo && userInfo.role === 'Super Admin' && (
            <Menu.Item key={pathConstants.AIRPORT} className="menu-item">
              <Icon
                component={AirportSvg}
                style={{
                  color:
                    defaultSelectedKey === pathConstants.AIRPORT
                      ? '#222222'
                      : '#ffffff'
                }}
              />
              <span>Airport</span>
            </Menu.Item>
          )}
          {userInfo && userInfo.role === 'Super Admin' && (
            <Menu.Item key={pathConstants.TERMINAL} className="menu-item">
              <Icon
                component={ReportsSvg}
                style={{
                  color:
                    defaultSelectedKey === pathConstants.TERMINAL
                      ? '#222222'
                      : '#ffffff'
                }}
              />
              <span>Terminal</span>
            </Menu.Item>
          )}
          {userInfo &&
            (userInfo.role === 'Super Admin' ||
              userInfo.role === 'Airport Admin') && (
              <Menu.Item
                key={pathConstants.AIRLINE_PUNCTUALITY}
                className="menu-item"
              >
                <Icon
                  component={AirportSvg}
                  style={{
                    color:
                      defaultSelectedKey === pathConstants.AIRLINE_PUNCTUALITY
                        ? '#222222'
                        : '#ffffff'
                  }}
                />
                <span>Airline Punctuality</span>
              </Menu.Item>
            )}
          {userInfo &&
            (userInfo.role === 'Super Admin' ||
              userInfo.role === 'Airport Admin') && (
              <Menu.Item key={pathConstants.AIRBUS_INFO} className="menu-item">
                <Icon
                  component={AirportSvg}
                  style={{
                    color:
                      defaultSelectedKey === pathConstants.AIRBUS_INFO
                        ? '#222222'
                        : '#ffffff'
                  }}
                />
                <span>Airbus Info</span>
              </Menu.Item>
            )}
          {userInfo &&
            (userInfo.role === 'Super Admin' ||
              userInfo.role === 'Airport Admin') && (
              <Menu.Item
                key={pathConstants.AIRLINE_DETAILS}
                className="menu-item"
              >
                <Icon
                  component={AirportSvg}
                  style={{
                    color:
                      defaultSelectedKey === pathConstants.AIRLINE_DETAILS
                        ? '#222222'
                        : '#ffffff'
                  }}
                />
                <span>Airline Details</span>
              </Menu.Item>
            )}
          {userInfo &&
            (userInfo.role === 'Super Admin' ||
              userInfo.role === 'Airport Admin') && (
              <Menu.Item
                key={pathConstants.CATEGORY_LIST}
                className="menu-item"
              >
                <Icon
                  component={ReportsSvg}
                  style={{
                    color:
                      defaultSelectedKey === pathConstants.CATEGORY_LIST
                        ? '#222222'
                        : '#ffffff'
                  }}
                />
                <span>Category List</span>
              </Menu.Item>
            )}
          <Menu.Item key={pathConstants.CMSUSERS} className="menu-item">
            <Icon
              component={CmsUsersSvg}
              style={{
                color:
                  defaultSelectedKey === pathConstants.CMSUSERS
                    ? '#222222'
                    : '#ffffff'
              }}
            />
            <span>CMS Users</span>
          </Menu.Item>
          {userInfo && userInfo.role === 'Airport Admin' && (
            <Menu.Item
              key={pathConstants.UPDATE_REQUESTS}
              className="menu-item"
            >
              <Icon
                component={ReportsSvg}
                style={{
                  color:
                    defaultSelectedKey === pathConstants.UPDATE_REQUESTS
                      ? '#222222'
                      : '#ffffff'
                }}
              />
              <span>Update Requests</span>
            </Menu.Item>
          )}
          {userInfo && userInfo.role === 'Store Supervisor' && (
            <Menu.Item key={pathConstants.STORES} className="menu-item">
              <Icon
                component={OutletsSvg}
                style={{
                  color:
                    defaultSelectedKey === pathConstants.STORES
                      ? '#222222'
                      : '#ffffff'
                }}
              />
              <span>Stores</span>
            </Menu.Item>
          )}
          {userInfo &&
            (userInfo.role === 'Super Admin' ||
              userInfo.role === 'Airport Admin') && (
              <SubMenu
                key="outlets"
                title={
                  <span>
                    <Icon
                      component={OutletsSvg}
                      style={{
                        color:
                          defaultSelectedKey === 'outlets'
                            ? '#222222'
                            : '#ffffff'
                      }}
                    />
                    <span>Outlets</span>
                  </span>
                }
              >
                {this.renderOutletMenu()}
              </SubMenu>
            )}
          {userInfo &&
            (userInfo.role === 'Super Admin' ||
              userInfo.role === 'Airport Admin') && (
              <Menu.Item
                key={pathConstants.EMERGENCY_CONTACTS}
                className="menu-item"
              >
                <Icon
                  component={CmsUsersSvg}
                  style={{
                    color:
                      defaultSelectedKey === pathConstants.EMERGENCY_CONTACTS
                        ? '#222222'
                        : '#ffffff'
                  }}
                />
                <Tooltip title="Emergency Contacts">
                  <span>Emergency Contacts</span>
                </Tooltip>
              </Menu.Item>
            )}
          {userInfo &&
            (userInfo.role === 'Super Admin' ||
              userInfo.role === 'Airport Admin') && (
              <SubMenu
                key="Preferences"
                title={
                  <span>
                    <Icon
                      component={OutletsSvg}
                      style={{
                        color:
                          defaultSelectedKey === 'Preferences'
                            ? '#222222'
                            : '#ffffff'
                      }}
                    />
                    <span>Preferences</span>
                  </span>
                }
              >
                <Menu.Item key={pathConstants.SEAMLESS} className="menu-item">
                  <Icon
                    component={ReportsSvg}
                    style={{
                      color:
                        defaultSelectedKey === pathConstants.SEAMLESS
                          ? '#222222'
                          : '#ffffff'
                    }}
                  />

                  <span>Seamless</span>
                </Menu.Item>
                <Menu.Item key={pathConstants.EXCITING} className="menu-item">
                  <Icon
                    component={ReportsSvg}
                    style={{
                      color:
                        defaultSelectedKey === pathConstants.EXCITING
                          ? '#222222'
                          : '#ffffff'
                    }}
                  />

                  <span>Exciting</span>
                </Menu.Item>
              </SubMenu>
            )}
          {userInfo &&
            (userInfo.role === 'Super Admin' ||
              userInfo.role === 'Airport Admin') && (
              <Menu.Item
                key={pathConstants.UPCOMING_STORES}
                className="menu-item"
              >
                <Icon
                  component={OutletsSvg}
                  style={{
                    color:
                      defaultSelectedKey === pathConstants.UPCOMING_STORES
                        ? '#222222'
                        : '#ffffff'
                  }}
                />
                <span>Upcoming Stores</span>
              </Menu.Item>
            )}
          {userInfo &&
            (userInfo.role === 'Super Admin' ||
              userInfo.role === 'Airport Admin') && (
              <Menu.Item key={pathConstants.STORES_OFFER} className="menu-item">
                <Icon
                  component={OutletsSvg}
                  style={{
                    color:
                      defaultSelectedKey === pathConstants.STORES_OFFER
                        ? '#222222'
                        : '#ffffff'
                  }}
                />
                <span>Stores Offer</span>
              </Menu.Item>
            )}
          {userInfo &&
            (userInfo.role === 'Super Admin' ||
              userInfo.role === 'Airport Admin') && (
              <Menu.Item key={pathConstants.BAGGAGE_INFO} className="menu-item">
                <Icon
                  component={ReportsSvg}
                  style={{
                    color:
                      defaultSelectedKey === pathConstants.BAGGAGE_INFO
                        ? '#222222'
                        : '#ffffff'
                  }}
                />
                <span>Baggage Info</span>
              </Menu.Item>
            )}
          {userInfo &&
            (userInfo.role === 'Super Admin' ||
              userInfo.role === 'Airport Admin') && (
              <Menu.Item key={pathConstants.ETA_TRIP} className="menu-item">
                <Icon
                  component={ReportsSvg}
                  style={{
                    color:
                      defaultSelectedKey === pathConstants.ETA_TRIP
                        ? '#222222'
                        : '#ffffff'
                  }}
                />
                <span>ETA Trip</span>
              </Menu.Item>
            )}
          {userInfo &&
            (userInfo.role === 'Super Admin' ||
              userInfo.role === 'Airport Admin') && (
              <Menu.Item
                key={pathConstants.COUNTRY_DETAILS}
                className="menu-item"
              >
                <Icon
                  component={ReportsSvg}
                  style={{
                    color:
                      defaultSelectedKey === pathConstants.COUNTRY_DETAILS
                        ? '#222222'
                        : '#ffffff'
                  }}
                />
                <span>Country Details</span>
              </Menu.Item>
            )}
            <Menu.Item key={pathConstants.CANCEL_MESSAGE} className="menu-item">
            <Icon
              component={ReportsSvg}
              style={{
                color:
                  defaultSelectedKey === pathConstants.CANCEL_MESSAGE
                    ? '#222222'
                    : '#ffffff'
              }}
            />
            <span>Cancel Message</span>
          </Menu.Item>

          <Menu.Item key="/logout" className="menu-item">
            <Icon
              component={LogoutSvg}
              style={{
                color: defaultSelectedKey === 'logout' ? '#222222' : '#ffffff'
              }}
            />
            <span>Logout</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    getSubCategoryResponse: state.outlets.getSubCategoryResponse
  };
}

export default connect(
  mapStateToProps,
  {
    getSubCategory
  }
)(withRouter(HOISideNav));

HOISideNav.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  getSubCategoryResponse: PropTypes.objectOf(PropTypes.any),
  handleSelectedCategory: PropTypes.func.isRequired,
  getSubCategory: PropTypes.func.isRequired
};

HOISideNav.defaultProps = {
  getSubCategoryResponse: {}
};
