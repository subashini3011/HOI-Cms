import './index.scss';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// actions

// containers
import TableOperations from 'components/tableOperations';
import StatisticCardContainer from 'containers/statistic-card';

// components
import CommonTable from 'components/commonTable';
import OuteletForm from 'components/forms/outlet-form';
import Loading from 'components/loading';
import { message, Tag, Popconfirm, Icon } from 'components/ui';

import { DOWNLOAD_OUTLETS } from 'constants/api-constants';
import defaultImage from 'images/default-airport-image.png';
import { pageRefreshing } from '../../redux/actions/nonApiActions';
import { getOutlets, deleteOutlets } from '../../redux/actions/outletsActions';

class DynamicCategoryList extends Component {
  constructor(props) {
    super(props);
    const { selectedCategory } = this.props;
    this.state = {
      isLoading: true,
      isShowAddOutletForm: false,
      isShowOutletEditForm: false,
      pageNumber: 1,
      offset: 6,
      tableData: [],
      terminalsData: [],
      subCategoryData: [],
      editRecordData: [],
      search_key: '',
      downloadUrl: `${DOWNLOAD_OUTLETS}id=${selectedCategory}&name=${this.props.selectedAirport}`,
      selectedAirport: this.props.selectedAirport,
      selectedCategoryName: '',
      columns: [],

      filterKeys: [
        'name',
        'retailer_name',
        'terminal',
        'terminal_side',
        'store_logo',
        'Action'
      ]
    };
  }

  componentDidMount() {
    const { selectedCategory } = this.props;
    const data = {
      airport_name: this.state.selectedAirport,
      category_id: selectedCategory,
      sub_category_id: '',
      page_no: 1,
      offset: 6,
      search_key: ''
    };
    this.props.getOutlets(data);
  }

