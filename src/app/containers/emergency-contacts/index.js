import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import {
  getEmergencyContacts,
  deleteEmergencyContacts
} from '../../redux/actions/emergencyContactsActions';
import { pageRefreshing } from '../../redux/actions/nonApiActions';
import Loading from 'components/loading';

import { Table, Tag, Icon, Popconfirm, message } from 'components/ui';
import AddNewRow from '../../components/tableOperations/add-new-button';
import ContactList from '../../components/contact-list';
import ContactTypesModal from '../../components/modals/contact-types-modal';

class EmergencyContacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      selectedContactType: [],
      ContactTypeTableData: [],
      editContactTypeData: [],
      showModal: false,
      isEditContactType: false,
      isAddContactType: false,
      ContactTypecolumns: [
        {
          title: 'Perticular',
          dataIndex: 'perticular'
        },
        {
          title: 'Action',
          dataIndex: 'Action',
          width: '13rem',
          render: (text, record) => (
            <span className="emergency-contacts__table-actions u_no_wrap">
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
    const { getEmergencyContacts, selectedAirport } = this.props;

    if (selectedAirport) {
      const data = {
        city_code: selectedAirport
      };
      getEmergencyContacts(data);
    }
  };

  componentWillReceiveProps = nextProps => {
    const {
      getEmergencyContacts,
      getEmergencyContactsResponse,
      pageRefreshingResponse,
      deleteEmergencyContactsResponse,
      selectedAirport
    } = this.props;
    if (
      nextProps.getEmergencyContactsResponse &&
      nextProps.getEmergencyContactsResponse !== getEmergencyContactsResponse
    ) {
      if (
        nextProps.getEmergencyContactsResponse.error === 0 &&
        nextProps.getEmergencyContactsResponse.content
        // &&
        // nextProps.getEmergencyContactsResponse.content.details
      ) {
        this.handleTableData(nextProps.getEmergencyContactsResponse.content);
      }
    }

    if (
      nextProps.deleteEmergencyContactsResponse &&
      nextProps.deleteEmergencyContactsResponse !==
        deleteEmergencyContactsResponse
    ) {
      if (
        nextProps.deleteEmergencyContactsResponse.error === 0 &&
        nextProps.deleteEmergencyContactsResponse.message
      ) {
        message.success(nextProps.deleteEmergencyContactsResponse.message);
        if (selectedAirport) {
          const data = {
            city_code: selectedAirport
          };
          getEmergencyContacts(data);
        }
      } else {
        message.error(nextProps.deleteEmergencyContactsResponse.message);
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
          getEmergencyContacts(data);
        }
      }
    }
  };

  handleTableData = data => {
    const ContactTypeTableData = data;
    const { selectedContactType } = this.state;
    const { pageRefreshing } = this.props;
    if (data && data.length > 0) {
      let highlightContactType = data[0];
      if (selectedContactType && selectedContactType.id) {
        highlightContactType = data.find(
          item => item.id === selectedContactType.id
        );
      }
      this.setState({
        ContactTypeTableData,
        selectedContactType: highlightContactType,
        isLoading: false
      });
    } else {
      this.setState({
        isLoading: false
      });
    }
    pageRefreshing({ isLoading: false });
  };

  selectRow = (e, record) => {
    e.stopPropagation();
    const { ContactTypeTableData } = this.state;
    let data = ContactTypeTableData[0];
    if (record && record.contact_id) {
      data = ContactTypeTableData.find(
        item => item.contact_id === record.contact_id
      );
    }
    this.setState({
      selectedContactType: data,
      isAddContactType: false,
      isEditContactType: false
    });
  };

  setRowClassName = record => {
    const { selectedContactType, ContactTypeTableData } = this.state;
    if (record && record.contact_id) {
      if (selectedContactType && selectedContactType.contact_id) {
        return record.contact_id === selectedContactType.contact_id
          ? 'emergency-contacts__selected-row'
          : '';
      }
      return record.contact_id === ContactTypeTableData[0].contact_id
        ? 'emergency-contacts__selected-row'
        : '';
    }
  };

  handleShowModal = () => {
    this.setState({
      showModal: true,
      isAddContactType: true,
      isEditContactType: false
    });
  };

  handleEditModal = (e, record) => {
    e.stopPropagation();
    // const {isAddCategory,isEditCategory} = this.state;
    this.setState({
      showModal: true,
      isAddContactType: false,
      isEditContactType: true,
      editContactTypeData: record
    });
  };

  handleDelete = (e, record) => {
    const { selectedContactType, ContactTypeTableData } = this.state;
    const { deleteEmergencyContacts } = this.props;
    e.stopPropagation();
    const data = {
      id: record.contact_id
    };
    if (record.contact_id === selectedContactType.contact_id) {
      this.setState({
        selectedContactType: ContactTypeTableData[0],
        isLoading: true
      });
    } else {
      this.setState({ isLoading: true });
    }
    deleteEmergencyContacts(data);
  };

  toggleForm = () => {
    const { isAddContactType, isEditContactType } = this.state;
    const { getEmergencyContacts, selectedAirport } = this.props;

    if (isAddContactType) {
      if (selectedAirport) {
        const data = {
          city_code: selectedAirport
        };
        getEmergencyContacts(data);
      }
      this.setState({
        isAddContactType: false,
        isEditContactType: false,
        isLoading: true
      });
    } else if (isEditContactType) {
      if (selectedAirport) {
        const data = {
          city_code: selectedAirport
        };
        getEmergencyContacts(data);
      }

      this.setState({
        isEditContactType: false,
        isAddContactType: false,
        isLoading: true
      });
    }
  };

  getUpdatedTabledata = () => {
    const { getEmergencyContacts, selectedAirport } = this.props;
    if (selectedAirport) {
      const data = {
        city_code: selectedAirport
      };
      this.setState({ isLoading: true });
      getEmergencyContacts(data);
    }
  };

  render() {
    const {
      isLoading,
      ContactTypeTableData,
      ContactTypecolumns,
      selectedContactType,
      showModal,
      isAddContactType,
      isEditContactType,
      editContactTypeData
    } = this.state;
    const { selectedAirport } = this.props;
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {showModal && isAddContactType && (
          <ContactTypesModal
            showModal={showModal}
            selectedAirport={selectedAirport}
            isAddContactType
            toggleForm={this.toggleForm}
          />
        )}
        {showModal && isEditContactType && (
          <ContactTypesModal
            showModal={showModal}
            selectedAirport={selectedAirport}
            editContactTypeData={editContactTypeData}
            isEditContactType
            toggleForm={this.toggleForm}
          />
        )}
        {!isLoading && (
          <div className="emergency-contacts__wrapper">
            <div className="emergency-contacts__left-table">
              <div className="emergency-contacts__header">
                <p className="emergency-contacts__title">Contact Types</p>
                <AddNewRow
                  addButtonText="Contact Type"
                  onAddNewClick={this.handleShowModal}
                />
              </div>
              <Table
                className="emergency-contacts__table"
                columns={ContactTypecolumns}
                dataSource={ContactTypeTableData}
                pagination={false}
                onRow={record => ({
                  onClick: e => {
                    this.selectRow(e, record);
                  }
                })}
                rowClassName={record => this.setRowClassName(record)}
              />
            </div>
            <div className="emergency-contacts__right-table">
              {/* {selectedContactType ? ( */}
              <ContactList
                selectedContactType={selectedContactType}
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
    getEmergencyContactsResponse:
      state.emergencyContacts.getEmergencyContactsResponse,
    deleteEmergencyContactsResponse:
      state.emergencyContacts.deleteEmergencyContactsResponse,
    pageRefreshingResponse: state.nonApiStore.pageRefreshingResponse
  };
}

export default connect(
  mapStateToProps,
  {
    getEmergencyContacts,
    deleteEmergencyContacts,
    pageRefreshing
  }
)(withRouter(EmergencyContacts));
