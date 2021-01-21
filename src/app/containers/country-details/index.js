import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import { pageRefreshing } from '../../redux/actions/nonApiActions';

import CountryDetailsForm from 'components/forms/country-details-form';
import CommonTable from 'components/commonTable';
import Loading from 'components/loading';
import TableOperations from 'components/tableOperations';
import { message, Icon, Tag, Popconfirm } from 'components/ui';
import {
  countryDetails,
  deleteCountryDetails
} from '../../redux/actions/countryDetailsActions';

import './index.scss';

class CountryDetails extends Component {
  constructor(props) {
    super(props);
    const { selectedAirport } = this.props;
    this.state = {
      isLoading: true,
      countryDetailsFields: [],

      selectedAirport,
      isAddCountryDetailsForm: false,
      columns: '',
      searchKey: '',
      isAddCountryDetailsForm: false,
      isEditCountryDetailsForm: false,
      editRecordData: [],
      filterKeys: ['code', 'digits', 'id', 'name', 'Action'],
      pageNumber: 1,
      offset: 6,
      searchKey: '',
      totalData: ''
    };
  }

  componentDidMount() {
    const { countryDetails, selectedAirport } = this.props;
    const countryDetailsPayload = {
      airport_code: selectedAirport,
      page_no: 1,
      offset: 6,
      search_key: ''
    };

    countryDetails(countryDetailsPayload);
  }

  componentWillReceiveProps(nextProps) {
    const { pageNumber, searchKey, offset } = this.state;
    const {
      deleteCountryDetailsResponse,
      pageRefreshingResponse,
      selectedAirport
    } = this.props;
    if (
      nextProps.countryDetailsResponse &&
      nextProps.countryDetailsResponse !== this.props.countryDetailsResponse
    ) {
      if (
        nextProps.countryDetailsResponse.error === 0 &&
        nextProps.countryDetailsResponse.content
      ) {
        // const data = nextProps.countryDetailsResponse.content.find(
        //   dataItem => dataItem.airport_code === this.state.selectedAirport
        // );
        this.handleTableData(nextProps.countryDetailsResponse.content);
      }
    }
    if (
      nextProps.deleteCountryDetailsResponse &&
      nextProps.deleteCountryDetailsResponse !== deleteCountryDetailsResponse
    ) {
      if (
        nextProps.deleteCountryDetailsResponse.error === 0 &&
        nextProps.deleteCountryDetailsResponse.message
      ) {
        message.success(nextProps.deleteCountryDetailsResponse.message);
        const { countryDetails } = this.props;

        const countryDetailsPayload = {
          page_no: pageNumber,
          offset,
          search_key: searchKey
        };

        countryDetails(countryDetailsPayload);
      } else {
        message.error(nextProps.deleteCountryDetailsResponse.message);
      }
    }

    if (
      nextProps.pageRefreshingResponse &&
      nextProps.pageRefreshingResponse !== pageRefreshingResponse
    ) {
      if (nextProps.pageRefreshingResponse.isLoading === true) {
        const filterKeys = ['code', 'digits', 'id', 'name', 'Action'];
        this.setState({
          isLoading: nextProps.pageRefreshingResponse.isLoading,
          filterKeys,
          isAddCountryDetailsForm: false,
          isEditCountryDetailsForm: false
        });

        const { countryDetails, selectedAirport } = this.props;
        const countryDetailsPayload = {
          airport_code: selectedAirport,
          page_no: 1,
          offset: 6,
          search_key: ''
        };

        countryDetails(countryDetailsPayload);
      }
    }
  }

