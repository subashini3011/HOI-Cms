import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UPLOAD_FILE } from 'constants/api-constants';

import Loading from 'components/loading';
import { Form, Row, message } from 'components/ui';
import FormComponent from 'components/forms/shared-form-components';
import { uploadFile } from '../../../redux/actions/uploadFileActions';
import {
  addCountryDetails,
  editCountryDetails,
  countryDetailsFields,
  countryDetailsFieldsUpdateValue
} from '../../../redux/actions/countryDetailsActions';
import './index.scss';

class CountryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      upLoadFileStates: [
        {
          index: 'logo',
          name: 'logo',
          isDisable: false,
          isSelected: false,
          url: ''
        },
        {
          index: 'image',
          name: 'image',
          isDisable: false,
          isSelected: false,
          url: ''
        }
      ],
      isSaveButtonDisabled: false
    };
  }

  componentDidMount() {
    const {
      isEditCountryDetailsForm,
      isAddCountryDetailsForm,
      editRecordData,
      countryDetailsFieldsUpdateValue,
      countryDetailsFields
    } = this.props;
    if (isEditCountryDetailsForm && editRecordData) {
      const data = {
        id: editRecordData.id
      };
      countryDetailsFieldsUpdateValue(data);
    }
    if (isAddCountryDetailsForm) {
      countryDetailsFields();
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      countryDetailsFieldsResponse,
      countryDetailsFieldsUpdateValueResponse,
      addCountryDetailsResponse,
      editCountryDetailsResponse,
      uploadFileResponse
    } = this.props;
    if (
      nextProps.countryDetailsFieldsResponse &&
      nextProps.countryDetailsFieldsResponse !== countryDetailsFieldsResponse
    ) {
      if (
        nextProps.countryDetailsFieldsResponse.error === 0 &&
        nextProps.countryDetailsFieldsResponse.content
      ) {
        const countryDetailsFields =
          nextProps.countryDetailsFieldsResponse.content;
        this.setState({ countryDetailsFields, isLoading: false });
      }
    }
    if (
      nextProps.countryDetailsFieldsUpdateValueResponse &&
      nextProps.countryDetailsFieldsUpdateValueResponse !==
        countryDetailsFieldsUpdateValueResponse
    ) {
      if (
        nextProps.countryDetailsFieldsUpdateValueResponse.error === 0 &&
        nextProps.countryDetailsFieldsUpdateValueResponse.content &&
        nextProps.countryDetailsFieldsUpdateValueResponse.content
      ) {
        const { upLoadFileStates } = this.state;
        const countryDetailsFields =
          nextProps.countryDetailsFieldsUpdateValueResponse.content;
        this.state.upLoadFileStates.map(uploadFileItem => {
          countryDetailsFields.filter(item =>
            item.value && item.name === uploadFileItem.name
              ? ((uploadFileItem.url = item.value),
                (uploadFileItem.isDisable = true))
              : null
          );
        });
        this.setState({
          upLoadFileStates,
          countryDetailsFields,
          isLoading: false
        });
      }
    }

    if (
      nextProps.addCountryDetailsResponse &&
      nextProps.addCountryDetailsResponse !== addCountryDetailsResponse
    ) {
      if (
        nextProps.addCountryDetailsResponse.error === 0 &&
        nextProps.addCountryDetailsResponse.message
      ) {
        message.success(nextProps.addCountryDetailsResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.addCountryDetailsResponse.message);
        this.setState({ isSpinning: false });
      }
    }
    if (
      nextProps.editCountryDetailsResponse &&
      nextProps.editCountryDetailsResponse !== editCountryDetailsResponse
    ) {
      if (
        !nextProps.editCountryDetailsResponse.error &&
        nextProps.editCountryDetailsResponse.message
      ) {
        message.success(nextProps.editCountryDetailsResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.editCountryDetailsResponse.message);
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
        message.success('CountryDetails Image Uploaded successfully');
        this.afterUploadFile(nextProps.uploadFileResponse.content.image_url);
      } else {
        message.error('Error in Upload. Please try again..');
        upLoadFileStates.map(item => {
          return (item.isSelected = false);
        });
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    const { upLoadFileStates, countryDetailsFields } = this.state;
    const {
      isAddCountryDetailsForm,
      isEditCountryDetailsForm,
      editRecordData,
      selectedAirport
    } = this.props;
    upLoadFileStates.forEach(item => {
      switch (item.name) {
        case 'logo':
          this.props.form.setFields({
            logo: {
              value: item.url
            }
          });
          break;
        case 'image':
          this.props.form.setFields({
            title_logo: {
              value: item.url
            }
          });
          break;
      }
    });

    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue
          // dob: fieldsValue.dob.format("DD-MM-YYYY")
        };

        Object.keys(values).forEach(key => {
          countryDetailsFields.forEach(field => {
            if (field.name === 'rating') {
              field.value = 5;
            }
            if (field.name === 'airport_code') {
              field.value = selectedAirport;
            }
            if (field.name === key) {
              if (field.display) {
                field.value = field.value =
                  values[key] === undefined ? '' : values[key];
              }
            }
          });
        });

        if (isAddCountryDetailsForm) {
          this.setState({ isSpinning: true });
          const data = {
            data: countryDetailsFields
          };
          this.props.addCountryDetails(data);
        } else if (isEditCountryDetailsForm && editRecordData) {
          const updateData = {
            id: editRecordData.id,
            data: countryDetailsFields
          };

          this.props.editCountryDetails(updateData);
        }
      }
    });
  };

  afterUploadFile(url) {
    const { upLoadFileStates } = this.state;
    upLoadFileStates.forEach(item => {
      if (item.isSelected) {
        message.success(`${item.name} Uploaded successfully`);
        item.url = url;
        item.isSelected = false;
      }
    });
    this.setState({ upLoadFileStates, isSaveButtonDisabled: false });
  }

  onImageBeforeUpload = (fieldInfo, info) => {
    const { upLoadFileStates } = this.state;
    let formData = new FormData();
    formData.append('file', info);
    upLoadFileStates.forEach(item => {
      if (item.name === fieldInfo.name) {
        item.isDisable = true;
        item.isSelected = true;
      }
    });
    this.props.uploadFile({
      data: formData,
      url: UPLOAD_FILE
    });
    this.setState({ upLoadFileStates, isSaveButtonDisabled: true });
  };

  onRemove = (e, fieldInfo) => {
    const { upLoadFileStates } = this.state;
    upLoadFileStates.forEach(item => {
      if (item.name === fieldInfo.name) {
        message.success(`${fieldInfo.name} Removed successfully`);
        item.url = '';
        item.isDisable = false;
      }
    });
    this.setState({ upLoadFileStates });
  };

  render() {
    const {
      isLoading,
      upLoadFileStates,
      countryDetailsFields,
      isSaveButtonDisabled
    } = this.state;
    const { handleCancel, headerName } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {!isLoading && (
          <FormComponent
            formFields={countryDetailsFields}
            getFieldDecorator={getFieldDecorator}
            handleSubmit={this.handleSubmit}
            headerName={headerName}
            upLoadFileStates={upLoadFileStates}
            isSaveButtonDisabled={isSaveButtonDisabled}
            handleCancel={handleCancel}
            onImageBeforeUpload={this.onImageBeforeUpload}
            onRemove={this.onRemove}
          />
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    uploadFileResponse: state.uploadFile.uploadFileResponse,
    addCountryDetailsResponse: state.countryDetails.addCountryDetailsResponse,
    editCountryDetailsResponse: state.countryDetails.editCountryDetailsResponse,
    countryDetailsFieldsResponse:
      state.countryDetails.countryDetailsFieldsResponse,
    countryDetailsFieldsUpdateValueResponse:
      state.countryDetails.countryDetailsFieldsUpdateValueResponse
  };
}

CountryDetails = connect(
  mapStateToProps,
  {
    uploadFile,
    addCountryDetails,
    editCountryDetails,
    countryDetailsFields,
    countryDetailsFieldsUpdateValue
  }
)(CountryDetails);

export default Form.create()(CountryDetails);
