import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import { pageRefreshing } from '../../redux/actions/nonApiActions';

import EtaTripForm from 'components/forms/eta-trip-form';
import CommonTable from 'components/commonTable';
import Loading from 'components/loading';
import TableOperations from 'components/tableOperations';
import { message, Icon, Tag, Popconfirm } from 'components/ui';
import { etaTrip, deleteEtaTrip } from '../../redux/actions/etaTripActions';

import './index.scss';

class EtaTrip extends Component {
  constructor(props) {
    super(props);
    const { selectedAirport } = this.props;
    this.state = {
      isLoading: true,
      etaTripFields: [],
      selectedAirport,
      isAddEtaTripForm: false,
      columns: '',
      searchKey: '',
      isAddEtaTripForm: false,
      isEditEtaTripForm: false,
      editRecordData: [],
      filterKeys: [
        'airport code',
        'duration',
        'id',
        'name',
        'terminal',
        'terminal side',
        'type',
        'Action'
      ]
    };
  }

  componentDidMount() {
    const { etaTrip, selectedAirport } = this.props;
    const etaTripPayload = {
      airport_code: selectedAirport
    };

    etaTrip(etaTripPayload);
  }

  componentWillReceiveProps(nextProps) {
    const {
      deleteEtaTripResponse,
      pageRefreshingResponse,
      selectedAirport
    } = this.props;
    if (
      nextProps.etaTripResponse &&
      nextProps.etaTripResponse !== this.props.etaTripResponse
    ) {
      if (
        nextProps.etaTripResponse.error === 0 &&
        nextProps.etaTripResponse.content
      ) {
        this.handleTableData(nextProps.etaTripResponse.content.data);
      }
    }
    if (
      nextProps.deleteEtaTripResponse &&
      nextProps.deleteEtaTripResponse !== deleteEtaTripResponse
    ) {
      if (
        nextProps.deleteEtaTripResponse.error === 0 &&
        nextProps.deleteEtaTripResponse.message
      ) {
        message.success(nextProps.deleteEtaTripResponse.message);
        const { etaTrip } = this.props;

        const etaTripPayload = {
          airport_code: selectedAirport
        };

        etaTrip(etaTripPayload);
      } else {
        message.error(nextProps.deleteEtaTripResponse.message);
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
          'airport code',
          'duration',
          'id',
          'name',
          'terminal',
          'terminal side',
          'type',
          'Action'
        ];
        this.setState({
          isLoading: nextProps.pageRefreshingResponse.isLoading,

          filterKeys,
          isAddEtaTripForm: false,
          isEditEtaTripForm: false
        });

        const { etaTrip, selectedAirport } = this.props;
        const etaTripPayload = {
          airport_code: selectedAirport
        };

        etaTrip(etaTripPayload);
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
    this.setState({ isAddEtaTripForm: true });
  };

  handleEdit = (e, record) => {
    e.stopPropagation();
    this.setState({ isEditEtaTripForm: true, editRecordData: record });
  };

  handleDelete = (e, record) => {
    e.stopPropagation();
    const { selectedAirport } = this.props;
    const data = {
      airport_code: selectedAirport
    };
    this.props.deleteEtaTrip(data);
    this.setState({ isLoading: true });
  };

  handleCancel = () => {
    this.setState({
      isAddEtaTripForm: false,
      isEditEtaTripForm: false
    });
  };

  toggleForm = () => {
    const { selectedAirport } = this.state;
    const { etaTrip } = this.props;
    if (this.state.isEditEtaTripForm) {
      this.setState({ isEditEtaTripForm: false });
      const etaTripPayload = {
        airport_code: selectedAirport
      };
      etaTrip(etaTripPayload);
    } else if (this.state.isAddEtaTripForm) {
      this.setState({
        isAddEtaTripForm: false
      });
      const etaTripPayload = {
        airport_code: selectedAirport
      };
      etaTrip(etaTripPayload);
    }
  };

  render() {
    const {
      isLoading,
      selectedAirport,
      columns,
      searchKey,
      filterKeys,
      etaTripFields,
      isAddEtaTripForm,
      isEditEtaTripForm,
      editRecordData
    } = this.state;
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {isAddEtaTripForm && (
          <EtaTripForm
            headerName="Add New ETA Trip"
            etaTripFields={etaTripFields}
            handleCancel={this.handleCancel}
            // userRoles={this.state.userRoles}
            toggleForm={this.toggleForm}
            toggleForm={this.toggleForm}
            selectedAirport={selectedAirport}
            isAddEtaTripForm
          />
        )}
        {isEditEtaTripForm && (
          <EtaTripForm
            headerName="Edit ETA Trip"
            editRecord={this.state.editRecord}
            editRecordData={editRecordData}
            handleCancel={this.handleCancel}
            toggleForm={this.toggleForm}
            selectedAirport={this.state.selectedAirport}
            isEditEtaTripForm
          />
        )}
        {!isLoading && !isAddEtaTripForm && !isEditEtaTripForm && (
          <React.Fragment>
            {/* <StatisticCardContainer selectedAirport={selectedAirport} /> */}
            <div className="u_table-container">
              <TableOperations
                tablename="ETA Trip"
                addButtonText="ETA Trip"
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

    etaTripResponse: state.etaTrip.etaTripResponse,
    deleteEtaTripResponse: state.etaTrip.deleteEtaTripResponse,
    pageRefreshingResponse: state.nonApiStore.pageRefreshingResponse
  };
}

export default connect(
  mapStateToProps,
  {
    etaTrip,
    deleteEtaTrip,
    pageRefreshing
  }
)(withRouter(EtaTrip));
