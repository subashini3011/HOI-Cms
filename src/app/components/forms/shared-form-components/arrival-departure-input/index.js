import React from 'react';
import { Row } from "components/ui";
import './index.scss';

import OutletFormInteger from '../outlet-form-integer';
import  OutletFormRadio from '../outlet-form-radio';


class ArrivalDepartureInput extends React.Component{
  renderContent = (data,name) =>{
    const { getFieldDecorator,label,fieldName} = this.props;
    let formDom = [];
    formDom.push(
      data.map(item => {
        let data = [];
        if (item.display && item.type) {
          switch (item.type) {
            case "integer":
              data =(
              <OutletFormInteger 
                getFieldDecorator={getFieldDecorator}
                fieldInfo={item}
                name={label}
                fieldName={fieldName}
              />
              )
              break;
              case "radio":
                data = (
                  <OutletFormRadio
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                    name={label}
                    fieldName={fieldName}

                  />
                );

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
                label={name}
                fieldName={item.label}
                />
              )

            }
        return data;
      })
    );
    return formDom;
}





  render(){
    const { fieldInfo } = this.props;
    
    const data = (fieldInfo.label === 'Arrival' || fieldInfo.label === 'Departure') ? 'labelsubheader':'labelheader';
    return(
   <div>
   <div className={`outlet-form__item  ${data}`}>{fieldInfo.label}</div>
   <Row className="outlet-form_item" key={fieldInfo.label}>
      {
        this.renderContent(fieldInfo.child_elements,fieldInfo.label)
      }
    </Row>
   </div>
  );
 }
};

export default ArrivalDepartureInput;