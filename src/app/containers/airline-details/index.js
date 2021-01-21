import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import { pageRefreshing } from '../../redux/actions/nonApiActions';

import StatisticCardContainer from 'containers/statistic-card';

import AirlineDetailsForm from 'components/forms/airline-details-form';

import CommonTable from 'components/commonTable';
import Loading from 'components/loading';
import TableOperations from 'components/tableOperations';
import EditButton from 'components/buttons/edit-button';

import { message, Icon, Tag, Popconfirm } from 'components/ui';
import {
  airlineDetails,
  deleteAirlineDetails
} from '../../redux/actions/flightServiceActions';

import './index.scss';

class AirlineDetails extends Component {
  constructor(props) {
    super(props);
    const { selectedAirport } = this.props;
    this.state = {
      isLoading: true,
      selectedAirport,
      isAddAirlineDetailsForm: false,
      columns: [],
      pageNumber: 1,
      offset: 6,
      searchKey: '',
      totalData: '',
      isEditAirlineDetailsForm: false,
      editRecordData: [],
      filterKeys: [
        'code',
        'id',
        'logo',
        'name',
        'type',
        'web_check_in_url',
        'Action'
      ]
    };
  }

  componentDidMount() {
    const { airlineDetails, selectedAirport } = this.props;
    const airlineDetailslPayload = {
      airport_code: selectedAirport,
      page_no: 1,
      offset: 6,
      search_key: ''
    };

    airlineDetails(airlineDetailslPayload);
  }

