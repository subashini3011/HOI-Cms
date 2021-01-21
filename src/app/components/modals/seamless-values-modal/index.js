import './index.scss';
import React, { Component } from 'react';

import { connect } from 'react-redux';

// components
import { Modal, Form, message } from 'components/ui';
import { UPLOAD_FILE } from 'constants/api-constants';
import {
  addSeamlessValues,
  updateSeamlessValues,
  seamlessValuesFields,
  seamlessValuesFieldsUpdateValue
} from '../../../redux/actions/preferencesActions';
import { uploadFile } from '../../../redux/actions/uploadFileActions';
import FormComponent from 'components/forms/shared-form-components';

import FormButtons from 'components/forms/shared-form-components/new-form-buttons';
import { UploadSvg } from 'components/svg-icons-component';

class SeamlessValuesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      seamlessValuesFields: [],
      isDisableImageUpload: !!(
        this.props.editSeamlessValuesData &&
        this.props.editSeamlessValuesData.image
      ),
      uploadImageUrl:
        this.props.editSeamlessValuesData &&
        this.props.editSeamlessValuesData.image
          ? this.props.editSeamlessValuesData.image
          : '',
      isImageSelected: false
    };
  }

  componentDidMount() {
    const {
      showModal,
      editSeamlessValuesData,
      isAddSeamlessValues,
      isEditSeamlessValues,
      seamlessValuesFields,
      seamlessValuesFieldsUpdateValue
    } = this.props;
    if (isAddSeamlessValues) {
      seamlessValuesFields();
    } else if (isEditSeamlessValues) {
      seamlessValuesFieldsUpdateValue({
        seamless_id: editSeamlessValuesData.id
      });
    }
    this.setState({ visible: showModal });
  }

  componentWillReceiveProps(nextProps) {
    const {
      showModal,
      addSeamlessValuesResponse,
      updateSeamlessValuesResponse,
      seamlessValuesFieldsResponse,
      seamlessValuesFieldsUpdateValueResponse,
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
      nextProps.seamlessValuesFieldsResponse &&
      nextProps.seamlessValuesFieldsResponse !== seamlessValuesFieldsResponse
    ) {
      if (
        nextProps.seamlessValuesFieldsResponse.error === 0 &&
        nextProps.seamlessValuesFieldsResponse.content
      ) {
        this.setState({
          seamlessValuesFields: nextProps.seamlessValuesFieldsResponse.content
        });
      } else {
        message.error(nextProps.seamlessValuesFieldsResponse.message);
        this.setState({ isSpinning: false });
      }
    }

    if (
      nextProps.seamlessValuesFieldsUpdateValueResponse &&
      nextProps.seamlessValuesFieldsUpdateValueResponse !==
        seamlessValuesFieldsUpdateValueResponse
    ) {
      if (
        nextProps.seamlessValuesFieldsUpdateValueResponse.error === 0 &&
        nextProps.seamlessValuesFieldsUpdateValueResponse.content
      ) {
        this.setState({
          seamlessValuesFields:
            nextProps.seamlessValuesFieldsUpdateValueResponse.content
        });
      } else {
        message.error(
          nextProps.seamlessValuesFieldsUpdateValueResponse.message
        );
        this.setState({ isSpinning: false });
      }
    }

    if (
      nextProps.addSeamlessValuesResponse &&
      nextProps.addSeamlessValuesResponse !== addSeamlessValuesResponse
    ) {
      if (
        nextProps.addSeamlessValuesResponse.error === 0 &&
        nextProps.addSeamlessValuesResponse.message
      ) {
        message.success(nextProps.addSeamlessValuesResponse.message);
        this.props.toggleForm();
        this.setState({ visible: false });
      } else {
        message.error(nextProps.addSeamlessValuesResponse.message);
        this.setState({ isSpinning: false });
      }
    }
    if (
      nextProps.updateSeamlessValuesResponse &&
      nextProps.updateSeamlessValuesResponse !== updateSeamlessValuesResponse
    ) {
      if (
        !nextProps.updateSeamlessValuesResponse.error &&
        nextProps.updateSeamlessValuesResponse.message
      ) {
        message.success(nextProps.updateSeamlessValuesResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.updateSeamlessValuesResponse.message);
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
    const { uploadImageUrl, seamlessValuesFields } = this.state;
    const {
      isAddSeamlessValues,
      isEditSeamlessValues,
      form,
      selectedAirport,
      editSeamlessValuesData,
      updateSeamlessValues,
      addSeamlessValues,
      selectedSeamlessType
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
          seamlessValuesFields.forEach(field => {
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
        if (isAddSeamlessValues) {
          const data = {
            data: seamlessValuesFields
          };
          addSeamlessValues(data);
        } else if (isEditSeamlessValues) {
          const data = {
            seamless_id: editSeamlessValuesData.id,
            data: seamlessValuesFields
          };
          updateSeamlessValues(data);
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
      seamlessValuesFields,
      isSaveButtonDisabled,
      isDisableImageUpload
    } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { isEditSeamlessValues, editSeamlessValuesData } = this.props;
    // const props = {
    //   listType: 'picture',
    //   onRemove: this.onRemove,
    //   beforeUpload: file => {
    //     this.onImageBeforeUpload(file);
    //     return false;
    //   },
    //   defaultFileList:
    //     this.props.editSeamlessValuesData &&
    //     this.props.editSeamlessValuesData.image
    //       ? [
    //           {
    //             uid: '1',
    //             name: this.props.editSeamlessValuesData.image,
    //             status: 'done',
    //             url: this.props.editSeamlessValuesData.image
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
            formFields={seamlessValuesFields}
            getFieldDecorator={getFieldDecorator}
            handleSubmit={this.handleSubmit}
            headerName={
              editSeamlessValuesData &&
              editSeamlessValuesData &&
              editSeamlessValuesData.category
                ? `Edit Seamless  ${editSeamlessValuesData.category}`
                : 'Add New Seamless '
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
                  {getFieldDecorator('seamless_name', {
                    initialValue:
                      editSeamlessValuesData && editSeamlessValuesData.name
                        ? editSeamlessValuesData.name
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
                  {getFieldDecorator('seamless_color-code', {
                    initialValue:
                      editSeamlessValuesData &&
                      editSeamlessValuesData.color_code
                        ? editSeamlessValuesData.color_code
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
                  {getFieldDecorator('seamless_value_image', {
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
                    editSeamlessValuesData && editSeamlessValuesData.order
                      ? editSeamlessValuesData.order
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
    updateSeamlessValuesResponse:
      state.preferences.updateSeamlessValuesResponse,
    addSeamlessValuesResponse: state.preferences.addSeamlessValuesResponse,
    seamlessValuesFieldsResponse:
      state.preferences.seamlessValuesFieldsResponse,
    seamlessValuesFieldsUpdateValueResponse:
      state.preferences.seamlessValuesFieldsUpdateValueResponse
  };
}

SeamlessValuesModal = connect(
  mapStateToProps,
  {
    uploadFile,
    updateSeamlessValues,
    addSeamlessValues,
    seamlessValuesFields,
    seamlessValuesFieldsUpdateValue
  }
)(SeamlessValuesModal);
export default Form.create()(SeamlessValuesModal);
