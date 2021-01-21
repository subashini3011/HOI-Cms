import "./index.scss";
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
  addEmergencyContacts,
  updateEmergencyContacts
} from "../../../redux/actions/emergencyContactsActions";

class ContactTypesModal extends Component {
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
      addEmergencyContactsResponse,
      updateEmergencyContactsResponse,
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
      nextProps.addEmergencyContactsResponse &&
      nextProps.addEmergencyContactsResponse !== addEmergencyContactsResponse
    ) {
      if (
        nextProps.addEmergencyContactsResponse.error === 0 &&
        nextProps.addEmergencyContactsResponse.message
      ) {
        message.success(nextProps.addEmergencyContactsResponse.message);
        this.props.toggleForm();
        this.setState({ visible: false });
      } else {
        message.error(nextProps.addEmergencyContactsResponse.message);
        this.setState({ isSpinning: false });
      }
    }
    if (
      nextProps.updateEmergencyContactsResponse &&
      nextProps.updateEmergencyContactsResponse !==
        updateEmergencyContactsResponse
    ) {
      if (
        !nextProps.updateEmergencyContactsResponse.error &&
        nextProps.updateEmergencyContactsResponse.message
      ) {
        message.success(nextProps.updateEmergencyContactsResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.updateEmergencyContactsResponse.message);
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

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { uploadImageUrl } = this.state;
    const {
      isAddContactType,
      isEditContactType,
      form,
      selectedAirport,
      editContactTypeData,
      updateEmergencyContacts,
      addEmergencyContacts
    } = this.props;
    form.setFields({
      image: {
        value: uploadImageUrl
      }
    });
    form.validateFields((err, values) => {
      if (!err) {

        if (isAddContactType) {
          const data = {
            airport_code: selectedAirport,
            name: values.contact_type
          };
          addEmergencyContacts(data);
        } else if (isEditContactType) {
          const data = {
            id: editContactTypeData.contact_id,
            name: values.contact_type
          };
          this.setState({ isSpinning: true });

          updateEmergencyContacts(data);
        }
        this.setState({
          visible: false
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isEditContactType, editContactTypeData } = this.props;

    return (
      <div>
        <Modal
          title={
            editContactTypeData &&
            editContactTypeData &&
            editContactTypeData.perticular
              ? `Edit Contact type ${editContactTypeData.perticular}`
              : "Add New Contact type"
          }
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form onSubmit={this.handleSubmit} className="modal__form">
            <Row type="flex" justify="space-between">
              <Row className="modal__form-item">
                <Form.Item label="Contact type">
                  {getFieldDecorator("contact_type", {
                    initialValue:
                      editContactTypeData && editContactTypeData.perticular
                        ? editContactTypeData.perticular
                        : "",
                    rules: [
                      {
                        required: true,
                        message: "Please input the contact type!"
                      }
                    ]
                  })(<Input placeholder="Enter the Contact type" />)}
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
    updateEmergencyContactsResponse:
      state.emergencyContacts.updateEmergencyContactsResponse,
    addEmergencyContactsResponse:
      state.emergencyContacts.addEmergencyContactsResponse
  };
}

ContactTypesModal = connect(
  mapStateToProps,
  {
    updateEmergencyContacts,
    addEmergencyContacts
  }
)(ContactTypesModal);
export default Form.create()(ContactTypesModal);
