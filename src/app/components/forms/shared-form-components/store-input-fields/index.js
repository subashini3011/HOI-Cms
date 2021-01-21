import React from 'react';
import { Row, Radio, Form} from "components/ui";


import OutletFormInteger from '../outlet-form-integer';
import ArrivalDepartureInput from '../arrival-departure-input';

class StoreInputFields extends React.Component{
  constructor(props) {
    super(props);
    this.state ={ 
      showChildElement:props.fieldInfo && props.fieldInfo.value ? props.fieldInfo.value : false,
    };
  }

  onRadioValueChange = e => {
    const val = e.target.value;
    this.setState({ showChildElement: val });
  };

  renderContent = eachData=>{
    const { getFieldDecorator } = this.props;
      let formDom = [];
      formDom.push(
        eachData.map(item => {
          let data = [];
          if (item.display && item.type) {
            switch (item.type) {
              case "integer":
                data =(
                <OutletFormInteger 
                  getFieldDecorator={getFieldDecorator}
                  fieldInfo={item}
                />
                )
                break;
              default:
                break;
            }
          }
          else{
            data =(
              <ArrivalDepartureInput
              fieldInfo={item}
              getFieldDecorator={getFieldDecorator}
              
              />
            )
          }
          return data;
        })
      );
      return formDom;
  }


  render(){
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
          this.renderContent(fieldInfo.child_elements)
      }
    </React.Fragment>
  );
}
}

export default StoreInputFields;