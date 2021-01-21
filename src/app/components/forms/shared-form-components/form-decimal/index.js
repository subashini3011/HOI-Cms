import React from "react";
import "./index.scss";

import { Row, Form } from "components/ui";
import { InputNumber } from "antd";
import PropTypes from "prop-types";

const FormDecimal = ({ getFieldDecorator, fieldInfo }) => {
  return (
    <Row className="outlet-form__item" key={fieldInfo.name}>
      <Form.Item label={fieldInfo.label}>
        {getFieldDecorator(fieldInfo.name, {
          initialValue: fieldInfo ? fieldInfo.value : undefined,
          rules: [
            {
              required: fieldInfo.required,
              message: fieldInfo.placeholder
            },
            {
              type: "number",
              message: "Please enter a decimal value"
            }
            //  {
            //   min: fieldInfo.min_length,
            //   message: "Minimum length should be " + fieldInfo.min_length
            // },
            // {
            //   max: fieldInfo.max_length,
            //   message: "Maximum length should be " + fieldInfo.max_length
            // }
            // {
            //   pattern: new RegExp("^[0-9]*$"),
            //   message: "Wrong format!"
            // }
          ]
        })(
          <InputNumber
            min={fieldInfo.min_length}
            max={fieldInfo.max_length}
            placeholder={fieldInfo.placeholder}
            getPopupContainer={trigger => trigger.parentNode}
          />
        )}
      </Form.Item>
    </Row>
  );
};

export default FormDecimal;

FormDecimal.propTypes = {
  fieldInfo: PropTypes.arrayOf(PropTypes.any).isRequired,
  getFieldDecorator: PropTypes.func.isRequired
};

FormDecimal.defaultProps = {};
