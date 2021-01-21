import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

import { Row, Radio, Form } from 'components/ui';
import OutletFormText from '../outlet-form-text';

class FormRadioWithChildButton extends Component {
  constructor(props) {
    super(props);
    const { fieldInfo } = this.props;
    this.state = {
      showWifiChildElements:
        fieldInfo && fieldInfo.value ? fieldInfo.value : false
    };
  }

  onWifiChange = e => {
    const val = e.target.value;
    this.setState({ showWifiChildElements: val });
  };

  render() {
    const { showWifiChildElements } = this.state;
    const { getFieldDecorator, fieldInfo } = this.props;
    return (
      <React.Fragment>
        <Row className="outlet-form__item" key={fieldInfo.name}>
          <Form.Item label={fieldInfo.label}>
            {getFieldDecorator(fieldInfo.name, {
              initialValue:
                (fieldInfo && fieldInfo.value === true) ||
                fieldInfo.value === false
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
        {showWifiChildElements &&
          fieldInfo.child_elements.map(item => {
            return item.display && item.type === 'text' ? (
              <OutletFormText
                fieldInfo={item}
                getFieldDecorator={getFieldDecorator}
                // editRecord={editRecord}
              />
            ) : null;
          })}
      </React.Fragment>
    );
  }
}

export default FormRadioWithChildButton;

FormRadioWithChildButton.propTypes = {
  fieldInfo: PropTypes.arrayOf(PropTypes.any).isRequired,
  getFieldDecorator: PropTypes.func.isRequired
};

FormRadioWithChildButton.defaultProps = {};
