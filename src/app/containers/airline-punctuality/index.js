import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

import { pageRefreshing } from "../../redux/actions/nonApiActions";

import StatisticCardContainer from "containers/statistic-card";

import AirlinePunctualityForm from "components/forms/airline-punctuality-form";

import CommonTable from "components/commonTable";
import Loading from "components/loading";
import TableOperations from "components/tableOperations";
import EditButton from "components/buttons/edit-button";

import { message, Icon, Tag, Popconfirm } from "components/ui";
import {
  airlinePunctuality,
  deleteAirlinePunctuality
} from "../../redux/actions/flightServiceActions";

import "./index.scss";

class AirlinePunctuality extends Component {
  constructor(props) {
    super(props);
    const { selectedAirport } = this.props;
    this.state = {
      isLoading: true,
      selectedAirport,
      isAddAirlinePunctualityForm: false,
      columns: [],
      pageNumber: 1,
      offset: 6,
      searchKey: "",
      isEditAirlinePunctualityForm: false,
      editRecordData: [],
      filterKeys: [
        "airport_code",
        "flight_number",
        "flight_type",
        "punctuality",
        "Action"
      ]
    };
  }

  componentDidMount() {
    const { airlinePunctuality, selectedAirport } = this.props;
    const airlinePunctualitylPayload = {
      airport_code: selectedAirport,
      page_no: 1,
      offset: 6,
      search_key: ""
    };

    airlinePunctuality(airlinePunctualitylPayload);
  }

  componentWillReceiveProps(nextProps) {
    const { pageNumber, offset, searchKey } = this.state;
    const {
      deleteAirlinePunctualityResponse,
      pageRefreshingResponse
    } = this.props;
    if (
      nextProps.airlinePunctualityResponse &&
      nextProps.airlinePunctualityResponse !==
        this.props.airlinePunctualityResponse
    ) {
      if (
        nextProps.airlinePunctualityResponse.error === 0 &&
        nextProps.airlinePunctualityResponse.content
      ) {
        this.handleTableData(nextProps.airlinePunctualityResponse.content);
      }
    }
    if (
      nextProps.deleteAirlinePunctualityResponse &&
      nextProps.deleteAirlinePunctualityResponse !==
        deleteAirlinePunctualityResponse
    ) {
      if (
        nextProps.deleteAirlinePunctualityResponse.error === 0 &&
        nextProps.deleteAirlinePunctualityResponse.message
      ) {
        message.success(nextProps.deleteAirlinePunctualityResponse.message);

        const airlinePunctualitylPayload = {
          airport_code: selectedAirport,
          page_no: pageNumber,
          offset,
          search_key: searchKey
        };
        airlinePunctuality(airlinePunctualitylPayload);
      } else {
        message.error(nextProps.deleteAirlinePunctualityResponse.message);
      }
    }

    if (
      nextProps.pageRefreshingResponse &&
      nextProps.pageRefreshingResponse !== pageRefreshingResponse
    ) {
      if (nextProps.pageRefreshingResponse.isLoading === true) {
        const filterKeys = [
          "airport_code",
          "flight_number",
          "flight_type",
          "punctuality",

          "Action"
        ];
        const { airlinePunctuality, selectedAirport } = this.props;
        const airlinePunctualitylPayload = {
          airport_code: selectedAirport,
          page_no: 1,
          offset: 6,
          search_key: ""
        };
        airlinePunctuality(airlinePunctualitylPayload);
        this.setState({
          isLoading: nextProps.pageRefreshingResponse.isLoading,
          pageNumber: 1,
          offset: 6,
          searchKey: "",
          filterKeys,
          isAddAirlinePunctualityForm: false,
          isEditAirlinePunctualityForm: false
        });
      }
    }
  }

