import './index.scss';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

// actions

import moment from 'moment';

// containers
import TableOperations from 'components/tableOperations';

// components
import NewUserForm from 'components/forms/new-user-form';
import CommonTable from 'components/commonTable';
import Loading from 'components/loading';
import EditButton from 'components/buttons/edit-button';
import { message, Icon, Tag, Popconfirm } from 'components/ui';

import { DOWNLOAD_USERS } from 'constants/api-constants';
import { pageRefreshing } from '../../redux/actions/nonApiActions';
import {
  getUser,
  deleteUser,
  downloadUsers
} from '../../redux/actions/userActions';
import * as User from '../../shared/app-data/user';

class CMSUsers extends Component {
  constructor(props) {
    super(props);
    const { selectedAirport } = this.props;
    this.state = {
      userFields: [],
      userInfo: [],
      isLoading: true,
      isAddUserForm: false,
      isEditUserForm: false,
      pageNumber: 1,
      offset: 6,
      searchKey: '',
      tableData: [],
      editRecord: [],
      selectedAirport,
      columns: [],
      filterKeys: [
        'first_name',
        'last_name',
        'email',
        'role',
        'status',
        'Action'
      ]
    };
  }

  componentDidMount() {
    let { userInfo } = this.state;
    const { getUser } = this.props;

    userInfo = User.getUserData();
    const getUserPayload = {
      page_no: 1,
      offset: 6,
      search_key: '',
      role: userInfo.role,
      user_id: userInfo.id
    };
    getUser(getUserPayload);
    this.setState({ userInfo });
  }

