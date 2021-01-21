import "./index.scss";
import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { message, Icon, Tag, Popconfirm } from "components/ui";

import { pageRefreshing } from "../../redux/actions/nonApiActions";

import CommonTable from "components/commonTable";
import EditButton from "components/buttons/edit-button";
import Loading from "components/loading";
import TableOperations from "components/tableOperations";
import CancelMessageForm from "components/forms/cancelMessageForm";


import {
  getCancelMessage,
  deleteCancelMessage
} from "../../redux/actions/cancel_message";

class CancelMessage extends Component {
  constructor(props) {
    super(props);
    const { selectedAirport } = this.props;
    this.state = {
      isLoading: true,
      isEditCancelMessageForm: false,
      isAddCancelMessageForm: false,
      isAddCancelMessageDisable: false,
      cancelMessageFields: [],
      pageNumber: 1,
      offset: 6,
      tableData: [],
      editRecordData: [],
      searchKey: "",
      selectedAirport,
      columns: [],
      filterKeys: ["id", "message","Action"]
    };
  }

  componentDidMount() {
    const { getCancelMessage } = this.props;
    const data = {
      page_no: 1,
      offset: 6,
      search_key: ""
    };
    getCancelMessage(data);
  }

  componentWillReceiveProps(nextProps) {
    const { pageNumber, offset, searchKey } = this.state;
    const {
      getCancelMessage,
      deleteCancelMessageResponse,
      pageRefreshingResponse,
      getCancelMessageResponse
    } = this.props;
    if (
      nextProps.getCancelMessageResponse &&
      nextProps.getCancelMessageResponse !== getCancelMessageResponse
    ) {
      if (
        nextProps.getCancelMessageResponse.error === 0 &&
        nextProps.getCancelMessageResponse.message 
      ) {
        this.handleTableData(nextProps.getCancelMessageResponse.content);
      }

    }

    if (
      nextProps.deleteCancelMessageResponse &&
      nextProps.deleteCancelMessageResponse !== deleteCancelMessageResponse
    ) {
      if (
        nextProps.deleteCancelMessageResponse.error === 0 &&
        nextProps.deleteCancelMessageResponse.message
      ) {
        message.success(nextProps.deleteCancelMessageResponse.message);
        const data = {
          page_no: pageNumber,
          offset,
          search_key: searchKey
        };
        getCancelMessage(data);
      } else {
        message.error(nextProps.deleteCancelMessageResponse.message);
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
        const filterKeys = [];
        this.setState({
          isLoading: nextProps.pageRefreshingResponse.isLoading,
          pageNumber: 1,
          offset: 6,
          searchKey: "",
          filterKeys,
          isAddCancelMessage: false,
          isEditCancelMessage: false
        });
        getCancelMessage(data);
      }
    }
  }

  handleTableData = data => {
    const dynamicColumns = [];
    if (data &&data.length > 0) {
      dynamicColumns.push(
        Object.getOwnPropertyNames(data[0]).map(item => {
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
      const tableData = data;
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
        totalData: data && data.total_items,
        columns: [],
        isLoading: false
      });
      pageRefreshing({ isLoading: false });
    }
  };

  toggleForm = () => {
    const {
      isEditCancelMessageForm,
      isAddCancelMessageForm,
      pageNumber,
      offset,
      searchKey
    } = this.state;

    const { getCancelMessage } = this.props;

    if (isEditCancelMessageForm) {
      const data = {
        page_no: pageNumber,
        offset,
        search_key: searchKey
      };
      this.setState({ isEditCancelMessageForm: false });
      getCancelMessage(data);
    } else if (isAddCancelMessageForm) {
      const data = {
        page_no: 1,
        offset: 6,
        search_key: ""
      };
      this.setState({
        isAddCancelMessageForm: false,
        pageNumber: 1,
        offset: 6,
        searchKey: ""
      });
      getCancelMessage(data);
    }
  };

  onAddNewClick = () => {
    this.setState({ isAddCancelMessageForm: true });
  };

  handleEdit = (e, record) => {
    e.stopPropagation();
    const editRecordData = {
      id:record.id,
      message: record.message
    };
    this.setState({ isEditCancelMessageForm: true, editRecordData });
  };

  onApplyFilter = filterKeys => {
    this.setState({ filterKeys });
  };

  onSearchChange = searchKey => {
    const { getCancelMessage } = this.props;
    const { offset } = this.state;
    const data = {
      page_no: 1,
      offset,
      search_key: searchKey
    };
    this.setState({ searchKey, pageNumber: 1 });
    getCancelMessage(data);
  };

  handleDelete = (e, record) => {
    e.stopPropagation();
    const { deleteCancelMessage } = this.props;
    deleteCancelMessage({id:record.id});
  };


  handleCancel = () => {
    this.setState({ isAddCancelMessageForm: false, isEditCancelMessageForm: false });
  };


  onOffsetChange = offset => {
    // checking the page number if it is greater than the number of pages
    const { totalData, searchKey } = this.state;
    let { pageNumber } = this.state;
    const { getCancelMessage } = this.props;
    if (pageNumber > Math.ceil(totalData / offset)) {
      pageNumber = Math.ceil(totalData / offset);
    }

    const data = {
      page_no: pageNumber,
      offset,
      search_key: searchKey
    };

    this.setState({ pageNumber, offset });
    getCancelMessage(data);
  };

  onPageChange = pageNumber => {
    const { getCancelMessage } = this.props;
    const { offset, searchKey } = this.state;
    const data = {
      page_no: pageNumber,
      offset,
      search_key: searchKey
    };

    this.setState({ pageNumber });
    getCancelMessage(data);
  };

  render() {
    const {
      isAddCancelMessageForm,
      isEditCancelMessageForm,
      isAddCancelMessageDisable,
      isLoading,
      columns,
      searchKey,
      filterKeys,
      tableData,
      totalData,
      offset,
      pageNumber,editRecordData,
      cancelMessageFields
    } = this.state;
    return (
      <div>
        {isLoading && <Loading />}
        {isAddCancelMessageForm && (
          <CancelMessageForm
            headerName="Add Cancel Message"
            cancelMessageFields={cancelMessageFields}
            handleCancel={this.handleCancel}
            toggleForm={this.toggleForm}
            isAddCancelMessageForm
          />
        )}
        {isEditCancelMessageForm && (
          <CancelMessageForm
            headerName="Add CancelMessage"
            handleCancel={this.handleCancel}
            editRecordData={editRecordData}
            toggleForm={this.toggleForm}
            isEditCancelMessageForm
          />
        )}

        {!isLoading && !isAddCancelMessageForm && !isEditCancelMessageForm && (
          <div>
            <div className="cancel">
              <div className="cancel__table">
                <TableOperations
                  isAddCancelMessageDisable={isAddCancelMessageDisable}
                  tablename="Cancel Message"
                  addButtonText="Cancel Message"
                  onAddNewClick={this.onAddNewClick}
                  columns={columns}
                  searchKey={searchKey}
                  onSearchChange={this.onSearchChange}
                  filterKeys={filterKeys}
                  onApplyFilter={this.onApplyFilter}
                  tableData={tableData}
                  disableDownload
                  disableSearch
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
    getCancelMessageResponse: state.cancelmessage.getCancelMessageResponse,
    pageRefreshingResponse: state.nonApiStore.pageRefreshingResponse,
    deleteCancelMessageResponse: state.cancelmessage.deleteCancelMessageResponse,

  };
}

export default connect(mapStateToProps, {
  getCancelMessage,
  pageRefreshing,
  deleteCancelMessage
})(withRouter(CancelMessage));

// export default CancelMessage;
