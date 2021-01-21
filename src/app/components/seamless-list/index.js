import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
// import { getEmergencyContacts } from "../../redux/actions/userActions";

import { Table, Tag, Icon, Popconfirm, message } from 'components/ui';
import AddNewRow from '../tableOperations/add-new-button';
import SeamlessValuesModal from '../modals/seamless-values-modal';
import { deleteSeamlessValues } from '../../redux/actions/preferencesActions';
import DEFAULT_IMG from 'images/default-image.png';

class SeamlessList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      isAddSeamlessValues: false,
      editSeamlessValuesData: [],
      seamlessListTableData: [],
      seamlessListColumns: [
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
          title: 'Order',
          dataIndex: 'list_order'
        },
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

  componentDidMount() {
    const { selectedSeamlessType } = this.props;
    if (selectedSeamlessType) {
      this.setState({
        visible: false,
        seamlessListTableData: selectedSeamlessType.values
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    let { seamlessListTableData } = this.state;
    const {
      selectedSeamlessType,
      getUpdatedTabledata,
      deleteSeamlessValuesResponse
    } = this.props;
    if (selectedSeamlessType) {
      if (nextProps.selectedSeamlessType != selectedSeamlessType) {
        if (nextProps.selectedSeamlessType.values) {
          seamlessListTableData = nextProps.selectedSeamlessType.values;
        }

        this.setState({ seamlessListTableData });
      }
    }
    if (
      nextProps.deleteSeamlessValuesResponse &&
      nextProps.deleteSeamlessValuesResponse !== deleteSeamlessValuesResponse
    ) {
      if (
        nextProps.deleteSeamlessValuesResponse.error === 0 &&
        nextProps.deleteSeamlessValuesResponse.message
      ) {
        message.success(nextProps.deleteSeamlessValuesResponse.message);
        getUpdatedTabledata();
      } else {
        message.error(nextProps.deleteSeamlessValuesResponse.message);
      }
    }
  }

  handleShowModal = () => {
    this.setState({
      showModal: true,
      isAddSeamlessValues: true,
      isEditSeamlessValues: false
    });
  };

  toggleForm = () => {
    const { isAddSeamlessValues, isEditSeamlessValues } = this.state;
    const { getUpdatedTabledata, selectedAirport } = this.props;

    if (isAddSeamlessValues) {
      getUpdatedTabledata();
      this.setState({
        isAddSeamlessValues: false,
        isEditSeamlessValues: false
      });
    } else if (isEditSeamlessValues) {
      getUpdatedTabledata();

      this.setState({
        isEditSeamlessValues: false,
        isAddSeamlessValues: false
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
      isAddSeamlessValues: false,
      isEditSeamlessValues: true,
      editSeamlessValuesData: record
    });
  };

  handleDelete = (e, record) => {
    const { deleteSeamlessValues } = this.props;
    e.stopPropagation();
    const data = {
      seamless_id: record.id
    };
    deleteSeamlessValues(data);
  };

  render() {
    const {
      seamlessListColumns,
      seamlessListTableData,
      showModal,
      isAddSeamlessValues,
      isEditSeamlessValues,
      editSeamlessValuesData
    } = this.state;
    const { selectedSeamlessType } = this.props;
    return (
      <React.Fragment>
        {showModal && isAddSeamlessValues && (
          <SeamlessValuesModal
            showModal={showModal}
            isAddSeamlessValues
            toggleForm={this.toggleForm}
            handleCancelModal={this.handleCancelModal}
            selectedSeamlessType={selectedSeamlessType}
          />
        )}
        {showModal && isEditSeamlessValues && (
          <SeamlessValuesModal
            showModal={showModal}
            isEditSeamlessValues
            toggleForm={this.toggleForm}
            handleCancelModal={this.handleCancelModal}
            selectedSeamlessType={selectedSeamlessType}
            editSeamlessValuesData={editSeamlessValuesData}
          />
        )}

        <div className="seamless__header">
          <p className="seamless__title">
            {selectedSeamlessType && selectedSeamlessType.category
              ? `Seamless Details of ${selectedSeamlessType.category}`
              : 'Seamless Details'}
          </p>
          {selectedSeamlessType && selectedSeamlessType.category ? (
            <AddNewRow
              addButtonText="Seamless"
              onAddNewClick={this.handleShowModal}
            />
          ) : null}
        </div>
        <Table
          className="seamless__table"
          columns={seamlessListColumns}
          dataSource={seamlessListTableData}
          pagination={false}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,

    deleteSeamlessValuesResponse: state.preferences.deleteSeamlessValuesResponse
  };
}

export default connect(
  mapStateToProps,
  {
    deleteSeamlessValues
  }
)(withRouter(SeamlessList));