  componentWillReceiveProps(nextProps) {
    const { pageNumber, offset, searchKey } = this.state;
    const {
      getUserResponse,
      getUser,
      deleteUserResponse,
      pageRefreshingResponse
    } = this.props;
    if (
      nextProps.getUserResponse &&
      nextProps.getUserResponse !== getUserResponse
    ) {
      if (
        nextProps.getUserResponse.error === 0 &&
        nextProps.getUserResponse.content
      ) {
        this.handleTableData(nextProps.getUserResponse.content);
      }
    }

    if (
      nextProps.deleteUserResponse &&
      nextProps.deleteUserResponse !== deleteUserResponse
    ) {
      if (
        nextProps.deleteUserResponse.error === 0 &&
        nextProps.deleteUserResponse.message
      ) {
        const { userInfo } = this.state;
        message.success(nextProps.deleteUserResponse.message);
        const data = {
          page_no: pageNumber,
          offset,
          search_key: searchKey,
          role: userInfo.role,
          user_id: userInfo.id
        };
        getUser(data);
      } else {
        message.error(nextProps.deleteUserResponse.message);
        this.setState({ isLoading: false });
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
          search_key: '',
          role: userInfo.role,
          user_id: userInfo.id
        };
        const filterKeys = [
          'first_name',
          'last_name',
          'email',
          'role',
          'status',
          'Action'
        ];
        this.setState({
          isLoading: nextProps.pageRefreshingResponse.isLoading,
          pageNumber: 1,
          offset: 6,
          searchKey: '',
          filterKeys,
          isAddUserForm: false,
          isEditUserForm: false
        });

        getUser(data);
        // this.props.getRoles();
      }
    }
  }

  handleTableData = data => {
    const dynamicColumns = [];
    const tableData = data.Users;
    const { pageRefreshing } = this.props;
    if (data.Users.length > 0) {
      dynamicColumns.push(
        Object.getOwnPropertyNames(data.Users[0]).map(item => {
          let header = [];
          if (item === 'profile_pic') {
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
        columns: dynamicColumns[0],
        tableData,
        totalData: data.total_items,
        isLoading: false
      });
    } else {
      this.setState({
        tableData: [],
        totalData: data.total_items,
        columns: [],
        isLoading: false
      });
    }
    pageRefreshing({ isLoading: false });
  };

  toggleForm = () => {
    const {
      userInfo,
      searchKey,
      isEditUserForm,
      isAddUserForm,
      pageNumber,
      offset
    } = this.state;
    const { getUser } = this.props;
    if (isEditUserForm) {
      const data = {
        page_no: pageNumber,
        offset,
        search_key: searchKey,
        role: userInfo.role,
        user_id: userInfo.id
      };
      this.setState({ isEditUserForm: false });
      getUser(data);
    } else if (isAddUserForm) {
      const data = {
        page_no: 1,
        offset: 6,
        search_key: '',
        role: userInfo.role,
        user_id: userInfo.id
      };
      this.setState({
        isAddUserForm: false,
        pageNumber: 1,
        offset: 6,
        searchKey: ''
      });
      getUser(data);
    }
  };

  onAddNewClick = () => {
    // this.props.getUserFields();
    this.setState({ isAddUserForm: true });
  };

  onDownloadClick = () => {
    const { downloadUsers } = this.props;
    const data = {
      user_id: User.getUserId(),
      role: User.getUserRole()
    };
    downloadUsers(data);
  };

  handleCancel = () => {
    this.setState({ isAddUserForm: false, isEditUserForm: false });
  };

  handleEdit = (e, record) => {
    e.stopPropagation();
    const { selectedAirport } = this.state;
    let role;
    let logInUserId;
    const userInfo = User.getUserData();
    if (userInfo && userInfo.id) {
      role = User.getUserRole();
      logInUserId = userInfo.id;
    }
    const data = {
      airport_code: selectedAirport,
      id: record.id,
      role,
      logIn_user_id: logInUserId
    };
    this.setState({ isEditUserForm: true, editRecordData: data });
  };

  handleDelete = (e, record) => {
    const { deleteUser } = this.props;
    e.stopPropagation();
    const data = {
      // user_info: {
      user_id: record.id
      // }
    };
    deleteUser(data);
    this.setState({ isLoading: true });
  };

  onApplyFilter = filterKeys => {
    this.setState({ filterKeys });
  };

  onSearchChange = searchKey => {
    const { userInfo, offset } = this.state;
    const { getUser } = this.props;
    const data = {
      page_no: 1,
      offset,
      search_key: searchKey,
      role: userInfo.role,
      user_id: userInfo.id
    };
    this.setState({ searchKey, pageNumber: 1 });
    getUser(data);
  };

  onOffsetChange = offset => {
    const { userInfo, totalData, searchKey } = this.state;
    const { getUser } = this.props;
    let { pageNumber } = this.state;
    // checking the page number if it is greater than the number of pages
    if (pageNumber > Math.ceil(totalData / offset)) {
      pageNumber = Math.ceil(totalData / offset);
    }

    const data = {
      page_no: pageNumber,
      offset,
      search_key: searchKey,
      role: userInfo.role,
      user_id: userInfo.id
    };

    this.setState({ pageNumber, offset });
    getUser(data);
  };

  onPageChange = pageNumber => {
    const { userInfo, offset, searchKey } = this.state;
    const { getUser } = this.props;
    const data = {
      page_no: pageNumber,
      offset,
      search_key: searchKey,
      role: userInfo.role,
      user_id: userInfo.id
    };

    this.setState({ pageNumber });
    getUser(data);
  };

  render() {
    const {
      isAddUserForm,
      isEditUserForm,
      isLoading,
      userFields,
      editRecordData,
      selectedAirport,
      editRecord,
      columns,
      searchKey,
      filterKeys,
      totalData,
      tableData,
      offset,
      pageNumber
    } = this.state;
    const { statisticCardData } = this.props;
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {isAddUserForm && (
          <NewUserForm
            headerName="Add New User"
            userFields={userFields}
            handleCancel={this.handleCancel}
            toggleForm={this.toggleForm}
            selectedAirport={selectedAirport}
            isAddUserForm
          />
        )}
        {isEditUserForm && (
          <NewUserForm
            headerName="Edit User"
            editRecord={editRecord}
            editRecordData={editRecordData}
            handleCancel={this.handleCancel}
            toggleForm={this.toggleForm}
            selectedAirport={selectedAirport}
            isEditUserForm
          />
        )}
        {!isEditUserForm && !isAddUserForm && !isLoading && (
          <React.Fragment>
            <div className="cmsusers">
              <div className="cmsusers__table">
                <TableOperations
                  tablename="CMS Users"
                  addButtonText="CMS User"
                  onAddNewClick={this.onAddNewClick}
                  onDownloadClick={this.onDownloadClick}
                  columns={columns}
                  searchKey={searchKey}
                  onSearchChange={this.onSearchChange}
                  downloadUrl={DOWNLOAD_USERS}
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
    getUserResponse: state.users.getUserResponse,
    deleteUserResponse: state.users.deleteUserResponse,
    downloadUsersResponse: state.users.downloadUsersResponse,
    pageRefreshingResponse: state.nonApiStore.pageRefreshingResponse
  };
}

export default connect(
  mapStateToProps,
  {
    getUser,
    deleteUser,
    pageRefreshing,
    downloadUsers
  }
)(withRouter(CMSUsers));

// CMSUsers.propTypes = {
//   selectedAirport: PropTypes.string.isRequired,
//   getUserResponse: PropTypes.arrayOf(PropTypes.any),
//   deleteUserResponse: PropTypes.arrayOf(PropTypes.any),
//   pageRefreshingResponse: PropTypes.arrayOf(PropTypes.any),
//   downloadUsers: PropTypes.func.isRequired,
//   pageRefreshing: PropTypes.func.isRequired,
//   getUser: PropTypes.func.isRequired,
//   deleteUser: PropTypes.func.isRequired
// };

// CMSUsers.defaultProps = {
//   getUserResponse: [],
//   deleteUserResponse: [],
//   pageRefreshingResponse: []
// };
