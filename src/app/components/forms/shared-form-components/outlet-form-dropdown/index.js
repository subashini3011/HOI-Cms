import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Select, Form } from 'components/ui';
import './index.scss';

const { Option } = Select;

class OutletFormDropdown extends Component {
  renderSelectOptions = () => {
    const { twinSelected, fieldInfo } = this.props;
    let selectDom = [];
    if (fieldInfo.name === 'terminal') {
      selectDom = fieldInfo.options.map(item => {
        const selectOptions = [];
        if (
          (twinSelected && item.twin_selected === twinSelected) ||
          item.twin_selected === 'all'
        ) {
          selectOptions.push(<Option value={item.value}>{item.text}</Option>);
        }
        return selectOptions;
      });
    } else if (fieldInfo.name === 'gender') {
      selectDom = fieldInfo.options.map(item => (
        <Option value={item}>{item}</Option>
      ));
    }  else {
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
              showSearch={fieldInfo.drop_down_search}
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

export default OutletFormDropdown;

OutletFormDropdown.propTypes = {
  twinSelected: PropTypes.string,
  fieldInfo: PropTypes.arrayOf(PropTypes.any).isRequired,
  getFieldDecorator: PropTypes.func.isRequired
};

OutletFormDropdown.defaultProps = {
  twinSelected: ''
};
