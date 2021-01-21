import React, { Component } from "react";
import PropTypes from "prop-types";

import moment from "moment";
import { Row, DatePicker, Form } from "components/ui";
import "./index.scss";
import renderEmpty from "antd/lib/config-provider/renderEmpty";

const dateFormat = "DD-MM-YYYY";

class OutletFormDatepicker extends Component {
  disabledDate = current => {
    // Can not select days before today and today
    return current && current > moment().endOf("day");
  };
  render() {
    const { fieldInfo, getFieldDecorator } = this.props;
    return (
      <Row className="outlet-form__item" key={fieldInfo.name}>
        <Form.Item label={fieldInfo.label}>
          {getFieldDecorator(fieldInfo.name, {
            initialValue:
              fieldInfo && fieldInfo.value
                ? moment(fieldInfo.value, dateFormat)
                : undefined,
            rules: [
              {
                required: fieldInfo.required,
                message: fieldInfo.placeholder
              }
            ]
          })(
            <DatePicker format={dateFormat} disabledDate={this.disabledDate} />
          )}
        </Form.Item>
      </Row>
    );
  }
}
export default OutletFormDatepicker;

OutletFormDatepicker.propTypes = {
  fieldInfo: PropTypes.arrayOf(PropTypes.any).isRequired,
  getFieldDecorator: PropTypes.func.isRequired
};

OutletFormDatepicker.defaultProps = {};
