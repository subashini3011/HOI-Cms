import "./index.scss";
import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

// actions
import {
  // deleteOutlets,
  getStoreUpdateRequests,
  storeUpdateApproved,
  storeUpdateRejected
} from "../../redux/actions/roleActions";
// import { DOWNLOAD_OUTLETS } from "constants/api-constants";

// containers
import TableOperations from "components/tableOperations";
import StatisticCardContainer from "containers/statistic-card";

// components
import CommonTable from "components/commonTable";
import Loading from "components/loading";
import RejectRequestModal from "components/modals/reject-request-modal";
import OuteletForm from "components/forms/outlet-form";
import { Table, Tag, Popconfirm, Icon, message } from "components/ui";
import { pageRefreshing } from "../../redux/actions/nonApiActions";
import * as User from "../../shared/app-data/user";

class UpdateRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      dataSource: [],
      isShowRejectModal: false,
      currentRejectedRecord: [],
      isLoading: true
    };
  }
  componentDidMount() {
    const { getStoreUpdateRequests, selectedAirport } = this.props;
    const data = {
      airport_code: selectedAirport
    };
    getStoreUpdateRequests(data);
  }

  componentWillReceiveProps(nextProps) {
    const {
      getStoreUpdateRequestsResponse,
      storeUpdateApprovedResponse,
      storeUpdateRejectedResponse
    } = this.props;
    if (
      nextProps.getStoreUpdateRequestsResponse &&
      nextProps.getStoreUpdateRequestsResponse !==
        getStoreUpdateRequestsResponse
    ) {
      if (
        nextProps.getStoreUpdateRequestsResponse.error === 0 &&
        nextProps.getStoreUpdateRequestsResponse.content &&
        nextProps.getStoreUpdateRequestsResponse.content.store
      ) {
        this.handleTableData(
          nextProps.getStoreUpdateRequestsResponse.content.store
        );
      }
    }

    if (
      nextProps.storeUpdateApprovedResponse &&
      nextProps.storeUpdateApprovedResponse !== storeUpdateApprovedResponse
    ) {
      if (
        nextProps.storeUpdateApprovedResponse.error === 0 &&
        nextProps.storeUpdateApprovedResponse.message
      ) {
        message.success(nextProps.storeUpdateApprovedResponse.message);
        const { getStoreUpdateRequests, selectedAirport } = this.props;
        const data = {
          airport_code: selectedAirport
        };
        getStoreUpdateRequests(data);
      } else {
        message.error(nextProps.storeUpdateApprovedResponse.message);
      }
    }
    if (
      nextProps.storeUpdateRejectedResponse &&
      nextProps.storeUpdateRejectedResponse !== storeUpdateRejectedResponse
    ) {
      if (
        nextProps.storeUpdateRejectedResponse.error === 0 &&
        nextProps.storeUpdateRejectedResponse.message
      ) {
        message.success(nextProps.storeUpdateRejectedResponse.message);
        const { getStoreUpdateRequests, selectedAirport } = this.props;
        const data = {
          airport_code: selectedAirport
        };
        getStoreUpdateRequests(data);
      } else {
        message.error(nextProps.storeUpdateRejectedResponse.message);
      }
    }
    if (
      nextProps.pageRefreshingResponse &&
      nextProps.pageRefreshingResponse !== this.props.pageRefreshingResponse
    ) {
      if (nextProps.pageRefreshingResponse.isLoading === true) {
        const { getStoreUpdateRequests, selectedAirport } = this.props;
        const data = {
          airport_code: selectedAirport
        };
        this.setState({
          isLoading: nextProps.pageRefreshingResponse.isLoading
        });
        getStoreUpdateRequests(data);
      }
    }
  }

  handleTableData = data => {
    let dynamicColumns = [];

    if (data.length > 0) {
      dynamicColumns.push(
        Object.getOwnPropertyNames(data[0]).map(item => {
          let header = [];
          if (item === "store_logo") {
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
                  alt="store_logo"
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
          } else if (item === "description") {
            header = {
              title: `${item}`.replace(/_/g, " "),
              dataIndex: `${item}`,
              key: `${item}`,
              render: text => (
                <span
                  style={{
                    width: "30rem"
                  }}
                >
                  {text}
                </span>
              )
            };
          } else if (item !== "id") {
            header = {
              title: `${item}`.replace(/_/g, " "),
              dataIndex: `${item}`,
              key: `${item}`
            };
          }
          return header;
        })
      );
      let actions = {
        title: "Action",
        dataIndex: "Action",
        width: "15rem",
        fixed: "right",
        render: (text, record) => (
          <span className="u_no_wrap">
            <Tag
              color="green"
              style={{ marginRight: "1rem" }}
              onClick={e => {
                this.handleAcceptRequest(e, record);
              }}
              className="u_cursor_pointer"
            >
              Accept
            </Tag>
            <Tag
              color="volcano"
              onClick={e => {
                this.handleRejectRequest(e, record);
              }}
              className="u_cursor_pointer"
            >
              Reject
            </Tag>
          </span>
        )
      };
      dynamicColumns[0].push(actions);

      this.setState({
        columns: dynamicColumns[0],
        tableData: data,
        totalData: data.length,
        isLoading: false
      });
    } else {
      this.setState({
        columns: [],
        tableData: data,
        totalData: data.length,
        isLoading: false
      });
    }
    this.props.pageRefreshing({ isLoading: false });
  };

  handleAcceptRequest = (e, record) => {
    e.stopPropagation();
    const { tableData } = this.state;
    const { storeUpdateApproved } = this.props;
    let store = tableData.find(item => item.id === record.id);
    const data = {
      store
    };

    storeUpdateApproved(data);
    this.setState({ isLoading: true });
  };

  handleRejectRequest = (e, record) => {
    const { tableData } = this.state;
    let store = tableData.find(item => item.id === record.id);
    this.setState({ isShowRejectModal: true, currentRejectedRecord: store });
  };

  handleRejectReasonModal = () => {
    this.setState({ isShowRejectModal: false });
  };

  handleRejectRequestwithReason = reason => {
    const { currentRejectedRecord } = this.state;
    const { storeUpdateRejected } = this.props;
    const data = { store: currentRejectedRecord, reason };
    storeUpdateRejected(data);
    this.setState({ isShowRejectModal: false, isLoading: true });
  };

  render() {
    const { columns, tableData, isShowRejectModal, isLoading } = this.state;
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {isShowRejectModal && (
          <RejectRequestModal
            handleRejectRequestwithReason={this.handleRejectRequestwithReason}
            handleRejectReasonModal={this.handleRejectReasonModal}
          />
        )}
        {!isLoading && (
          <div className="update-store">
            <div className="update-store__table-header">
              Store Update Requests
            </div>
            <Table dataSource={tableData} columns={columns} />
          </div>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    getStoreUpdateRequestsResponse: state.role.getStoreUpdateRequestsResponse,
    storeUpdateApprovedResponse: state.role.storeUpdateApprovedResponse,
    storeUpdateRejectedResponse: state.role.storeUpdateRejectedResponse,
    pageRefreshingResponse: state.nonApiStore.pageRefreshingResponse
  };
}

export default connect(
  mapStateToProps,
  {
    getStoreUpdateRequests,
    storeUpdateApproved,
    storeUpdateRejected,
    pageRefreshing
    // deleteOutlets
  }
)(withRouter(UpdateRequests));
