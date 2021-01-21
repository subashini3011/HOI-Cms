import React, { Component } from 'react';
import './index.scss';

// import moment from 'moment';

import { connect } from 'react-redux';

// actions

// api-constants
import { UPLOAD_FILE_MCOMMERCE } from 'constants/api-constants';

// components
import FormButtons from 'components/forms/shared-form-components/new-form-buttons';
import FormHeader from 'components/forms/shared-form-components/new-form-header';
import BulkUpload from 'components/forms/shared-form-components/bulk-upload';
import Loading from 'components/loading';
import OutletFormText from 'components/forms/shared-form-components/outlet-form-text';
import OutletFormInteger from 'components/forms/shared-form-components/outlet-form-integer';
import OutletFormDropDown from 'components/forms/shared-form-components/outlet-form-dropdown';
import OutletFormEmail from 'components/forms/shared-form-components/outlet-form-email';
import OutletFormImage from 'components/forms/shared-form-components/outlet-form-image';
import OutletFormPhoneNumber from 'components/forms/shared-form-components/outlet-form-phonenumber';
import OutletFormRadio from 'components/forms/shared-form-components/outlet-form-radio';
import OutletFormTwinDropDown from 'components/forms/shared-form-components/outlet-form-twin-dropdown';
import FormRadioWithChildButton from 'components/forms/shared-form-components/form-radio-with-child-button';
import { Form, Row, message, Spin } from 'components/ui';
import { uploadFile } from '../../../redux/actions/uploadFileActions';
import { bulkUpload } from '../../../redux/actions/uploadFileActions';
import {
  addOutlets,
  editOutlets,
  getStoreFields,
  getStoreFieldsUpdateValue
} from '../../../redux/actions/outletsActions';

class OutletForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      storeFields: [],
      upLoadFileStates: [
        {
          index: 'store_logo',
          name: 'store_logo',
          isDisable: false,
          isSelected: false,
          url: ''
        }
      ],
      isDisableStoreLogoUpload: !!(
        this.props.editRecord &&
        this.props.editRecord.logo &&
        this.props.editRecord.logo.indexOf('.') > 0
      ),
      uploadStoreLogoUrl:
        this.props.editRecord &&
        this.props.editRecord.logo &&
        this.props.editRecord.logo.indexOf('.') > 0
          ? this.props.editRecord.logo
          : '',
      isStoreLogoSelected: false,
      isSpinning: false,
      isSaveButtonDisabled: false,
      twinSelected: []
    };
  }

  componentDidMount() {
    const {
      isShowOutletEditForm,
      editRecordData,
      selectedCategory,
      selectedAirport
    } = this.props;
    if (selectedCategory && !isShowOutletEditForm) {
      const fieldPayload = {
        airport_code: selectedAirport,
        category: selectedCategory
      };
      this.props.getStoreFields(fieldPayload);
    }
    if (isShowOutletEditForm && editRecordData) {
      this.props.getStoreFieldsUpdateValue(editRecordData);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.getStoreFieldsResponse &&
      nextProps.getStoreFieldsResponse !== this.props.getStoreFieldsResponse
    ) {
      if (
        nextProps.getStoreFieldsResponse.error === 0 &&
        nextProps.getStoreFieldsResponse.content
      ) {
        this.setState({
          storeFields: nextProps.getStoreFieldsResponse.content.filed_data,
          isLoading: false
        });
      }
    }
    if (
      nextProps.getStoreFieldsUpdateValueResponse &&
      nextProps.getStoreFieldsUpdateValueResponse !==
        this.props.getStoreFieldsUpdateValueResponse
    ) {
      if (
        nextProps.getStoreFieldsUpdateValueResponse.error === 0 &&
        nextProps.getStoreFieldsUpdateValueResponse.content &&
        nextProps.getStoreFieldsUpdateValueResponse.content
      ) {
        let {
          uploadStoreLogoUrl,
          twinSelected,
          isDisableStoreLogoUpload
        } = this.state;
        const storeFields =
          nextProps.getStoreFieldsUpdateValueResponse.content.filed_data;
        storeFields.find(item =>
          item.value && item.name === 'store_logo'
            ? ((uploadStoreLogoUrl = item.value),
              (isDisableStoreLogoUpload = true))
            : null
        );
        storeFields.find(item =>
          item.name === 'terminal_side' ? (twinSelected = item.value) : null
        );
        this.setState({
          storeFields,
          isDisableStoreLogoUpload,
          uploadStoreLogoUrl,
          twinSelected,
          isLoading: false
        });
      }
    }
    if (
      nextProps.addOutletsResponse &&
      nextProps.addOutletsResponse !== this.props.addOutletsResponse
    ) {
      if (
        nextProps.addOutletsResponse.error === 0 &&
        nextProps.addOutletsResponse.message
      ) {
        message.success(nextProps.addOutletsResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.addOutletsResponse.message);
        this.setState({ isSpinning: false });
      }
    }

    if (
      nextProps.bulkUploadResponse &&
      nextProps.bulkUploadResponse !== this.props.bulkUploadResponse
    ) {
      if (
        nextProps.bulkUploadResponse.error === 0 &&
        nextProps.bulkUploadResponse.message
      ) {
        message.success(nextProps.bulkUploadResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.bulkUploadResponse.message);
        this.setState({ isSpinning: false });
      }
    }

    if (
      nextProps.editOutletsResponse &&
      nextProps.editOutletsResponse !== this.props.editOutletsResponse
    ) {
      if (
        !nextProps.editOutletsResponse.error &&
        nextProps.editOutletsResponse.message
      ) {
        message.success(nextProps.editOutletsResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.editOutletsResponse.message);
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
      } else {
        message.error('Error in Upload. Please try again..');
      }
    }
  }

  afterUploadFile(url) {
    if (this.state.isStoreLogoSelected) {
      message.success('Store Logo Uploaded successfully');
      this.setState({
        uploadStoreLogoUrl: url,
        isStoreLogoSelected: false,
        isSaveButtonDisabled: false
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { uploadStoreLogoUrl, storeFields } = this.state;
    const {
      isShowAddOutletForm,
      isShowOutletEditForm,
      editRecordData
    } = this.props;
    this.props.form.setFields({
      store_logo: {
        value: uploadStoreLogoUrl
      }
    });
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const storeFieldValue = storeFields;
        Object.keys(values).forEach(key => {
          storeFieldValue.forEach(field => {
            if (field.name === 'rating') {
              field.value = 5;
            }
            if (field.name === key) {
              if (field.display) {
                field.value = values[key] === undefined ? '' : values[key];
              }
            }
          });
        });

        //   debugger;
        //   if (field.name === 'is_external' && field.value === true) {
        //     field.child_elements.forEach(element => {
        //       Object.keys(values).forEach(key => {
        //         if (key == element.name) {
        //           element.value = field.value =
        //             values[key] === undefined ? '' : values[key];
        //         }
        //       });
        //     });
        //   }
        // });

        storeFieldValue.forEach(field => {
          if (field.name === 'is_external' && field.value === true) {
            field.child_elements.forEach(element => {
              Object.keys(values).forEach(key => {
                if (key == element.name) {
                  element.value = values[key] === undefined ? '' : values[key];
                }
              });
            });
          }
        });
        if (isShowAddOutletForm) {
          this.props.form.resetFields();
          this.setState({ isSpinning: true });
          this.props.addOutlets(storeFieldValue);
        } else if (isShowOutletEditForm && editRecordData) {
          // this.setState({ isSpinning: true })
          const updateData = {
            data: storeFieldValue,
            store_info: editRecordData
          };
          this.setState({ isSpinning: true });
          this.props.editOutlets(updateData);
        }
      }
    });
  };

  handleBulkUpload = data => {
    this.setState({ isSpinning: true });
    this.props.bulkUpload({
      data,
      airport_name: this.props.selectedAirport
    });
  };

  onImageBeforeUpload = (fieldInfo, info) => {
    const formData = new FormData();
    formData.append('file', info);
    if (fieldInfo.name === 'store_logo') {
      this.setState({
        isStoreLogoSelected: true,
        isDisableStoreLogoUpload: true,
        isSaveButtonDisabled: true
      });
    }
    this.props.uploadFile({
      data: formData,
      url: UPLOAD_FILE_MCOMMERCE + this.props.selectedAirport
    });
  };

  onRemove = (e, fieldInfo) => {
    // e.preventDefault();
    if (fieldInfo.name === 'store_logo') {
      message.success('Store Logo Removed successfully');
      this.setState({
        isDisableStoreLogoUpload: false,
        uploadStoreLogoUrl: ''
      });
    }
  };

  validatetwinSelect = value => {
    this.props.form.setFields({
      terminal: {
        value: undefined
      }
    });
    this.setState({ twinSelected: value });
  };

  renderFormComponent = () => {
    const { twinSelected, storeFields, isDisableStoreLogoUpload } = this.state;
    const { editRecord, editRecordData } = this.props;
    const { getFieldDecorator } = this.props.form;

    if (storeFields) {
      var formDom = [];
      formDom.push(
        storeFields.map((item, index) => {
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
              case 'radio_with_child':
                data = (
                  <FormRadioWithChildButton
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
                    isDisableImageUpload={isDisableStoreLogoUpload}
                    getFieldDecorator={getFieldDecorator}
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
              case 'drop_down':
                data = (
                  <OutletFormDropDown
                    fieldInfo={item}
                    twinSelected={twinSelected}
                    getFieldDecorator={getFieldDecorator}
                  />
                );
                break;
              case 'twin_drop_down':
                data = (
                  <OutletFormTwinDropDown
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                    validatetwinSelect={this.validatetwinSelect}
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

  render() {
    const { storeFields, isLoading } = this.state;
    const { outeletFormType } = this.props;
    // const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {!isLoading && (
          <React.Fragment>
            <div className="outlet-form">
              <Row className="outlet-form__header">
                <FormHeader headerName={this.props.headerName} />
              </Row>

              <Form onSubmit={this.handleSubmit}>
                <Row className="outlet-form__wrapper">
                  {storeFields && this.renderFormComponent()}
                </Row>
                <Row className="outlet-form__submit-buttons">
                  <FormButtons
                    outeletFormType={outeletFormType}
                    isSaveButtonDisabled={this.state.isSaveButtonDisabled}
                    handleCancel={this.props.handleCancel}
                  />
                </Row>
              </Form>
              {/* {this.props.isShowBulkUpload && (
                <div className="outlet-form__bulk-upload">
                  <Divider>OR</Divider>
                  <BulkUpload handleBulkUpload={this.handleBulkUpload} />
                </div>
              )} */}
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    getStoreFieldsResponse: state.outlets.getStoreFieldsResponse,
    getStoreFieldsUpdateValueResponse:
      state.outlets.getStoreFieldsUpdateValueResponse,
    addOutletsResponse: state.outlets.addOutletsResponse,
    editOutletsResponse: state.outlets.editOutletsResponse,
    bulkUploadResponse: state.uploadFile.bulkUploadResponse,
    uploadFileResponse: state.uploadFile.uploadFileResponse
  };
}

OutletForm = connect(
  mapStateToProps,
  {
    getStoreFields,
    getStoreFieldsUpdateValue,
    addOutlets,
    editOutlets,
    bulkUpload,
    uploadFile
  }
)(OutletForm);

export default Form.create()(OutletForm);
