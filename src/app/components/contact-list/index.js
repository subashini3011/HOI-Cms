import "./index.scss";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
// import { getEmergencyContacts } from "../../redux/actions/userActions";

import { Table, Tag, Icon, Popconfirm, message } from "components/ui";
import AddNewRow from "../tableOperations/add-new-button";
import ContactDetailsModal from "../modals/contact-details-modal";
import { deleteEmergencyContactsDetails } from "../../redux/actions/emergencyContactsActions";
class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      isAddContactDetails: false,
      editContactDetailsData: [],
      ContactListTableData: [],

      ContactListColumns: [
        {
          title: "Location",
          dataIndex: "location"
        },
        {
          title: "Phone No",
          dataIndex: "phone_no"
        },
        {
          title: "Action",
          dataIndex: "Action",
          width: "13rem",
          render: (text, record) => (
            <span className="emergency-contacts__table-actions u_no_wrap">
              <Tag
                color="geekblue"
                style={{ marginRight: "1rem" }}
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
                    <Icon type="exclamation-circle" style={{ color: "red" }} />
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
    const { selectedContactType } = this.props;
    if (selectedContactType) {
      this.setState({
        visible: false,
        ContactListTableData: selectedContactType.details
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    let { ContactListTableData } = this.state;
    const {
      selectedContactType,
      getUpdatedTabledata,
      deleteEmergencyContactsDetailsResponse
    } = this.props;
    if (selectedContactType) {
      if (nextProps.selectedContactType != selectedContactType) {
        if (nextProps.selectedContactType.details) {
          ContactListTableData = nextProps.selectedContactType.details;
        }

        this.setState({ ContactListTableData });
      }
    }
    if (
      nextProps.deleteEmergencyContactsDetailsResponse &&
      nextProps.deleteEmergencyContactsDetailsResponse !==
        deleteEmergencyContactsDetailsResponse
    ) {
      if (
        nextProps.deleteEmergencyContactsDetailsResponse.error === 0 &&
        nextProps.deleteEmergencyContactsDetailsResponse.message
      ) {
        message.success(
          nextProps.deleteEmergencyContactsDetailsResponse.message
        );
        getUpdatedTabledata();
      } else {
        message.error(nextProps.deleteEmergencyContactsDetailsResponse.message);
      }
    }
  }

  handleShowModal = () => {
    this.setState({
      showModal: true,
      isAddContactDetails: true,
      isEditContactDetails: false
    });
  };

  toggleForm = () => {
    const { isAddContactDetails, isEditContactDetails } = this.state;
    const { getUpdatedTabledata, selectedAirport } = this.props;

    if (isAddContactDetails) {
      getUpdatedTabledata();
      this.setState({
        isAddContactDetails: false,
        isEditContactDetails: false
      });
    } else if (isEditContactDetails) {
      getUpdatedTabledata();

      this.setState({
        isEditContactDetails: false,
        isAddContactDetails: false
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
      isAddContactDetails: false,
      isEditContactDetails: true,
      editContactDetailsData: record
    });
  };

  handleDelete = (e, record) => {
    const { deleteEmergencyContactsDetails } = this.props;
    e.stopPropagation();
    const data = {
      id: record.id
    };

    deleteEmergencyContactsDetails(data);
  };

  render() {
    const {
      ContactListColumns,
      ContactListTableData,
      showModal,
      isAddContactDetails,
      isEditContactDetails,
      editContactDetailsData
    } = this.state;
    const { selectedContactType } = this.props;
    return (
      <React.Fragment>
        {showModal && isAddContactDetails && (
          <ContactDetailsModal
            showModal={showModal}
            isAddContactDetails
            toggleForm={this.toggleForm}
            handleCancelModal={this.handleCancelModal}
            selectedContactType={selectedContactType}
          />
        )}
        {showModal && isEditContactDetails && (
          <ContactDetailsModal
            showModal={showModal}
            isEditContactDetails
            toggleForm={this.toggleForm}
            handleCancelModal={this.handleCancelModal}
            editContactDetailsData={editContactDetailsData}
          />
        )}

        <div className="emergency-contacts__header">
          <p className="emergency-contacts__title">
            {selectedContactType && selectedContactType.perticular
              ? `Contact Details of ${selectedContactType.perticular}`
              : "Contact Details"}
          </p>
          {selectedContactType && selectedContactType.perticular ? (
            <AddNewRow
              addButtonText="Contacts"
              onAddNewClick={this.handleShowModal}
            />
          ) : null}
        </div>
        <Table
          className="emergency-contacts__table"
          columns={ContactListColumns}
          dataSource={ContactListTableData}
          pagination={false}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,

    deleteEmergencyContactsDetailsResponse:
      state.emergencyContacts.deleteEmergencyContactsDetailsResponse
  };
}

export default connect(
  mapStateToProps,
  {
    deleteEmergencyContactsDetails
  }
)(withRouter(ContactList));
