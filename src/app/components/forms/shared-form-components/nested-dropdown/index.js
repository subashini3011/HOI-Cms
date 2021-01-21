import React, { Component } from "react";
import PropTypes from "prop-types";
import "./index.scss";

import { Row, Radio, Form} from "components/ui";

import OutletFormDropDown from "../outlet-form-dropdown";
import FormSearchDropDown from "../form-search-dropdown";
import FormTripletDropDown from "../form-triplet-dropdown";
import PasswordCmsUser from "../password-cms-user";


class FormRadioWithChildButton extends Component {
  constructor(props) {
    super(props);
    const { fieldInfo,airportSelValue,selTerminalSideValue} = this.props;
    this.state ={ 
      showChildElement:fieldInfo && fieldInfo.value ? fieldInfo.value : false,
      airportSelValue: airportSelValue,
      selTerminalSideValue: selTerminalSideValue,
    };
  }

  componentWillReceiveProps(nextProps){
    const { airportSelValue,selTerminalSideValue } = this.props;
    if(nextProps.airportSelValue !== airportSelValue){
      this.setState({ airportSelValue:nextProps.airportSelValue})
      this.setState({ selTerminalSideValue:nextProps.selTerminalSideValue})
    } else if(nextProps.selTerminalSideValue !== selTerminalSideValue){
      this.setState({ selTerminalSideValue:nextProps.selTerminalSideValue})
    }
  }


  onRadioValueChange = e => {
    const val = e.target.value;
    this.setState({ showChildElement: val });
  };

  renderContent = eachDropdown=>{
    const { getFieldDecorator,validatetwinSelect } = this.props;
    const { airportSelValue,selTerminalSideValue} = this.state;
      let formDom = [];
      formDom.push(
        eachDropdown.map(item => {
          let data = [];
          if (item.display) {
            switch (item.type) {
              case "triplet_drop_down":
              case "second_triplet_drop_down":
                data = (
                  <FormTripletDropDown
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                    validatetwinSelect ={validatetwinSelect}
                    airportSelValue={airportSelValue}
                    selTerminalSideValue={selTerminalSideValue}
                  />
                );
                break;
              case "third_triplet_drop_down":
                data = (
                  <FormSearchDropDown
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                    validatetwinSelect={validatetwinSelect}
                    airportSelValue={airportSelValue}
                    selTerminalSideValue={selTerminalSideValue}
                  />
                );
                break;
              case "drop_down":
                data = (
                  <OutletFormDropDown
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                    twinSelected ={validatetwinSelect}
                  />
                );
                break;
              case "password":
                 data = (
                  <PasswordCmsUser
                  fieldInfo={item}
                  getFieldDecorator={getFieldDecorator}
                  />
                 )
              default:
                break;
            }
          }
          return data;
        })
      );
      return formDom;
  }

  render() {
    const { getFieldDecorator, fieldInfo } = this.props;
    const { showChildElement } = this.state;
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
              <Radio.Group onChange={this.onRadioValueChange}>
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
        {
          showChildElement &&
            this.renderContent(fieldInfo.child_element)
        }
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
