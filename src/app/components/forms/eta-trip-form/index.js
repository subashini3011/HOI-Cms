import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UPLOAD_FILE } from 'constants/api-constants';

import Loading from 'components/loading';
import { Form, Row, message } from 'components/ui';
import FormComponent from 'components/forms/shared-form-components';
import { uploadFile } from '../../../redux/actions/uploadFileActions';
import {
  addEtaTrip,
  editEtaTrip,
  etaTripFields,
  etaTripFieldsUpdateValue
} from '../../../redux/actions/etaTripActions';
import './index.scss';

class EtaTrip extends Component {
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
      isEditEtaTripForm,
      isAddEtaTripForm,
      editRecordData,
      etaTripFieldsUpdateValue,
      etaTripFields,
      selectedAirport
    } = this.props;
    if (isEditEtaTripForm && editRecordData) {
      const data = {
        airport_code: selectedAirport
      };
      etaTripFieldsUpdateValue(data);
    }
    if (isAddEtaTripForm) {
      const data = {
        airport_code: selectedAirport
      };
      etaTripFields(data);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      etaTripFieldsResponse,
      etaTripFieldsUpdateValueResponse,
      addEtaTripResponse,
      editEtaTripResponse,
      uploadFileResponse
    } = this.props;
    if (
      nextProps.etaTripFieldsResponse &&
      nextProps.etaTripFieldsResponse !== etaTripFieldsResponse
    ) {
      if (
        nextProps.etaTripFieldsResponse.error === 0 &&
        nextProps.etaTripFieldsResponse.content
      ) {
        const etaTripFields = nextProps.etaTripFieldsResponse.content;
        this.setState({ etaTripFields, isLoading: false });
      }
    }
    if (
      nextProps.etaTripFieldsUpdateValueResponse &&
      nextProps.etaTripFieldsUpdateValueResponse !==
        etaTripFieldsUpdateValueResponse
    ) {
      if (
        nextProps.etaTripFieldsUpdateValueResponse.error === 0 &&
        nextProps.etaTripFieldsUpdateValueResponse.content &&
        nextProps.etaTripFieldsUpdateValueResponse.content
      ) {
        const { upLoadFileStates } = this.state;
        const etaTripFields =
          nextProps.etaTripFieldsUpdateValueResponse.content;
        this.state.upLoadFileStates.map(uploadFileItem => {
          etaTripFields.filter(item =>
            item.value && item.name === uploadFileItem.name
              ? ((uploadFileItem.url = item.value),
                (uploadFileItem.isDisable = true))
              : null
          );
        });
        this.setState({
          upLoadFileStates,
          etaTripFields,
          isLoading: false
        });
      }
    }

    if (
      nextProps.addEtaTripResponse &&
      nextProps.addEtaTripResponse !== addEtaTripResponse
    ) {
      if (
        nextProps.addEtaTripResponse.error === 0 &&
        nextProps.addEtaTripResponse.message
      ) {
        message.success(nextProps.addEtaTripResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.addEtaTripResponse.message);
        this.setState({ isSpinning: false });
      }
    }

    if (
      nextProps.editEtaTripResponse &&
      nextProps.editEtaTripResponse !== editEtaTripResponse
    ) {
      if (
        !nextProps.editEtaTripResponse.error &&
        nextProps.editEtaTripResponse.message
      ) {
        message.success(nextProps.editEtaTripResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.editEtaTripResponse.message);
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
        message.success('EtaTrip Image Uploaded successfully');
        this.afterUploadFile(nextProps.uploadFileResponse.content.image_url);
      } else {
        message.error('Error in Upload. Please try again..');
        upLoadFileStates.map(item => {
          return (item.isSelected = false);
        });
      }
    }
  }

  validatetwinSelect = value => {
    this.props.form.setFields({
      terminal: {
        value: undefined
      }
    });
    this.setState({ twinSelected: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    const { upLoadFileStates, etaTripFields } = this.state;
    const {
      isAddEtaTripForm,
      isEditEtaTripForm,
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
          etaTripFields.forEach(field => {
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

        if (isAddEtaTripForm) {
          this.setState({ isSpinning: true });
          const data = {
            data: etaTripFields
          };
          this.props.addEtaTrip(data);
        } else if (isEditEtaTripForm && editRecordData) {
          const updateData = {
            airport_code: selectedAirport,
            data: etaTripFields
          };

          this.props.editEtaTrip(updateData);
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
      etaTripFields,
      isSaveButtonDisabled
    } = this.state;
    const { handleCancel, headerName } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {!isLoading && (
          <FormComponent
            formFields={etaTripFields}
            getFieldDecorator={getFieldDecorator}
            handleSubmit={this.handleSubmit}
            headerName={headerName}
            upLoadFileStates={upLoadFileStates}
            isSaveButtonDisabled={isSaveButtonDisabled}
            handleCancel={handleCancel}
            onImageBeforeUpload={this.onImageBeforeUpload}
            onRemove={this.onRemove}
            validatetwinSelect={this.validatetwinSelect}
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
    addEtaTripResponse: state.etaTrip.addEtaTripResponse,
    editEtaTripResponse: state.etaTrip.editEtaTripResponse,
    etaTripFieldsResponse: state.etaTrip.etaTripFieldsResponse,
    etaTripFieldsUpdateValueResponse:
      state.etaTrip.etaTripFieldsUpdateValueResponse
  };
}

EtaTrip = connect(
  mapStateToProps,
  {
    uploadFile,
    addEtaTrip,
    editEtaTrip,
    etaTripFields,
    etaTripFieldsUpdateValue
  }
)(EtaTrip);

export default Form.create()(EtaTrip);
