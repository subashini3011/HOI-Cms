import './index.scss';
import React, { Component } from 'react';

import { connect } from 'react-redux';

// components
import { Modal, Form, message } from 'components/ui';
import { UPLOAD_FILE } from 'constants/api-constants';
import {
  addExcitingValues,
  updateExcitingValues,
  excitingValuesFields,
  excitingValuesFieldsUpdateValue
} from '../../../redux/actions/preferencesActions';
import { uploadFile } from '../../../redux/actions/uploadFileActions';
import FormComponent from 'components/forms/shared-form-components';

import FormButtons from 'components/forms/shared-form-components/new-form-buttons';
import { UploadSvg } from 'components/svg-icons-component';

class ExcitingValuesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      excitingValuesFields: [],
      isDisableImageUpload: !!(
        this.props.editExcitingValuesData &&
        this.props.editExcitingValuesData.image
      ),
      uploadImageUrl:
        this.props.editExcitingValuesData &&
        this.props.editExcitingValuesData.image
          ? this.props.editExcitingValuesData.image
          : '',
      isImageSelected: false
    };
  }

  componentDidMount() {
    const {
      showModal,
      editExcitingValuesData,
      isAddExcitingValues,
      isEditExcitingValues,
      excitingValuesFields,
      excitingValuesFieldsUpdateValue
    } = this.props;
    if (isAddExcitingValues) {
      excitingValuesFields();
    } else if (isEditExcitingValues) {
      excitingValuesFieldsUpdateValue({
        exciting_id: editExcitingValuesData.id
      });
    }
    this.setState({ visible: showModal });
  }

  componentWillReceiveProps(nextProps) {
    const {
      showModal,
      addExcitingValuesResponse,
      updateExcitingValuesResponse,
      excitingValuesFieldsResponse,
      excitingValuesFieldsUpdateValueResponse,
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
      nextProps.excitingValuesFieldsResponse &&
      nextProps.excitingValuesFieldsResponse !== excitingValuesFieldsResponse
    ) {
      if (
        nextProps.excitingValuesFieldsResponse.error === 0 &&
        nextProps.excitingValuesFieldsResponse.content
      ) {
        this.setState({
          excitingValuesFields: nextProps.excitingValuesFieldsResponse.content
        });
      } else {
        message.error(nextProps.excitingValuesFieldsResponse.message);
        this.setState({ isSpinning: false });
      }
    }

    if (
      nextProps.excitingValuesFieldsUpdateValueResponse &&
      nextProps.excitingValuesFieldsUpdateValueResponse !==
        excitingValuesFieldsUpdateValueResponse
    ) {
      if (
        nextProps.excitingValuesFieldsUpdateValueResponse.error === 0 &&
        nextProps.excitingValuesFieldsUpdateValueResponse.content
      ) {
        this.setState({
          excitingValuesFields:
            nextProps.excitingValuesFieldsUpdateValueResponse.content
        });
      } else {
        message.error(
          nextProps.excitingValuesFieldsUpdateValueResponse.message
        );
        this.setState({ isSpinning: false });
      }
    }

    if (
      nextProps.addExcitingValuesResponse &&
      nextProps.addExcitingValuesResponse !== addExcitingValuesResponse
    ) {
      if (
        nextProps.addExcitingValuesResponse.error === 0 &&
        nextProps.addExcitingValuesResponse.message
      ) {
        message.success(nextProps.addExcitingValuesResponse.message);
        this.props.toggleForm();
        this.setState({ visible: false });
      } else {
        message.error(nextProps.addExcitingValuesResponse.message);
        this.setState({ isSpinning: false });
      }
    }
    if (
      nextProps.updateExcitingValuesResponse &&
      nextProps.updateExcitingValuesResponse !== updateExcitingValuesResponse
    ) {
      if (
        !nextProps.updateExcitingValuesResponse.error &&
        nextProps.updateExcitingValuesResponse.message
      ) {
        message.success(nextProps.updateExcitingValuesResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.updateExcitingValuesResponse.message);
        this.setState({ isSpinning: false });
      }
    }

    if (
      nextProps.uploadFileResponse &&
      nextProps.uploadFileResponse !== this.props.uploadFileResponse
    ) {
      if (
        nextProps.uploadFileResponse.error === 0 &&
        nextProps.uploadFileResponse.content &&
        nextProps.uploadFileResponse.content.image_url
      ) {
        this.afterUploadFile(nextProps.uploadFileResponse.content.image_url);
        this.setState({
          isSaveButtonDisabled: false,
          isImageSelected: false
        });
      } else {
        message.error('Error in Upload. Please try again..');
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
    const { handleCancelModal } = this.props;
    handleCancelModal();
    this.setState({
      visible: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { uploadImageUrl, excitingValuesFields } = this.state;
    const {
      isAddExcitingValues,
      isEditExcitingValues,
      form,
      selectedAirport,
      editExcitingValuesData,
      updateExcitingValues,
      addExcitingValues,
      selectedExcitingType
    } = this.props;

    if (uploadImageUrl) {
      this.props.form.setFields({
        image: {
          value: uploadImageUrl
        }
      });
    }

    form.validateFields((err, values) => {
      if (!err) {

        Object.keys(values).forEach(key => {
          excitingValuesFields.forEach(field => {
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
        if (isAddExcitingValues) {
          const data = {
            data: excitingValuesFields
          };
          addExcitingValues(data);
        } else if (isEditExcitingValues) {
          const data = {
            exciting_id: editExcitingValuesData.id,
            data: excitingValuesFields
          };
          updateExcitingValues(data);
          // this.setState({ isSpinning: true });
        }
        this.setState({
          visible: false
        });
      }
    });
  };

  onImageBeforeUpload = (fieldInfo, info) => {
    const formData = new FormData();
    formData.append('file', info);
    if (fieldInfo.name === 'image') {
      this.setState({
        isImageSelected: true,
        isDisableImageUpload: true,
        isSaveButtonDisabled: true
      });
    }
    this.props.uploadFile({
      data: formData,
      url: UPLOAD_FILE
    });
  };

  onRemove = () => {
    message.success('Image Removed successfully');
    this.setState({ isDisableImageUpload: false, uploadImageUrl: '' });
  };

  afterUploadFile(url) {
    if (this.state.isImageSelected) {
      message.success('Image Uploaded successfully');
      this.setState({
        uploadImageUrl: url,
        isImageSelected: false,
        isSaveButtonDisabled: false
      });
    }
  }

  render() {
    const {
      excitingValuesFields,
      isSaveButtonDisabled,
      isDisableImageUpload
    } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { isEditExcitingValues, editExcitingValuesData } = this.props;
    // const props = {
    //   listType: 'picture',
    //   onRemove: this.onRemove,
    //   beforeUpload: file => {
    //     this.onImageBeforeUpload(file);
    //     return false;
    //   },
    //   defaultFileList:
    //     this.props.editExcitingValuesData &&
    //     this.props.editExcitingValuesData.image
    //       ? [
    //           {
    //             uid: '1',
    //             name: this.props.editExcitingValuesData.image,
    //             status: 'done',
    //             url: this.props.editExcitingValuesData.image
    //           }
    //         ]
    //       : null
    // };
    return (
      <div className="modal">
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          className="modal"
        >
          <FormComponent
            formFields={excitingValuesFields}
            getFieldDecorator={getFieldDecorator}
            handleSubmit={this.handleSubmit}
            headerName={
              editExcitingValuesData &&
              editExcitingValuesData &&
              editExcitingValuesData.category
                ? `Edit Exciting  ${editExcitingValuesData.category}`
                : 'Add New Exciting '
            }
            handleCancel={this.handleCancel}
            isSaveButtonDisabled={isSaveButtonDisabled}
            onImageBeforeUpload={this.onImageBeforeUpload}
            isDisableImageUpload={isDisableImageUpload}
            onRemove={this.onRemove}
          />
          {/* <Form onSubmit={this.handleSubmit} className="modal__form">
            <Row type="flex" justify="space-between">
              <Row className="modal__form-item">
                <Form.Item label="Name">
                  {getFieldDecorator('exciting_name', {
                    initialValue:
                      editExcitingValuesData && editExcitingValuesData.name
                        ? editExcitingValuesData.name
                        : '',
                    rules: [
                      {
                        required: true,
                        message: 'Please input the name!'
                      }
                    ]
                  })(<Input placeholder="Enter the name" />)}
                </Form.Item>
              </Row>
              <Row className="modal__form-item">
                <Form.Item label="Color code">
                  {getFieldDecorator('exciting_color-code', {
                    initialValue:
                      editExcitingValuesData &&
                      editExcitingValuesData.color_code
                        ? editExcitingValuesData.color_code
                        : '',
                    rules: [
                      {
                        required: true,
                        message: 'Please input the color code!'
                      }
                    ]
                  })(<Input placeholder="Enter the color code" />)}
                </Form.Item>
              </Row>

              <Row className="modal__form-item">
                <Form.Item label="Image">
                  {getFieldDecorator('exciting_value_image', {
                    rules: [
                      { required: true, message: 'Please upload the image!' }
                    ]
                  })(
                    <Upload {...props}>
                      <Button disabled={this.state.isDisableImageUpload}>
                        <span className="modal__upload-text">Upload Image</span>
                        <Icon component={UploadSvg} />
                      </Button>
                    </Upload>
                  )}
                </Form.Item>
              </Row>
            </Row>

            <Row className="modal__form-item" key="order">
              <Form.Item label="Order">
                {getFieldDecorator('order', {
                  initialValue:
                    editExcitingValuesData && editExcitingValuesData.order
                      ? editExcitingValuesData.order
                      : '',
                  rules: [
                    {
                      required: true,
                      message: 'Please input the order!'
                    }
                  ]
                })(
                  <InputNumber
                    min={1}
                    // max={fieldInfo.max_length}
                    placeholder="Please input the order"
                  />
                )}
              </Form.Item>
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
    uploadFileResponse: state.uploadFile.uploadFileResponse,
    updateExcitingValuesResponse:
      state.preferences.updateExcitingValuesResponse,
    addExcitingValuesResponse: state.preferences.addExcitingValuesResponse,
    excitingValuesFieldsResponse:
      state.preferences.excitingValuesFieldsResponse,
    excitingValuesFieldsUpdateValueResponse:
      state.preferences.excitingValuesFieldsUpdateValueResponse
  };
}

ExcitingValuesModal = connect(
  mapStateToProps,
  {
    uploadFile,
    updateExcitingValues,
    addExcitingValues,
    excitingValuesFields,
    excitingValuesFieldsUpdateValue
  }
)(ExcitingValuesModal);
export default Form.create()(ExcitingValuesModal);
