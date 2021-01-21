import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

import { pageRefreshing } from "../../redux/actions/nonApiActions";

import StatisticCardContainer from "containers/statistic-card";
import AirbusInfoForm from "components/forms/airbus-info-form";

import CommonTable from "components/commonTable";
import Loading from "components/loading";
import TableOperations from "components/tableOperations";
import EditButton from "components/buttons/edit-button";

import { message, Icon, Tag, Popconfirm } from "components/ui";
import {
  airbusInfo,
  deleteAirbusInfo
} from "../../redux/actions/flightServiceActions";

import "./index.scss";

class AirbusInfo extends Component {
  constructor(props) {
    super(props);
    const { selectedAirport } = this.props;
    this.state = {
      isLoading: true,
      selectedAirport,
      isAddAirbusInfoForm: false,

      columns: [],
      pageNumber: 1,
      offset: 6,
      searchKey: "",
      isEditAirbusInfoForm: false,
      editRecordData: [],
      filterKeys: ["airbus_name", "company", "image", "model", "Action"]
    };
  }

  componentDidMount() {
    const { airbusInfo, selectedAirport } = this.props;
    const airbusInfoPayload = {
      airport_code: selectedAirport,
      page_no: 1,
      offset: 6,
      search_key: ""
    };
    airbusInfo(airbusInfoPayload);
  }

