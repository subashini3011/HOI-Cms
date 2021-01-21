import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import { pageRefreshing } from '../../redux/actions/nonApiActions';

import StatisticCardContainer from 'containers/statistic-card';

import UpcomingStoresForm from 'components/forms/upcoming-stores-form';
import CommonTable from 'components/commonTable';
import Loading from 'components/loading';
import TableOperations from 'components/tableOperations';
import { message, Icon, Tag, Popconfirm } from 'components/ui';
import {
  getUpcomingStores,
  deleteUpcomingStores
} from '../../redux/actions/upcomingStoresActions';

import './index.scss';

class UpcomingStores extends Component {
  constructor(props) {
    super(props);
    const { selectedAirport } = this.props;
    this.state = {
      isLoading: true,
      upcomingStoresFields: [],
      selectedAirport,
      isAddUpcomingStoresForm: false,
      columns: '',
      searchKey: '',
      isAddUpcomingStoresForm: false,
      isEditUpcomingStoresForm: false,
      editRecordData: [],
      filterKeys: ['description', 'id', 'status', 'image', 'title', 'Action']
    };
  }

  componentDidMount() {
    const { getUpcomingStores, selectedAirport } = this.props;
    const upcomingStoresPayload = {
      airport_code: selectedAirport
    };

    getUpcomingStores(upcomingStoresPayload);
  }

  componentWillReceiveProps(nextProps) {
    const { deleteUpcomingStoresResponse, pageRefreshingResponse } = this.props;
    if (
      nextProps.getUpcomingStoresResponse &&
      nextProps.getUpcomingStoresResponse !==
        this.props.getUpcomingStoresResponse
    ) {
      if (
        nextProps.getUpcomingStoresResponse.error === 0 &&
        nextProps.getUpcomingStoresResponse.content
      ) {
        // const data = nextProps.getUpcomingStoresResponse.content.find(
        //   dataItem => dataItem.airport_code === this.state.selectedAirport
        // );

        this.handleTableData(nextProps.getUpcomingStoresResponse.content);
      }
    }
    if (
      nextProps.deleteUpcomingStoresResponse &&
      nextProps.deleteUpcomingStoresResponse !== deleteUpcomingStoresResponse
    ) {
      if (
        nextProps.deleteUpcomingStoresResponse.error === 0 &&
        nextProps.deleteUpcomingStoresResponse.message
      ) {
        message.success(nextProps.deleteUpcomingStoresResponse.message);
        const { getUpcomingStores } = this.props;

        getUpcomingStores();
      } else {
        message.error(nextProps.deleteUpcomingStoresResponse.message);
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
          search_key: ''
        };
        const filterKeys = [
          'description',
          'id',
          'status',
          'image',
          'title',
          'Action'
        ];
        this.setState({
          isLoading: nextProps.pageRefreshingResponse.isLoading,

          filterKeys,
          isAddUpcomingStoresForm: false,
          isEditUpcomingStoresForm: false
        });

        const { getUpcomingStores, selectedAirport } = this.props;
        const upcomingStoresPayload = {
          airport_code: selectedAirport
        };

        getUpcomingStores(upcomingStoresPayload);
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
          if (item === 'image') {
            header = {
              title: `${item}`.replace(/_/g, ' '),
              dataIndex: `${item}`,
              key: `${item}`,
              render: text => (
                <img
                  src={text}
                  style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                    marginLeft: '1.7rem'
                  }}
                  alt={item}
                />
              )
            };
          } else if (item === 'is_map_support') {
            header = {
              title: `${item}`.replace(/_/g, ' '),
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
              title: `${item}`.replace(/_/g, ' '),
              dataIndex: `${item}`,
              key: `${item}`
            };
          }
          return header;
        })
      );
      const actions = {
        title: 'Action',
        dataIndex: 'Action',
        width: '15rem',
        render: (text, record) => (
          <span className="u_no_wrap">
            <Tag
              color="geekblue"
              style={{ marginRight: '1rem' }}
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
              icon={<Icon type="exclamation-circle" style={{ color: 'red' }} />}
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
    this.setState({ isAddUpcomingStoresForm: true });
  };

  handleEdit = (e, record) => {
    e.stopPropagation();
    this.setState({ isEditUpcomingStoresForm: true, editRecordData: record });
  };

  handleDelete = (e, record) => {
    e.stopPropagation();
    const data = {
      store_id: record.id
    };
    this.props.deleteUpcomingStores(data);
    this.setState({ isLoading: true });
  };

  handleCancel = () => {
    this.setState({
      isAddUpcomingStoresForm: false,
      isEditUpcomingStoresForm: false
    });
  };

  toggleForm = () => {
    const { selectedAirport } = this.state;
    const { getUpcomingStores } = this.props;
    if (this.state.isEditUpcomingStoresForm) {
      this.setState({ isEditUpcomingStoresForm: false });
      const upcomingStoresPayload = {
        airport_code: selectedAirport
      };
      getUpcomingStores(upcomingStoresPayload);
    } else if (this.state.isAddUpcomingStoresForm) {
      this.setState({
        isAddUpcomingStoresForm: false
      });
      const upcomingStoresPayload = {
        airport_code: selectedAirport
      };
      getUpcomingStores(upcomingStoresPayload);
    }
  };

  render() {
    const {
      isLoading,
      selectedAirport,
      columns,
      searchKey,
      filterKeys,
      upcomingStoresFields,
      isAddUpcomingStoresForm,
      isEditUpcomingStoresForm,
      editRecordData
    } = this.state;
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {isAddUpcomingStoresForm && (
          <UpcomingStoresForm
            headerName="Add New Upcoming Stores"
            upcomingStoresFields={upcomingStoresFields}
            handleCancel={this.handleCancel}
            // userRoles={this.state.userRoles}
            toggleForm={this.toggleForm}
            toggleForm={this.toggleForm}
            selectedAirport={selectedAirport}
            isAddUpcomingStoresForm
          />
        )}
        {isEditUpcomingStoresForm && (
          <UpcomingStoresForm
            headerName="Edit Upcoming Stores"
            editRecord={this.state.editRecord}
            editRecordData={editRecordData}
            handleCancel={this.handleCancel}
            toggleForm={this.toggleForm}
            selectedAirport={this.state.selectedAirport}
            isEditUpcomingStoresForm
          />
        )}
        {!isLoading && !isAddUpcomingStoresForm && !isEditUpcomingStoresForm && (
          <React.Fragment>
            {/* <StatisticCardContainer selectedAirport={selectedAirport} /> */}
            <div className="upcomingStores">
              <TableOperations
                tablename="Upcoming Stores"
                addButtonText="Upcoming Stores"
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

    getUpcomingStoresResponse: state.upcomingStores.getUpcomingStoresResponse,
    deleteUpcomingStoresResponse:
      state.upcomingStores.deleteUpcomingStoresResponse,
    pageRefreshingResponse: state.nonApiStore.pageRefreshingResponse
  };
}

export default connect(
  mapStateToProps,
  {
    getUpcomingStores,
    deleteUpcomingStores,
    pageRefreshing
  }
)(withRouter(UpcomingStores));
