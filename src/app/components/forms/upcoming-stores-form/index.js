import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UPLOAD_FILE } from 'constants/api-constants';

import Loading from 'components/loading';
import { Form, Row, message } from 'components/ui';
import FormHeader from 'components/forms/shared-form-components/new-form-header';
import FormButtons from 'components/forms/shared-form-components/new-form-buttons';
import OutletFormText from 'components/forms/shared-form-components/outlet-form-text';
import OutletFormInteger from 'components/forms/shared-form-components/outlet-form-integer';
import FormSearchDropDown from 'components/forms/shared-form-components/form-search-dropdown';
import OutletFormDropDown from 'components/forms/shared-form-components/outlet-form-dropdown';
import OutletFormEmail from 'components/forms/shared-form-components/outlet-form-email';
import OutletFormImage from 'components/forms/shared-form-components/outlet-form-image';
import OutletFormPhoneNumber from 'components/forms/shared-form-components/outlet-form-phonenumber';
import OutletFormRadio from 'components/forms/shared-form-components/outlet-form-radio';
import OutletFormDatePicker from 'components/forms/shared-form-components/outlet-form-datepicker';
import FormTripletDropDown from 'components/forms/shared-form-components/form-triplet-dropdown';
import FormDecimal from 'components/forms/shared-form-components/form-decimal';
import { uploadFile } from '../../../redux/actions/uploadFileActions';
import {
  addUpcomingStores,
  editUpcomingStores,
  getUpcomingStoresFields,
  getUpcomingStoresFieldsUpdateValue
} from '../../../redux/actions/upcomingStoresActions';
import './index.scss';