  handleTableData = response => {
    let tableData = [];
    const dynamicColumns = [];
    const { pageRefreshing } = this.props;
    if (response.data && response.data.length > 0) {
      tableData = response.data;
      dynamicColumns.push(
        Object.getOwnPropertyNames(response.data[0]).map(item => {
          let header = [];
          if (item === "image") {
            header = {
              title: `${item}`.replace(/_/g, " "),
              dataIndex: `${item}`,
              key: `${item}`,
              render: text => (
                <img
                  src={text}
                  style={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "50%",
                    marginLeft: "1.7rem"
                  }}
                  alt="Profile"
                />
              )
            };
          } else if (item === "status") {
            header = {
              title: `${item}`.replace(/_/g, " "),
              dataIndex: `${item}`,
              key: `${item}`,
              render: text =>
                text === 1 ? (
                  <span className="cmsusers__table__status__active">
                    Active
                  </span>
                ) : (
                  <span className="cmsusers__table__status__inactive">
                    Inactive
                  </span>
                )
            };
          } else {
            header = {
              title: `${item}`.replace(/_/g, " "),
              dataIndex: `${item}`,
              key: `${item}`
            };
          }
          return header;
        })
      );
      const actions = {
        title: "Action",
        dataIndex: "Action",
        width: "15rem",
        render: (text, record) => (
          <span className="u_no_wrap">
            <EditButton handleEdit={this.handleEdit} record={record} />
            <Popconfirm
              placement="topRight"
              title="Are you sure delete this record?"
              icon={<Icon type="exclamation-circle" style={{ color: "red" }} />}
              onConfirm={e => {
                this.handleDelete(e, record);
              }}
              okText="Yes"
              cancelText="No"
              getPopupContainer={trigger => trigger.parentNode}
            >
              <Tag color="volcano" className="u_cursor_pointer">
                Delete
              </Tag>
            </Popconfirm>
          </span>
        )
      };
      dynamicColumns[0].push(actions);

      this.setState({
        tableData,
        columns: dynamicColumns[0],
        totalData: response.total_item,
        isLoading: false
      });
    } else {
      this.setState({
        tableData,
        totalData: response.total_items,
        columns: [],
        isLoading: false
      });
      pageRefreshing({ isLoading: false });
    }
    pageRefreshing({ isLoading: false });
  };

  onApplyFilter = filterKeys => {
    this.setState({ filterKeys });
  };

  onAddNewClick = () => {
    this.setState({ isAddAirlinePunctualityForm: true });
  };

  handleEdit = (e, record) => {
    e.stopPropagation();
    this.setState({
      isEditAirlinePunctualityForm: true,
      editRecordData: record
    });
  };

  handleDelete = (e, record) => {
    const { deleteAirlinePunctuality } = this.props;
    e.stopPropagation();
    const data = {
      id: record.id
    };
    deleteAirlinePunctuality(data);
  };

  handleCancel = () => {
    this.setState({
      isAddAirlinePunctualityForm: false,
      isEditAirlinePunctualityForm: false
    });
  };

  toggleForm = () => {
    const { selectedAirport, pageNumber, offset, searchKey } = this.state;
    const { airlinePunctuality } = this.props;
    if (this.state.isEditAirlinePunctualityForm) {
      this.setState({ isEditAirlinePunctualityForm: false });
      const airlinePunctualitylPayload = {
        airport_code: selectedAirport,
        page_no: pageNumber,
        offset,
        search_key: searchKey
      };
      airlinePunctuality(airlinePunctualitylPayload);
    } else if (this.state.isAddAirlinePunctualityForm) {
      this.setState({
        isAddAirlinePunctualityForm: false,
        page_no: 1,
        offset: 6,
        search_key: ""
      });
      const airlinePunctualitylPayload = {
        airport_code: selectedAirport,
        page_no: 1,
        offset: 6,
        search_key: ""
      };
      airlinePunctuality(airlinePunctualitylPayload);
    }
  };

  onSearchChange = searchKey => {
    const { offset } = this.state;
    const { airlinePunctuality, selectedAirport } = this.props;
    const airlinePunctualitylPayload = {
      airport_code: selectedAirport,
      page_no: 1,
      offset,
      search_key: searchKey
    };
    this.setState({ searchKey, pageNumber: 1 });
    airlinePunctuality(airlinePunctualitylPayload);
  };

  onOffsetChange = offset => {
    const { totalData, searchKey } = this.state;
    let { pageNumber } = this.state;
    // checking the page number if it is greater than the number of pages
    if (pageNumber > Math.ceil(totalData / offset)) {
      pageNumber = Math.ceil(totalData / offset);
    }
    const { airlinePunctuality, selectedAirport } = this.props;
    const airlinePunctualitylPayload = {
      airport_code: selectedAirport,
      page_no: pageNumber,
      offset,
      search_key: searchKey
    };
    airlinePunctuality(airlinePunctualitylPayload);
    this.setState({ pageNumber, offset });
  };

  onPageChange = pageNumber => {
    const { offset, searchKey } = this.state;
    const { airlinePunctuality, selectedAirport } = this.props;
    const airlinePunctualitylPayload = {
      airport_code: selectedAirport,
      page_no: pageNumber,
      offset,
      search_key: searchKey
    };
    airlinePunctuality(airlinePunctualitylPayload);
    this.setState({ pageNumber });
  };

  render() {
    const {
      isLoading,
      selectedAirport,
      columns,
      searchKey,
      filterKeys,
      isAddAirlinePunctualityForm,
      isEditAirlinePunctualityForm,
      editRecordData,
      pageNumber,
      offset,
      totalData,
      tableData
    } = this.state;
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {isAddAirlinePunctualityForm && (
          <AirlinePunctualityForm
            headerName="Add New Airline Punctuality"
            handleCancel={this.handleCancel}
            // userRoles={this.state.userRoles}
            toggleForm={this.toggleForm}
            toggleForm={this.toggleForm}
            selectedAirport={selectedAirport}
            isAddAirlinePunctualityForm
          />
        )}
        {isEditAirlinePunctualityForm && (
          <AirlinePunctualityForm
            headerName="Edit Airline Punctuality"
            editRecord={this.state.editRecord}
            editRecordData={editRecordData}
            handleCancel={this.handleCancel}
            toggleForm={this.toggleForm}
            selectedAirport={this.state.selectedAirport}
            isEditAirlinePunctualityForm
          />
        )}
        {!isLoading &&
          !isAddAirlinePunctualityForm &&
          !isEditAirlinePunctualityForm && (
            <React.Fragment>
              {/* <StatisticCardContainer selectedAirport={selectedAirport} /> */}
              <div className="terminal">
                <TableOperations
                  tablename="Airline Punctuality"
                  addButtonText="Airline Punctuality"
                  onAddNewClick={this.onAddNewClick}
                  columns={columns}
                  searchKey={searchKey}
                  disableDownload
                  // disableSearch
                  onSearchChange={this.onSearchChange}
                  // downloadUrl={DOWNLOAD_AIRPORTS}
                  filterKeys={filterKeys}
                  onApplyFilter={this.onApplyFilter}
                  tableData={tableData}
                />
                <CommonTable
                  columns={columns}
                  dataSource={tableData}
                  totalData={totalData}
                  offset={offset}
                  onPageChange={this.onPageChange}
                  onOffsetChange={this.onOffsetChange}
                  pageNumber={pageNumber}
                  filterKeys={filterKeys}
                />
              </div>
            </React.Fragment>
          )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    airlinePunctualityResponse: state.flightService.airlinePunctualityResponse,
    deleteAirlinePunctualityResponse:
      state.flightService.deleteAirlinePunctualityResponse,
    pageRefreshingResponse: state.nonApiStore.pageRefreshingResponse
  };
}

export default connect(
  mapStateToProps,
  {
    airlinePunctuality,
    deleteAirlinePunctuality,
    pageRefreshing
  }
)(withRouter(AirlinePunctuality));
