import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import {
  exciting,
  deleteExciting
} from '../../redux/actions/preferencesActions';
import { pageRefreshing } from '../../redux/actions/nonApiActions';
import Loading from 'components/loading';

import { Table, Tag, Icon, Popconfirm, message } from 'components/ui';
import AddNewRow from '../../components/tableOperations/add-new-button';
import ExcitingList from '../../components/exciting-list';
import ExcitingTypesModal from '../../components/modals/exciting-types-modal';

class Exciting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      selectedExcitingType: [],
      excitingTypeTableData: [],
      editExcitingTypeData: [],
      showModal: false,
      isEditExcitingType: false,
      isAddExcitingType: false,
      excitingTypecolumns: [
        {
          title: 'Category',
          dataIndex: 'category'
        },
        {
          title: 'Action',
          dataIndex: 'Action',
          width: '13rem',
          render: (text, record) => (
            <span className="exciting__table-actions u_no_wrap">
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
    const { exciting } = this.props;
    exciting();
  };

  componentWillReceiveProps = nextProps => {
    const {
      exciting,
      excitingResponse,
      pageRefreshingResponse,
      deleteExcitingResponse,
      selectedAirport
    } = this.props;
    if (
      nextProps.excitingResponse &&
      nextProps.excitingResponse !== excitingResponse
    ) {
      if (
        nextProps.excitingResponse.error === 0 &&
        nextProps.excitingResponse.content
      ) {
        this.handleTableData(nextProps.excitingResponse.content[0].categories);
      }
    }

    if (
      nextProps.deleteExcitingResponse &&
      nextProps.deleteExcitingResponse !== deleteExcitingResponse
    ) {
      if (
        nextProps.deleteExcitingResponse.error === 0 &&
        nextProps.deleteExcitingResponse.message
      ) {
        message.success(nextProps.deleteExcitingResponse.message);
        exciting();
      } else {
        message.error(nextProps.deleteExcitingResponse.message);
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
          exciting(data);
        }
      }
    }
  };

  handleTableData = data => {
    const excitingTypeTableData = data;
    const { selectedExcitingType } = this.state;
    const { pageRefreshing } = this.props;
    let highlightExcitingType = '';
    if (data.length > 0) {
      highlightExcitingType = data[0];
      if (selectedExcitingType && selectedExcitingType.id) {
        highlightExcitingType = data.find(
          item => item.id === selectedExcitingType.id
        );
      }
    }
    this.setState({
      excitingTypeTableData,
      selectedExcitingType: highlightExcitingType,
      isLoading: false
    });
    pageRefreshing({ isLoading: false });
  };

  selectRow = (e, record) => {
    e.stopPropagation();
    const { excitingTypeTableData } = this.state;
    let { selectedExcitingType } = this.state;

    let data = excitingTypeTableData[0];
    if (record) {
      // data = excitingTypeTableData.find(
      //   item => item.contact_id === record.contact_id
      // );
      selectedExcitingType = record;
    }
    this.setState({
      selectedExcitingType,
      isAddExcitingType: false,
      isEditExcitingType: false
    });
  };

  setRowClassName = record => {
    const { selectedExcitingType, excitingTypeTableData } = this.state;
    if (record && record.category_id) {
      if (selectedExcitingType && selectedExcitingType.category_id) {
        return record.category_id === selectedExcitingType.category_id
          ? 'exciting__selected-row'
          : '';
      }
      return record.category_id === excitingTypeTableData[0].category_id
        ? 'exciting__selected-row'
        : '';
    }
  };

  handleShowModal = () => {
    this.setState({
      showModal: true,
      isAddExcitingType: true,
      isEditExcitingType: false
    });
  };

  handleEditModal = (e, record) => {
    e.stopPropagation();
    // const {isAddCategory,isEditCategory} = this.state;
    this.setState({
      showModal: true,
      isAddExcitingType: false,
      isEditExcitingType: true,
      editExcitingTypeData: record
    });
  };

  handleDelete = (e, record) => {
    const { selectedExcitingType, excitingTypeTableData } = this.state;
    const { deleteExciting } = this.props;
    e.stopPropagation();
    const data = {
      exciting_id: record.category_id
    };
    if (record.category_id === selectedExcitingType.id) {
      this.setState({
        selectedExcitingType: excitingTypeTableData[0],
        isLoading: true
      });
    } else {
      this.setState({ isLoading: true });
    }
    deleteExciting(data);
  };

  toggleForm = () => {
    const { isAddExcitingType, isEditExcitingType } = this.state;
    const { exciting, selectedAirport } = this.props;

    if (isAddExcitingType) {
      if (selectedAirport) {
        const data = {
          city_code: selectedAirport
        };
        exciting(data);
      }
      this.setState({
        isAddExcitingType: false,
        isEditExcitingType: false,
        isLoading: true
      });
    } else if (isEditExcitingType) {
      if (selectedAirport) {
        const data = {
          city_code: selectedAirport
        };
        exciting(data);
      }

      this.setState({
        isEditExcitingType: false,
        isAddExcitingType: false,
        isLoading: true
      });
    }
  };

  getUpdatedTabledata = () => {
    const { exciting, selectedAirport } = this.props;
    this.setState({ isLoading: true });
    exciting();
  };

  render() {
    const {
      isLoading,
      excitingTypeTableData,
      excitingTypecolumns,
      selectedExcitingType,
      showModal,
      isAddExcitingType,
      isEditExcitingType,
      editExcitingTypeData
    } = this.state;
    const { selectedAirport } = this.props;
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {showModal && isAddExcitingType && (
          <ExcitingTypesModal
            showModal={showModal}
            selectedAirport={selectedAirport}
            isAddExcitingType
            toggleForm={this.toggleForm}
          />
        )}
        {showModal && isEditExcitingType && (
          <ExcitingTypesModal
            showModal={showModal}
            selectedAirport={selectedAirport}
            editExcitingTypeData={editExcitingTypeData}
            isEditExcitingType
            toggleForm={this.toggleForm}
          />
        )}
        {!isLoading && (
          <div className="exciting__wrapper">
            <div className="exciting__left-table">
              <div className="exciting__header">
                <p className="exciting__title">Exciting Types</p>
                <AddNewRow
                  addButtonText="Exciting Type"
                  onAddNewClick={this.handleShowModal}
                />
              </div>
              <Table
                className="exciting__table"
                columns={excitingTypecolumns}
                dataSource={excitingTypeTableData}
                pagination={false}
                onRow={record => ({
                  onClick: e => {
                    this.selectRow(e, record);
                  }
                })}
                rowClassName={record => this.setRowClassName(record)}
              />
            </div>
            <div className="exciting__right-table">
              {/* {selectedExcitingType ? ( */}
              <ExcitingList
                selectedExcitingType={selectedExcitingType}
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
    excitingResponse: state.preferences.excitingResponse,
    deleteExcitingResponse: state.preferences.deleteExcitingResponse,
    pageRefreshingResponse: state.nonApiStore.pageRefreshingResponse
  };
}

export default connect(
  mapStateToProps,
  {
    exciting,
    pageRefreshing,
    deleteExciting
  }
)(withRouter(Exciting));
