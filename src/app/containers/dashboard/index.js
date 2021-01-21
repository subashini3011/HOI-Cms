import "./index.scss";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { MAGENTO_POST_DATA_URL } from "constants/api-constants";
import { pageRefreshing } from "../../redux/actions/nonApiActions";
import CommonTable from "components/commonTable";

import {
  lastOrders,
  revenueChartData
} from "../../redux/actions/dashboardActions";
// container
import StatisticCardContainer from "containers/statistic-card";
import TableFilter from "components/tableOperations/tableFilters";

// components
import Loading from "components/loading";
import { Row, Col, Table, Button, Select, Empty, Modal } from "components/ui";
import RevenueChart from "components/chart";
import * as User from "../../shared/app-data/user";
import CSVDownloadOption from "components/csv-download-option";
import TimeRangePicker from "components/time-range-picker";
import ErrorText from "components/error-text";

const Option = Select.Option;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    let userData = User.getUserData();
    this.state = {
      isLoading: true,
      selectedAirport: this.props.selectedAirport,
      revenueChartDataList: [],
      selectStoreOptions: [],
      isStoreAllData: true,
      selectedStoreValue: undefined,
      isAllSelected: true,
      selectedTime: 1,
      showErrorMsg: false,
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      startDateValue: null,
      endDateValue: null,
      statisticCardData: [],
      isDownload: false,
      timeFilterOptions: [
        { key: "daily", value: 1, name: "DAILY" },
        { key: "weekly", value: 2, name: "WEEKLY" },
        { key: "monthly", value: 3, name: "MONTHLY" },
        { key: "quarterly", value: 4, name: "QUARTERLY" },
        { key: "yearly", value: 5, name: "YEARLY" },
        { key: "custom", value: 6, name: "CUSTOM" }
      ],
      dashboardTimeFilterValue: { value: 1 },
      columns: [
        {
          title: "Outlet Name",
          dataIndex: "OutletName"
        },
        {
          title: "Retailer Name",
          dataIndex: "retailername"
        },
        {
          title: "Customer Name",
          dataIndex: "CustomerName"
        },
        {
          title: "Items Ordered",
          dataIndex: "ItemsOrdered"
        },
        {
          title: "Ordered Value",
          dataIndex: "OrderedValue"
        },

        {
          title: "Airport name",
          dataIndex: "Airportname"
        },
        {
          title: "Sublocation",
          dataIndex: "sublocation"
        },
        {
          title: "Terminal no",
          dataIndex: "terminalno"
        },
        {
          title: "Terminal side",
          dataIndex: "terminalsside"
        },
        {
          title: "Terminal type",
          dataIndex: "terminaltype"
        }
        // {
        //   title: 'Sales',
        //   dataIndex: 'sales'
        // }
      ],
      tableData: [],
      filterKeys: [
        "OutletName",
        "CustomerName",
        "ItemsOrdered",
        "OrderedValue",
        "retailername"
      ]
    };
  }

  componentDidMount() {
    const { isAllSelected } = this.state;
    this.handlefilterTableAndChartData({ value: 1 }, []);
    if (isAllSelected === false) {
      this.setstate({ isAllSelected: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      lastOrdersResponse,
      pageRefreshingResponse,
      revenueChartDataResponse,
      storeFilterResponse
    } = this.props;
    if (
      nextProps.lastOrdersResponse &&
      nextProps.lastOrdersResponse !== lastOrdersResponse
    ) {
      if (
        nextProps.lastOrdersResponse.error === 0 &&
        nextProps.lastOrdersResponse.message &&
        nextProps.lastOrdersResponse.content &&
        nextProps.lastOrdersResponse.content.data
      ) {
        this.handleTableData(nextProps.lastOrdersResponse.content.data);
      }
    }
    if (
      nextProps.revenueChartDataResponse &&
      nextProps.revenueChartDataResponse !== revenueChartDataResponse
    ) {
      if (
        nextProps.revenueChartDataResponse.error === 0 &&
        nextProps.revenueChartDataResponse.message &&
        nextProps.revenueChartDataResponse.content &&
        nextProps.revenueChartDataResponse.content.data
      ) {
        this.setState({
          revenueChartDataList: nextProps.revenueChartDataResponse.content.data
        });
      }
    }

    if (
      nextProps.pageRefreshingResponse &&
      nextProps.pageRefreshingResponse !== pageRefreshingResponse
    ) {
      if (nextProps.pageRefreshingResponse.isLoading === true) {
        this.handlefilterTableAndChartData({ value: 1 }, []);
        this.setState({
          isLoading: nextProps.pageRefreshingResponse.isLoading,
          selectedStoreValue: undefined
        });
      }
    }
  }

  handleTableData = data => {
    const {
      isStoreAllData,
      selectedStoreValue,
      dashboardTimeFilterValue
    } = this.state;
    const { pageRefreshing } = this.props;
    let tableData = [];
    tableData = data.result.map((item, index) => {
      return {
        key: index,
        OutletName: item.name,
        CustomerName: item.customer_name,
        ItemsOrdered: item.item_ordered,
        OrderedValue: `₹ ${item.total_price}`,
        Airportname: item.airport_name,
        retailername: item.retailer_name,
        sublocation: item.sub_location,
        terminalno: item.terminal_no,
        terminalsside: item.terminal_side,
        terminaltype: item.terminal_type
      };
    });
    let stringVal = 1;
    if (selectedStoreValue && selectedStoreValue !== null) {
      stringVal = selectedStoreValue
        .map(val => {
          return val;
        })
        .join(",");
    }
    pageRefreshing({ isLoading: false });
    this.setState({
      tableData,
      uniqueStoreIdData: data.store_filter,
      isLoading: false,
      statisticCardData: data.cards,
      isDownload: true
    });
  };

  handlefilterTableAndChartData = (
    dashboardTimeFilterValue,
    uniqueStoreIdData
  ) => {
    // const { dashboardTimeFilterValue } = this.state;
    const { lastOrders, revenueChartData, selectedAirport } = this.props;
    let filterData = {};
    if (dashboardTimeFilterValue.value === 6) {
      filterData = {
        value: dashboardTimeFilterValue.value,
        start_date: dashboardTimeFilterValue.start_date
          ? dashboardTimeFilterValue.start_date
          : "",
        end_date: dashboardTimeFilterValue.end_date
          ? dashboardTimeFilterValue.end_date
          : "",
        type: dashboardTimeFilterValue.type ? dashboardTimeFilterValue.type : ""
      };
    } else {
      filterData = {
        value: dashboardTimeFilterValue.value
      };
    }
    const data = {
      post_data: {
        user_name: User.getUserEmail(),
        filter: filterData,
        store_filter: uniqueStoreIdData ? uniqueStoreIdData : [],
        airport_code: selectedAirport ? selectedAirport : ""
      },
      url: MAGENTO_POST_DATA_URL + "dashboardOrderView"
    };

    const revenueChartPayload = {
      post_data: {
        user_name: User.getUserEmail(),
        filter: filterData,
        store_filter: uniqueStoreIdData ? uniqueStoreIdData : [],
        airport_code: selectedAirport ? selectedAirport : ""
      },
      url: MAGENTO_POST_DATA_URL + "dashboardGraphView"
    };

    lastOrders(data);
    revenueChartData(revenueChartPayload);
    this.setState({ isLoading: true });
  };

  renderStoreSelectOptions = () => {
    const { uniqueStoreIdData } = this.state;
    let selectDom = [];
    selectDom = uniqueStoreIdData.map(
      item =>
        item.name && item.code && <Option value={item.code}>{item.name}</Option>
    );
    return selectDom;
  };

  handleAllStoreData = () => {
    const { dashboardTimeFilterValue } = this.state;
    this.handlefilterTableAndChartData(dashboardTimeFilterValue, []);
    this.setState({
      isStoreAllData: false,
      isLoading: true,
      isAllSelected: true,
      selectedStoreValue: undefined
    });
  };

  handleStoreChange = value => {
    let { uniqueStoreIdData, dashboardTimeFilterValue } = this.state;

    let stringVal = value
      .map(val => {
        return val;
      })
      .join(",");
    uniqueStoreIdData.map(item => {
      item.selected = false;
    });

    value.map(selectedStore => {
      uniqueStoreIdData.find(store =>
        store.code === selectedStore ? (store.selected = true) : null
      );
    });

    if (value.length === 0) {
      // uniqueStoreIdData = [];
      this.handlefilterTableAndChartData(dashboardTimeFilterValue, []);
      this.setState({
        isStoreAllData: false,
        selectedStoreValue: value,
        isLoading: true,
        isAllSelected: true
      });
    } else {
      this.handlefilterTableAndChartData(
        dashboardTimeFilterValue,
        uniqueStoreIdData
      );
      this.setState({
        isStoreAllData: false,
        selectedStoreValue: value,
        isLoading: true,
        isAllSelected: false
      });
    }
  };

  onApplyFilter = filterKeys => {
    this.setState({ filterKeys });
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

  onTimeChange = value => {
    const data = {
      value
    };
    if (value === 6) {
      this.setState({ modal1Visible: true });
    } else {
      this.handlefilterTableAndChartData(data, []);
      this.setState({ dashboardTimeFilterValue: data });
    }
    this.setState({ selectedTime: value, selectedStoreValue: undefined });
  };

  opencalender() {
    this.setState({ calenderShow: false });
  }

  setModal1Visible = (modal1Visible, type) => {
    let { selectedTime } = this.state;
    if (type && type === "close") {
      selectedTime = 1;
      const data = {
        value: selectedTime
      };
      this.handlefilterTableAndChartData(data, []);
      this.setState({
        dashboardTimeFilterValue: data,
        startDate: null,
        startTime: null,
        startDateValue: null,
        endDate: null,
        endTime: null,
        endDateValue: null
      });
    }
    this.setState({ modal1Visible, selectedTime });
  };

  handleStartDate = (date, dateString) => {
    this.setState({
      startDate: dateString,
      startDateValue: date,
      showErrorMsg: false
    });
  };

  handleStartTime = (time, timeString) => {
    this.setState({ startTime: timeString, showErrorMsg: false });
  };

  handleEndDate = (date, dateString) => {
    this.setState({
      endDate: dateString,
      endDateValue: date,
      showErrorMsg: false
    });
  };

  handleEndTime = (time, timeString) => {
    this.setState({ endTime: timeString, showErrorMsg: false });
  };

  disabledStartDate = startDateValue => {
    const { endDateValue } = this.state;
    if (!startDateValue || !endDateValue) {
      return false;
    }
    return startDateValue.valueOf() > endDateValue.valueOf();
  };

  disabledEndDate = endDateValue => {
    const { startDateValue } = this.state;
    if (!endDateValue || !startDateValue) {
      return false;
    }
    return endDateValue.valueOf() <= startDateValue.valueOf();
  };

  handleCalenderSubmit = modal1Visible => {
    const { startDate, startTime, endDate, endTime } = this.state;
    if (
      startDate === null ||
      startDate === "" ||
      startTime === null ||
      endDate === null ||
      endDate === "" ||
      endTime === null
    ) {
      this.setState({ showErrorMsg: true });
    } else {
      let startD = startDate
        .split("/")
        .reverse()
        .join("/");
      let endD = endDate
        .split("/")
        .reverse()
        .join("/");
      let type;
      let startDat = new Date(startD);
      let endDat = new Date(endD);

      if (startDat.getFullYear() !== endDat.getFullYear()) {
        type = "year";
      } else if (startDat.getMonth() !== endDat.getMonth()) {
        type = "month";
      } else if (startDat.getDate() !== endDat.getDate()) {
        type = "day";
      } else {
        type = "hour";
      }

      const data = {
        value: 6,
        start_date: startD + " " + startTime,
        end_date: endD + " " + endTime,
        type
      };
      this.handlefilterTableAndChartData(data, []);
      this.setState({ modal1Visible, dashboardTimeFilterValue: data });
    }
  };

  handleReset = () => {
    this.setState({
      startDate: null,
      startTime: null,
      startDateValue: null,
      endDate: null,
      endTime: null,
      endDateValue: null
    });
  };

  renderCsvDownloadButton = () => {
    const { tableData } = this.state;
    let component = [];

    let csvData = [];
    const csvHeaderData = [
      "OutletName",
      "CustomerName",
      "retailername",
      "ItemsOrdered",
      "OrderedValue",
      "Airportname",
      "sublocation",
      "terminalno",
      "terminalsside",
      "terminaltype"
    ];
    csvData.push(csvHeaderData);
    if (tableData && tableData.length > 0) {
      tableData.forEach(function(item, index) {
        const csvContentData = [];
        csvContentData.push(
          item.OutletName ? item.OutletName : "-",
          item.CustomerName ? item.CustomerName : "-",
          item.retailername ? item.retailername : "-",
          item.ItemsOrdered ? item.ItemsOrdered : "-",
          item.OrderedValue ? `${item.OrderedValue}` : "-",
          item.Airportname ? item.Airportname : "-",
          item.sublocation ? item.sublocation : "-",
          item.terminalno ? item.terminalno : "-",
          item.terminalsside ? item.terminalsside : "-",
          item.terminaltype ? item.terminaltype : "-"
        );
        csvData.push(csvContentData);
      });
    }
    component.push(
      <CSVDownloadOption
        key="download"
        filename="last_orders.csv"
        csvData={csvData}
      />
    );
    return component;
  };
  render() {
    const {
      isLoading,
      selectedAirport,
      columns,
      tableData,
      revenueChartDataList,
      selectedStoreValue,
      filterKeys,
      isAllSelected,
      selectedTime,
      startDate,
      endDate,
      startTime,
      endTime,
      showErrorMsg,
      timeFilterOptions,
      dashboardTimeFilterValue,
      statisticCardData,
      isDownload
    } = this.state;

    const columnsFiltered = columns.filter(columnItem =>
      filterKeys.includes(columnItem.dataIndex)
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
    let filterDatatext = timeFilterOptions.find(
      item => item.value === dashboardTimeFilterValue.value
    );

    return (
      <div>
        {isLoading && <Loading />}
        {!isLoading && (
          <React.Fragment>
            <StatisticCardContainer
              selectedAirport={selectedAirport}
              statisticCardData={statisticCardData}
            />
            <div className="dashboard">
              <Row gutter={20}>
                <Col span={12}>
                  <div className="dashboard__table">
                    <div className="dashboard__table__header__title">
                      Last Orders
                    </div>
                    <div className="header--left__text">Filter Data By</div>
                    <div className="dashboard__table__header">
                      {location.pathname === "/dashboard" && (
                        <React.Fragment>
                          {/* <span className="header--left__text">
                            Filter Data By
                          </span> */}
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
                            onCancel={() =>
                              this.setModal1Visible(false, "close")
                            }
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
                      )}
                      <TableFilter
                        columns={columns}
                        filterKeys={filterKeys}
                        onApplyFilter={this.onApplyFilter}
                      />
                      <Select
                        size="big"
                        mode="multiple"
                        showSearch
                        value={selectedStoreValue}
                        style={{ width: 220 }}
                        onChange={this.handleStoreChange}
                        className="dashboard__table__header__select"
                        placeholder="Please select store/stores"
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toString().toLowerCase()) >= 0
                        }
                      >
                        {this.renderStoreSelectOptions()}
                      </Select>
                    </div>
                    <Table
                      columns={columnsFiltered}
                      dataSource={tableData}
                      pagination={false}
                      pagination={{
                        defaultPageSize: 5
                      }}
                    />

                    {isDownload && this.renderCsvDownloadButton()}
                    {/* <CSVDownloadOption csvHeaders={columns} csvData={tableData}/> */}
                    {!isAllSelected && (
                      <Button
                        className="dashboard__table__viewbutton"
                        onClick={this.handleAllStoreData}
                      >
                        <span className="dashboard__table__viewbutton__text">
                          View All
                        </span>
                      </Button>
                    )}
                  </div>
                </Col>
                <Col span={12}>
                  <div className="dashboard__revenue">
                    <div className="dashboard__table__header__title">
                      Revenue filtered by {filterDatatext.key}
                    </div>
                    {revenueChartDataList &&
                      revenueChartDataList.chart &&
                      revenueChartDataList.chart.length > 0 && (
                        <RevenueChart
                          revenueChartDataList={revenueChartDataList}
                          height={600}
                        />
                      )}
                    {revenueChartDataList &&
                      revenueChartDataList.chart &&
                      revenueChartDataList.chart.length === 0 && (
                        <div>
                          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </div>
                      )}
                  </div>
                </Col>
              </Row>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lastOrdersResponse: state.dashboard.lastOrdersResponse,
    revenueChartDataResponse: state.dashboard.revenueChartDataResponse,
    pageRefreshingResponse: state.nonApiStore.pageRefreshingResponse
  };
}

export default connect(
  mapStateToProps,
  {
    lastOrders,
    revenueChartData,
    pageRefreshing
  }
)(withRouter(Dashboard));
