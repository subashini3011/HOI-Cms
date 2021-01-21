import "./index.scss";
import React, { Component } from "react";

import { connect } from "react-redux";

import { UPLOAD_FILE } from "constants/api-constants";
//components
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
  addSubCategory,
  editSubCategory
} from "../../../redux/actions/outletsActions";
import { uploadFile } from "../../../redux/actions/uploadFileActions";

class SubCategoryMoodal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isDisableImageUpload: !!(
        this.props.editRecord && this.props.editRecord.image
      ),
      uploadImageUrl:
        this.props.editRecord && this.props.editRecord.image
          ? this.props.editRecord.image
          : "",
      isImageSelected: false,

      isDisableSelectedImageUpload: !!(
        this.props.editRecord &&
        this.props.editRecord.selected_image &&
        this.props.editRecord.selected_image.indexOf(".") > 0
      ),
      uploadSelectedImageUrl:
        this.props.editRecord &&
        this.props.editRecord.selected_image &&
        this.props.editRecord.selected_image.indexOf(".") > 0
          ? this.props.editRecord.selected_image
          : "",
      isSelectedImageSelected: false,
      isSpinning: false,

      isSaveButtonDisabled: false
    };
  }

  componentDidMount() {
    const { showSubCategoryModal } = this.props;
    this.setState({ visible: showSubCategoryModal });
  }

  componentWillReceiveProps(nextProps) {
    const { showSubCategoryModal } = this.props;
    if (showSubCategoryModal) {
      this.setState({ visible: showSubCategoryModal });
    }
    if (
      nextProps.addSubCategoryResponse &&
      nextProps.addSubCategoryResponse !== this.props.addSubCategoryResponse
    ) {
      if (
        nextProps.addSubCategoryResponse.error === 0 &&
        nextProps.addSubCategoryResponse.message
      ) {
        message.success(nextProps.addSubCategoryResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.addSubCategoryResponse.message);
        this.setState({ isSpinning: false });
      }
    }
    if (
      nextProps.editSubCategoryResponse &&
      nextProps.editSubCategoryResponse !== this.props.editSubCategoryResponse
    ) {
      if (
        !nextProps.editSubCategoryResponse.error &&
        nextProps.editSubCategoryResponse.message
      ) {
        message.success(nextProps.editSubCategoryResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.editSubCategoryResponse.message);
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
          isImageSelected: false,
          isSelectedImageSelected: false
        });
      } else {
        message.error("Error in Upload. Please try again..");
      }
    }
  }

  afterUploadFile(url) {
    if (this.state.isImageSelected) {
      message.success("Image Uploaded successfully");
      this.setState({
        uploadImageUrl: url,
        isImageSelected: false,
        isSaveButtonDisabled: false
      });
    } else if (this.state.isSelectedImageSelected) {
      message.success("Selected Image Uploaded successfully");
      this.setState({
        uploadSelectedImageUrl: url,
        isSelectedImageSelected: false,
        isSaveButtonDisabled: false
      });
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
    this.props.form.setFields({
      image: {
        value: this.state.uploadImageUrl
      },
      selected_image: {
        value: this.state.uploadSelectedImageUrl
      }
    });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          name: values.sub_category,
          image: this.state.uploadImageUrl,
          selected_image: this.state.uploadSelectedImageUrl,
          id: ""
        };

        if (this.props.isAddSubCategory && this.props.selectedCategory) {
          data.id = this.props.selectedCategory.id;
          this.setState({ isSpinning: true });
          this.props.addSubCategory(data);
        } else if (this.props.isEditSubCategory) {
          data.id = this.props.editRecord.id;
          this.setState({ isSpinning: true });
          this.props.editSubCategory(data);
        }
        this.setState({
          visible: false
        });
      }
    });
    // this.setState({
    //   visible: false,
    // });
  };

  onImageBeforeUpload = info => {
    const formData = new FormData();
    formData.append("file", info);
    this.setState({
      isImageSelected: true,
      isDisableImageUpload: true,
      isSaveButtonDisabled: true
    });
    this.props.uploadFile({
      data: formData,
      url: UPLOAD_FILE
    });
  };

  onSelectedImageBeforeUpload = info => {
    const formData = new FormData();
    formData.append("file", info);
    this.setState({
      isSelectedImageSelected: true,
      isDisableSelectedImageUpload: true,
      isSaveButtonDisabled: true
    });
    this.props.uploadFile({
      data: formData,
      url: UPLOAD_FILE
    });
  };

  onRemove = () => {
    message.success("Image Removed successfully");
    this.setState({ isDisableImageUpload: false, uploadImageUrl: "" });
  };

  onRemoveSelectedImage = () => {
    message.success("Selected Image Removed successfully");
    this.setState({
      isDisableSelectedImageUpload: false,
      uploadSelectedImageUrl: ""
    });
  };

  render() {
    const { isEditSubCategory } = this.props;
    const { getFieldDecorator } = this.props.form;
    const props = {
      listType: "picture",
      onRemove: this.onRemove,
      beforeUpload: file => {
        this.onImageBeforeUpload(file);
        return false;
      },
      defaultFileList:
        this.props.editRecord && this.props.editRecord.image
          ? [
              {
                uid: "1",
                name: this.props.editRecord.image.replace(
                  "https://storage.googleapis.com/hoi-users/",
                  ""
                ),
                status: "done",
                url: this.props.editRecord.image
              }
            ]
          : null
    };

    const props2 = {
      listType: "picture",
      onRemove: this.onRemoveSelectedImage,
      beforeUpload: file => {
        this.onSelectedImageBeforeUpload(file);
        return false;
      },
      defaultFileList:
        this.props.editRecord && this.props.editRecord.selected_image
          ? [
              {
                uid: "1",
                name: this.props.editRecord.selected_image.replace(
                  "https://storage.googleapis.com/hoi-users/",
                  ""
                ),
                status: "done",
                url: this.props.editRecord.selected_image
              }
            ]
          : null
    };
    return (
      <div>
        <Modal
          title={
            isEditSubCategory &&
            this.props.editRecord &&
            this.props.editRecord.sub_category
              ? `Edit Sub-Category ${this.props.editRecord.sub_category}`
              : "Add New Sub-Category"
          }
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form onSubmit={this.handleSubmit} className="modal__form">
            <Row type="flex" justify="space-between">
              <Row className="modal__form-item">
                <Form.Item label="Sub Category Name">
                  {getFieldDecorator("sub_category", {
                    initialValue:
                      this.props.editRecord &&
                      this.props.editRecord.sub_category
                        ? this.props.editRecord.sub_category
                        : undefined,
                    rules: [
                      {
                        required: true,
                        message: "Please input the sub-category name!"
                      }
                    ]
                  })(<Input placeholder="Enter the Sub-Category name" />)}
                </Form.Item>
              </Row>
              <Row className="modal__form-item">
                <Form.Item label="Image">
                  {getFieldDecorator("image", {
                    rules: [
                      { required: true, message: "Please upload the image!" }
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
              <Row className="modal__form-item">
                <Form.Item label="Selected Image">
                  {getFieldDecorator("selected_image", {
                    rules: [
                      {
                        required: true,
                        message: "Please upload the Selected image!"
                      }
                    ]
                  })(
                    <Upload {...props2}>
                      <Button
                        disabled={this.state.isDisableSelectedImageUpload}
                      >
                        <span className="modal__upload-text">
                          Upload Selected Image
                        </span>
                        <Icon component={UploadSvg} />
                      </Button>
                    </Upload>
                  )}
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
    uploadFileResponse: state.uploadFile.uploadFileResponse,
    editSubCategoryResponse: state.outlets.editSubCategoryResponse,
    addSubCategoryResponse: state.outlets.addSubCategoryResponse
  };
}

SubCategoryMoodal = connect(
  mapStateToProps,
  {
    uploadFile,
    editSubCategory,
    addSubCategory
  }
)(SubCategoryMoodal);
export default Form.create()(SubCategoryMoodal);
