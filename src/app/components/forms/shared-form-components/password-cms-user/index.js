import React from 'react';
import { Row, Input, Form } from 'components/ui';


const PasswordCmsUser = ({ getFieldDecorator, fieldInfo,isEditUserForm }) =>{ 
  return(
    <Row className="outlet-form__item-password" key={fieldInfo.name}>
    <Form.Item label= {fieldInfo.label}>
          {getFieldDecorator(fieldInfo.name, {
            initialValue:
            fieldInfo && fieldInfo.value ? fieldInfo.value : undefined,
            rules: [{ required: !isEditUserForm, message:fieldInfo.placeholder }]
          })(
            <Input.Password
             placeholder={fieldInfo.placeholder}
             disabled ={!fieldInfo.enabled }
            />
          )}
        </Form.Item>
    </Row>
  )
}

export default PasswordCmsUser;


