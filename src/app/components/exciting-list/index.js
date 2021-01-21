import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
// import { getEmergencyContacts } from "../../redux/actions/userActions";

import { Table, Tag, Icon, Popconfirm, message } from 'components/ui';
import AddNewRow from '../tableOperations/add-new-button';
import ExcitingValuesModal from '../modals/exciting-values-modal';
import { deleteExcitingValues } from '../../redux/actions/preferencesActions';
import DEFAULT_IMG from 'images/default-image.png';

class ExcitingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      isAddExcitingValues: false,
      editExcitingValuesData: [],
      excitingListTableData: [],
      excitingListColumns: [
        {
          title: 'name',
          dataIndex: 'name'
        },
        {
          title: 'Image',
          dataIndex: 'image',
          render: text =>
            text !== '' ? (
              <img
                style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  marginLeft: '1.7rem'
                }}
                src={text}
              />
            ) : (
              <img
                style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  marginLeft: '1.7rem'
                }}
                src={DEFAULT_IMG}
                alt="defalut img"
              />
            )
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

  componentDidMount() {
    const { selectedExcitingType } = this.props;
    if (selectedExcitingType) {
      this.setState({
        visible: false,
        excitingListTableData: selectedExcitingType.values
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    let { excitingListTableData } = this.state;
    const {
      selectedExcitingType,
      getUpdatedTabledata,
      deleteExcitingValuesResponse
    } = this.props;
    if (selectedExcitingType) {
      if (nextProps.selectedExcitingType != selectedExcitingType) {
        if (nextProps.selectedExcitingType.values) {
          excitingListTableData = nextProps.selectedExcitingType.values;
        }

        this.setState({ excitingListTableData });
      }
    }
    if (
      nextProps.deleteExcitingValuesResponse &&
      nextProps.deleteExcitingValuesResponse !== deleteExcitingValuesResponse
    ) {
      if (
        nextProps.deleteExcitingValuesResponse.error === 0 &&
        nextProps.deleteExcitingValuesResponse.message
      ) {
        message.success(nextProps.deleteExcitingValuesResponse.message);
        getUpdatedTabledata();
      } else {
        message.error(nextProps.deleteExcitingValuesResponse.message);
      }
    }
  }

  handleShowModal = () => {
    this.setState({
      showModal: true,
      isAddExcitingValues: true,
      isEditExcitingValues: false
    });
  };

  toggleForm = () => {
    const { isAddExcitingValues, isEditExcitingValues } = this.state;
    const { getUpdatedTabledata, selectedAirport } = this.props;

    if (isAddExcitingValues) {
      getUpdatedTabledata();
      this.setState({
        isAddExcitingValues: false,
        isEditExcitingValues: false
      });
    } else if (isEditExcitingValues) {
      getUpdatedTabledata();

      this.setState({
        isEditExcitingValues: false,
        isAddExcitingValues: false
      });
    }
  };
  handleCancelModal = () => {
    this.setState({ showModal: false });
  };

  handleEditModal = (e, record) => {
    e.stopPropagation();
    // const {isAddCategory,isEditCategory} = this.state;
    this.setState({
      showModal: true,
      isAddExcitingValues: false,
      isEditExcitingValues: true,
      editExcitingValuesData: record
    });
  };

  handleDelete = (e, record) => {
    const { deleteExcitingValues } = this.props;
    e.stopPropagation();
    const data = {
      exciting_id: record.id
    };
    deleteExcitingValues(data);
  };

  render() {
    const {
      excitingListColumns,
      excitingListTableData,
      showModal,
      isAddExcitingValues,
      isEditExcitingValues,
      editExcitingValuesData
    } = this.state;
    const { selectedExcitingType } = this.props;
    return (
      <React.Fragment>
        {showModal && isAddExcitingValues && (
          <ExcitingValuesModal
            showModal={showModal}
            isAddExcitingValues
            toggleForm={this.toggleForm}
            handleCancelModal={this.handleCancelModal}
            selectedExcitingType={selectedExcitingType}
          />
        )}
        {showModal && isEditExcitingValues && (
          <ExcitingValuesModal
            showModal={showModal}
            isEditExcitingValues
            toggleForm={this.toggleForm}
            handleCancelModal={this.handleCancelModal}
            selectedExcitingType={selectedExcitingType}
            editExcitingValuesData={editExcitingValuesData}
          />
        )}

        <div className="exciting__header">
          <p className="exciting__title">
            {selectedExcitingType && selectedExcitingType.category
              ? `Exciting Details of ${selectedExcitingType.category}`
              : 'Exciting Details'}
          </p>
          {selectedExcitingType && selectedExcitingType.category ? (
            <AddNewRow
              addButtonText="Exciting"
              onAddNewClick={this.handleShowModal}
            />
          ) : null}
        </div>
        <Table
          className="exciting__table"
          columns={excitingListColumns}
          dataSource={excitingListTableData}
          pagination={false}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,

    deleteExcitingValuesResponse: state.preferences.deleteExcitingValuesResponse
  };
}

export default connect(
  mapStateToProps,
  {
    deleteExcitingValues
  }
)(withRouter(ExcitingList));
