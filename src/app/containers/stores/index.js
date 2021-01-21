import "./index.scss";
import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

// actions
import {
  // deleteOutlets,
  getStores
} from "../../redux/actions/roleActions";
// import { DOWNLOAD_OUTLETS } from "constants/api-constants";

// containers
import TableOperations from "components/tableOperations";
import StatisticCardContainer from "containers/statistic-card";

// components
import CommonTable from "components/commonTable";
import Loading from "components/loading";

import OuteletForm from "components/forms/outlet-form";
import { message, Tag, Popconfirm, Icon, Modal } from "components/ui";
import { pageRefreshing } from "../../redux/actions/nonApiActions";
import * as User from "../../shared/app-data/user";

class Stores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isShowEditStoreForm: false,
      isShowRequestUpdateModal: false,
      columns: [],
      editRecordData: "",
      tableData: [],
      pageNumber: 1,
      offset: 6,
      tableData: [],
      search_key: "",
      selectedAirport: this.props.selectedAirport,
      // downloadUrl: DOWNLOAD_OUTLETS + this.props.selectedAirport,
      filterKeys: [
        "store_name",
        "retailer_name",
        "terminal",
        "terminal_side",
        "store_logo",
        "Action"
      ]
    };
  }

  componentDidMount() {
    const userInfo = User.getUserData();
    if (userInfo) {
      const data = {
        user_info: {
          user_id: userInfo.id,
          role: userInfo.role
        }
      };

      this.props.getStores(data);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.getStoresResponse &&
      nextProps.getStoresResponse !== this.props.getStoresResponse
    ) {
      if (
        nextProps.getStoresResponse.error === 0 &&
        nextProps.getStoresResponse.content &&
        nextProps.getStoresResponse.content.store_data
      ) {
        this.handleTableData(nextProps.getStoresResponse.content.store_data);
      }
    }

    if (
      nextProps.pageRefreshingResponse &&
      nextProps.pageRefreshingResponse !== this.props.pageRefreshingResponse
    ) {
      if (nextProps.pageRefreshingResponse.isLoading === true) {
        const filterKeys = [
          "store_name",
          "retailer_name",
          "terminal",
          "terminal_side",
          "store_logo",
          "Action"
        ];
        this.setState({
          isLoading: nextProps.pageRefreshingResponse.isLoading,
          pageNumber: 1,
          offset: 6,
          search_key: "",
          filterKeys,
          isShowAddStoreForm: false,
          isShowEditStoreForm: false
        });
        const userInfo = User.getUserData();
        if (userInfo) {
          const data = {
            user_info: {
              user_id: userInfo.id,
              role: userInfo.role
            }
          };

          this.props.getStores(data);
        }
      }
    }

    if (
      nextProps.deleteOutletsResponse &&
      nextProps.deleteOutletsResponse !== this.props.deleteOutletsResponse
    ) {
      if (
        nextProps.deleteOutletsResponse.error === 0 &&
        nextProps.deleteOutletsResponse.message
      ) {
        message.success(nextProps.deleteOutletsResponse.message);
        const data = {
          airport_name: this.state.selectedAirport,
          category_id: selectedCategory,
          sub_category_id: "",
          page_no: this.state.pageNumber,
          offset: this.state.offset,
          search_key: this.state.search_key
        };
        this.props.getOutlets(data);
      } else {
        message.error(nextProps.deleteOutletsResponse.message);
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
      let actions = {
        title: "Action",
        dataIndex: "Action",
        width: "15rem",
        render: (text, record) => (
          <span className="u_no_wrap">
            {record.admin_approval === 1 && (
              <Tag
                color="geekblue"
                style={{ marginRight: "1rem" }}
                onClick={e => {
                  this.handleEdit(e, record);
                }}
                className="u_cursor_pointer"
              >
                Edit
              </Tag>
            )}
            {record.admin_approval === 0 && (
              <Tag color="gold" style={{ marginRight: "1rem" }}>
                Edit Request Sent
              </Tag>
            )}
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

  onApplyFilter = filterKeys => {
    this.setState({ filterKeys });
  };

  toggleForm = () => {
    const { selectedCategory } = this.props;
    const {
      isShowAddOutletForm,
      isShowEditStoreForm,
      selectedAirport,
      pageNumber,
      offset,
      search_key
    } = this.state;

    if (isShowEditStoreForm) {
      const userInfo = User.getUserData();
      if (userInfo) {
        const data = {
          user_info: {
            user_id: userInfo.id,
            role: userInfo.role
          }
        };
        this.setState({ isShowEditStoreForm: false });
        this.props.getStores(data);
      }
    }
  };

  handleCancel = () => {
    this.setState({ isShowEditStoreForm: false });
  };

  handleEdit = (e, record) => {
    e.stopPropagation();
    const { selectedCategory } = this.props;

    if (record.admin_approval && record.admin_approval === 1) {
      const data = {
        airport_code: this.state.selectedAirport,
        store_id: record.store_id,
        location_id: record.location_id,
        category_id: record.main_category
      };
      this.setState({ isShowEditStoreForm: true, editRecordData: data });
    } else {
      this.isShowRequestUpdateModal();
    }
  };

  isShowRequestUpdateModal() {
    Modal.success({
      title: "Request Sent",
      content:
        "Request is sent to Admin to edit store. Please wait for approval"
    });
  }

  onSearchChange = search_key => {
    const { selectedCategory } = this.props;
    const data = {
      airport_name: this.state.selectedAirport,
      category_id: selectedCategory,
      sub_category_id: "",
      page_no: 1,
      offset: this.state.offset,
      search_key
    };
    this.setState({ search_key, pageNumber: 1 });
    this.props.getOutlets(data);
  };

  render() {
    const {
      isLoading,
      isShowEditStoreForm,
      selectedAirport,
      editRecordData,
      isSpinning
    } = this.state;
    return (
      <React.Fragment>
        {isLoading && <Loading />}

        {isShowEditStoreForm && (
          <OuteletForm
            headerName="Edit store"
            outeletFormType="storeSupervisorStores"
            handleCancel={this.handleCancel}
            selectedAirport={selectedAirport}
            toggleForm={this.toggleForm}
            isSpinning={isSpinning}
            isShowOutletEditForm
            isShowBulkUpload={false}
            editRecordData={editRecordData}
            selectedCategory={editRecordData.category_id}
          />
        )}
        {!isLoading && !isShowEditStoreForm && !isLoading && (
          <div>
            {/* <StatisticCardContainer
              selectedAirport={this.state.selectedAirport}
            /> */}
            <div className="facilites">
              <div className="facilites__table">
                <TableOperations
                  tablename="Stores"
                  columns={this.state.columns}
                  disableAddRow
                  disableDownload
                  disableSearch
                  searchKey={this.state.search_key}
                  onSearchChange={this.onSearchChange}
                  // downloadUrl={this.state.downloadUrl}
                  filterKeys={this.state.filterKeys}
                  onApplyFilter={this.onApplyFilter}
                  tableData={this.state.tableData}
                />
                <CommonTable
                  columns={this.state.columns}
                  dataSource={this.state.tableData}
                  totalData={this.state.totalData}
                  offset={this.state.offset}
                  disablePagination
                  onPageChange={this.onPageChange}
                  onOffsetChange={this.onOffsetChange}
                  pageNumber={this.state.pageNumber}
                  filterKeys={this.state.filterKeys}
                />
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    getStoresResponse: state.role.getStoresResponse,
    pageRefreshingResponse: state.nonApiStore.pageRefreshingResponse
    // deleteOutletsResponse: state.outlets.deleteOutletsResponse
  };
}

export default connect(
  mapStateToProps,
  {
    getStores,
    pageRefreshing
    // deleteOutlets
  }
)(withRouter(Stores));
