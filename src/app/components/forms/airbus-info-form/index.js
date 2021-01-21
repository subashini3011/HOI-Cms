import React, { Component } from "react";
import { connect } from "react-redux";

import { UPLOAD_FILE } from "constants/api-constants";

import Loading from "components/loading";
import { Form, Row, message } from "components/ui";
import FormComponent from "components/forms/shared-form-components";

import { uploadFile } from "../../../redux/actions/uploadFileActions";
import {
  addAirbusInfo,
  editAirbusInfo,
  airbusInfoFields,
  airbusInfoFieldsUpdateValue
} from "../../../redux/actions/flightServiceActions";
import "./index.scss";

class AirbusInfoForm extends Component {
  constructor(props) {
    super(props);
    const { editRecordData } = this.props;
    this.state = {
      airbusFields: [],
      uploadAirbusImageUrl: "",
      isDisableAirbusImageUpload: false,
      isSaveButtonDisabled: false,
      isLoading: true
    };
  }

  componentDidMount() {
    const {
      isEditAirbusInfoForm,
      isAddAirbusInfoForm,
      editRecordData,
      airbusInfoFields,
      airbusInfoFieldsUpdateValue
    } = this.props;
    // if (isEditAirbusInfoForm) {
    //   const { airbusFields } = this.state;
    //   let { uploadAirbusImageUrl, isDisableAirbusImageUpload } = this.state;
    //   console.log(editRecordData);
    //   if (editRecordData) {
    //     uploadAirbusImageUrl = editRecordData.image;
    //     isDisableAirbusImageUpload = true;
    //   }
    //   this.setState({
    //     uploadAirbusImageUrl,
    //     isDisableAirbusImageUpload
    //   });
    // }

    if (isEditAirbusInfoForm) {
      airbusInfoFieldsUpdateValue({ airbus_id: editRecordData.id });
    } else if (isAddAirbusInfoForm) {
      airbusInfoFields();
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      addAirbusInfoResponse,
      editAirbusInfoResponse,
      uploadFileResponse,
      airbusInfoFieldsResponse,
      airbusInfoFieldsUpdateValueResponse
    } = this.props;
    if (
      nextProps.airbusInfoFieldsResponse &&
      nextProps.airbusInfoFieldsResponse !== airbusInfoFieldsResponse
    ) {
      if (
        nextProps.airbusInfoFieldsResponse.error === 0 &&
        nextProps.airbusInfoFieldsResponse.content
      ) {
        const airbusFields = nextProps.airbusInfoFieldsResponse.content;
        this.setState({
          airbusFields,
          isLoading: false
        });
      }
    }
    if (
      nextProps.airbusInfoFieldsUpdateValueResponse &&
      nextProps.airbusInfoFieldsUpdateValueResponse !==
        airbusInfoFieldsUpdateValueResponse
    ) {
      if (
        nextProps.airbusInfoFieldsUpdateValueResponse.error === 0 &&
        nextProps.airbusInfoFieldsUpdateValueResponse.content
      ) {
        let { uploadAirbusImageUrl, isDisableAirbusImageUpload } = this.state;
        const airbusFields =
          nextProps.airbusInfoFieldsUpdateValueResponse.content;
        airbusFields.find(item =>
          item.value && item.name === "image"
            ? ((uploadAirbusImageUrl = item.value),
              (isDisableAirbusImageUpload = true))
            : null
        );
        this.setState({
          uploadAirbusImageUrl,
          isDisableAirbusImageUpload,
          airbusFields,
          isLoading: false
        });
      }
    }

    if (
      nextProps.addAirbusInfoResponse &&
      nextProps.addAirbusInfoResponse !== addAirbusInfoResponse
    ) {
      if (
        nextProps.addAirbusInfoResponse.error === 0 &&
        nextProps.addAirbusInfoResponse.message
      ) {
        message.success(nextProps.addAirbusInfoResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.addAirbusInfoResponse.message);
        this.setState({ isLoading: false });
      }
    }

    if (
      nextProps.editAirbusInfoResponse &&
      nextProps.editAirbusInfoResponse !== editAirbusInfoResponse
    ) {
      if (
        !nextProps.editAirbusInfoResponse.error &&
        nextProps.editAirbusInfoResponse.message
      ) {
        message.success(nextProps.editAirbusInfoResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.editAirbusInfoResponse.message);
        this.setState({ isLoading: false });
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
        const { isSaveButtonDisabled } = this.state;
        message.success("Airbus Image Uploaded successfully");
        this.setState({
          uploadAirbusImageUrl: nextProps.uploadFileResponse.content.image_url,
          isSaveButtonDisabled: false
        });
      } else {
        message.error("Error in Upload. Please try again..");
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    const { uploadAirbusImageUrl, airbusFields } = this.state;
    const {
      isAddAirbusInfoForm,
      isEditAirbusInfoForm,
      editRecordData,
      selectedAirport
    } = this.props;
    if (uploadAirbusImageUrl) {
      this.props.form.setFields({
        image: {
          value: uploadAirbusImageUrl
        }
      });
    }
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Object.keys(values).forEach(key => {
          airbusFields.forEach(field => {
            if (field.name === "rating") {
              field.value = 5;
            }
            if (field.name === key) {
              if (field.display) {
                field.value = field.value =
                  values[key] === undefined ? "" : values[key];
              }
            }
          });
        });

        if (isAddAirbusInfoForm) {
          this.setState({ isLoading: true });
          const data = {
            data: airbusFields
          };
          this.props.addAirbusInfo(data);
        } else if (isEditAirbusInfoForm && editRecordData) {
          this.setState({ isLoading: true });
          const updateData = {
            airbus_id: editRecordData.id,
            data: airbusFields
          };

          this.props.editAirbusInfo(updateData);
        }
      }
    });
  };

  onImageBeforeUpload = (fieldInfo, info) => {
    const formData = new FormData();
    formData.append("file", info);
    if (fieldInfo.name === "image") {
      this.setState({
        isDisableAirbusImageUpload: true,
        isSaveButtonDisabled: true
      });
    }
    this.props.uploadFile({
      data: formData,
      url: UPLOAD_FILE
    });
  };

  onRemove = () => {
    message.success("Airbus Image Removed successfully");
    this.setState({
      isDisableAirbusImageUpload: false,
      uploadAirbusImageUrl: ""
    });
  };

  render() {
    const {
      isLoading,
      airbusFields,
      isSaveButtonDisabled,
      isDisableAirbusImageUpload
    } = this.state;
    const { headerName, handleCancel } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {!isLoading && airbusFields && (
          <FormComponent
            formFields={airbusFields}
            getFieldDecorator={getFieldDecorator}
            handleSubmit={this.handleSubmit}
            headerName={headerName}
            isSaveButtonDisabled={isSaveButtonDisabled}
            handleCancel={handleCancel}
            onImageBeforeUpload={this.onImageBeforeUpload}
            isDisableImageUpload={isDisableAirbusImageUpload}
            onRemove={this.onRemove}
          />
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    airbusInfoFieldsResponse: state.flightService.airbusInfoFieldsResponse,
    airbusInfoFieldsUpdateValueResponse:
      state.flightService.airbusInfoFieldsUpdateValueResponse,
    uploadFileResponse: state.uploadFile.uploadFileResponse,
    addAirbusInfoResponse: state.flightService.addAirbusInfoResponse,
    editAirbusInfoResponse: state.flightService.editAirbusInfoResponse
  };
}

AirbusInfoForm = connect(
  mapStateToProps,
  {
    uploadFile,
    airbusInfoFields,
    airbusInfoFieldsUpdateValue,
    addAirbusInfo,
    editAirbusInfo
  }
)(AirbusInfoForm);

export default Form.create()(AirbusInfoForm);
