import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

import { Row, Input, Form } from 'components/ui';

const OutletFormRating = ({ getFieldDecorator, fieldInfo }) => {
  return (
    <Row className="outlet-form__item" key={fieldInfo.name}>
      <Form.Item label="Store Name">
        {getFieldDecorator('store_name', {
          //   initialValue: this.props.editRecord && this.props.editRecord.store_name ? this.props.editRecord.store_name : undefined,
          rules: [{ required: true, message: 'Please input the storename!' }]
        })(<Input placeholder="Enter the Storename" />)}
      </Form.Item>
    </Row>
  );
};

export default OutletFormRating;

OutletFormRating.propTypes = {
  fieldInfo: PropTypes.arrayOf(PropTypes.any).isRequired,
  getFieldDecorator: PropTypes.func.isRequired
};

OutletFormRating.defaultProps = {};