  handleTableData = content => {
    const tableData = content.data;
    const dynamicColumns = [];
    if (content.data.length > 0) {
      dynamicColumns.push(
        Object.getOwnPropertyNames(content.data[0]).map(item => {
          let header = [];
          if (item === 'image' || item === 'logo') {
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
        totalData: content.total_count,
        isLoading: false
      });
    } else {
      this.setState({
        tableData: [],
        columns: [],
        totalData: content.total_count,
        isLoading: false
      });
    }
    this.props.pageRefreshing({ isLoading: false });
  };

  onApplyFilter = filterKeys => {
    this.setState({ filterKeys });
  };

  onAddNewClick = () => {
    this.setState({ isAddCountryDetailsForm: true });
  };

  handleEdit = (e, record) => {
    e.stopPropagation();
    this.setState({ isEditCountryDetailsForm: true, editRecordData: record });
  };

  handleDelete = (e, record) => {
    e.stopPropagation();
    const data = {
      id: record.id
    };
    this.props.deleteCountryDetails(data);
    this.setState({ isLoading: true });
  };

  handleCancel = () => {
    this.setState({
      isAddCountryDetailsForm: false,
      isEditCountryDetailsForm: false
    });
  };

  toggleForm = () => {
    const { selectedAirport, offset, searchKey, pageNumber } = this.state;
    const { countryDetails } = this.props;
    if (this.state.isEditCountryDetailsForm) {
      this.setState({ isEditCountryDetailsForm: false });
      const countryDetailsPayload = {
        airport_code: selectedAirport,
        page_no: pageNumber,
        offset,
        search_key: searchKey
      };
      countryDetails(countryDetailsPayload);
    } else if (this.state.isAddCountryDetailsForm) {
      this.setState({
        isAddCountryDetailsForm: false
      });
      const countryDetailsPayload = {
        airport_code: selectedAirport,
        page_no: pageNumber,
        offset,
        search_key: searchKey
      };
      countryDetails(countryDetailsPayload);
    }
  };

  onSearchChange = searchKey => {
    const { offset } = this.state;
    const { selectedAirport } = this.props;
    const { countryDetails } = this.props;
    const countryDetailsPayload = {
      page_no: 1,
      offset,
      search_key: searchKey,
      airport_code: selectedAirport
    };

    this.setState({ searchKey, pageNumber: 1 });
    countryDetails(countryDetailsPayload);
  };

  onOffsetChange = offset => {
    const { totalData, searchKey } = this.state;
    const { countryDetails, selectedAirport } = this.props;
    let { pageNumber } = this.state;
    // checking the page number if it is greater than the number of pages
    if (pageNumber > Math.ceil(totalData / offset)) {
      pageNumber = Math.ceil(totalData / offset);
    }

    const countryDetailsPayload = {
      page_no: pageNumber,
      offset,
      search_key: searchKey,
      airport_code: selectedAirport
    };
    countryDetails(countryDetailsPayload);

    this.setState({ pageNumber, offset });
  };

  onPageChange = pageNumber => {
    const { userInfo, offset, searchKey } = this.state;
    const { countryDetails, selectedAirport } = this.props;
    const countryDetailsPayload = {
      page_no: pageNumber,
      offset,
      search_key: searchKey,
      airport_code: selectedAirport
    };
    countryDetails(countryDetailsPayload);
    this.setState({ pageNumber });
  };

  render() {
    const {
      isLoading,
      selectedAirport,
      columns,
      searchKey,
      filterKeys,
      countryDetailsFields,
      isAddCountryDetailsForm,
      isEditCountryDetailsForm,
      editRecordData
    } = this.state;
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {isAddCountryDetailsForm && (
          <CountryDetailsForm
            headerName="Add New Country Detail"
            countryDetailsFields={countryDetailsFields}
            handleCancel={this.handleCancel}
            // userRoles={this.state.userRoles}
            toggleForm={this.toggleForm}
            toggleForm={this.toggleForm}
            selectedAirport={selectedAirport}
            isAddCountryDetailsForm
          />
        )}
        {isEditCountryDetailsForm && (
          <CountryDetailsForm
            headerName="Edit Country Detail"
            editRecord={this.state.editRecord}
            editRecordData={editRecordData}
            handleCancel={this.handleCancel}
            toggleForm={this.toggleForm}
            selectedAirport={this.state.selectedAirport}
            isEditCountryDetailsForm
          />
        )}
        {!isLoading && !isAddCountryDetailsForm && !isEditCountryDetailsForm && (
          <React.Fragment>
            {/* <StatisticCardContainer selectedAirport={selectedAirport} /> */}
            <div className="u_table-container">
              <TableOperations
                tablename="CountryDetails"
                addButtonText="CountryDetails"
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

    countryDetailsResponse: state.countryDetails.countryDetailsResponse,
    deleteCountryDetailsResponse:
      state.countryDetails.deleteCountryDetailsResponse,
    pageRefreshingResponse: state.nonApiStore.pageRefreshingResponse
  };
}

export default connect(
  mapStateToProps,
  {
    countryDetails,
    deleteCountryDetails,
    pageRefreshing
  }
)(withRouter(CountryDetails));
