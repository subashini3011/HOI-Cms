import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

import { pageRefreshing } from "../../redux/actions/nonApiActions";

import StatisticCardContainer from "containers/statistic-card";

import TerminalForm from "components/forms/terminal-form";
import CommonTable from "components/commonTable";
import Loading from "components/loading";
import TableOperations from "components/tableOperations";
import { message, Icon, Tag, Popconfirm } from "components/ui";
import {
  getTerminalFields,
  getTerminals,
  deleteTerminal
} from "../../redux/actions/terminalActions";

import "./index.scss";

class AirportTerminals extends Component {
  constructor(props) {
    super(props);
    const { selectedAirport } = this.props;
    this.state = {
      isLoading: true,
      terminalFields: [],
      selectedAirport,
      isAddTerminalForm: false,
      columns: "",
      searchKey: "",
      isAddTerminalForm: false,
      isEditTerminalForm: false,
      editRecordData: [],
      filterKeys: [
        "airport_code",
        "terminal",
        "terminal_name",
        "terminal_side",
        "terminal_type",
        "terminal_image",
        "is_map_support",
        "Action"
      ]
    };
  }

  componentDidMount() {
    const { getTerminals, selectedAirport } = this.props;
    const terminalPayload = {
      airport_code: selectedAirport
    };

    getTerminals(terminalPayload);
  }

  componentWillReceiveProps(nextProps) {
    const { deleteTerminalResponse, pageRefreshingResponse } = this.props;
    if (
      nextProps.getTerminalsResponse &&
      nextProps.getTerminalsResponse !== this.props.getTerminalsResponse
    ) {
      if (
        nextProps.getTerminalsResponse.error === 0 &&
        nextProps.getTerminalsResponse.content
      ) {
        // const data = nextProps.getTerminalsResponse.content.find(
        //   dataItem => dataItem.airport_code === this.state.selectedAirport
        // );

        this.handleTableData(nextProps.getTerminalsResponse.content);
      }
    }
    if (
      nextProps.deleteTerminalResponse &&
      nextProps.deleteTerminalResponse !== deleteTerminalResponse
    ) {
      if (
        nextProps.deleteTerminalResponse.error === 0 &&
        nextProps.deleteTerminalResponse.message
      ) {
        message.success(nextProps.deleteTerminalResponse.message);
        const { getTerminalFields } = this.props;

        getTerminalFields();
      } else {
        message.error(nextProps.deleteTerminalResponse.message);
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
          "airport_code",
          "terminal",
          "terminal_name",
          "terminal_side",
          "terminal_type",
          "terminal_image",
          "is_map_support",
          "Action"
        ];
        this.setState({
          isLoading: nextProps.pageRefreshingResponse.isLoading,

          filterKeys,
          isAddTerminalForm: false,
          isEditTerminalForm: false
        });

        const { getTerminals, selectedAirport } = this.props;
        const terminalPayload = {
          airport_code: selectedAirport
        };

        getTerminals(terminalPayload);
      }
    }
  }

  handleTableData = data => {
    const tableData = data;
    const dynamicColumns = [];
    if (data.length > 0) {
      dynamicColumns.push(
        Object.getOwnPropertyNames(data[0]).map(item => {
          let header = [];
          if (item === "terminal_image") {
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
          } else if (item === "is_map_support") {
            header = {
              title: `${item}`.replace(/_/g, " "),
              dataIndex: `${item}`,
              key: `${item}`,
              render: text =>
                text === 1 ? (
                  <span className="cmsusers__table__status__active">Yes</span>
                ) : (
                  <span className="cmsusers__table__status__inactive">No</span>
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
        totalData: data.total_items,
        isLoading: false
      });
    } else {
      this.setState({
        tableData: [],
        columns: [],
        totalData: data.total_items,
        isLoading: false
      });
    }
    this.props.pageRefreshing({ isLoading: false });
  };

  onApplyFilter = filterKeys => {
    this.setState({ filterKeys });
  };

  onAddNewClick = () => {
    const { getTerminalFields } = this.props;
    getTerminalFields();
    this.setState({ isAddTerminalForm: true });
  };

  handleEdit = (e, record) => {
    e.stopPropagation();
    this.setState({ isEditTerminalForm: true, editRecordData: record });
  };

  handleDelete = (e, record) => {
    e.stopPropagation();
    const data = {
      id: record.id
    };
    this.props.deleteTerminal(data);
  };

  handleCancel = () => {
    this.setState({ isAddTerminalForm: false, isEditTerminalForm: false });
  };

  toggleForm = () => {
    const { selectedAirport } = this.state;
    const { getTerminals } = this.props;
    if (this.state.isEditTerminalForm) {
      this.setState({ isEditTerminalForm: false });
      const terminalPayload = {
        airport_code: selectedAirport
      };
      getTerminals(terminalPayload);
    } else if (this.state.isAddTerminalForm) {
      this.setState({
        isAddTerminalForm: false
      });
      const terminalPayload = {
        airport_code: selectedAirport
      };
      getTerminals(terminalPayload);
    }
  };

  render() {
    const {
      isLoading,
      selectedAirport,
      columns,
      searchKey,
      filterKeys,
      terminalFields,
      isAddTerminalForm,
      isEditTerminalForm,
      editRecordData
    } = this.state;
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {isAddTerminalForm && (
          <TerminalForm
            headerName="Add New Terminal"
            terminalFields={terminalFields}
            handleCancel={this.handleCancel}
            // userRoles={this.state.userRoles}
            toggleForm={this.toggleForm}
            toggleForm={this.toggleForm}
            selectedAirport={selectedAirport}
            isAddTerminalForm
          />
        )}
        {isEditTerminalForm && (
          <TerminalForm
            headerName="Edit Terminal"
            editRecord={this.state.editRecord}
            editRecordData={editRecordData}
            handleCancel={this.handleCancel}
            toggleForm={this.toggleForm}
            selectedAirport={this.state.selectedAirport}
            isEditTerminalForm
          />
        )}
        {!isLoading && !isAddTerminalForm && !isEditTerminalForm && (
          <React.Fragment>
            {/* <StatisticCardContainer selectedAirport={selectedAirport} /> */}
            <div className="terminal">
              <TableOperations
                tablename="Terminal"
                addButtonText="Terminal"
                onAddNewClick={this.onAddNewClick}
                columns={columns}
                searchKey={searchKey}
                disableDownload
                disableSearch
                onSearchChange={this.onSearchChange}
                // downloadUrl={DOWNLOAD_AIRPORTS}
                filterKeys={filterKeys}
                onApplyFilter={this.onApplyFilter}
                tableData={this.state.tableData}
              />
              <CommonTable
                columns={columns}
                dataSource={this.state.tableData}
                totalData={this.state.totalData}
                disablePagination
                offset={this.state.offset}
                onPageChange={this.onPageChange}
                onOffsetChange={this.onOffsetChange}
                pageNumber={this.state.pageNumber}
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
    getTerminalFieldsResponse: state.terminal.getTerminalFieldsResponse,
    getTerminalsResponse: state.terminal.getTerminalsResponse,
    deleteTerminalResponse: state.terminal.deleteTerminalResponse,
    pageRefreshingResponse: state.nonApiStore.pageRefreshingResponse
  };
}

export default connect(
  mapStateToProps,
  {
    getTerminalFields,
    getTerminals,
    deleteTerminal,
    pageRefreshing
  }
)(withRouter(AirportTerminals));
