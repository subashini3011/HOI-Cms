import React, { Component } from 'react';
import './index.scss';

import { connect } from 'react-redux';

// actions
import {
  addAirport,
  editAirport,
  getAirportFields,
  getAirportFieldsUpdateValue
} from '../../../redux/actions/airportsActions';

// api-constants
import { UPLOAD_FILE } from 'constants/api-constants';

// components
import Loading from 'components/loading';
import { Form, message } from 'components/ui';
import { uploadFile } from '../../../redux/actions/uploadFileActions';
import FormComponent from 'components/forms/shared-form-components';
import { cps } from 'redux-saga/effects';

class NewAirportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUrl: [],
      upLoadFileStates: [
        {
          index: 'logo',
          name: 'logo',
          isDisable: false,
          isSelected: false,
          url: ''
        },
        {
          index: 'title_logo',
          name: 'title_logo',
          isDisable: false,
          isSelected: false,
          url: ''
        },
        {
          index: 'location_image',
          name: 'location_image',
          isDisable: false,
          isSelected: false,
          url: ''
        },
        {
          index: 'management_image',
          name: 'management_image',
          isDisable: false,
          isSelected: false,
          url: ''
        },
        {
          index: 'city_image_for_chat',
          name: 'city_image_for_chat',
          isDisable: false,
          isSelected: false,
          url: ''
        },
        {
          index: 'city_image',
          name: 'city_image',
          isDisable: false,
          isSelected: false,
          url: ''
        },
        {
          index: 'photo',
          name: 'photo',
          isDisable: false,
          isSelected: false,
          url: ''
        },
        {
          index: 'city_logo',
          name: 'city_logo',
          isDisable: false,
          isSelected: false,
          url: ''
        },
        {
          index: 'city_weather_logo',
          name: 'city_weather_logo',
          isDisable: false,
          isSelected: false,
          url: ''
        }
      ],
      isWifiDisabled: !!(
        this.props.editRecord && this.props.editRecord.wifi === 0
      ),
      isLoading: true,
      isSpinning: false,
      isSaveButtonDisabled: false
    };
  }

  componentDidMount() {
    const {
      isEditAirportForm,
      isAddAirportForm,
      editRecordData,
      airportFields
    } = this.props;
    if (isEditAirportForm && editRecordData) {
      const data = {
        airport_info: {
          airport_id: editRecordData.airport_id
        }
      };
      this.props.getAirportFieldsUpdateValue(data);
    }
    if (isAddAirportForm) {
      this.props.getAirportFields();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { getAirportFieldsResponse } = this.props;
    if (
      nextProps.getAirportFieldsResponse &&
      nextProps.getAirportFieldsResponse !== getAirportFieldsResponse
    ) {
      if (
        nextProps.getAirportFieldsResponse.error === 0 &&
        nextProps.getAirportFieldsResponse.content
      ) {
        let airportFields = nextProps.getAirportFieldsResponse.content;
        this.setState({ airportFields, isLoading: false });
      }
    }
    if (
      nextProps.addAirportResponse &&
      nextProps.addAirportResponse !== this.props.addAirportResponse
    ) {
      if (
        nextProps.addAirportResponse.error === 0 &&
        nextProps.addAirportResponse.message
      ) {
        message.success(nextProps.addAirportResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.addAirportResponse.message);
        this.setState({ isSpinning: false });
      }
    }
    if (
      nextProps.getAirportFieldsUpdateValueResponse &&
      nextProps.getAirportFieldsUpdateValueResponse !==
        this.props.getAirportFieldsUpdateValueResponse
    ) {
      if (
        nextProps.getAirportFieldsUpdateValueResponse.error === 0 &&
        nextProps.getAirportFieldsUpdateValueResponse.content
      ) {
        const { upLoadFileStates } = this.state;
        const airportFields =
          nextProps.getAirportFieldsUpdateValueResponse.content;
        this.state.upLoadFileStates.map((uploadFileItem, index) => {
          airportFields.filter(item =>
            item.value && item.name === uploadFileItem.name
              ? ((uploadFileItem.url = item.value),
                (uploadFileItem.isDisable = true))
              : null
          );
        });
        this.setState({ upLoadFileStates, airportFields, isLoading: false });
      }
    }
    if (
      nextProps.editAirportResponse &&
      nextProps.editAirportResponse !== this.props.editAirportResponse
    ) {
      if (
        nextProps.editAirportResponse.error === 0 &&
        nextProps.editAirportResponse.message
      ) {
        message.success(nextProps.editAirportResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.editAirportResponse.message);
        this.setState({ isSpinning: false });
      }
    }

    if (
      nextProps.uploadFileResponse &&
      nextProps.uploadFileResponse !== this.props.uploadFileResponse
    ) {
      if (
        nextProps.uploadFileResponse.error === 0 &&
        nextProps.uploadFileResponse.content
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

  handleSubmit = e => {
    e.preventDefault();
    const { upLoadFileStates, airportFields } = this.state;
    const { editRecordData } = this.props;
    upLoadFileStates.forEach(item => {
      switch (item.name) {
        case 'logo':
          this.props.form.setFields({
            logo: {
              value: item.url
            }
          });
          break;
        case 'title_logo':
          this.props.form.setFields({
            title_logo: {
              value: item.url
            }
          });
          break;
        case 'location_image':
          this.props.form.setFields({
            location_image: {
              value: item.url
            }
          });
          break;
        case 'management_image':
          this.props.form.setFields({
            management_image: {
              value: item.url
            }
          });
          break;
        case 'city_image_for_chat':
          this.props.form.setFields({
            city_image_for_chat: {
              value: item.url
            }
          });
          break;
        case 'city_image':
          this.props.form.setFields({
            city_image: {
              value: item.url
            }
          });
          break;
        case 'city_logo':
          this.props.form.setFields({
            city_logo: {
              value: item.url
            }
          });
          break;
        case 'city_weather_logo':
          this.props.form.setFields({
            city_weather_logo: {
              value: item.url
            }
          });
          break;
        case 'photo':
          this.props.form.setFields({
            photo: {
              value: item.url
            }
          });
          break;
        default:
          break;
      }
    });
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Object.keys(values).forEach(key => {
          airportFields.forEach(field => {
            if (field.name === 'rating') {
              field.value = 5;
            }
            if (field.name === key) {
              if (field.display) {
                field.value = values[key];
              }
            }
          });
        });
        airportFields.forEach(field => {
          if (field.name === 'wifi' && field.value === true) {
            field.child_elements.forEach(element => {
              Object.keys(values).forEach(key => {
                if (key == element.name) {
                  element.value = values[key] === undefined ? '' : values[key];
                }
              });
            });
          }
        });

      



        airportFields.forEach(field => {
          if(field.name ==='is_preorder_support' && field.value === true){
            field.child_elements.forEach(element => {
              if(element.type ==="integer"){
                Object.keys(values).forEach(key => {
                  if (key == element.name) {
                    element.value = values[key] === undefined ? '' : values[key];
                  }

                });
              } else{
                element.child_elements.forEach(data1=>{
                  data1.child_elements.forEach(data2=>{
                    let dataName= `${element.label}_${data1.label}_${data2.name}`
                        Object.keys(values).forEach(key=>{
                          if(key ==='Food_Departure_is_delivery' ||key ==='Food_Arrival_is_delivery' 
                          || key === 'Retail_Departure_is_delivery' ||key === 'Retail_Arrival_is_delivery' 
                          || key ==='DutyFree_Departure_is_delivery' ||  key === 'DutyFree_Arrival_is_delivery'){
                            if (key == dataName) {
                              data2.value = values[key] === undefined ? '' : (values[key] === true  ? 1:0)
                            }  
  

                          }
                          else if (key == dataName) {
                            data2.value = values[key] === undefined ? '' : values[key];
                          }  
                      })
                  })
              })
            }
            })
          }
        })
        // fieldInfo.child_elements
        if (this.props.isAddAirportForm) {
          const data = {
            airport_data: airportFields
          };
          this.props.addAirport(data);
        } else if (this.props.isEditAirportForm) {
          const updateData = {
            airport_data: airportFields,
            airport_info: {
              airport_id: editRecordData.airport_id
            }
          };
          this.props.editAirport(updateData);
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      airportFields,
      isLoading,
      upLoadFileStates,
      isSaveButtonDisabled
    } = this.state;
    const { headerName, handleCancel } = this.props;
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {!isLoading && airportFields && (
          <FormComponent
            formFields={airportFields}
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
    addAirportResponse: state.airports.addAirportResponse,
    editAirportResponse: state.airports.editAirportResponse,
    uploadFileResponse: state.uploadFile.uploadFileResponse,
    getAirportFieldsResponse: state.airports.getAirportFieldsResponse,
    getAirportFieldsUpdateValueResponse:
      state.airports.getAirportFieldsUpdateValueResponse
  };
}

NewAirportForm = connect(
  mapStateToProps,
  {
    addAirport,
    editAirport,
    uploadFile,
    getAirportFields,
    getAirportFieldsUpdateValue
  }
)(NewAirportForm);

export default Form.create()(NewAirportForm);
