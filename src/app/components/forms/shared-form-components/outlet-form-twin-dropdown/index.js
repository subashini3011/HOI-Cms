import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { Row, Select, Form } from 'components/ui';

const { Option } = Select;

class OutletFormTwinDropDown extends Component {
  handleValidatetwinSelect = val => {
    const { fieldInfo, validatetwinSelect } = this.props;
    if (val) {
      validatetwinSelect(val, fieldInfo.name);
    }
  };

  renderSelectOptions = () => {
    const { fieldInfo, currentSelectedRole } = this.props;
    let selectDom = [];
    if (fieldInfo.name === 'airport') {
      selectDom = fieldInfo.options.map(item => {
        const selectOptions = [];
        if (currentSelectedRole && item.twin_selected == currentSelectedRole) {
          selectOptions.push(<Option value={item.value}>{item.text}</Option>);
        }
        return selectOptions;
      });
    } else {
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
              onSelect={this.handleValidatetwinSelect}
            >
              {this.renderSelectOptions()}
            </Select>
          )}
        </Form.Item>
      </Row>
    );
  }
}

export default OutletFormTwinDropDown;

OutletFormTwinDropDown.propTypes = {
  currentSelectedRole: PropTypes.number,
  validatetwinSelect: PropTypes.func.isRequired,
  fieldInfo: PropTypes.arrayOf(PropTypes.any).isRequired,
  getFieldDecorator: PropTypes.func.isRequired
};

OutletFormTwinDropDown.defaultProps = {
  currentSelectedRole: null
};
