import React, { Component } from "react";
import "./index.scss";
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
const { TextArea } = Input;

class RejectRequestModal extends Component {
  state = {
    ModalText: "Content of the modal",
    visible: true,
    confirmLoading: false
  };

  componentWillReceiveProps() {
    const { visible } = this.state;
    if (visible !== true) {
      this.setState({ visible: true });
    }
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: "The modal will be closed after two seconds",
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }, 2000);
  };

  handleCancel = () => {
    const { handleRejectReasonModal } = this.props;
    this.setState({
      visible: false
    });
    handleRejectReasonModal();
  };

  handleSubmit = e => {
    e.preventDefault();
    const { handleRejectRequestwithReason } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({
          visible: false
        });
        handleRejectRequestwithReason(values.reject_reason);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div className="reject-request-modal">
        <Modal
          visible={visible}
          // onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={false}
        >
          <Form onSubmit={this.handleSubmit}>
            <Row className="modal__form-item">
              <Form.Item label="Reject request with reason">
                {getFieldDecorator("reject_reason", {
                  // initialValue:
                  //   editRecord && editRecord.name ? editRecord.name : "",
                  rules: [
                    {
                      required: true,
                      message:
                        "Please enter the reason to reject the update request"
                    }
                  ]
                })(
                  <TextArea
                    rows={5}
                    className="reject-request-modal__text-area"
                  />
                )}
              </Form.Item>
            </Row>
            <Row className="reject-request-modal__buttons">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button type="default" onClick={this.handleCancel}>
                Cancel
              </Button>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(RejectRequestModal);
