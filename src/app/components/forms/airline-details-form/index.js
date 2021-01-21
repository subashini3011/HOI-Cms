import React, { Component } from "react";
import { connect } from "react-redux";

import Loading from "components/loading";
import { Form, Row, message } from "components/ui";
import FormComponent from "components/forms/shared-form-components";
import { UPLOAD_FILE } from "constants/api-constants";

import {
  addAirlineDetails,
  editAirlineDetails,
  airlineDetailsFields,
  airlineDetailsFieldsUpdateValue
} from "../../../redux/actions/flightServiceActions";

import { uploadFile } from "../../../redux/actions/uploadFileActions";
import "./index.scss";

class AirlineDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airlineDetailsFields: [],
      isLoading: true,
      uploadAirlineDetailsImageUrl: "",
      isDisableAirlineDetailsImageUpload: false,
      isSaveButtonDisabled: false
    };
  }

  componentDidMount() {
    const {
      isEditAirlineDetailsForm,
      isAddAirlineDetailsForm,
      editRecordData,
      airlineDetailsFields,
      airlineDetailsFieldsUpdateValue
    } = this.props;
    if (isEditAirlineDetailsForm) {
      airlineDetailsFieldsUpdateValue({ code: editRecordData.code });
    } else if (isAddAirlineDetailsForm) {
      airlineDetailsFields();
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      addAirlineDetailsResponse,
      editAirlineDetailsResponse,
      airlineDetailsFieldsResponse,
      airlineDetailsFieldsUpdateValueResponse,
      uploadFileResponse
    } = this.props;

    if (
      nextProps.airlineDetailsFieldsResponse &&
      nextProps.airlineDetailsFieldsResponse !== airlineDetailsFieldsResponse
    ) {
      if (
        nextProps.airlineDetailsFieldsResponse.error === 0 &&
        nextProps.airlineDetailsFieldsResponse.content
      ) {
        const airlineDetailsFields =
          nextProps.airlineDetailsFieldsResponse.content;
        this.setState({
          airlineDetailsFields,
          isLoading: false
        });
      }
    }
    if (
      nextProps.airlineDetailsFieldsUpdateValueResponse &&
      nextProps.airlineDetailsFieldsUpdateValueResponse !==
        airlineDetailsFieldsUpdateValueResponse
    ) {
      if (
        nextProps.airlineDetailsFieldsUpdateValueResponse.error === 0 &&
        nextProps.airlineDetailsFieldsUpdateValueResponse.content
      ) {
        let {
          uploadAirlineDetailsImageUrl,
          isDisableAirlineDetailsImageUpload
        } = this.state;
        const airlineDetailsFields =
          nextProps.airlineDetailsFieldsUpdateValueResponse.content;
        airlineDetailsFields.find(item =>
          item.value && item.name === "logo"
            ? ((uploadAirlineDetailsImageUrl = item.value),
              (isDisableAirlineDetailsImageUpload = true))
            : null
        );
        this.setState({
          uploadAirlineDetailsImageUrl,
          isDisableAirlineDetailsImageUpload,
          airlineDetailsFields,
          isLoading: false
        });
      }
    }

    if (
      nextProps.addAirlineDetailsResponse &&
      nextProps.addAirlineDetailsResponse !== addAirlineDetailsResponse
    ) {
      if (
        nextProps.addAirlineDetailsResponse.error === 0 &&
        nextProps.addAirlineDetailsResponse.message
      ) {
        message.success(nextProps.addAirlineDetailsResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.addAirlineDetailsResponse.message);
        this.setState({ isLoading: false });
      }
    }

    if (
      nextProps.editAirlineDetailsResponse &&
      nextProps.editAirlineDetailsResponse !== editAirlineDetailsResponse
    ) {
      if (
        !nextProps.editAirlineDetailsResponse.error &&
        nextProps.editAirlineDetailsResponse.message
      ) {
        message.success(nextProps.editAirlineDetailsResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.editAirlineDetailsResponse.message);
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
        message.success("AirlineDetails Image Uploaded successfully");
        this.setState({
          uploadAirlineDetailsImageUrl:
            nextProps.uploadFileResponse.content.image_url,
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
    const { uploadAirlineDetailsImageUrl, airlineDetailsFields } = this.state;
    const {
      isAddAirlineDetailsForm,
      isEditAirlineDetailsForm,
      editRecordData,
      selectedAirport
    } = this.props;
    if (uploadAirlineDetailsImageUrl) {
      this.props.form.setFields({
        logo: {
          value: uploadAirlineDetailsImageUrl
        }
      });
    }
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Object.keys(values).forEach(key => {
          airlineDetailsFields.forEach(field => {
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

        if (isAddAirlineDetailsForm) {
          this.setState({ isLoading: true });
          const data = {
            data: airlineDetailsFields
          };
          this.props.addAirlineDetails(data);
        } else if (isEditAirlineDetailsForm && editRecordData) {
          this.setState({ isLoading: true });
          const updateData = {
            code: editRecordData.code,
            data: airlineDetailsFields
          };

          this.props.editAirlineDetails(updateData);
        }
      }
    });
  };
  onImageBeforeUpload = (fieldInfo, info) => {
    const formData = new FormData();
    formData.append("file", info);
    if (fieldInfo.name === "logo") {
      this.setState({
        isDisableAirlineDetailsImageUpload: true,
        isSaveButtonDisabled: true
      });
    }
    this.props.uploadFile({
      data: formData,
      url: UPLOAD_FILE
    });
  };

  onRemove = () => {
    message.success("AirlineDetails Image Removed successfully");
    this.setState({
      isDisableAirlineDetailsImageUpload: false,
      uploadAirlineDetailsImageUrl: ""
    });
  };

  render() {
    const {
      isLoading,
      airlineDetailsFields,
      isSaveButtonDisabled,
      isDisableAirbusImageUpload
    } = this.state;
    const { headerName, handleCancel } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {!isLoading && airlineDetailsFields && (
          <FormComponent
            formFields={airlineDetailsFields}
            getFieldDecorator={getFieldDecorator}
            handleSubmit={this.handleSubmit}
            headerName={headerName}
            handleCancel={handleCancel}
            isSaveButtonDisabled={isSaveButtonDisabled}
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
    airlineDetailsFieldsResponse:
      state.flightService.airlineDetailsFieldsResponse,
    airlineDetailsFieldsUpdateValueResponse:
      state.flightService.airlineDetailsFieldsUpdateValueResponse,
    addAirlineDetailsResponse: state.flightService.addAirlineDetailsResponse,
    editAirlineDetailsResponse: state.flightService.editAirlineDetailsResponse,
    uploadFileResponse: state.uploadFile.uploadFileResponse
  };
}

AirlineDetailsForm = connect(
  mapStateToProps,
  {
    airlineDetailsFields,
    airlineDetailsFieldsUpdateValue,
    addAirlineDetails,
    editAirlineDetails,
    uploadFile
  }
)(AirlineDetailsForm);

export default Form.create()(AirlineDetailsForm);
