import './index.scss';
import React, { Component } from 'react';

import { connect } from 'react-redux';

// components
import { Modal, Form, message } from 'components/ui';
import {
  addExciting,
  updateExciting,
  excitingFields,
  excitingFieldsUpdateValue
} from '../../../redux/actions/preferencesActions';
import FormComponent from 'components/forms/shared-form-components';

class ExcitingTypesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      excitingTypesFields: [],
      isLoading: true
    };
  }

  componentDidMount() {
    const {
      showModal,
      excitingFields,
      isAddExcitingType,
      isEditExcitingType,
      editExcitingTypeData,
      excitingFieldsUpdateValue
    } = this.props;
    if (isAddExcitingType) {
      excitingFields();
    } else if (isEditExcitingType) {
      excitingFieldsUpdateValue({
        exciting_id: editExcitingTypeData.category_id
      });
    }
    this.setState({ visible: showModal });
  }

  componentWillReceiveProps(nextProps) {
    const {
      showModal,
      addExcitingResponse,
      updateExcitingResponse,
      excitingFieldsResponse,
      excitingFieldsUpdateValueResponse,
      form
    } = this.props;

    const { visible } = this.state;
    if (showModal) {
      this.setState({ visible: showModal });
    }
    if (!visible) {
      form.resetFields();
    }

    if (
      nextProps.excitingFieldsResponse &&
      nextProps.excitingFieldsResponse !== excitingFieldsResponse
    ) {
      if (
        nextProps.excitingFieldsResponse.error === 0 &&
        nextProps.excitingFieldsResponse.content
      ) {
        this.setState({
          excitingTypesFields: nextProps.excitingFieldsResponse.content
        });
      } else {
        message.error(nextProps.excitingFieldsResponse.message);
        this.setState({ isSpinning: false });
      }
    }

    if (
      nextProps.excitingFieldsUpdateValueResponse &&
      nextProps.excitingFieldsUpdateValueResponse !==
        excitingFieldsUpdateValueResponse
    ) {
      if (
        nextProps.excitingFieldsUpdateValueResponse.error === 0 &&
        nextProps.excitingFieldsUpdateValueResponse.content
      ) {
        this.setState({
          excitingTypesFields:
            nextProps.excitingFieldsUpdateValueResponse.content
        });
      } else {
        message.error(nextProps.excitingFieldsUpdateValueResponse.message);
        this.setState({ isSpinning: false });
      }
    }

    if (
      nextProps.addExcitingResponse &&
      nextProps.addExcitingResponse !== addExcitingResponse
    ) {

      if (
        nextProps.addExcitingResponse.error === 0 &&
        nextProps.addExcitingResponse.message
      ) {
        message.success(nextProps.addExcitingResponse.message);
        this.props.toggleForm();
        this.setState({ visible: false });
      } else {
        message.error(nextProps.addExcitingResponse.message);
        this.setState({ isSpinning: false });
      }
    }
    if (
      nextProps.updateExcitingResponse &&
      nextProps.updateExcitingResponse !== updateExcitingResponse
    ) {
      if (
        !nextProps.updateExcitingResponse.error &&
        nextProps.updateExcitingResponse.message
      ) {
        message.success(nextProps.updateExcitingResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.updateExcitingResponse.message);
        this.setState({ isSpinning: false });
      }
    }
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
    this.props.toggleForm('closeModal');
  };

  handleSubmit = e => {
    e.preventDefault();
    const { excitingTypesFields } = this.state;
    const {
      isAddExcitingType,
      isEditExcitingType,
      form,
      selectedAirport,
      editExcitingTypeData,
      updateExciting,
      addExciting
    } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        Object.keys(values).forEach(key => {
          excitingTypesFields.forEach(field => {
            if (field.name === 'rating') {
              field.value = 5;
            }
            if (field.name === key) {
              if (field.display) {
                field.value = field.value =
                  values[key] === undefined ? '' : values[key];
              }
            }
          });
        });
        if (isAddExcitingType) {
          const data = { data: excitingTypesFields };
          addExciting(data);
        } else if (isEditExcitingType) {
          updateExciting({
            exciting_id: editExcitingTypeData.category_id,
            data: excitingTypesFields
          });
          // this.setState({ isSpinning: true });
        }
        this.setState({
          visible: false
        });
      }
    });
  };

  render() {
    const { excitingTypesFields } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { isEditExcitingType, editExcitingTypeData } = this.props;
    return (
      <div className="modal">
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          className="modal"
        >
          <FormComponent
            formFields={excitingTypesFields}
            getFieldDecorator={getFieldDecorator}
            handleSubmit={this.handleSubmit}
            headerName={
              editExcitingTypeData &&
              editExcitingTypeData &&
              editExcitingTypeData.category
                ? `Edit Exciting type ${editExcitingTypeData.category}`
                : 'Add New Exciting type'
            }
            handleCancel={this.handleCancel}
          />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    updateExcitingResponse: state.preferences.updateExcitingResponse,
    addExcitingResponse: state.preferences.addExcitingResponse,
    excitingFieldsResponse: state.preferences.excitingFieldsResponse,
    excitingFieldsUpdateValueResponse:
      state.preferences.excitingFieldsUpdateValueResponse
  };
}

ExcitingTypesModal = connect(
  mapStateToProps,
  {
    updateExciting,
    addExciting,
    excitingFields,
    excitingFieldsUpdateValue
  }
)(ExcitingTypesModal);
export default Form.create()(ExcitingTypesModal);
