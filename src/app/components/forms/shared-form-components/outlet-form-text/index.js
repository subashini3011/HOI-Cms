import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

import { Row, Input, Form } from 'components/ui';

const OutletFormText = ({ getFieldDecorator, fieldInfo }) => {
  return (
    <Row className="outlet-form__item" key={fieldInfo.name}>
      <Form.Item label={fieldInfo.label}>
        {getFieldDecorator(fieldInfo.name, {
          initialValue:
            fieldInfo && fieldInfo.value ? fieldInfo.value : undefined,
          rules: [
            { required: fieldInfo.required, message: fieldInfo.placeholder }
            // {
            //   min: fieldInfo.min_length,
            //   message: `Minimum length should be  ${fieldInfo.min_length}`
            // },
            // {
            //   max: fieldInfo.max_length,
            //   message: `Maximum length should be ${fieldInfo.max_length}`
            // }
          ]
        })(
          <Input
            placeholder={fieldInfo.placeholder}
            disabled={
              fieldInfo.enabled !== undefined && fieldInfo.enabled === false
                ? true
                : false
            }
          />
        )}
      </Form.Item>
    </Row>
  );
};

export default OutletFormText;

OutletFormText.propTypes = {
  fieldInfo: PropTypes.arrayOf(PropTypes.any).isRequired,
  getFieldDecorator: PropTypes.func.isRequired
};

OutletFormText.defaultProps = {};
