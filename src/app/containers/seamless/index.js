import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import {
  seamless,
  deleteSeamless
} from '../../redux/actions/preferencesActions';
import { pageRefreshing } from '../../redux/actions/nonApiActions';
import Loading from 'components/loading';

import { Table, Tag, Icon, Popconfirm, message } from 'components/ui';
import AddNewRow from '../../components/tableOperations/add-new-button';
import SeamlessList from '../../components/seamless-list';
import SeamlessTypesModal from '../../components/modals/seamless-types-modal';

class Seamless extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      selectedSeamlessType: [],
      seamlessTypeTableData: [],
      editSeamlessTypeData: [],
      showModal: false,
      isEditSeamlessType: false,
      isAddSeamlessType: false,
      seamlessTypecolumns: [
        {
          title: 'Category',
          dataIndex: 'category'
        },
        // {
        //   title: 'Type',
        //   dataIndex: 'type'
        // },
        {
          title: 'Action',
          dataIndex: 'Action',
          width: '13rem',
          render: (text, record) => (
            <span className="seamless__table-actions u_no_wrap">
              <Tag
                color="geekblue"
                style={{ marginRight: '1rem' }}
                onClick={e => {
                  this.handleEditModal(e, record);
                }}
                className="u_cursor_pointer"
              >
                Edit
              </Tag>
              <div onClick={e => e.stopPropagation()}>
                <Popconfirm
                  placement="topRight"
                  title="Are you sure delete this record?"
                  icon={
                    <Icon type="exclamation-circle" style={{ color: 'red' }} />
                  }
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
              </div>
            </span>
          )
        }
      ]
    };
  }

  componentDidMount = () => {
    const { seamless } = this.props;
    seamless();
  };

  componentWillReceiveProps = nextProps => {
    const {
      seamless,
      seamlessResponse,
      pageRefreshingResponse,
      deleteSeamlessResponse,
      selectedAirport
    } = this.props;
    if (
      nextProps.seamlessResponse &&
      nextProps.seamlessResponse !== seamlessResponse
    ) {
      if (
        nextProps.seamlessResponse.error === 0 &&
        nextProps.seamlessResponse.content
      ) {
        this.handleTableData(nextProps.seamlessResponse.content[0].categories);
      }
    }

    if (
      nextProps.deleteSeamlessResponse &&
      nextProps.deleteSeamlessResponse !== deleteSeamlessResponse
    ) {
      if (
        nextProps.deleteSeamlessResponse.error === 0 &&
        nextProps.deleteSeamlessResponse.message
      ) {
        message.success(nextProps.deleteSeamlessResponse.message);
        seamless();
      } else {
        message.error(nextProps.deleteSeamlessResponse.message);
      }
    }
    if (
      nextProps.pageRefreshingResponse &&
      nextProps.pageRefreshingResponse !== pageRefreshingResponse
    ) {
      if (nextProps.pageRefreshingResponse.isLoading === true) {
        this.setState({
          isLoading: nextProps.pageRefreshingResponse.isLoading
        });
        if (selectedAirport) {
          const data = {
            city_code: selectedAirport
          };
          seamless(data);
        }
      }
    }
  };

  handleTableData = data => {
    const seamlessTypeTableData = data;
    const { selectedSeamlessType } = this.state;
    const { pageRefreshing } = this.props;
    let highlightSeamlessType = '';
    if (data.length > 0) {
      highlightSeamlessType = data[0];
      if (selectedSeamlessType && selectedSeamlessType.id) {
        highlightSeamlessType = data.find(
          item => item.id === selectedSeamlessType.id
        );
      }
    }
    this.setState({
      seamlessTypeTableData,
      selectedSeamlessType: highlightSeamlessType,
      isLoading: false
    });
    pageRefreshing({ isLoading: false });
  };

  selectRow = (e, record) => {
    e.stopPropagation();
    const { seamlessTypeTableData } = this.state;
    let { selectedSeamlessType } = this.state;

    let data = seamlessTypeTableData[0];
    if (record) {
      // data = seamlessTypeTableData.find(
      //   item => item.contact_id === record.contact_id
      // );
      selectedSeamlessType = record;
    }
    this.setState({
      selectedSeamlessType,
      isAddSeamlessType: false,
      isEditSeamlessType: false
    });
  };

  setRowClassName = record => {
    const { selectedSeamlessType, seamlessTypeTableData } = this.state;
    if (record && record.category_id) {
      if (selectedSeamlessType && selectedSeamlessType.category_id) {
        return record.category_id === selectedSeamlessType.category_id
          ? 'seamless__selected-row'
          : '';
      }
      return record.category_id === seamlessTypeTableData[0].category_id
        ? 'seamless__selected-row'
        : '';
    }
  };

  handleShowModal = () => {
    this.setState({
      showModal: true,
      isAddSeamlessType: true,
      isEditSeamlessType: false
    });
  };
  // handleCancelModal =()= {

  // }

  handleEditModal = (e, record) => {
    e.stopPropagation();
    // const {isAddCategory,isEditCategory} = this.state;
    this.setState({
      showModal: true,
      isAddSeamlessType: false,
      isEditSeamlessType: true,
      editSeamlessTypeData: record
    });
  };

  handleDelete = (e, record) => {
    const { selectedSeamlessType, seamlessTypeTableData } = this.state;
    const { deleteSeamless } = this.props;
    e.stopPropagation();
    const data = {
      seamless_id: record.category_id
    };
    if (record.category_id === selectedSeamlessType.id) {
      this.setState({
        selectedSeamlessType: seamlessTypeTableData[0],
        isLoading: true
      });
    } else {
      this.setState({ isLoading: true });
    }
    deleteSeamless(data);
  };

  toggleForm = closeModal => {
    const { isAddSeamlessType, isEditSeamlessType } = this.state;
    const { seamless, selectedAirport } = this.props;
    if (closeModal) {
      this.setState({
        isAddSeamlessType: false,
        isEditSeamlessType: false
      });
    } else if (isAddSeamlessType) {
      if (selectedAirport) {
        const data = {
          city_code: selectedAirport
        };
        seamless(data);
      }
      this.setState({
        isAddSeamlessType: false,
        isEditSeamlessType: false,
        isLoading: true
      });
    } else if (isEditSeamlessType) {
      if (selectedAirport) {
        const data = {
          city_code: selectedAirport
        };
        seamless(data);
      }

      this.setState({
        isEditSeamlessType: false,
        isAddSeamlessType: false,
        isLoading: true
      });
    }
  };

  getUpdatedTabledata = () => {
    const { seamless, selectedAirport } = this.props;
    this.setState({ isLoading: true });
    seamless();
  };

  render() {
    const {
      isLoading,
      seamlessTypeTableData,
      seamlessTypecolumns,
      selectedSeamlessType,
      showModal,
      isAddSeamlessType,
      isEditSeamlessType,
      editSeamlessTypeData
    } = this.state;
    const { selectedAirport } = this.props;
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {showModal && isAddSeamlessType && (
          <SeamlessTypesModal
            showModal={showModal}
            selectedAirport={selectedAirport}
            isAddSeamlessType
            toggleForm={this.toggleForm}
          />
        )}
        {showModal && isEditSeamlessType && (
          <SeamlessTypesModal
            showModal={showModal}
            selectedAirport={selectedAirport}
            editSeamlessTypeData={editSeamlessTypeData}
            isEditSeamlessType
            toggleForm={this.toggleForm}
          />
        )}
        {!isLoading && (
          <div className="seamless__wrapper">
            <div className="seamless__left-table">
              <div className="seamless__header">
                <p className="seamless__title">Seamless Types</p>
                <AddNewRow
                  addButtonText="Seamless Type"
                  onAddNewClick={this.handleShowModal}
                />
              </div>
              <Table
                className="seamless__table"
                columns={seamlessTypecolumns}
                dataSource={seamlessTypeTableData}
                pagination={false}
                onRow={record => ({
                  onClick: e => {
                    this.selectRow(e, record);
                  }
                })}
                rowClassName={record => this.setRowClassName(record)}
              />
            </div>
            <div className="seamless__right-table">
              {/* {selectedSeamlessType ? ( */}
              <SeamlessList
                selectedSeamlessType={selectedSeamlessType}
                getUpdatedTabledata={this.getUpdatedTabledata}
              />
              {/* ) : (
                <Table />
              )} */}
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
    seamlessResponse: state.preferences.seamlessResponse,
    deleteSeamlessResponse: state.preferences.deleteSeamlessResponse,
    pageRefreshingResponse: state.nonApiStore.pageRefreshingResponse
  };
}

export default connect(
  mapStateToProps,
  {
    seamless,
    pageRefreshing,
    deleteSeamless
  }
)(withRouter(Seamless));
