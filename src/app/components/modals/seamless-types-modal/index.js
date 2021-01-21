import './index.scss';
import React, { Component } from 'react';

import { connect } from 'react-redux';

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
} from 'components/ui';
import FormButtons from 'components/forms/shared-form-components/new-form-buttons';
import { UploadSvg } from 'components/svg-icons-component';
import {
  addSeamless,
  updateSeamless,
  seamlessFields,
  seamlessFieldsUpdateValue
} from '../../../redux/actions/preferencesActions';
import FormComponent from 'components/forms/shared-form-components';

class SeamlessTypesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      seamlessTypesFields: [],
      isLoading: true
    };
  }

  componentDidMount() {
    const {
      showModal,
      seamlessFields,
      isAddSeamlessType,
      isEditSeamlessType,
      editSeamlessTypeData,
      seamlessFieldsUpdateValue
    } = this.props;
    if (isAddSeamlessType) {
      seamlessFields();
    } else if (isEditSeamlessType) {
      seamlessFieldsUpdateValue({
        seamless_id: editSeamlessTypeData.category_id
      });
    }
    this.setState({ visible: showModal });
  }

  componentWillReceiveProps(nextProps) {
    const {
      showModal,
      addSeamlessResponse,
      updateSeamlessResponse,
      seamlessFieldsResponse,
      seamlessFieldsUpdateValueResponse,
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
      nextProps.seamlessFieldsResponse &&
      nextProps.seamlessFieldsResponse !== seamlessFieldsResponse
    ) {
      if (
        nextProps.seamlessFieldsResponse.error === 0 &&
        nextProps.seamlessFieldsResponse.content
      ) {
        this.setState({
          seamlessTypesFields: nextProps.seamlessFieldsResponse.content
        });
      } else {
        message.error(nextProps.seamlessFieldsResponse.message);
        this.setState({ isSpinning: false });
      }
    }

    if (
      nextProps.seamlessFieldsUpdateValueResponse &&
      nextProps.seamlessFieldsUpdateValueResponse !==
        seamlessFieldsUpdateValueResponse
    ) {
      if (
        nextProps.seamlessFieldsUpdateValueResponse.error === 0 &&
        nextProps.seamlessFieldsUpdateValueResponse.content
      ) {
        this.setState({
          seamlessTypesFields:
            nextProps.seamlessFieldsUpdateValueResponse.content
        });
      } else {
        message.error(nextProps.seamlessFieldsUpdateValueResponse.message);
        this.setState({ isSpinning: false });
      }
    }

    if (
      nextProps.addSeamlessResponse &&
      nextProps.addSeamlessResponse !== addSeamlessResponse
    ) {
      if (
        nextProps.addSeamlessResponse.error === 0 &&
        nextProps.addSeamlessResponse.message
      ) {
        message.success(nextProps.addSeamlessResponse.message);
        this.props.toggleForm();
        this.setState({ visible: false });
      } else {
        message.error(nextProps.addSeamlessResponse.message);
        this.setState({ isSpinning: false });
      }
    }
    if (
      nextProps.updateSeamlessResponse &&
      nextProps.updateSeamlessResponse !== updateSeamlessResponse
    ) {
      if (
        !nextProps.updateSeamlessResponse.error &&
        nextProps.updateSeamlessResponse.message
      ) {
        message.success(nextProps.updateSeamlessResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.updateSeamlessResponse.message);
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
    this.props.toggleForm('closeModal');
  };

  handleSubmit = e => {
    e.preventDefault();
    const { seamlessTypesFields } = this.state;
    const {
      isAddSeamlessType,
      isEditSeamlessType,
      form,
      selectedAirport,
      editSeamlessTypeData,
      updateSeamless,
      addSeamless
    } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        Object.keys(values).forEach(key => {
          seamlessTypesFields.forEach(field => {
            if (field.name === 'rating') {
              field.value = 5;
            }
            if (field.name === key) {
              if (field.display) {
                field.value = field.value =
                  values[key] === undefined ? '' : values[key];
              }
            }
          });
        });
        if (isAddSeamlessType) {
          const data = { data: seamlessTypesFields };
          addSeamless(data);
        } else if (isEditSeamlessType) {
          updateSeamless({
            seamless_id: editSeamlessTypeData.category_id,
            data: seamlessTypesFields
          });
          // this.setState({ isSpinning: true });
        }
        this.setState({
          visible: false
        });
      }
    });
  };

  render() {
    const { seamlessTypesFields } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { isEditSeamlessType, editSeamlessTypeData } = this.props;
    return (
      <div className="modal">
        <Modal
          // title={
          //   editSeamlessTypeData &&
          //   editSeamlessTypeData &&
          //   editSeamlessTypeData.category
          //     ? `Edit Seamless type ${editSeamlessTypeData.category}`
          //     : 'Add New Seamless type'
          // }
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          className="modal"
        >
          <FormComponent
            formFields={seamlessTypesFields}
            getFieldDecorator={getFieldDecorator}
            handleSubmit={this.handleSubmit}
            headerName={
              editSeamlessTypeData &&
              editSeamlessTypeData &&
              editSeamlessTypeData.category
                ? `Edit Seamless type ${editSeamlessTypeData.category}`
                : 'Add New Seamless type'
            }
            handleCancel={this.handleCancel}
          />
          {/* <Form onSubmit={this.handleSubmit} className="modal__form">
            <Row type="flex" justify="space-between">
              <Row className="modal__form-item">
                <Form.Item label="Category">
                  {getFieldDecorator('seamless_category', {
                    initialValue:
                      editSeamlessTypeData && editSeamlessTypeData.category
                        ? editSeamlessTypeData.category
                        : '',
                    rules: [
                      {
                        required: true,
                        message: 'Please input the Seamless Category!'
                      }
                    ]
                  })(<Input placeholder="Enter the Seamless Category" />)}
                </Form.Item>
              </Row>
              <Row className="modal__form-item">
                <Form.Item label="Type">
                  {getFieldDecorator('seamless_type', {
                    initialValue:
                      editSeamlessTypeData && editSeamlessTypeData.type
                        ? editSeamlessTypeData.type
                        : '',
                    rules: [
                      {
                        required: true,
                        message: 'Please input the type!'
                      }
                    ]
                  })(<Input placeholder="Enter the type" />)}
                </Form.Item>
              </Row>
            </Row>
            <Row className="new-airport--form--buttons">
              <FormButtons
                isSaveButtonDisabled={this.state.isSaveButtonDisabled}
                handleCancel={this.handleCancel}
              />
            </Row>
          </Form> */}
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    updateSeamlessResponse: state.preferences.updateSeamlessResponse,
    addSeamlessResponse: state.preferences.addSeamlessResponse,
    seamlessFieldsResponse: state.preferences.seamlessFieldsResponse,
    seamlessFieldsUpdateValueResponse:
      state.preferences.seamlessFieldsUpdateValueResponse
  };
}

SeamlessTypesModal = connect(
  mapStateToProps,
  {
    updateSeamless,
    addSeamless,
    seamlessFields,
    seamlessFieldsUpdateValue
  }
)(SeamlessTypesModal);
export default Form.create()(SeamlessTypesModal);
