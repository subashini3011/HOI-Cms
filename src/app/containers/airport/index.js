import "./index.scss";
import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

// actions

// containers
import StatisticCardContainer from "containers/statistic-card";
import TableOperations from "components/tableOperations";

// components
import NewAirportForm from "components/forms/new-airport-form";
import CommonTable from "components/commonTable";
import EditButton from "components/buttons/edit-button";
import Loading from "components/loading";
import { message, Icon, Tag, Popconfirm } from "components/ui";

import { DOWNLOAD_AIRPORTS } from "constants/api-constants";
import { pageRefreshing } from "../../redux/actions/nonApiActions";
import {
  getAirports,
  deleteAirport
} from "../../redux/actions/airportsActions";

class Airport extends Component {
  constructor(props) {
    super(props);
    const { selectedAirport } = this.props;
    this.state = {
      isLoading: true,
      isAddAirportDisable: false,
      isAddAirportForm: false,
      isEditAirportForm: false,
      airportFields: [],
      pageNumber: 1,
      offset: 6,
      tableData: [],
      editRecordData: [],
      searchKey: "",
      selectedAirport,
      columns: [],
      filterKeys: [
        "iata_code",
        "icao_code",
        "airport_website",
        "vendor_name",
        "airport_name",
        "city",
        "logo",
        "Action"
      ]
    };
  }

  componentDidMount() {
    const { getAirports } = this.props;
    const data = {
      page_no: 1,
      offset: 6,
      search_key: ""
    };
    getAirports(data);
  }

  componentWillReceiveProps(nextProps) {
    const { pageNumber, offset, searchKey } = this.state;

    const {
      getAirportsResponse,
      deleteAirportResponse,
      pageRefreshingResponse,
      getAirports
    } = this.props;
    if (
      nextProps.getAirportsResponse &&
      nextProps.getAirportsResponse !== getAirportsResponse
    ) {
      if (
        nextProps.getAirportsResponse.error === 0 &&
        nextProps.getAirportsResponse.content
      ) {
        this.handleTableData(nextProps.getAirportsResponse.content);
      }
    }

    if (
      nextProps.deleteAirportResponse &&
      nextProps.deleteAirportResponse !== deleteAirportResponse
    ) {
      if (
        nextProps.deleteAirportResponse.error === 0 &&
        nextProps.deleteAirportResponse.message
      ) {
        message.success(nextProps.deleteAirportResponse.message);
        const data = {
          page_no: pageNumber,
          offset,
          search_key: searchKey
        };
        getAirports(data);
      } else {
        message.error(nextProps.deleteAirportResponse.message);
      }
    }

    if (
      nextProps.pageRefreshingResponse &&
      nextProps.pageRefreshingResponse !== pageRefreshingResponse
    ) {
      if (nextProps.pageRefreshingResponse.isLoading === true) {
        const data = {
          page_no: 1,
          offset: 6,
          search_key: ""
        };
        const filterKeys = [
          "iata_code",
          "icao_code",
          "airport_website",
          "vendor_name",
          "airport_name",
          "city",
          "logo",
          "Action"
        ];
        this.setState({
          isLoading: nextProps.pageRefreshingResponse.isLoading,
          pageNumber: 1,
          offset: 6,
          searchKey: "",
          filterKeys,
          isAddAirportForm: false,
          isEditAirportForm: false
        });
        getAirports(data);
      }
    }
  }

