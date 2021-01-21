import React, { Component } from 'react';
import './index.scss';

import { Row, Select, Form } from 'components/ui';
import PropTypes from 'prop-types';

const { Option } = Select;

class FormTripletDropDown extends Component {
  validatetwinSelect = val => {
    const { fieldInfo, validatetwinSelect } = this.props;
    if (val) {
      validatetwinSelect(val, fieldInfo.name);
    }
  };

  renderSelectOptions = () => {
    const { fieldInfo, currentSelectedRole,airportSelValue} = this.props;
    let selectDom = [];
    if (fieldInfo.name === 'airport') {
      selectDom = fieldInfo.options.map(item => {
        const selectOptions = [];
        if (
          currentSelectedRole &&
          item.first_triplet_selected == currentSelectedRole
        ) {
          selectOptions.push(<Option value={item.value}>{item.text}</Option>);
        }
        return selectOptions;
      });
      
    }
    else if(fieldInfo.name === 'terminal_side'){
      selectDom = fieldInfo.options.map(item => {
      const selectOptions = [];
      if (
        airportSelValue && item.first_triplet_selected  === airportSelValue
      ) {
        selectOptions.push(<Option value={item.value}>{item.text}</Option>);
      }
      return selectOptions;
    });
    }
    else {
      selectDom = fieldInfo.options.map(item => (
        <Option value={item.value}>{item.text}</Option>
      ));
    }
    return selectDom;
  };

  render() {
    const { getFieldDecorator, fieldInfo } = this.props;
    return (
      <Row className="outlet-form__item" key={fieldInfo.name}>
        <Form.Item label={fieldInfo.label}>
          {getFieldDecorator(fieldInfo.name, {
            initialValue:
              fieldInfo && fieldInfo.value ? fieldInfo.value : undefined,
            rules: [
              {
                required: fieldInfo.required,
                message: fieldInfo.placeholder
              }
            ]
          })(
            <Select
              placeholder={fieldInfo.placeholder}
              style={{ width: '100%' }}
              getPopupContainer={trigger => trigger.parentNode}
              onSelect={this.validatetwinSelect}
            >
              {this.renderSelectOptions()}
            </Select>
          )}
        </Form.Item>
      </Row>
    );
  }
}

export default FormTripletDropDown;

FormTripletDropDown.propTypes = {
  currentSelectedRole: PropTypes.number,
  fieldInfo: PropTypes.arrayOf(PropTypes.any).isRequired,
  getFieldDecorator: PropTypes.func.isRequired,
  validatetwinSelect: PropTypes.func.isRequired
};

FormTripletDropDown.defaultProps = {
  currentSelectedRole: null
};
