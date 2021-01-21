import './index.scss';
import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { getActiveAirports } from '../../redux/actions/airportsActions';
import { pageRefreshing } from '../../redux/actions/nonApiActions';
import moment from 'moment';

// components
import {
  Layout,
  Select,
  Icon,
  Modal,
  Menu,
  Button,
  Tooltip
} from 'components/ui';
// constants
import { pathConstants } from 'constants/path-constants';

//components
import TimeRangePicker from 'components/time-range-picker';
import ErrorText from 'components/error-text';
//images
import defaulProfilePic from 'images/default-profile-pic.png';
import * as User from '../../shared/app-data/user';

const { Header } = Layout;
const Option = Select.Option;

class HOIHeaders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      activeAirports: [],
      isStartDateCalenderOpen: true,
      isLoading: false,
      userRole: '',
      selectedTime: 1,
      showErrorMsg: false,
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      timeFilterOptions: [
        { key: 'daily', value: 1, name: 'DAILY' },
        { key: 'weekly', value: 2, name: 'WEEKLY' },
        { key: 'monthly', value: 3, name: 'MONTHLY' },
        { key: 'quarterly', value: 4, name: 'QUARTERLY' },
        { key: 'yearly', value: 5, name: 'YEARLY' },
        { key: 'custom', value: 6, name: 'CUSTOM' }
      ]
    };
  }

  componentDidMount() {
    const userRole = User.getUserRole();
    const userInfo = User.getUserData();
    this.setState({ userRole, isStartDateCalenderOpen: true });
    const data = {
      user_id: userInfo.id,
      role: userRole
    };
    this.props.getActiveAirports(data);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.pageRefreshingResponse &&
      nextProps.pageRefreshingResponse !== this.props.pageRefreshingResponse
    ) {
      this.setState({ isLoading: nextProps.pageRefreshingResponse.isLoading });
    }
    if (
      nextProps.getActiveAirportsResponse &&
      nextProps.getActiveAirportsResponse !==
        this.props.getActiveAirportsResponse
    ) {
      if (
        nextProps.getActiveAirportsResponse.error === 0 &&
        nextProps.getActiveAirportsResponse.content &&
        nextProps.getActiveAirportsResponse.content.Airports
      ) {
        let selectedAiport = sessionStorage.getItem('sA');
        if (!selectedAiport) {
          this.props.onAirportChange(
            nextProps.getActiveAirportsResponse.content.Airports[0].iata_code
          );
        } else {
          this.props.onAirportChange(selectedAiport);
        }

        this.setState({
          activeAirports: nextProps.getActiveAirportsResponse.content.Airports
        });
      }
    }
  }

  onProfileChange = ({ key }) => {
  };

  onAirportChange = value => {
    sessionStorage.setItem('sA', value);
    this.props.onAirportChange(value);
  };

  refreshPage = () => {
    const pathname = this.props.history.location.pathname;
    if (pathname !== pathConstants.REPORTS) {
      this.props.pageRefreshing({ isLoading: true });
    }
  };

  onTimeChange = value => {
    if (value === 6) {
      this.setState({ modal1Visible: true });
    } else {
      const { onTimeFilterChange } = this.props;
      const data = {
        value
      };
      onTimeFilterChange(data);
    }
    this.setState({ selectedTime: value });
  };

  opencalender() {
    this.setState({ calenderShow: false });
  }

  setModal1Visible = (modal1Visible, type) => {
    let { selectedTime } = this.state;
    if (type && type === 'close') {
      selectedTime = 1;
      const { onTimeFilterChange } = this.props;
      const data = {
        value: selectedTime
      };
      onTimeFilterChange(data);
    }
    this.setState({ modal1Visible, selectedTime });
  };

  handleStartDate = (date, dateString) => {
    this.setState({ startDate: dateString, showErrorMsg: false });
  };

  handleStartTime = (time, timeString) => {
    this.setState({ startTime: timeString, showErrorMsg: false });
  };

  handleEndDate = (date, dateString) => {
    this.setState({ endDate: dateString, showErrorMsg: false });
  };

  handleEndTime = (time, timeString) => {
    this.setState({ endTime: timeString, showErrorMsg: false });
  };

  disabledStartDate = startDate => {
    const { endDate } = this.state;
    if (!startDate || !endDate) {
      return false;
    }
    return startDate.valueOf() > endDate.valueOf();
  };

  disabledEndDate = endDate => {
    const { startDate } = this.state;
    if (!endDate || !startDate) {
      return false;
    }
    return endDate.valueOf() <= startDate.valueOf();
  };

  handleCalenderSubmit = modal1Visible => {
    const { startDate, startTime, endDate, endTime } = this.state;
    const { onTimeFilterChange } = this.props;
    const timeData = {
      startDate,
      startTime,
      endDate,
      endTime
    };

    if (
      startDate === null ||
      startDate === '' ||
      startTime === null ||
      endDate === null ||
      endDate === '' ||
      endTime === null
    ) {
      this.setState({ showErrorMsg: true });
    } else {
      let startD = startDate
        .split('/')
        .reverse()
        .join('/');
      let endD = endDate
        .split('/')
        .reverse()
        .join('/');
      let type;
      let startDat = new Date(startD);
      let endDat = new Date(endD);
      
      if (startDat.getFullYear() !== endDat.getFullYear()) {
        type = 'year';
      } else if (startDat.getMonth() !== endDat.getMonth()) {
        type = 'month';
      } else if (startDat.getDate() !== endDat.getDate()) {
        type = 'day';
      } else {
        type = 'hour';
      }

      const data = {
        value: 6,
        start_date: startD + ' ' + startTime,
        end_date: endD + ' ' + endTime,
        type
      };
      onTimeFilterChange(data);
      this.setState({ modal1Visible });
    }
  };

  handleReset = () => {
    this.setState({
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null
    });
  };

  renderTimeFilterSelectOptions = () => {
    const { timeFilterOptions } = this.state;
    let selectDom = [];
    selectDom = timeFilterOptions.map(item => {
      return (
        <Option
          className="header--left__select__time__item"
          key={item.key}
          value={item.value}
        >
          {item.name}
        </Option>
      );
    });
    return selectDom;
  };

  render() {
    const { showErrorMsg } = this.state;
    const {
      activeAirports,
      userRole,
      selectedTime,
      isStartDateCalenderOpen,
      startDate,
      endDate,
      endOpen,
      startTime,
      endTime
    } = this.state;
    const { selectedAirport, userInfo, location } = this.props;

    const profileMenu = (
      <Menu onClick={this.onProfileChange}>
        <Menu.Item key="0">
          {/* <a>1st menu item</a> */}
          {/* <a onClick={this.props.onProfileEdit}>Edit Profile</a> */}
        </Menu.Item>
        <Menu.Item key="1">{/* <a>2nd menu item</a> */}</Menu.Item>
      </Menu>
    );

    const titlecalender = (
      <div className="custom-calender__header">
        <span className="custom-calender__header__text">CUSTOM</span>
        <span className="custom-calender__header__left">
          <Button
            size="small"
            className="custom-calender__header__text custom-calender__header__resetbtn"
            onClick={() => this.handleReset()}
          >
            RESET
          </Button>
          <Button
            size="small"
            type="primary"
            className="custom-calender__header__text custom-calender__header__searchbtn"
            onClick={() => this.handleCalenderSubmit(false)}
          >
            SEARCH
          </Button>
          {showErrorMsg && (
            <ErrorText errorMessage="Please fill all the fields" />
          )}
        </span>
      </div>
    );

    return (
      <Header style={{ background: '#fff', padding: '0px', height: '5.3rem' }}>
        <div className="header">
          <div className="header--left">
            {activeAirports &&
              userRole &&
              selectedAirport &&
              (userRole === 'Super Admin' || userRole === 'Airport Admin') && (
                // ||userRole === "Store Supervisor"
                <Select
                  size="small"
                  defaultValue={this.props.selectedAirport}
                  style={{ width: 290 }}
                  className="header--left__select__airport"
                  onChange={this.onAirportChange}
                >
                  {activeAirports.map((item, index) => {
                    return (
                      <Option  key={index} value={item.iata_code}>
                        {item.airport_name}
                      </Option>
                    );
                  })}
                </Select>
              )}
            {/* {location.pathname === '/dashboard' && (
              <React.Fragment>
                <span className="header--left__text">Filter Data By</span>
                <Select
                  size="small"
                  value={selectedTime}
                  style={{ width: 149 }}
                  className="header--left__select__time"
                  onSelect={this.onTimeChange}
                >
                  {this.renderTimeFilterSelectOptions()}
                </Select>
                <Modal
                  title={titlecalender}
                  style={{ top: 37 }}
                  visible={this.state.modal1Visible}
                  onOk={() => this.setModal1Visible(false)}
                  onCancel={() => this.setModal1Visible(false, 'close')}
                  mask={false}
                  bodyStyle={{ height: 350 }}
                  footer={false}
                  maskClosable={false}
                >
                  <TimeRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    startDate={startDate}
                    startTime={startTime}
                    endDate={endDate}
                    endTime={endTime}
                    disabledStartDate={this.disabledStartDate}
                    disabledEndDate={this.disabledEndDate}
                    handleStartDate={this.handleStartDate}
                    handleStartTime={this.handleStartTime}
                    handleEndDate={this.handleEndDate}
                    handleEndTime={this.handleEndTime}
                  />
                </Modal>
              </React.Fragment>
            )} */}
          </div>

          <div className="header--right">
            <Tooltip placement="left" title="Refresh Page">
              <Icon
                type="sync"
                spin={this.state.isLoading}
                className="header--right__icon"
                onClick={this.refreshPage}
              />
            </Tooltip>
            {/* <Dropdown overlay={profileMenu} trigger={["click"]}> */}
            <div className="ant-dropdown-link header--right__dropdown">
              <img
                src={
                  this.props.userInfo.profile_pic &&
                  this.props.userInfo.profile_pic !== ''
                    ? this.props.userInfo.profile_pic
                    : defaulProfilePic
                }
                alt="profile"
              />
              <span>{this.props.userInfo.first_name}</span>
              {/* <Icon type="caret-down" /> */}
            </div>
            {/* </Dropdown> */}
            {/* <Icon type="ellipsis" className="header--right__icon" /> */}
          </div>
        </div>
      </Header>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    getActiveAirportsResponse: state.airports.getActiveAirportsResponse,
    pageRefreshingResponse: state.nonApiStore.pageRefreshingResponse
  };
}

export default connect(
  mapStateToProps,
  {
    getActiveAirports,
    pageRefreshing
  }
)(withRouter(HOIHeaders));