  handleTableData = data => {
    const dynamicColumns = [];
    if (data.Airports.length > 0) {
      dynamicColumns.push(
        Object.getOwnPropertyNames(data.Airports[0]).map(item => {
          let header = [];
          if (
            item === "logo" ||
            item === "title_logo" ||
            item === "location_image" ||
            item === "management_image" ||
            item === "city_image_for_chat" ||
            item === "city_image" ||
            item === "photo"
          ) {
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
                  alt={item}
                />
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
      const tableData = data.Airports;
      const { pageRefreshing } = this.props;
      this.setState({
        tableData,
        totalData: data.total_items,
        columns: dynamicColumns[0],
        isLoading: false
      });
      pageRefreshing({ isLoading: false });
    } else {
      this.setState({
        tableData: [],
        totalData: data.total_items,
        columns: [],
        isLoading: false
      });
      pageRefreshing({ isLoading: false });
    }
  };

  toggleForm = () => {
    const {
      isEditAirportForm,
      isAddAirportForm,
      pageNumber,
      offset,
      searchKey
    } = this.state;

    const { getAirports } = this.props;

    if (isEditAirportForm) {
      const data = {
        page_no: pageNumber,
        offset,
        search_key: searchKey
      };
      this.setState({ isEditAirportForm: false });
      getAirports(data);
    } else if (isAddAirportForm) {
      const data = {
        page_no: 1,
        offset: 6,
        search_key: ""
      };
      this.setState({
        isAddAirportForm: false,
        pageNumber: 1,
        offset: 6,
        searchKey: ""
      });
      getAirports(data);
    }
  };

  onAddNewClick = () => {
    this.setState({ isAddAirportForm: true });
  };

  handleEdit = (e, record) => {
    e.stopPropagation();
    const { selectedAirport } = this.props;
    const editRecordData = {
      airport_id: record.id,
      airport_code: selectedAirport
    };
    this.setState({ isEditAirportForm: true, editRecordData });
  };

  handleDelete = (e, record) => {
    e.stopPropagation();
    const { deleteAirport } = this.props;
    const data = {
      airport_info: {
        airport_id: record.id
      }
    };
    deleteAirport(data);
  };

  handleCancel = () => {
    this.setState({ isAddAirportForm: false, isEditAirportForm: false });
  };

  onApplyFilter = filterKeys => {
    this.setState({ filterKeys });
  };

  onSearchChange = searchKey => {
    const { getAirports } = this.props;
    const { offset } = this.state;
    const data = {
      page_no: 1,
      offset,
      search_key: searchKey
    };
    this.setState({ searchKey, pageNumber: 1 });
    getAirports(data);
  };

  onOffsetChange = offset => {
    // checking the page number if it is greater than the number of pages
    const { totalData, searchKey } = this.state;
    let { pageNumber } = this.state;
    const { getAirports } = this.props;
    if (pageNumber > Math.ceil(totalData / offset)) {
      pageNumber = Math.ceil(totalData / offset);
    }

    const data = {
      page_no: pageNumber,
      offset,
      search_key: searchKey
    };

    this.setState({ pageNumber, offset });
    getAirports(data);
  };

  onPageChange = pageNumber => {
    const { getAirports } = this.props;
    const { offset, searchKey } = this.state;
    const data = {
      page_no: pageNumber,
      offset,
      search_key: searchKey
    };

    this.setState({ pageNumber });
    getAirports(data);
  };

  render() {
    const {
      isAddAirportForm,
      isEditAirportForm,
      selectedAirport,
      isLoading,
      airportFields,
      isAddAirportDisable,
      editRecordData,
      filterKeys,
      tableData,
      pageNumber,
      searchKey,
      columns,
      totalData,
      offset
    } = this.state;
    return (
      <div>
        {isLoading && <Loading />}
        {isAddAirportForm && (
          <NewAirportForm
            headerName="Add New Airport"
            airportFields={airportFields}
            handleCancel={this.handleCancel}
            toggleForm={this.toggleForm}
            isAddAirportForm
          />
        )}
        {isEditAirportForm && (
          <NewAirportForm
            headerName="Add New Airport"
            handleCancel={this.handleCancel}
            editRecordData={editRecordData}
            toggleForm={this.toggleForm}
            isEditAirportForm
          />
        )}
        {!isLoading && !isAddAirportForm && !isEditAirportForm && (
          <div>
            <div className="airport">
              <div className="airport__table">
                <TableOperations
                  tablename="Airport"
                  addButtonText="Airport"
                  isAddAirportDisable={isAddAirportDisable}
                  onAddNewClick={this.onAddNewClick}
                  columns={columns}
                  searchKey={searchKey}
                  onSearchChange={this.onSearchChange}
                  downloadUrl={DOWNLOAD_AIRPORTS}
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
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    getAirportsResponse: state.airports.getAirportsResponse,
    deleteAirportResponse: state.airports.deleteAirportResponse,
    pageRefreshingResponse: state.nonApiStore.pageRefreshingResponse
  };
}

export default connect(mapStateToProps, {
  getAirports,
  deleteAirport,
  pageRefreshing
})(withRouter(Airport));

// Airport.propTypes = {
//   selectedAirport: PropTypes.string.isRequired,
//   form: PropTypes.shape({
//     getFieldDecorator: PropTypes.func.isRequired,
//     resetFields: PropTypes.func.isRequired,
//     validateFields: PropTypes.func.isRequired
//   }).isRequired,

//   history: PropTypes.shape({
//     push: PropTypes.func.isRequired
//   }).isRequired,

//   getAirportFieldsResponse: PropTypes.func.isRequired,
//   getAirportsResponse: PropTypes.arrayOf,
//   deleteAirportResponse: PropTypes.arrayOf,
//   getAirportsDetailsResponse: PropTypes.arrayOf,
//   pageRefreshingResponse: PropTypes.arrayOf,

//   getAirportFields: PropTypes.func.isRequired,
//   getAirports: PropTypes.func.isRequired,
//   pageRefreshing: PropTypes.func.isRequired
// };

// Airport.defaultProps = {
//   // history: PropTypes.Object
//   // getAirportFieldsResponse: [],
//   getAirportsResponse: [],
//   deleteAirportResponse: [],
//   getAirportsDetailsResponse: [],
//   pageRefreshingResponse: []
// };
