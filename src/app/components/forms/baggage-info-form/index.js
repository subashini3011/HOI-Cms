import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UPLOAD_FILE } from 'constants/api-constants';

import Loading from 'components/loading';
import { Form, Row, message } from 'components/ui';
import FormComponent from 'components/forms/shared-form-components';
import { uploadFile } from '../../../redux/actions/uploadFileActions';
import {
  addBaggageInfo,
  editBaggageInfo,
  getBaggageInfoFields,
  getBaggageInfoFieldsUpdateValue
} from '../../../redux/actions/baggageInfoActions';
import './index.scss';

class BaggageInfoForm extends Component {
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
      isEditBaggageInfoForm,
      isAddBaggageInfoForm,
      editRecordData,
      getBaggageInfoFieldsUpdateValue,
      getBaggageInfoFields
    } = this.props;
    if (isEditBaggageInfoForm && editRecordData) {
      const data = {
        airline_id: editRecordData.id
      };
      getBaggageInfoFieldsUpdateValue(data);
    }
    if (isAddBaggageInfoForm) {
      getBaggageInfoFields();
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      getBaggageInfoFieldsResponse,
      getBaggageInfoFieldsUpdateValueResponse,
      addBaggageInfoResponse,
      editBaggageInfoResponse,
      uploadFileResponse
    } = this.props;
    if (
      nextProps.getBaggageInfoFieldsResponse &&
      nextProps.getBaggageInfoFieldsResponse !== getBaggageInfoFieldsResponse
    ) {
      if (
        nextProps.getBaggageInfoFieldsResponse.error === 0 &&
        nextProps.getBaggageInfoFieldsResponse.content
      ) {
        const baggageInfoFields =
          nextProps.getBaggageInfoFieldsResponse.content;
        this.setState({ baggageInfoFields, isLoading: false });
      }
    }
    if (
      nextProps.getBaggageInfoFieldsUpdateValueResponse &&
      nextProps.getBaggageInfoFieldsUpdateValueResponse !==
        getBaggageInfoFieldsUpdateValueResponse
    ) {
      if (
        nextProps.getBaggageInfoFieldsUpdateValueResponse.error === 0 &&
        nextProps.getBaggageInfoFieldsUpdateValueResponse.content &&
        nextProps.getBaggageInfoFieldsUpdateValueResponse.content
      ) {
        const { upLoadFileStates } = this.state;
        const baggageInfoFields =
          nextProps.getBaggageInfoFieldsUpdateValueResponse.content;
        this.state.upLoadFileStates.map(uploadFileItem => {
          baggageInfoFields.filter(item =>
            item.value && item.name === uploadFileItem.name
              ? ((uploadFileItem.url = item.value),
                (uploadFileItem.isDisable = true))
              : null
          );
        });
        this.setState({
          upLoadFileStates,
          baggageInfoFields,
          isLoading: false
        });
      }
    }

    if (
      nextProps.addBaggageInfoResponse &&
      nextProps.addBaggageInfoResponse !== addBaggageInfoResponse
    ) {
      if (
        nextProps.addBaggageInfoResponse.error === 0 &&
        nextProps.addBaggageInfoResponse.message
      ) {
        message.success(nextProps.addBaggageInfoResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.addBaggageInfoResponse.message);
        this.setState({ isSpinning: false });
      }
    }

    if (
      nextProps.editBaggageInfoResponse &&
      nextProps.editBaggageInfoResponse !== editBaggageInfoResponse
    ) {
      if (
        !nextProps.editBaggageInfoResponse.error &&
        nextProps.editBaggageInfoResponse.message
      ) {
        message.success(nextProps.editBaggageInfoResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.editBaggageInfoResponse.message);
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
        message.success('BaggageInfo Image Uploaded successfully');
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
    const { upLoadFileStates, baggageInfoFields } = this.state;
    const {
      isAddBaggageInfoForm,
      isEditBaggageInfoForm,
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
          baggageInfoFields.forEach(field => {
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

        if (isAddBaggageInfoForm) {
          this.setState({ isSpinning: true });
          const data = {
            data: baggageInfoFields
          };
          this.props.addBaggageInfo(data);
        } else if (isEditBaggageInfoForm && editRecordData) {
          const updateData = {
            baggage_id: editRecordData.id,
            data: baggageInfoFields
          };

          this.props.editBaggageInfo(updateData);
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
      baggageInfoFields,
      isSaveButtonDisabled
    } = this.state;
    const { handleCancel, headerName } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {!isLoading && (
          <FormComponent
            formFields={baggageInfoFields}
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
    addBaggageInfoResponse: state.baggageInfo.addBaggageInfoResponse,
    editBaggageInfoResponse: state.baggageInfo.editBaggageInfoResponse,
    getBaggageInfoFieldsResponse:
      state.baggageInfo.getBaggageInfoFieldsResponse,
    getBaggageInfoFieldsUpdateValueResponse:
      state.baggageInfo.getBaggageInfoFieldsUpdateValueResponse
  };
}

BaggageInfoForm = connect(
  mapStateToProps,
  {
    uploadFile,
    addBaggageInfo,
    editBaggageInfo,
    getBaggageInfoFields,
    getBaggageInfoFieldsUpdateValue
  }
)(BaggageInfoForm);

export default Form.create()(BaggageInfoForm);
