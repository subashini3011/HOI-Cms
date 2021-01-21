import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from 'components/loading';
import { Form, Row, message } from 'components/ui';
import FormComponent from 'components/forms/shared-form-components';
import {
  addAirlinePunctuality,
  editAirlinePunctuality,
  airlinePunctualityFields,
  airlinePunctualityFieldsUpdateValue
} from '../../../redux/actions/flightServiceActions';
import './index.scss';

class AirlinePunctualityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airlinePunctualityFields: [],
      isLoading: true
    };
  }

  componentDidMount() {
    const {
      isEditAirlinePunctualityForm,
      isAddAirlinePunctualityForm,
      editRecordData,
      airlinePunctualityFields,
      airlinePunctualityFieldsUpdateValue
    } = this.props;
    if (isEditAirlinePunctualityForm) {
      airlinePunctualityFieldsUpdateValue({ airline_id: editRecordData.id });
    } else if (isAddAirlinePunctualityForm) {
      airlinePunctualityFields();
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      addAirlinePunctualityResponse,
      editAirlinePunctualityResponse,
      airlinePunctualityFieldsResponse,
      airlinePunctualityFieldsUpdateValueResponse
    } = this.props;

    if (
      nextProps.airlinePunctualityFieldsResponse &&
      nextProps.airlinePunctualityFieldsResponse !==
        airlinePunctualityFieldsResponse
    ) {
      if (
        nextProps.airlinePunctualityFieldsResponse.error === 0 &&
        nextProps.airlinePunctualityFieldsResponse.content
      ) {
        const airlineFileds =
          nextProps.airlinePunctualityFieldsResponse.content;
        this.setState({
          airlineFileds,
          isLoading: false
        });
      }
    }
    if (
      nextProps.airlinePunctualityFieldsUpdateValueResponse &&
      nextProps.airlinePunctualityFieldsUpdateValueResponse !==
        airlinePunctualityFieldsUpdateValueResponse
    ) {
      if (
        nextProps.airlinePunctualityFieldsUpdateValueResponse.error === 0 &&
        nextProps.airlinePunctualityFieldsUpdateValueResponse.content
      ) {
        const airlineFileds =
          nextProps.airlinePunctualityFieldsUpdateValueResponse.content;
        this.setState({
          airlineFileds,
          isLoading: false
        });
      }
    }

    if (
      nextProps.addAirlinePunctualityResponse &&
      nextProps.addAirlinePunctualityResponse !== addAirlinePunctualityResponse
    ) {
      if (
        nextProps.addAirlinePunctualityResponse.error === 0 &&
        nextProps.addAirlinePunctualityResponse.message
      ) {
        message.success(nextProps.addAirlinePunctualityResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.addAirlinePunctualityResponse.message);
        this.setState({ isLoading: false });
      }
    }

    if (
      nextProps.editAirlinePunctualityResponse &&
      nextProps.editAirlinePunctualityResponse !==
        editAirlinePunctualityResponse
    ) {
      if (
        !nextProps.editAirlinePunctualityResponse.error &&
        nextProps.editAirlinePunctualityResponse.message
      ) {
        message.success(nextProps.editAirlinePunctualityResponse.message);
        this.props.toggleForm();
      } else {
        message.error(nextProps.editAirlinePunctualityResponse.message);
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    const { airlineFileds } = this.state;
    const {
      isAddAirlinePunctualityForm,
      isEditAirlinePunctualityForm,
      editRecordData,
      selectedAirport
    } = this.props;

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Object.keys(values).forEach(key => {
          airlineFileds.forEach(field => {
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

        if (isAddAirlinePunctualityForm) {
          this.setState({ isLoading: true });
          const data = {
            data: airlineFileds
          };
          this.props.addAirlinePunctuality(data);
        } else if (isEditAirlinePunctualityForm && editRecordData) {
          this.setState({ isLoading: true });
          const updateData = {
            airline_id: editRecordData.id,
            data: airlineFileds
          };

          this.props.editAirlinePunctuality(updateData);
        }
      }
    });
  };

  render() {
    const { isLoading, airlineFileds } = this.state;
    const { headerName, handleCancel } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {!isLoading && airlineFileds && (
          <FormComponent
            formFields={airlineFileds}
            getFieldDecorator={getFieldDecorator}
            handleSubmit={this.handleSubmit}
            headerName={headerName}
            handleCancel={handleCancel}
          />
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    airlinePunctualityFieldsResponse:
      state.flightService.airlinePunctualityFieldsResponse,
    airlinePunctualityFieldsUpdateValueResponse:
      state.flightService.airlinePunctualityFieldsUpdateValueResponse,
    addAirlinePunctualityResponse:
      state.flightService.addAirlinePunctualityResponse,
    editAirlinePunctualityResponse:
      state.flightService.editAirlinePunctualityResponse
  };
}

AirlinePunctualityForm = connect(
  mapStateToProps,
  {
    airlinePunctualityFields,
    airlinePunctualityFieldsUpdateValue,
    addAirlinePunctuality,
    editAirlinePunctuality
  }
)(AirlinePunctualityForm);

export default Form.create()(AirlinePunctualityForm);
