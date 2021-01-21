import React from 'react';
// import PropTypes from 'prop-types';

import './index.scss';

import { Row, InputNumber, Form } from 'components/ui';


const OutletFormInteger = ({ getFieldDecorator, fieldInfo,name,fieldName}) => {

  const data= name && fieldName ? `${name}_${fieldName}_${fieldInfo.name}`:`${fieldInfo.name}`
  return (
    <Row className="outlet-form__item" key={fieldInfo.name}>
      <Form.Item label={fieldInfo.label}>
        {getFieldDecorator(data, {
          initialValue:
            fieldInfo && fieldInfo.value ? fieldInfo.value : fieldInfo.value === 0? 0:undefined,
          rules: [
            { required: fieldInfo.required, message: fieldInfo.placeholder }

            // {
            //   min: fieldInfo.min_length,
            //   message: "Minimum length should be " + fieldInfo.min_length
            // },
            // {
            //   max: fieldInfo.max_length,
            //   message: "Maximum length should be " + fieldInfo.max_length
            // }
            // : null
          ]
        })(
          <InputNumber
            // min={fieldInfo.min_length}
            // max={fieldInfo.max_length}
            placeholder={fieldInfo.placeholder}
            type="number"
          />
        )}
      </Form.Item>
    </Row>
  );
};

export default OutletFormInteger;

// OutletFormInteger.propTypes = {
//   fieldInfo: PropTypes.shapeOf(PropTypes.any).isRequired,
//   getFieldDecorator: PropTypes.func.isRequired
// };

// OutletFormInteger.defaultProps = {};
