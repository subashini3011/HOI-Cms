import React, { Component } from 'react';
import './index.scss';

import { Row, Select, Form } from 'components/ui';
import PropTypes from 'prop-types';

const { Option } = Select;

class FormSearchDropdown extends Component {
  renderSelectOptions = () => {
    const {
      fieldInfo,
      currentSelectedAiport,
      currentSelectedRole,
      airportSelValue,
      selTerminalSideValue
    } = this.props;
    let selectDom = [];
    if (fieldInfo.name === 'store') {
      selectDom = fieldInfo.options.map(item => {
        const selectOptions = [];
        if (
          item.first_triplet_selected == currentSelectedRole &&
          ((currentSelectedAiport &&
            item.second_triplet_selected == currentSelectedAiport) ||
            item.second_triplet_selected === 'all')
        ) {
          selectOptions.push(<Option value={item.value}>{item.text}</Option>);
        }
        return selectOptions;
      });
      return selectDom;
    }else if(fieldInfo.name === 'terminal'){
      selectDom = fieldInfo.options.map(item => {
        const selectOptions = [];
        if (
          item.first_triplet_selected == airportSelValue &&
          (selTerminalSideValue &&
            item.second_triplet_selected == selTerminalSideValue
        )) {
          selectOptions.push(<Option value={item.value}>{item.text}</Option>);
        }
        return selectOptions;
      });
      return selectDom;
    }
  };

  render() {
    const { getFieldDecorator, fieldInfo, currentSelectedRole,airportSelValue } = this.props;
    const storeValue = [];
    if (fieldInfo && fieldInfo.options && fieldInfo.value) {
      fieldInfo.value.map(val => {
        fieldInfo.options.map(item => {
          if (
            item.value == val &&
            item.first_triplet_selected == currentSelectedRole
          ) {
            storeValue.push(item.value);
          }
          else if (
            item.value == val &&
            item.first_triplet_selected == airportSelValue
          ) {
            storeValue.push(item.value);
          }
         
        });
      });
    }
    return (
      <Row className="outlet-form__item" key={fieldInfo.name}>
        <Form.Item label={fieldInfo.label} className="search-dropdown">
          {getFieldDecorator(fieldInfo.name, {
            initialValue: fieldInfo && fieldInfo.value ? storeValue : undefined,
            rules: [
              {
                required: fieldInfo.required,
                message: fieldInfo.placeholder
              }
            ]
          })(
            <Select
              showSearch={fieldInfo.drop_down_search}
              mode={
                currentSelectedRole && currentSelectedRole == 3 || currentSelectedRole == 6
                  ? 'multiple'
                  : 'default'
              }
              placeholder={fieldInfo.placeholder}
              style={{ width: '100%' }}
              id={fieldInfo.id}
              filterOption={
                fieldInfo.drop_down_search
                  ? (input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                  : null
              }
              // getPopupContainer={trigger => trigger.parentNode} It was not showing options for last dropdown
            >
              {this.renderSelectOptions()}
            </Select>
          )}
        </Form.Item>
      </Row>
    );
  }
}

export default FormSearchDropdown;

FormSearchDropdown.propTypes = {
  fieldInfo: PropTypes.arrayOf(PropTypes.any).isRequired,
  getFieldDecorator: PropTypes.func.isRequired,
  currentSelectedRole: PropTypes.string,
  currentSelectedAiport: PropTypes.string.isRequired
};

FormSearchDropdown.defaultProps = {
  currentSelectedRole: ''
};
