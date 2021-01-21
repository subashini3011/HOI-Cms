import React, { Component } from "react";

import { connect } from "react-redux";

// components
import {
  Modal,
  Form,
  Row,
  Input,
  Upload,
  Button,
  Icon,
  message
} from "components/ui";
import FormButtons from "components/forms/shared-form-components/new-form-buttons";
import { UploadSvg } from "components/svg-icons-component";
import {
  addEmergencyContactsDetails,
  updateEmergencyContactsDetails
} from "../../../redux/actions/emergencyContactsActions";

class ContactDetailsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    const { showModal } = this.props;
    this.setState({ visible: showModal });
  }

  componentWillReceiveProps(nextProps) {
    const {
      showModal,
      addEmergencyContactsDetailsResponse,
      updateEmergencyContactsDetailsResponse,
      form
    } = this.props;

    const { visible } = this.state;
    if (showModal) {
      this.setState({ visible: showModal });
    }
    if (!visible) {
      form.resetFields();
    }
    if (
      nextProps.addEmergencyContactsDetailsResponse &&
      nextProps.addEmergencyContactsDetailsResponse !==
        addEmergencyContactsDetailsResponse
    ) {
      if (
        nextProps.addEmergencyContactsDetailsResponse.error === 0 &&
        nextProps.addEmergencyContactsDetailsResponse.message
      ) {
        message.success(nextProps.addEmergencyContactsDetailsResponse.message);
        this.props.toggleForm();
        this.setState({ visible: false });
      } else {
        message.error(nextProps.addEmergencyContactsDetailsResponse.message);
        this.setState({ isSpinning: false });
      }
    }
    if (
      nextProps.updateEmergencyContactsDetailsResponse &&
      nextProps.updateEmergencyContactsDetailsResponse !==
        updateEmergencyContactsDetailsResponse
    ) {
      if (
        !nextProps.updateEmergencyContactsDetailsResponse.error &&
        nextProps.updateEmergencyContactsDetailsResponse.message
      ) {
        message.success(
          nextProps.updateEmergencyContactsDetailsResponse.message
        );
        this.props.toggleForm();
      } else {
        message.error(nextProps.updateEmergencyContactsDetailsResponse.message);
        this.setState({ isSpinning: false });
      }
    }
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = () => {
    const { handleCancelModal } = this.props;
    handleCancelModal();
    this.setState({
      visible: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { uploadImageUrl } = this.state;
    const {
      isAddContactDetails,
      isEditContactDetails,
      form,
      selectedAirport,
      editContactDetailsData,
      updateEmergencyContactsDetails,
      addEmergencyContactsDetails,
      selectedContactType
    } = this.props;
    form.setFields({
      image: {
        value: uploadImageUrl
      }
    });
    form.validateFields((err, values) => {
      if (!err) {

        if (isAddContactDetails) {
          const data = {
            contact_id: selectedContactType.contact_id,
            location: values.location,
            phone: values.phone_no
          };
          addEmergencyContactsDetails(data);
        } else if (isEditContactDetails) {
          const data = {
            id: editContactDetailsData.id,
            location: values.location,
            phone: values.phone_no
          };
          this.setState({ isSpinning: true });

          updateEmergencyContactsDetails(data);
        }
        this.setState({
          visible: false
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isEditContactType, editContactDetailsData } = this.props;

    return (
      <div>
        <Modal
          title={
            editContactDetailsData && editContactDetailsData.perticular
              ? `Edit Contact Details ${editContactDetailsData.perticular}`
              : "Add New Contact Details"
          }
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form onSubmit={this.handleSubmit} className="modal__form">
            <Row type="flex" justify="space-between">
              <Row className="modal__form-item">
                <Form.Item label="Location">
                  {getFieldDecorator("location", {
                    initialValue:
                      editContactDetailsData && editContactDetailsData.location
                        ? editContactDetailsData.location
                        : "",
                    rules: [
                      {
                        required: true,
                        message: "Please input the location!"
                      }
                    ]
                  })(<Input placeholder="Enter the location" />)}
                </Form.Item>
              </Row>
              <Row className="modal__form-item">
                <Form.Item label="Phone no">
                  {getFieldDecorator("phone_no", {
                    initialValue:
                      editContactDetailsData && editContactDetailsData.phone_no
                        ? editContactDetailsData.phone_no
                        : "",
                    rules: [
                      {
                        required: true,
                        message: "Please input the phone no!"
                      }
                    ]
                  })(<Input placeholder="Enter the phone no" />)}
                </Form.Item>
              </Row>
            </Row>
            <Row className="new-airport--form--buttons">
              <FormButtons
                isSaveButtonDisabled={this.state.isSaveButtonDisabled}
                handleCancel={this.handleCancel}
              />
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    updateEmergencyContactsDetailsResponse:
      state.emergencyContacts.updateEmergencyContactsDetailsResponse,
    addEmergencyContactsDetailsResponse:
      state.emergencyContacts.addEmergencyContactsDetailsResponse
  };
}

ContactDetailsModal = connect(
  mapStateToProps,
  {
    updateEmergencyContactsDetails,
    addEmergencyContactsDetails
  }
)(ContactDetailsModal);
export default Form.create()(ContactDetailsModal);
