import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Radio, Form } from 'components/ui';
import './index.scss';

class OutletFormRadio extends Component {
  render() {
    const { getFieldDecorator, fieldInfo, name,fieldName} = this.props;
    const data = name && fieldName ? `${name}_${fieldName}_${fieldInfo.name}`:`${fieldInfo.name}`

    return (
      <Row className="outlet-form__item" key={fieldInfo.name}>
        <Form.Item label={fieldInfo.label}>
          {getFieldDecorator(data, {
            initialValue:
              fieldInfo &&
              (fieldInfo.value === true || fieldInfo.value === false)
                ? fieldInfo.value
                : undefined,
            rules: [
              { required: fieldInfo.required, message: fieldInfo.placeholder }
            ]
          })(
            <Radio.Group onChange={this.onWifiChange}>
              {fieldInfo.options.map(item => {
                return (
                  <Radio
                    value={item.value}
                    className="new-airport--form--item__status__text__radio new-airport--form--item__status__text__active"
                  >
                    {item.text}
                  </Radio>
                );
              })}
            </Radio.Group>
          )}
        </Form.Item>
      </Row>
    );
  }
}

export default OutletFormRadio;

OutletFormRadio.propTypes = {
  fieldInfo: PropTypes.arrayOf(PropTypes.any).isRequired,
  getFieldDecorator: PropTypes.func.isRequired
};

OutletFormRadio.defaultProps = {};
