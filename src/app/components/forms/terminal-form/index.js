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
  addTerminal,
  editTerminal,
  getTerminalFields,
  getTerminalFieldsUpdateValue
} from '../../../redux/actions/terminalActions';
import './index.scss';

class TerminalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      uploadTerminalImageUrl: '',
      isDisableTerminalImageUpload: false
      // isSaveButtonDisabled: false
    };
  }

  componentDidMount() {
    const {
      isEditTerminalForm,
      isAddTerminalForm,
      editRecordData,
      getTerminalFieldsUpdateValue,
      getTerminalFields
    } = this.props;
    if (isEditTerminalForm && editRecordData) {
      const data = {
        terminal_id: editRecordData.id
      };
      getTerminalFieldsUpdateValue(data);
    }
    if (isAddTerminalForm) {
      getTerminalFields();
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      getTerminalFieldsResponse,
      getTerminalFieldsUpdateValueResponse,
      addTerminalResponse,
      editTerminalResponse,
      uploadFileResponse
    } = this.props;
    if (
      nextProps.getTerminalFieldsResponse &&
      nextProps.getTerminalFieldsResponse !== getTerminalFieldsResponse
    ) {
      if (
        nextProps.getTerminalFieldsResponse.error === 0 &&
        nextProps.getTerminalFieldsResponse.content
      ) {
        const terminalFields = nextProps.getTerminalFieldsResponse.content;
        this.setState({ terminalFields, isLoading: false });
      }
    }
    if (
      nextProps.getTerminalFieldsUpdateValueResponse &&
      nextProps.getTerminalFieldsUpdateValueResponse !==
        getTerminalFieldsUpdateValueResponse
    ) {
      if (
        nextProps.getTerminalFieldsUpdateValueResponse.error === 0 &&
        nextProps.getTerminalFieldsUpdateValueResponse.content &&
        nextProps.getTerminalFieldsUpdateValueResponse.content
      ) {
        let {
          uploadTerminalImageUrl,
          isDisableTerminalImageUpload
        } = this.state;
        const terminalFields =
          nextProps.getTerminalFieldsUpdateValueResponse.content;
        terminalFields.find(item =>
          item.value && item.name === 'terminal_image'
            ? ((uploadTerminalImageUrl = item.value),
              (isDisableTerminalImageUpload = true))
            : null
        );
        this.setState({
          terminalFields,
          uploadTerminalImageUrl,
          isDisableTerminalImageUpload,
          isLoading: false
        });
      }
    }

    if (
      nextProps.addTerminalResponse &&
      nextProps.addTerminalResponse !== addTerminalResponse
    ) {
      if (
        nextProps.addTerminalResponse.error === 0 &&
        nextProps.addTerminalResponse.message
      ) {
        message.success(nextProps.addTerminalResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.addTerminalResponse.message);
        this.setState({ isSpinning: false });
      }
    }

    if (
      nextProps.editTerminalResponse &&
      nextProps.editTerminalResponse !== editTerminalResponse
    ) {
      if (
        !nextProps.editTerminalResponse.error &&
        nextProps.editTerminalResponse.message
      ) {
        message.success(nextProps.editTerminalResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.editTerminalResponse.message);
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
        message.success('Terminal Image Uploaded successfully');
        this.setState({
          uploadTerminalImageUrl:
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
      terminalFields,
      editStoreData,
      currentSelectedRole,
      currentSelectedAiport,
      isDisableTerminalImageUpload
    } = this.state;
    const { getFieldDecorator } = this.props.form;
    if (terminalFields) {
      var formDom = [];
      formDom.push(
        terminalFields.map((item, index) => {
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
                    isDisableImageUpload={isDisableTerminalImageUpload}
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
    const { uploadTerminalImageUrl, terminalFields } = this.state;
    const {
      isAddTerminalForm,
      isEditTerminalForm,
      editRecordData,
      selectedAirport
    } = this.props;
    if (uploadTerminalImageUrl) {
      this.props.form.setFields({
        terminal_image: {
          value: uploadTerminalImageUrl
        }
      });
    } else {
      terminalFields.forEach(field => {
        if (field.name === 'terminal_image') {
          this.props.form.setFields({
            terminal_image: {
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
          terminalFields.forEach(field => {
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

        if (isAddTerminalForm) {
          this.setState({ isSpinning: true });
          const data = {
            terminal_data: terminalFields
          };
          this.props.addTerminal(data);
        } else if (isEditTerminalForm && editRecordData) {
          const updateData = {
            terminal_id: editRecordData.id,
            terminal_data: terminalFields
          };

          this.props.editTerminal(updateData);
        }
      }
    });
  };

  onImageBeforeUpload = (fieldInfo, info) => {
    const formData = new FormData();
    formData.append('file', info);
    if (fieldInfo.name === 'terminal_image') {
      this.setState({
        isDisableTerminalImageUpload: true,
        isSaveButtonDisabled: true
      });
    }
    this.props.uploadFile({
      data: formData,
      url: UPLOAD_FILE
    });
  };

  onRemove = () => {
    message.success('Terminal Image Removed successfully');
    this.setState({
      isDisableTerminalImageUpload: false,
      uploadTerminalImageUrl: ''
    });
  };

  render() {
    const { isLoading, terminalFields } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {!isLoading && (
          <div className="terminal-form">
            <Row className="terminal-form__header">
              <FormHeader headerName={this.props.headerName} />
            </Row>

            <Form onSubmit={this.handleSubmit}>
              <Row>{terminalFields && this.renderFormComponent()}</Row>
              <Row className="terminal-form__buttons">
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
    addTerminalResponse: state.terminal.addTerminalResponse,
    editTerminalResponse: state.terminal.editTerminalResponse,
    getTerminalFieldsResponse: state.terminal.getTerminalFieldsResponse,
    getTerminalFieldsUpdateValueResponse:
      state.terminal.getTerminalFieldsUpdateValueResponse
  };
}

TerminalForm = connect(
  mapStateToProps,
  {
    uploadFile,
    addTerminal,
    editTerminal,
    getTerminalFields,
    getTerminalFieldsUpdateValue
  }
)(TerminalForm);

export default Form.create()(TerminalForm);
