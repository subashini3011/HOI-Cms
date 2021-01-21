import "./index.scss";
import React, { Component } from "react";

import { connect } from "react-redux";

import { UPLOAD_FILE } from "constants/api-constants";
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
  addCategory,
  editCategory
} from "../../../redux/actions/outletsActions";
import { uploadFile } from "../../../redux/actions/uploadFileActions";

class CategoryMoodal extends Component {
  constructor(props) {
    super(props);
    const { editRecord } = this.props;
    this.state = {
      visible: false,
      isDisableImageUpload: !!(editRecord && editRecord.image),
      uploadImageUrl: editRecord && editRecord.image ? editRecord.image : "",
      // isSpinning: false,
      isSaveButtonDisabled: false
    };
  }

  componentDidMount() {
    const { showModal } = this.props;
    this.setState({ visible: showModal });
  }

  componentWillReceiveProps(nextProps) {
    const {
      showModal,
      addCategoryResponse,
      editCategoryResponse,
      uploadFileResponse,
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
      nextProps.addCategoryResponse &&
      nextProps.addCategoryResponse !== addCategoryResponse
    ) {
      if (
        nextProps.addCategoryResponse.error === 0 &&
        nextProps.addCategoryResponse.message
      ) {
        message.success(nextProps.addCategoryResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.addCategoryResponse.message);
        this.setState({ isSpinning: false });
      }
    }
    if (
      nextProps.editCategoryResponse &&
      nextProps.editCategoryResponse !== editCategoryResponse
    ) {
      if (
        !nextProps.editCategoryResponse.error &&
        nextProps.editCategoryResponse.message
      ) {
        message.success(nextProps.editCategoryResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.editCategoryResponse.message);
        this.setState({ isSpinning: false });
      }
    }
    if (
      nextProps.uploadFileResponse &&
      nextProps.uploadFileResponse !== uploadFileResponse
    ) {
      if (
        nextProps.uploadFileResponse.error === 0 &&
        nextProps.uploadFileResponse.content &&
        nextProps.uploadFileResponse.content.image_url
      ) {
        message.success("Image Uploaded successfully");
        this.setState({
          uploadImageUrl: nextProps.uploadFileResponse.content.image_url,
          isSaveButtonDisabled: false
        });
      } else {
        message.error("Error in Upload. Please try again..");
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
      isAddCategory,
      isEditCategory,
      form,
      addCategory,
      editRecord,
      editCategory
    } = this.props;
    form.setFields({
      image: {
        value: uploadImageUrl
      }
    });
    form.validateFields((err, values) => {
      if (!err) {
        const data = {
          name: values.name,
          image: uploadImageUrl,
          id: ""
        };

        if (isAddCategory) {
          data.selected_image = "";
          // this.setState({ isSpinning: true });
          addCategory(data);
        } else if (isEditCategory) {
          data.id = editRecord.id;
          // data.location_id = this.props.editRecord.location_id;
          this.setState({ isSpinning: true });
          editCategory(data);
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
    const { uploadFile } = this.props;
    const formData = new FormData();
    formData.append("file", info);
    this.setState({ isDisableImageUpload: true, isSaveButtonDisabled: true });
    uploadFile({
      data: formData,
      url: UPLOAD_FILE
    });
  };

  onRemove = () => {
    message.success("Image Removed successfully");
    this.setState({ isDisableImageUpload: false, uploadImageUrl: "" });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isEditCategory, editRecord } = this.props;
    const props = {
      listType: "picture",
      onRemove: this.onRemove,
      beforeUpload: file => {
        this.onImageBeforeUpload(file);
        return false;
      },
      defaultFileList:
        editRecord && editRecord.image
          ? [
              {
                uid: "1",
                name: editRecord.image.replace(
                  "https://storage.googleapis.com/hoi-users/",
                  ""
                ),
                status: "done",
                url: editRecord.image
              }
            ]
          : null
    };
    return (
      <div>
        <Modal
          title={
            isEditCategory && editRecord && editRecord.name
              ? `Edit Category ${editRecord.name}`
              : "Add New Category"
          }
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form onSubmit={this.handleSubmit} className="modal__form">
            <Row type="flex" justify="space-between">
              <Row className="modal__form-item">
                <Form.Item label="Category Name">
                  {getFieldDecorator("name", {
                    initialValue:
                      editRecord && editRecord.name ? editRecord.name : "",
                    rules: [
                      {
                        required: true,
                        message: "Please input the category name!"
                      }
                    ]
                  })(<Input placeholder="Enter the Category name" />)}
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
    editCategoryResponse: state.outlets.editCategoryResponse,
    addCategoryResponse: state.outlets.addCategoryResponse
  };
}

CategoryMoodal = connect(
  mapStateToProps,
  {
    uploadFile,
    editCategory,
    addCategory
  }
)(CategoryMoodal);
export default Form.create()(CategoryMoodal);