  componentWillReceiveProps(nextProps) {
    const { selectedCategory } = this.props;
    if (
      nextProps.getOutletsResponse &&
      nextProps.getOutletsResponse !== this.props.getOutletsResponse
    ) {
      if (
        nextProps.getOutletsResponse.error === 0 &&
        nextProps.getOutletsResponse.content &&
        nextProps.getOutletsResponse.content.category_id ===
          Number(selectedCategory)
      ) {
        this.handleTableData(nextProps.getOutletsResponse.content);
      }
    }

    if (
      nextProps.pageRefreshingResponse &&
      nextProps.pageRefreshingResponse !== this.props.pageRefreshingResponse
    ) {
      if (nextProps.pageRefreshingResponse.isLoading === true) {
        const data = {
          airport_name: this.state.selectedAirport,
          category_id: selectedCategory,
          sub_category_id: '',
          page_no: 1,
          offset: 6,
          search_key: ''
        };
        const filterKeys = [
          'name',
          'retailer_name',
          'terminal',
          'terminal_side',
          'store_logo',
          'Action'
        ];
        this.setState({
          isLoading: nextProps.pageRefreshingResponse.isLoading,
          pageNumber: 1,
          offset: 6,
          search_key: '',
          filterKeys,
          isShowAddOutletForm: false,
          isShowOutletEditForm: false
        });
        this.props.getOutlets(data);
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
          sub_category_id: '',
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
    const dynamicColumns = [];
    if (data.store.length > 0) {
      dynamicColumns.push(
        Object.getOwnPropertyNames(data.store[0]).map(item => {
          let header = [];
          if (item === 'store_logo') {
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
                  alt="store_logo"
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
      let actions = {
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
        columns: dynamicColumns[0],
        tableData: data.store,
        selectedCategoryName: data.name,
        totalData: data.total_items,
        isLoading: false
      });
    } else {
      this.setState({
        isLoading: false,
        columns: [],
        tableData: data.store,
        selectedCategoryName: data.name,
        totalData: data.total_items
      });
    }
    this.props.pageRefreshing({ isLoading: false });
  };

  toggleForm = () => {
    const { selectedCategory } = this.props;
    const {
      isShowAddOutletForm,
      isShowOutletEditForm,
      selectedAirport,
      pageNumber,
      offset,
      search_key
    } = this.state;
    if (isShowAddOutletForm) {
      const data = {
        airport_name: this.state.selectedAirport,
        category_id: selectedCategory,
        sub_category_id: '',
        page_no: 1,
        offset: 6,
        search_key: ''
      };
      this.setState({
        isShowAddOutletForm: false,
        pageNumber: 1,
        offset: 6,
        search_key: ''
      });
      this.props.getOutlets(data);
    } else if (isShowOutletEditForm) {
      const data = {
        airport_name: selectedAirport,
        category_id: selectedCategory,
        sub_category_id: '',
        page_no: pageNumber,
        offset,
        search_key
      };
      this.setState({ isShowOutletEditForm: false });
      this.props.getOutlets(data);
    }
  };

  onAddNewClick = () => {
    const { selectedCategory } = this.props;
    // const fieldPayload = {
    //   airport_code: this.state.selectedAirport,
    //   category: selectedCategory
    // };
    // this.props.getStoreFields(fieldPayload);
    this.setState({ isShowAddOutletForm: true });
  };

  handleEdit = (e, record) => {
    e.stopPropagation();
    const { selectedCategory } = this.props;
    const data = {
      airport_code: this.state.selectedAirport,
      store_id: record.store_id,
      location_id: record.location_id,
      category_id: selectedCategory
    };
    this.setState({ isShowOutletEditForm: true, editRecordData: data });
  };

  handleDelete = (e, record) => {
    e.stopPropagation();
    const data = {
      store_id: record.store_id,
      location_id: record.location_id
    };
    this.props.deleteOutlets(data);
  };

  handleCancel = () => {
    this.setState({ isShowAddOutletForm: false, isShowOutletEditForm: false });
  };

  onApplyFilter = filterKeys => {
    this.setState({ filterKeys });
  };

  onSearchChange = search_key => {
    const { selectedCategory } = this.props;
    const data = {
      airport_name: this.state.selectedAirport,
      category_id: selectedCategory,
      sub_category_id: '',
      page_no: 1,
      offset: this.state.offset,
      search_key
    };
    this.setState({ search_key, pageNumber: 1 });
    this.props.getOutlets(data);
  };

  onOffsetChange = offset => {
    const { selectedCategory } = this.props;
    // checking the page number if it is greater than the number of pages
    if (this.state.pageNumber > Math.ceil(this.state.totalData / offset)) {
      var pageNumber = Math.ceil(this.state.totalData / offset);
    }
    const data = {
      airport_name: this.state.selectedAirport,
      category_id: selectedCategory,
      sub_category_id: '',
      page_no: pageNumber,
      offset,
      search_key: this.state.search_key
    };

    this.setState({ pageNumber, offset });
    this.props.getOutlets(data);
  };

  onPageChange = pageNumber => {
    const { selectedCategory } = this.props;
    const data = {
      airport_name: this.state.selectedAirport,
      category_id: selectedCategory,
      sub_category_id: '',
      page_no: pageNumber,
      offset: this.state.offset,
      search_key: this.state.search_key
    };

    this.setState({ pageNumber });
    this.props.getOutlets(data);
  };

  render() {
    const { selectedAirport } = this.state;
    const { selectedCategory } = this.props;
    const {
      isShowAddOutletForm,
      isLoading,
      selectedCategoryName,
      isShowOutletEditForm,
      editRecordData
    } = this.state;
    return (
      <div>
        {isLoading && <Loading />}
        {isShowAddOutletForm && (
          <OuteletForm
            headerName={`Add New ${selectedCategoryName}`}
            handleCancel={this.handleCancel}
            selectedCategory={selectedCategory}
            selectedAirport={this.state.selectedAirport}
            toggleForm={this.toggleForm}
            // storeFields={storeFields}
            isShowAddOutletForm
            isShowBulkUpload
          />
        )}
        {isShowOutletEditForm && (
          <OuteletForm
            headerName={`Edit ${selectedCategoryName}`}
            handleCancel={this.handleCancel}
            selectedCategory={selectedCategory}
            selectedAirport={selectedAirport}
            toggleForm={this.toggleForm}
            // storeFields={storeFields}
            isShowOutletEditForm
            isShowBulkUpload={false}
            editRecordData={editRecordData}
          />
        )}
        {!isLoading && !isShowAddOutletForm && !isShowOutletEditForm && (
          <div>
            {/* <StatisticCardContainer
              selectedAirport={this.state.selectedAirport}
            /> */}
            <div className="facilites">
              <div className="facilites__table">
                <TableOperations
                  tablename={selectedCategoryName}
                  addButtonText={selectedCategoryName}
                  columns={this.state.columns}
                  onAddNewClick={this.onAddNewClick}
                  searchKey={this.state.search_key}
                  onSearchChange={this.onSearchChange}
                  downloadUrl={this.state.downloadUrl}
                  filterKeys={this.state.filterKeys}
                  onApplyFilter={this.onApplyFilter}
                  tableData={this.state.tableData}
                />
                <CommonTable
                  columns={this.state.columns}
                  dataSource={this.state.tableData}
                  totalData={this.state.totalData}
                  offset={this.state.offset}
                  onPageChange={this.onPageChange}
                  onOffsetChange={this.onOffsetChange}
                  pageNumber={this.state.pageNumber}
                  filterKeys={this.state.filterKeys}
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
    getOutletsResponse: state.outlets.getOutletsResponse,
    pageRefreshingResponse: state.nonApiStore.pageRefreshingResponse,
    deleteOutletsResponse: state.outlets.deleteOutletsResponse
  };
}

export default connect(
  mapStateToProps,
  {
    getOutlets,
    pageRefreshing,
    deleteOutlets
  }
)(withRouter(DynamicCategoryList));