  componentWillReceiveProps(nextProps) {
    const { pageNumber, offset, searchKey } = this.state;
    const { deleteAirbusInfoResponse, pageRefreshingResponse } = this.props;
    if (
      nextProps.airbusInfoResponse &&
      nextProps.airbusInfoResponse !== this.props.airbusInfoResponse
    ) {
      if (
        nextProps.airbusInfoResponse.error === 0 &&
        nextProps.airbusInfoResponse.content
      ) {
        this.handleTableData(nextProps.airbusInfoResponse.content);
      }
    }
    if (
      nextProps.deleteAirbusInfoResponse &&
      nextProps.deleteAirbusInfoResponse !== deleteAirbusInfoResponse
    ) {
      if (
        nextProps.deleteAirbusInfoResponse.error === 0 &&
        nextProps.deleteAirbusInfoResponse.message
      ) {
        message.success(nextProps.deleteAirbusInfoResponse.message);
        const { airbusInfo, selectedAirport } = this.props;
        const airbusInfoPayload = {
          airport_code: selectedAirport,
          page_no: pageNumber,
          offset,
          search_key: searchKey
        };
        airbusInfo(airbusInfoPayload);
      } else {
        message.error(nextProps.deleteAirbusInfoResponse.message);
      }
    }

    if (
      nextProps.pageRefreshingResponse &&
      nextProps.pageRefreshingResponse !== pageRefreshingResponse
    ) {
      if (nextProps.pageRefreshingResponse.isLoading === true) {
        const { userInfo } = this.state;
        const data = {
          page_no: 1,
          offset: 6,
          search_key: ""
        };
        const filterKeys = [
          "airbus_name",
          "company",
          "image",
          "model",
          "Action"
        ];
        this.setState({
          isLoading: nextProps.pageRefreshingResponse.isLoading,
          pageNumber: 1,
          offset: 6,
          searchKey: "",
          filterKeys,
          isAddAirbusInfoForm: false,
          isEditAirbusInfoForm: false
        });

        const { airbusInfo, selectedAirport } = this.props;
        const airbusInfoPayload = {
          airport_code: selectedAirport,
          page_no: 1,
          offset: 6,
          search_key: ""
        };

        airbusInfo(airbusInfoPayload);
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
                  alt="image"
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
        totalData: response.total_item,
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
    // const { getTerminalFields } = this.props;
    // getTerminalFields();
    this.setState({ isAddAirbusInfoForm: true });
  };

  handleEdit = (e, record) => {
    e.stopPropagation();
    this.setState({
      isEditAirbusInfoForm: true,
      editRecordData: record
    });
  };

  handleDelete = (e, record) => {
    e.stopPropagation();
    const data = {
      id: record.id
    };
    this.props.deleteAirbusInfo(data);
  };

  handleCancel = () => {
    this.setState({
      isAddAirbusInfoForm: false,
      isEditAirbusInfoForm: false
    });
  };

  toggleForm = () => {
    const { selectedAirport, pageNumber, searchKey, offset } = this.state;
    const { airbusInfo } = this.props;
    if (this.state.isEditAirbusInfoForm) {
      this.setState({ isEditAirbusInfoForm: false });
      const airbusInfoPayload = {
        airport_code: selectedAirport,
        page_no: pageNumber,
        offset,
        search_key: searchKey
      };
      airbusInfo(airbusInfoPayload);
    } else if (this.state.isAddAirbusInfoForm) {
      this.setState({
        isAddAirbusInfoForm: false,
        page_no: 1,
        offset: 6,
        search_key: ""
      });
      const airbusInfoPayload = {
        airport_code: selectedAirport,
        page_no: 1,
        offset: 6,
        search_key: ""
      };
      airbusInfo(airbusInfoPayload);
    }
  };

  onSearchChange = searchKey => {
    const { offset } = this.state;
    const { airbusInfo, selectedAirport } = this.props;
    const airbusInfoPayload = {
      airport_code: selectedAirport,
      page_no: 1,
      offset,
      search_key: searchKey
    };
    this.setState({ searchKey, pageNumber: 1 });
    airbusInfo(airbusInfoPayload);
  };

  onOffsetChange = offset => {
    const { totalData, searchKey } = this.state;
    let { pageNumber } = this.state;
    // checking the page number if it is greater than the number of pages
    if (pageNumber > Math.ceil(totalData / offset)) {
      pageNumber = Math.ceil(totalData / offset);
    }
    const { airbusInfo, selectedAirport } = this.props;
    const airbusInfoPayload = {
      airport_code: selectedAirport,
      page_no: pageNumber,
      offset,
      search_key: searchKey
    };
    airbusInfo(airbusInfoPayload);
    this.setState({ pageNumber, offset });
  };

  onPageChange = pageNumber => {
    const { offset, searchKey } = this.state;
    const { airbusInfo, selectedAirport } = this.props;
    const airbusInfoPayload = {
      airport_code: selectedAirport,
      page_no: pageNumber,
      offset,
      search_key: searchKey
    };
    airbusInfo(airbusInfoPayload);
    this.setState({ pageNumber });
  };
  render() {
    const {
      isLoading,
      selectedAirport,
      columns,
      searchKey,
      filterKeys,
      pageNumber,
      editRecord,
      offset,
      terminalFields,
      isAddAirbusInfoForm,
      isEditAirbusInfoForm,
      editRecordData,
      tableData,
      totalData
    } = this.state;
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {isAddAirbusInfoForm && (
          <AirbusInfoForm
            headerName="Add New Airbus Info"
            terminalFields={terminalFields}
            handleCancel={this.handleCancel}
            // userRoles={this.state.userRoles}
            toggleForm={this.toggleForm}
            toggleForm={this.toggleForm}
            selectedAirport={selectedAirport}
            isAddAirbusInfoForm
          />
        )}
        {isEditAirbusInfoForm && (
          <AirbusInfoForm
            headerName="Edit Airbus Info"
            editRecord={editRecord}
            editRecordData={editRecordData}
            handleCancel={this.handleCancel}
            toggleForm={this.toggleForm}
            selectedAirport={selectedAirport}
            isEditAirbusInfoForm
          />
        )}
        {!isLoading && !isAddAirbusInfoForm && !isEditAirbusInfoForm && (
          <React.Fragment>
            {/* <StatisticCardContainer selectedAirport={selectedAirport} /> */}
            <div className="terminal">
              <TableOperations
                tablename="Airbus Info"
                addButtonText="Airbus Info"
                onAddNewClick={this.onAddNewClick}
                columns={columns}
                searchKey={searchKey}
                disableDownload
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
                // disablePagination
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
    airbusInfoResponse: state.flightService.airbusInfoResponse,
    deleteAirbusInfoResponse: state.flightService.deleteAirbusInfoResponse,
    pageRefreshingResponse: state.nonApiStore.pageRefreshingResponse
  };
}

export default connect(
  mapStateToProps,
  {
    airbusInfo,
    deleteAirbusInfo,
    pageRefreshing
  }
)(withRouter(AirbusInfo));
