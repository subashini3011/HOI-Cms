import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import { pageRefreshing } from '../../redux/actions/nonApiActions';

import StatisticCardContainer from 'containers/statistic-card';

import BaggageInfoForm from 'components/forms/baggage-info-form';
import CommonTable from 'components/commonTable';
import Loading from 'components/loading';
import TableOperations from 'components/tableOperations';
import { message, Icon, Tag, Popconfirm } from 'components/ui';
import {
  getBaggageInfo,
  deleteBaggageInfo
} from '../../redux/actions/baggageInfoActions';

import './index.scss';

class BaggageInfo extends Component {
  constructor(props) {
    super(props);
    const { selectedAirport } = this.props;
    this.state = {
      isLoading: true,
      baggageInfoFields: [],
      selectedAirport,
      isAddBaggageInfoForm: false,
      columns: '',
      isAddBaggageInfoForm: false,
      isEditBaggageInfoForm: false,
      editRecordData: [],
      pageNumber: 1,
      offset: 6,
      searchKey: '',
      totalData: '',
      filterKeys: [
        'airline',
        'cabbin_height',
        'cabbin_length',
        'cabbin_number',
        'cabbin_weight',
        'cabbin_width',
        'checkin_height',
        'checkin_length',
        'checkin_total_length',
        'checkin_width',
        'max_weight_per_bag',
        'Action'
      ]
    };
  }

  componentDidMount() {
    const { getBaggageInfo, selectedAirport } = this.props;
    const baggageInfoPayload = {
      airport_code: selectedAirport,
      page_no: 1,
      offset: 6,
      search_key: ''
    };

    getBaggageInfo(baggageInfoPayload);
  }

