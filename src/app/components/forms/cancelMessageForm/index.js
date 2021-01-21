import React, { Component } from "react";
// import './index.scss';

import { connect } from "react-redux";

// actions
import {
  addCancelMessage,
  editCancelMessage,
  getCancelMessageFields,
  getCancelMessageFieldsUpdateValue
} from "../../../redux/actions/cancel_message";

// components
import Loading from "components/loading";
import { Form, message } from "components/ui";
import FormComponent from "components/forms/shared-form-components";

class CancelMessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUrl: [],
      isLoading: true,
      isSpinning: false,
      isSaveButtonDisabled: false
    };
  }

  componentDidMount() {
    const {
      isEditCancelMessageForm,
      isAddCancelMessageForm,
      editRecordData,
      getCancelMessageFieldsUpdateValue
    } = this.props;
    if (isEditCancelMessageForm && editRecordData) {
      getCancelMessageFieldsUpdateValue({ message_id: editRecordData.id });
    }
    if (isAddCancelMessageForm) {
      this.props.getCancelMessageFields();
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      getCancelMessageFieldsResponse,
      addCancelMessageResponse,
      getCancelMessageFieldsUpdateValueResponse,
      editCancelMessageResponse
    } = this.props;
    if (
      nextProps.getCancelMessageFieldsResponse &&
      nextProps.getCancelMessageFieldsResponse !==
        getCancelMessageFieldsResponse
    ) {
      if (
        nextProps.getCancelMessageFieldsResponse.error === 0 &&
        nextProps.getCancelMessageFieldsResponse.content
      ) {
        let cancelMessageFields =
          nextProps.getCancelMessageFieldsResponse.content;
        this.setState({ cancelMessageFields, isLoading: false });
      }
    }
    if (
      nextProps.addCancelMessageResponse &&
      nextProps.addCancelMessageResponse !== addCancelMessageResponse
    ) {
      if (
        nextProps.addCancelMessageResponse.error === 0 &&
        nextProps.addCancelMessageResponse.message
      ) {
        message.success(nextProps.addCancelMessageResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.addCancelMessageResponse.message);
        this.setState({ isSpinning: false });
      }
    }
    if (
      nextProps.getCancelMessageFieldsUpdateValueResponse &&
      nextProps.getCancelMessageFieldsUpdateValueResponse !==
        getCancelMessageFieldsUpdateValueResponse
    ) {
      if (
        nextProps.getCancelMessageFieldsUpdateValueResponse.error === 0 &&
        nextProps.getCancelMessageFieldsUpdateValueResponse.content
      ) {
        this.setState({ cancelMessageFields:nextProps.getCancelMessageFieldsUpdateValueResponse.content
          ,isLoading:false})
      }
    }
    if (
      nextProps.editCancelMessageResponse &&
      nextProps.editCancelMessageResponse !== editCancelMessageResponse
    ) {
      if (
        nextProps.editCancelMessageResponse.error === 0 &&
        nextProps.editCancelMessageResponse.message
      ) {
        message.success(nextProps.editCancelMessageResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.editCancelMessageResponse.message);
        this.setState({ isSpinning: false });
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { cancelMessageFields } = this.state;
    const { editRecordData } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Object.keys(values).forEach(key => {
          cancelMessageFields.forEach(field => {
            if (field.name === "rating") {
              field.value = 5;
            }
            if (field.name === key) {
              if (field.display) {
                field.value = values[key];
              }
            }
          });
        });
        if (this.props.isAddCancelMessageForm) {
          const data = {
             data:cancelMessageFields
          };
          this.props.addCancelMessage(data);
        } else if (this.props.isEditCancelMessageForm) {
          const updateData = {
            data:cancelMessageFields,
            message_id:editRecordData.id
          };
          this.props.editCancelMessage(updateData);
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      cancelMessageFields,
      isLoading,
      isSaveButtonDisabled
    } = this.state;
    const { headerName, handleCancel } = this.props;
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {!isLoading && cancelMessageFields && (
          <FormComponent
            formFields={cancelMessageFields}
            getFieldDecorator={getFieldDecorator}
            handleSubmit={this.handleSubmit}
            headerName={headerName}
            isSaveButtonDisabled={isSaveButtonDisabled}
            handleCancel={handleCancel}
          />
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    addCancelMessageResponse: state.cancelmessage.addCancelMessageResponse,
    editCancelMessageResponse: state.cancelmessage.editCancelMessageResponse,
    getCancelMessageFieldsResponse:
      state.cancelmessage.getCancelMessageFieldsResponse,
    getCancelMessageFieldsUpdateValueResponse:
      state.cancelmessage.getCancelMessageFieldsUpdateValueResponse

  };
} 

CancelMessageForm = connect(mapStateToProps, {
  addCancelMessage,
 editCancelMessage,
  getCancelMessageFields,
  getCancelMessageFieldsUpdateValue
})(CancelMessageForm);

export default Form.create()(CancelMessageForm);
