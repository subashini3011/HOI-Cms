import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UPLOAD_FILE } from 'constants/api-constants';

import Loading from 'components/loading';
import { Form, Row, message } from 'components/ui';
import FormComponent from 'components/forms/shared-form-components';
import { uploadFile } from '../../../redux/actions/uploadFileActions';
import {
  addStoresOffer,
  editStoresOffer,
  getStoresOfferFields,
  getStoresOfferFieldsUpdateValue
} from '../../../redux/actions/storesOfferActions';
import './index.scss';

class StoresOffer extends Component {
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
      isEditStoresOfferForm,
      isAddStoresOfferForm,
      editRecordData,
      getStoresOfferFieldsUpdateValue,
      getStoresOfferFields
    } = this.props;
    if (isEditStoresOfferForm && editRecordData) {
      const data = {
        store_id: editRecordData.id
      };
      getStoresOfferFieldsUpdateValue(data);
    }
    if (isAddStoresOfferForm) {
      getStoresOfferFields();
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      getStoresOfferFieldsResponse,
      getStoresOfferFieldsUpdateValueResponse,
      addStoresOfferResponse,
      editStoresOfferResponse,
      uploadFileResponse
    } = this.props;
    if (
      nextProps.getStoresOfferFieldsResponse &&
      nextProps.getStoresOfferFieldsResponse !== getStoresOfferFieldsResponse
    ) {
      if (
        nextProps.getStoresOfferFieldsResponse.error === 0 &&
        nextProps.getStoresOfferFieldsResponse.content
      ) {
        const storesOfferFields =
          nextProps.getStoresOfferFieldsResponse.content;
        this.setState({ storesOfferFields, isLoading: false });
      }
    }
    if (
      nextProps.getStoresOfferFieldsUpdateValueResponse &&
      nextProps.getStoresOfferFieldsUpdateValueResponse !==
        getStoresOfferFieldsUpdateValueResponse
    ) {
      if (
        nextProps.getStoresOfferFieldsUpdateValueResponse.error === 0 &&
        nextProps.getStoresOfferFieldsUpdateValueResponse.content &&
        nextProps.getStoresOfferFieldsUpdateValueResponse.content
      ) {
        const { upLoadFileStates } = this.state;
        const storesOfferFields =
          nextProps.getStoresOfferFieldsUpdateValueResponse.content;
        this.state.upLoadFileStates.map(uploadFileItem => {
          storesOfferFields.filter(item =>
            item.value && item.name === uploadFileItem.name
              ? ((uploadFileItem.url = item.value),
                (uploadFileItem.isDisable = true))
              : null
          );
        });
        this.setState({
          upLoadFileStates,
          storesOfferFields,
          isLoading: false
        });
      }
    }

    if (
      nextProps.addStoresOfferResponse &&
      nextProps.addStoresOfferResponse !== addStoresOfferResponse
    ) {
      if (
        nextProps.addStoresOfferResponse.error === 0 &&
        nextProps.addStoresOfferResponse.message
      ) {
        message.success(nextProps.addStoresOfferResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.addStoresOfferResponse.message);
        this.setState({ isSpinning: false });
      }
    }

    if (
      nextProps.editStoresOfferResponse &&
      nextProps.editStoresOfferResponse !== editStoresOfferResponse
    ) {
      if (
        !nextProps.editStoresOfferResponse.error &&
        nextProps.editStoresOfferResponse.message
      ) {
        message.success(nextProps.editStoresOfferResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.editStoresOfferResponse.message);
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
    const { upLoadFileStates, storesOfferFields } = this.state;
    const {
      isAddStoresOfferForm,
      isEditStoresOfferForm,
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
            image: {
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
          storesOfferFields.forEach(field => {
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

        if (isAddStoresOfferForm) {
          this.setState({ isSpinning: true });
          const data = {
            data: storesOfferFields
          };
          this.props.addStoresOffer(data);
        } else if (isEditStoresOfferForm && editRecordData) {
          const updateData = {
            store_id: editRecordData.id,
            data: storesOfferFields
          };

          this.props.editStoresOffer(updateData);
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
      storesOfferFields,
      isSaveButtonDisabled
    } = this.state;
    const { handleCancel, headerName } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {!isLoading && (
          <FormComponent
            formFields={storesOfferFields}
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
    addStoresOfferResponse: state.storesOffer.addStoresOfferResponse,
    editStoresOfferResponse: state.storesOffer.editStoresOfferResponse,
    getStoresOfferFieldsResponse:
      state.storesOffer.getStoresOfferFieldsResponse,
    getStoresOfferFieldsUpdateValueResponse:
      state.storesOffer.getStoresOfferFieldsUpdateValueResponse
  };
}

StoresOffer = connect(
  mapStateToProps,
  {
    uploadFile,
    addStoresOffer,
    editStoresOffer,
    getStoresOfferFields,
    getStoresOfferFieldsUpdateValue
  }
)(StoresOffer);

export default Form.create()(StoresOffer);