  componentWillReceiveProps(nextProps) {
    const {
      deleteBaggageInfoResponse,
      pageRefreshingResponse,
      selectedAirport
    } = this.props;
    if (
      nextProps.getBaggageInfoResponse &&
      nextProps.getBaggageInfoResponse !== this.props.getBaggageInfoResponse
    ) {
      if (
        nextProps.getBaggageInfoResponse.error === 0 &&
        nextProps.getBaggageInfoResponse.content
      ) {
        // const data = nextProps.getBaggageInfoResponse.content.find(
        //   dataItem => dataItem.airport_code === this.state.selectedAirport
        // );

        this.handleTableData(nextProps.getBaggageInfoResponse.content);
      }
    }
    if (
      nextProps.deleteBaggageInfoResponse &&
      nextProps.deleteBaggageInfoResponse !== deleteBaggageInfoResponse
    ) {
      if (
        nextProps.deleteBaggageInfoResponse.error === 0 &&
        nextProps.deleteBaggageInfoResponse.message
      ) {
        message.success(nextProps.deleteBaggageInfoResponse.message);
        const { getBaggageInfo } = this.props;
        const baggageInfoPayload = {
          airport_code: selectedAirport,
          page_no: 1,
          offset: 6,
          search_key: ''
        };
        getBaggageInfo(baggageInfoPayload);
      } else {
        message.error(nextProps.deleteBaggageInfoResponse.message);
      }
    }

    if (
      nextProps.pageRefreshingResponse &&
      nextProps.pageRefreshingResponse !== pageRefreshingResponse
    ) {
      if (nextProps.pageRefreshingResponse.isLoading === true) {
        const filterKeys = [
          'airline',
          'cabbin_height',
          'cabbin_length',
          'cabbin_number',
          'cabbin_weight',
          'cabbin_width',
          'checkin_height',
          'checkin_length',
          'checkin_total_length',
          'checkin_width',
          'max_weight_per_bag',
          'Action'

          // 'airline',
          // 'airline_class',
          // 'airline_code',
          // 'airline_sub_class',
          // 'cabbin_height',
          // 'cabbin_length',
          // 'cabbin_number',
          // 'cabbin_weight',
          // 'cabbin_width',
          // 'checkin_height',
          // 'checkin_length',
          // 'checkin_number',
          // 'checkin_total_length',
          // 'checkin_weight',
          // 'checkin_width',
          // 'created_at',
          // 'deleted_at',
          // 'destination',
          // 'flight_type',
          // 'id',
          // 'max_weight_per_bag',
          // 'update_at',
          // 'Action'
        ];
        this.setState({
          isLoading: nextProps.pageRefreshingResponse.isLoading,

          filterKeys,
          isAddBaggageInfoForm: false,
          isEditBaggageInfoForm: false
        });

        const { getBaggageInfo, selectedAirport } = this.props;
        const baggageInfoPayload = {
          airport_code: selectedAirport,
          page_no: 1,
          offset: 6,
          search_key: ''
        };

        getBaggageInfo(baggageInfoPayload);
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
        totalData: content.total_item,
        isLoading: false
      });
    } else {
      this.setState({
        tableData: [],
        columns: [],
        totalData: content.total_item,
        isLoading: false
      });
    }
    this.props.pageRefreshing({ isLoading: false });
  };

  onApplyFilter = filterKeys => {
    this.setState({ filterKeys });
  };

  onAddNewClick = () => {
    this.setState({ isAddBaggageInfoForm: true });
  };

  handleEdit = (e, record) => {
    e.stopPropagation();
    this.setState({ isEditBaggageInfoForm: true, editRecordData: record });
  };

  handleDelete = (e, record) => {
    e.stopPropagation();
    const data = {
      baggage_id: record.id
    };
    this.props.deleteBaggageInfo(data);
    this.setState({ isLoading: true });
  };

  handleCancel = () => {
    this.setState({
      isAddBaggageInfoForm: false,
      isEditBaggageInfoForm: false
    });
  };

  toggleForm = () => {
    const { selectedAirport, offset, pageNumber, searchKey } = this.state;
    const { getBaggageInfo } = this.props;
    if (this.state.isEditBaggageInfoForm) {
      this.setState({ isEditBaggageInfoForm: false });
      const baggageInfoPayload = {
        airport_code: selectedAirport,
        page_no: pageNumber,
        offset,
        search_key: searchKey
      };
      getBaggageInfo(baggageInfoPayload);
    } else if (this.state.isAddBaggageInfoForm) {
      this.setState({
        isAddBaggageInfoForm: false
      });
      const baggageInfoPayload = {
        airport_code: selectedAirport,
        page_no: pageNumber,
        offset,
        search_key: searchKey
      };
      getBaggageInfo(baggageInfoPayload);
    }
  };

  onSearchChange = searchKey => {
    const { offset } = this.state;
    const { selectedAirport } = this.props;
    const { getBaggageInfo } = this.props;
    const baggageInfoPayload = {
      page_no: 1,
      offset,
      search_key: searchKey,
      airport_code: selectedAirport
    };

    this.setState({ searchKey, pageNumber: 1 });
    getBaggageInfo(baggageInfoPayload);
  };

  onOffsetChange = offset => {
    const { totalData, searchKey } = this.state;
    const { getBaggageInfo, selectedAirport } = this.props;
    let { pageNumber } = this.state;
    // checking the page number if it is greater than the number of pages
    if (pageNumber > Math.ceil(totalData / offset)) {
      pageNumber = Math.ceil(totalData / offset);
    }

    const baggageInfoPayload = {
      page_no: pageNumber,
      offset,
      search_key: searchKey,
      airport_code: selectedAirport
    };
    getBaggageInfo(baggageInfoPayload);

    this.setState({ pageNumber, offset });
  };

  onPageChange = pageNumber => {
    const { offset, searchKey } = this.state;
    const { getBaggageInfo, selectedAirport } = this.props;
    const baggageInfoPayload = {
      page_no: pageNumber,
      offset,
      search_key: searchKey,
      airport_code: selectedAirport
    };
    getBaggageInfo(baggageInfoPayload);
    this.setState({ pageNumber });
  };

  render() {
    const {
      isLoading,
      selectedAirport,
      columns,
      searchKey,
      filterKeys,
      baggageInfoFields,
      isAddBaggageInfoForm,
      isEditBaggageInfoForm,
      editRecordData
    } = this.state;
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {isAddBaggageInfoForm && (
          <BaggageInfoForm
            headerName="Add New Baggage Info"
            baggageInfoFields={baggageInfoFields}
            handleCancel={this.handleCancel}
            // userRoles={this.state.userRoles}
            toggleForm={this.toggleForm}
            toggleForm={this.toggleForm}
            selectedAirport={selectedAirport}
            isAddBaggageInfoForm
          />
        )}
        {isEditBaggageInfoForm && (
          <BaggageInfoForm
            headerName="Edit Baggage Info"
            editRecord={this.state.editRecord}
            editRecordData={editRecordData}
            handleCancel={this.handleCancel}
            toggleForm={this.toggleForm}
            selectedAirport={this.state.selectedAirport}
            isEditBaggageInfoForm
          />
        )}
        {!isLoading && !isAddBaggageInfoForm && !isEditBaggageInfoForm && (
          <React.Fragment>
            {/* <StatisticCardContainer selectedAirport={selectedAirport} /> */}
            <div className="baggageInfo">
              <TableOperations
                tablename="BaggageInfo"
                addButtonText="BaggageInfo"
                onAddNewClick={this.onAddNewClick}
                columns={columns}
                searchKey={searchKey}
                disableDownload
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

    getBaggageInfoResponse: state.baggageInfo.getBaggageInfoResponse,
    deleteBaggageInfoResponse: state.baggageInfo.deleteBaggageInfoResponse,
    pageRefreshingResponse: state.nonApiStore.pageRefreshingResponse
  };
}

export default connect(
  mapStateToProps,
  {
    getBaggageInfo,
    deleteBaggageInfo,
    pageRefreshing
  }
)(withRouter(BaggageInfo));