  componentWillReceiveProps(nextProps) {
    const { pageNumber, offset, searchKey } = this.state;
    const { selectedAirport, airlineDetails } = this.props;
    const { deleteAirlineDetailsResponse, pageRefreshingResponse } = this.props;
    if (
      nextProps.airlineDetailsResponse &&
      nextProps.airlineDetailsResponse !== this.props.airlineDetailsResponse
    ) {
      if (
        nextProps.airlineDetailsResponse.error === 0 &&
        nextProps.airlineDetailsResponse.content
      ) {
        this.handleTableData(nextProps.airlineDetailsResponse.content);
      }
    }
    if (
      nextProps.deleteAirlineDetailsResponse &&
      nextProps.deleteAirlineDetailsResponse !== deleteAirlineDetailsResponse
    ) {
      if (
        nextProps.deleteAirlineDetailsResponse.error === 0 &&
        nextProps.deleteAirlineDetailsResponse.message
      ) {
        message.success(nextProps.deleteAirlineDetailsResponse.message);

        const airlineDetailslPayload = {
          airport_code: selectedAirport,
          page_no: pageNumber,
          offset,
          search_key: searchKey
        };
        airlineDetails(airlineDetailslPayload);
      } else {
        message.error(nextProps.deleteAirlineDetailsResponse.message);
      }
    }

    if (
      nextProps.pageRefreshingResponse &&
      nextProps.pageRefreshingResponse !== pageRefreshingResponse
    ) {
      if (nextProps.pageRefreshingResponse.isLoading === true) {
        const filterKeys = [
          'code',
          'id',
          'logo',
          'name',
          'type',
          'web_check_in_url',
          'Action'
        ];
        const { airlineDetails, selectedAirport } = this.props;
        const airlineDetailslPayload = {
          airport_code: selectedAirport,
          page_no: 1,
          offset: 6,
          search_key: ''
        };
        airlineDetails(airlineDetailslPayload);
        this.setState({
          isLoading: nextProps.pageRefreshingResponse.isLoading,
          pageNumber: 1,
          offset: 6,
          searchKey: '',
          filterKeys,
          isAddAirlineDetailsForm: false,
          isEditAirlineDetailsForm: false
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
          if (item === 'logo') {
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
                  alt="Profile"
                />
              )
            };
          } else if (item === 'status') {
            header = {
              title: `${item}`.replace(/_/g, ' '),
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
            <EditButton handleEdit={this.handleEdit} record={record} />
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
        totalData: response.total_count,
        isLoading: false
      });
    } else {
      this.setState({
        tableData,
        totalData: response.total_count,
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
    this.setState({ isAddAirlineDetailsForm: true });
  };

  handleEdit = (e, record) => {
    e.stopPropagation();
    this.setState({
      isEditAirlineDetailsForm: true,
      editRecordData: record
    });
  };

  handleDelete = (e, record) => {
    const { deleteAirlineDetails } = this.props;
    e.stopPropagation();
    const data = {
      code: record.code
    };
    deleteAirlineDetails(data);
    this.setState({ isLoading: true });
  };

  handleCancel = () => {
    this.setState({
      isAddAirlineDetailsForm: false,
      isEditAirlineDetailsForm: false
    });
  };

  toggleForm = () => {
    const { selectedAirport, pageNumber, offset, searchKey } = this.state;
    const { airlineDetails } = this.props;
    if (this.state.isEditAirlineDetailsForm) {
      this.setState({ isEditAirlineDetailsForm: false });
      const airlineDetailslPayload = {
        airport_code: selectedAirport,
        page_no: pageNumber,
        offset,
        search_key: searchKey
      };
      airlineDetails(airlineDetailslPayload);
    } else if (this.state.isAddAirlineDetailsForm) {
      this.setState({
        isAddAirlineDetailsForm: false,
        page_no: 1,
        offset: 6,
        search_key: ''
      });
      const airlineDetailslPayload = {
        airport_code: selectedAirport,
        page_no: 1,
        offset: 6,
        search_key: ''
      };
      airlineDetails(airlineDetailslPayload);
    }
  };

  onSearchChange = searchKey => {
    const { offset } = this.state;
    const { airlineDetails, selectedAirport } = this.props;
    const airlineDetailslPayload = {
      airport_code: selectedAirport,
      page_no: 1,
      offset,
      search_key: searchKey
    };
    this.setState({ searchKey, pageNumber: 1 });
    airlineDetails(airlineDetailslPayload);
  };

  onOffsetChange = offset => {
    const { totalData, searchKey } = this.state;
    let { pageNumber } = this.state;
    // checking the page number if it is greater than the number of pages
    if (pageNumber > Math.ceil(totalData / offset)) {
      pageNumber = Math.ceil(totalData / offset);
    }
    const { airlineDetails, selectedAirport } = this.props;
    const airlineDetailslPayload = {
      airport_code: selectedAirport,
      page_no: pageNumber,
      offset,
      search_key: searchKey
    };
    airlineDetails(airlineDetailslPayload);
    this.setState({ pageNumber, offset });
  };

  onPageChange = pageNumber => {
    const { offset, searchKey } = this.state;
    const { airlineDetails, selectedAirport } = this.props;
    const airlineDetailslPayload = {
      airport_code: selectedAirport,
      page_no: pageNumber,
      offset,
      search_key: searchKey
    };
    airlineDetails(airlineDetailslPayload);
    this.setState({ pageNumber });
  };

  render() {
    const {
      isLoading,
      selectedAirport,
      columns,
      searchKey,
      filterKeys,
      isAddAirlineDetailsForm,
      isEditAirlineDetailsForm,
      editRecordData,
      pageNumber,
      offset,
      totalData,
      tableData
    } = this.state;
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {isAddAirlineDetailsForm && (
          <AirlineDetailsForm
            headerName="Add New Airline Details"
            handleCancel={this.handleCancel}
            // userRoles={this.state.userRoles}
            toggleForm={this.toggleForm}
            toggleForm={this.toggleForm}
            selectedAirport={selectedAirport}
            isAddAirlineDetailsForm
          />
        )}
        {isEditAirlineDetailsForm && (
          <AirlineDetailsForm
            headerName="Edit Airline Details"
            editRecord={this.state.editRecord}
            editRecordData={editRecordData}
            handleCancel={this.handleCancel}
            toggleForm={this.toggleForm}
            selectedAirport={this.state.selectedAirport}
            isEditAirlineDetailsForm
          />
        )}
        {!isLoading && !isAddAirlineDetailsForm && !isEditAirlineDetailsForm && (
          <React.Fragment>
            {/* <StatisticCardContainer selectedAirport={selectedAirport} /> */}
            <div className="u_table-container">
              <TableOperations
                tablename="Airline Details"
                addButtonText="Airline Details"
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
    airlineDetailsResponse: state.flightService.airlineDetailsResponse,
    deleteAirlineDetailsResponse:
      state.flightService.deleteAirlineDetailsResponse,
    pageRefreshingResponse: state.nonApiStore.pageRefreshingResponse
  };
}

export default connect(
  mapStateToProps,
  {
    airlineDetails,
    deleteAirlineDetails,
    pageRefreshing
  }
)(withRouter(AirlineDetails));
