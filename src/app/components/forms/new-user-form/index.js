import React, { Component } from "react";
import "./index.scss";

import { connect } from "react-redux";

import { UPLOAD_FILE } from "constants/api-constants";

import {
  addUser,
  editUser,
  getUserFields,
  getUserFieldsUpdateValue
} from "../../../redux/actions/userActions";
import { uploadFile } from "../../../redux/actions/uploadFileActions";
import * as User from "../../../shared/app-data/user";

import Loading from "components/loading";
import FormComponent from "components/forms/shared-form-components";
import { Form, message } from "components/ui";

class NewUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editStoreData: "",
      editedProfileData: "",
      currentSelectedRole: "",
      currentSelectedAiport: "",
      isDisableImageUpload: !!(
        this.props.editRecord &&
        this.props.editRecord.profile_pic &&
        this.props.editRecord.profile_pic.indexOf(".") > 0
      ),
      isSpinning: false,
      isLoading: true,
      userFields: [],
      isSaveButtonDisabled: false,
      airportSelValue: "",
      selTerminalSideValue: "",
    };
  }

  componentDidMount() {
    const {
      isEditUserForm,
      isAddUserForm,
      editRecordData,
      getUserFields
    } = this.props;
    if (isEditUserForm && editRecordData) {
      const data = {
        user_info: {
          user_id: editRecordData.id,
          role: editRecordData.role,
          logIn_user_id: editRecordData.logIn_user_id
        }
      };
      this.props.getUserFieldsUpdateValue(data);
    }
    if (isAddUserForm) {
      const userInfo = User.getUserData();
      const userData = {
        user_info: {
          role: userInfo.role,
          logIn_user_id: userInfo.id
        }
      };
      getUserFields(userData);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      getUserFieldsResponse,
      addUserResponse,
      getUserFieldsUpdateValueResponse
    } = this.props;

    if (
      nextProps.getUserFieldsResponse &&
      nextProps.getUserFieldsResponse !== getUserFieldsResponse
    ) {
      if (
        nextProps.getUserFieldsResponse.error === 0 &&
        nextProps.getUserFieldsResponse.content
      ) {
        const userFields = nextProps.getUserFieldsResponse.content;
        let { currentSelectedAiport } = this.props;
        userFields.find(item =>
          item.name === "airport" && item.value
            ? (currentSelectedAiport = item.value)
            : null
        );
        this.setState({ userFields, currentSelectedAiport, isLoading: false });
      }
    }

    if (
      nextProps.addUserResponse &&
      nextProps.addUserResponse !== addUserResponse
    ) {
      if (
        nextProps.addUserResponse.error === 0 &&
        nextProps.addUserResponse.message
      ) {
        message.success(nextProps.addUserResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.addUserResponse.message);
        this.setState({ isLoading: false });
      }
    }

    if (
      nextProps.getUserFieldsUpdateValueResponse &&
      nextProps.getUserFieldsUpdateValueResponse !==
        getUserFieldsUpdateValueResponse
    ) {
      if (
        nextProps.getUserFieldsUpdateValueResponse.error === 0 &&
        nextProps.getUserFieldsUpdateValueResponse.content &&
        nextProps.getUserFieldsUpdateValueResponse.content.data
      ) {
        let { currentSelectedRole, currentSelectedAiport,airportSelValue,selTerminalSideValue } = this.state;

        const userFields =
          nextProps.getUserFieldsUpdateValueResponse.content.data;
        userFields.find(item =>
          item.name === "role" ? (currentSelectedRole = item.value) : null
        );
        userFields.find(item =>
          item.name === "airport" ? (currentSelectedAiport = item.value) : null
        );
        const dataValue = nextProps.getUserFieldsUpdateValueResponse.content.data[13].child_element;
        const airport = dataValue.find(item =>
          item.name === "airport_code" ? (airportSelValue = item.value):null);
          const terminal = dataValue.find(item =>
            item.name === "terminal" ? (selTerminalSideValue = item.value):null);
  
        const editStoreData =
          nextProps.getUserFieldsUpdateValueResponse.content.store_data;
        this.setState({
          editStoreData,
          currentSelectedRole,
          currentSelectedAiport,
          userFields,
          selTerminalSideValue:terminal,
          airportSelValue:airport,
          isLoading: false
        });
      }
    }

    if (
      nextProps.editUserResponse &&
      nextProps.editUserResponse !== this.props.editUserResponse
    ) {
      if (
        !nextProps.editUserResponse.error &&
        nextProps.editUserResponse.message
      ) {
        message.success(nextProps.editUserResponse.message);
        if (this.props.toggleForm) {
          this.props.toggleForm();
        } else {
          this.props.AfterUserProfileEdit(this.state.editedProfileData);
        }
      } else {
        message.error(nextProps.editUserResponse.message);
        this.setState({ isLoading: false });
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
        message.success("Image Uploaded successfully");
        this.setState({
          uploadProfileImageUrl: nextProps.uploadFileResponse.content.image_url,
          isSaveButtonDisabled: false
        });
      } else {
        message.error("Error in Upload. Please try again..");
      }
    }
  }

  validatetwinSelect = (value, fieldName) => {
    let { currentSelectedAiport } = this.state;
    if (fieldName === "role") {
      this.props.form.setFields({
        airport: {
          value: undefined
        },
        store: {
          value: undefined
        }
      });
      const Role = User.getUserRole();
      if (Role !== "Store Supervisor" && Role !== "Airport Admin") {
        currentSelectedAiport = "";
      }
      this.setState({
        currentSelectedRole: value,
        currentSelectedAiport
      });
    } else if (fieldName === "airport") {
      this.props.form.setFields({
        store: {
          value: undefined
        }
      });
      this.setState({ currentSelectedAiport: value });
    }
    this.setState({ twinSelected: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    const { uploadProfileImageUrl, userFields } = this.state;
    const {
      isAddUserForm,
      isEditUserForm,
      editRecordData,
      selectedAirport
    } = this.props;
    if (uploadProfileImageUrl) {
      this.props.form.setFields({
        image: {
          value: uploadProfileImageUrl
        }
      });
    } else {
      userFields.forEach(field => {
        if (field.name === "image") {
          this.props.form.setFields({
            image: {
              value: field.value
            }
          });
        }
      });
    }
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue,
          dob: fieldsValue.dob.format("DD-MM-YYYY")
        };
        Object.keys(values).forEach(key => {
          userFields.forEach(field => {
            if (field.name === "rating") {
              field.value = 5;
            }
            if (field.name === "is_kiosk" && key === "is_kiosk") {
              field.value = values[key];
            }
            if (field.name === "is_kiosk") {
              field.child_element &&
                field.child_element.length > 0 &&
                field.child_element.forEach((childField, index) => {
                  if (field.child_element[index].name === key) {
                    field.child_element[index].value = values[key];
                  }
                });
            }

            if (field.name === key) {
              if (field.display) {
                if (field.name === "store" && !Array.isArray(values[key])) {
                  field.value.push(values[key]);
                } else {
                  field.value = field.value =
                    values[key] === undefined ? "" : values[key];
                }
              }
            }
          });
        });

        // airport_code: 6
        // terminal_side: "Domestic"
        // terminal: "T3"
        // terminal_type: "Departure"

        if (isAddUserForm) {
          this.setState({ isLoading: true });
          const data = {
            user_data: userFields,
            user_id: User.getUserId()
          };
          this.props.addUser(data);
        } else if (isEditUserForm && editRecordData) {
          this.setState({ isLoading: true });
          const updateData = {
            user_data: userFields,
            user_info: {
              user_id: editRecordData.id,
              role: editRecordData.role
            }
          };
          this.props.editUser(updateData);
        }
        // this.setState({ isSpinning: true });
      }
    });
  };

  onImageBeforeUpload = (fieldInfo, info) => {
    const formData = new FormData();
    formData.append("file", info);
    if (fieldInfo.name === "image") {
      this.setState({
        isDisableStoreLogoUpload: true,
        isSaveButtonDisabled: true
      });
    }
    this.props.uploadFile({
      data: formData,
      url: UPLOAD_FILE
    });
  };


  validateDropDown = (value, fieldName) => {
    if (fieldName === "airport_code") {
      this.props.form.setFields({
        terminal_side: {
          value: undefined
        },
        terminal: {
          value: undefined
        },
      });
      this.setState({ airportSelValue:value,selTerminalSideValue:''})

    } else if (fieldName === "terminal_side") {
      this.props.form.setFields({
        terminal: {
          value: undefined
        },
      });
      this.setState({ selTerminalSideValue:value})
    }  
  };



  onRemove = () => {
    message.success("Image Removed successfully");
    this.setState({ isDisableImageUpload: false, uploadProfileImageUrl: "" });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { form } = this.props;
    const {
      userFields,
      isLoading,
      currentSelectedRole,
      currentSelectedAiport,
      isSaveButtonDisabled,
      airportSelValue,
      selTerminalSideValue,
    } = this.state;
    const { handleCancel, headerName,isEditUserForm } = this.props;
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {!isLoading && userFields && (
          <FormComponent
            formFields={userFields}
            getFieldDecorator={getFieldDecorator}
            handleSubmit={this.handleSubmit}
            headerName={headerName}
            currentSelectedRole={currentSelectedRole}
            currentSelectedAiport={currentSelectedAiport}
            validatetwinSelect={this.validatetwinSelect}
            isSaveButtonDisabled={isSaveButtonDisabled}
            handleCancel={handleCancel}
            formCurrentValues={form}
            validatetwinSelectNested ={this.validateDropDown}
            airportSelValue={airportSelValue}
            selTerminalSideValue={selTerminalSideValue}
          />
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    addUserResponse: state.users.addUserResponse,
    editUserResponse: state.users.editUserResponse,
    uploadFileResponse: state.uploadFile.uploadFileResponse,
    getUserFieldsResponse: state.users.getUserFieldsResponse,
    getUserFieldsUpdateValueResponse:
      state.users.getUserFieldsUpdateValueResponse
  };
}

NewUserForm = connect(mapStateToProps, {
  addUser,
  editUser,
  uploadFile,
  getUserFields,
  getUserFieldsUpdateValue
})(NewUserForm);

export default Form.create()(NewUserForm);