class UpcomingStores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      uploadUpcomingStoresImageUrl: '',
      isDisableUpcomingStoresImageUpload: false
      // isSaveButtonDisabled: false
    };
  }

  componentDidMount() {
    const {
      isEditUpcomingStoresForm,
      isAddUpcomingStoresForm,
      editRecordData,
      getUpcomingStoresFieldsUpdateValue,
      getUpcomingStoresFields
    } = this.props;
    if (isEditUpcomingStoresForm && editRecordData) {
      const data = {
        store_id: editRecordData.id
      };
      getUpcomingStoresFieldsUpdateValue(data);
    }
    if (isAddUpcomingStoresForm) {
      getUpcomingStoresFields();
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      getUpcomingStoresFieldsResponse,
      getUpcomingStoresFieldsUpdateValueResponse,
      addUpcomingStoresResponse,
      editUpcomingStoresResponse,
      uploadFileResponse
    } = this.props;
    if (
      nextProps.getUpcomingStoresFieldsResponse &&
      nextProps.getUpcomingStoresFieldsResponse !==
        getUpcomingStoresFieldsResponse
    ) {
      if (
        nextProps.getUpcomingStoresFieldsResponse.error === 0 &&
        nextProps.getUpcomingStoresFieldsResponse.content
      ) {
        const upcomingStoresFields =
          nextProps.getUpcomingStoresFieldsResponse.content;
        this.setState({ upcomingStoresFields, isLoading: false });
      }
    }
    if (
      nextProps.getUpcomingStoresFieldsUpdateValueResponse &&
      nextProps.getUpcomingStoresFieldsUpdateValueResponse !==
        getUpcomingStoresFieldsUpdateValueResponse
    ) {
      if (
        nextProps.getUpcomingStoresFieldsUpdateValueResponse.error === 0 &&
        nextProps.getUpcomingStoresFieldsUpdateValueResponse.content &&
        nextProps.getUpcomingStoresFieldsUpdateValueResponse.content
      ) {
        let {
          uploadUpcomingStoresImageUrl,
          isDisableUpcomingStoresImageUpload
        } = this.state;
        const upcomingStoresFields =
          nextProps.getUpcomingStoresFieldsUpdateValueResponse.content;
        upcomingStoresFields.find(item =>
          item.value && item.name === 'image'
            ? ((uploadUpcomingStoresImageUrl = item.value),
              (isDisableUpcomingStoresImageUpload = true))
            : null
        );
        this.setState({
          upcomingStoresFields,
          uploadUpcomingStoresImageUrl,
          isDisableUpcomingStoresImageUpload,
          isLoading: false
        });
      }
    }

    if (
      nextProps.addUpcomingStoresResponse &&
      nextProps.addUpcomingStoresResponse !== addUpcomingStoresResponse
    ) {
      if (
        nextProps.addUpcomingStoresResponse.error === 0 &&
        nextProps.addUpcomingStoresResponse.message
      ) {
        message.success(nextProps.addUpcomingStoresResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.addUpcomingStoresResponse.message);
        this.setState({ isSpinning: false });
      }
    }

    if (
      nextProps.editUpcomingStoresResponse &&
      nextProps.editUpcomingStoresResponse !== editUpcomingStoresResponse
    ) {
      if (
        !nextProps.editUpcomingStoresResponse.error &&
        nextProps.editUpcomingStoresResponse.message
      ) {
        message.success(nextProps.editUpcomingStoresResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.editUpcomingStoresResponse.message);
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
        const { isSaveButtonDisabled } = this.state;
        message.success('UpcomingStores Image Uploaded successfully');
        this.setState({
          uploadUpcomingStoresImageUrl:
            nextProps.uploadFileResponse.content.image_url,
          isSaveButtonDisabled: false
        });
      } else {
        message.error('Error in Upload. Please try again..');
      }
    }
  }

  renderFormComponent = () => {
    const { editRecord, editRecordData } = this.props;
    const {
      upcomingStoresFields,
      editStoreData,
      currentSelectedRole,
      currentSelectedAiport,
      isDisableUpcomingStoresImageUpload
    } = this.state;
    const { getFieldDecorator } = this.props.form;
    if (upcomingStoresFields) {
      var formDom = [];
      formDom.push(
        upcomingStoresFields.map((item, index) => {
          let data = [];
          if (item.display) {
            switch (item.type) {
              case 'text':
                data = (
                  <OutletFormText
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                    editRecord={editRecord}
                  />
                );
                break;
              case 'decimal':
                data = (
                  <FormDecimal
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                  />
                );
                break;
              case 'integer':
                data = (
                  <OutletFormInteger
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                  />
                );
                break;
              case 'radio':
                data = (
                  <OutletFormRadio
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                  />
                );
                break;
              case 'image':
                data = (
                  <OutletFormImage
                    fieldInfo={item}
                    editRecordData={editRecordData}
                    getFieldDecorator={getFieldDecorator}
                    isDisableImageUpload={isDisableUpcomingStoresImageUpload}
                    onImageBeforeUpload={this.onImageBeforeUpload}
                    onRemove={this.onRemove}
                  />
                );
                break;
              case 'phone_number':
                data = (
                  <OutletFormPhoneNumber
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                  />
                );
                break;
              case 'email':
                data = (
                  <OutletFormEmail
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                  />
                );
                break;
              case 'triplet_drop_down':
              case 'second_triplet_drop_down':
                data = (
                  <FormTripletDropDown
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                    currentSelectedRole={currentSelectedRole}
                    validatetwinSelect={this.validatetwinSelect}
                  />
                );
                break;
              case 'third_triplet_drop_down':
                data = (
                  <FormSearchDropDown
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                    currentSelectedRole={currentSelectedRole}
                    currentSelectedAiport={currentSelectedAiport}
                  />
                );
                break;
              case 'drop_down':
                data = (
                  <OutletFormDropDown
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                  />
                );

                break;
              case 'datetime':
                data = (
                  <OutletFormDatePicker
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                  />
                );
                break;
              default:
                break;
            }
          }
          return data;
        })
      );
    }
    return formDom;
  };

  handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    const { uploadUpcomingStoresImageUrl, upcomingStoresFields } = this.state;
    const {
      isAddUpcomingStoresForm,
      isEditUpcomingStoresForm,
      editRecordData,
      selectedAirport
    } = this.props;
    if (uploadUpcomingStoresImageUrl) {
      this.props.form.setFields({
        image: {
          value: uploadUpcomingStoresImageUrl
        }
      });
    } else {
      upcomingStoresFields.forEach(field => {
        if (field.name === 'image') {
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
          ...fieldsValue
          // dob: fieldsValue.dob.format("DD-MM-YYYY")
        };

        Object.keys(values).forEach(key => {
          upcomingStoresFields.forEach(field => {
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

        if (isAddUpcomingStoresForm) {
          this.setState({ isSpinning: true });
          const data = {
            data: upcomingStoresFields
          };
          this.props.addUpcomingStores(data);
        } else if (isEditUpcomingStoresForm && editRecordData) {
          const updateData = {
            store_id: editRecordData.id,
            data: upcomingStoresFields
          };

          this.props.editUpcomingStores(updateData);
        }
      }
    });
  };

  onImageBeforeUpload = (fieldInfo, info) => {
    const formData = new FormData();
    formData.append('file', info);
    if (fieldInfo.name === 'image') {
      this.setState({
        isDisableUpcomingStoresImageUpload: true,
        isSaveButtonDisabled: true
      });
    }
    this.props.uploadFile({
      data: formData,
      url: UPLOAD_FILE
    });
  };

  onRemove = () => {
    message.success('UpcomingStores Image Removed successfully');
    this.setState({
      isDisableUpcomingStoresImageUpload: false,
      uploadUpcomingStoresImageUrl: ''
    });
  };

  render() {
    const { isLoading, upcomingStoresFields } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {!isLoading && (
          <div className="upcomingStores-form">
            <Row className="upcomingStores-form__header">
              <FormHeader headerName={this.props.headerName} />
            </Row>

            <Form onSubmit={this.handleSubmit}>
              <Row>{upcomingStoresFields && this.renderFormComponent()}</Row>
              <Row className="upcomingStores-form__buttons">
                <FormButtons
                  isSaveButtonDisabled={this.state.isSaveButtonDisabled}
                  handleCancel={this.props.handleCancel}
                />
              </Row>
            </Form>
          </div>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    uploadFileResponse: state.uploadFile.uploadFileResponse,
    addUpcomingStoresResponse: state.upcomingStores.addUpcomingStoresResponse,
    editUpcomingStoresResponse: state.upcomingStores.editUpcomingStoresResponse,
    getUpcomingStoresFieldsResponse:
      state.upcomingStores.getUpcomingStoresFieldsResponse,
    getUpcomingStoresFieldsUpdateValueResponse:
      state.upcomingStores.getUpcomingStoresFieldsUpdateValueResponse
  };
}

UpcomingStores = connect(
  mapStateToProps,
  {
    uploadFile,
    addUpcomingStores,
    editUpcomingStores,
    getUpcomingStoresFields,
    getUpcomingStoresFieldsUpdateValue
  }
)(UpcomingStores);

export default Form.create()(UpcomingStores);
