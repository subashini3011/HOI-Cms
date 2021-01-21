import React, { Component } from "react";
import { Row, Form } from "components/ui";
import OutletFormText from "components/forms/shared-form-components/outlet-form-text";
import OutletFormInteger from "components/forms/shared-form-components/outlet-form-integer";
import OutletFormDropDown from "components/forms/shared-form-components/outlet-form-dropdown";
import OutletFormEmail from "components/forms/shared-form-components/outlet-form-email";
import OutletFormImage from "components/forms/shared-form-components/outlet-form-image";
import OutletFormPhoneNumber from "components/forms/shared-form-components/outlet-form-phonenumber";
import OutletFormRadio from "components/forms/shared-form-components/outlet-form-radio";
import FormRadioWithChildButton from "components/forms/shared-form-components/form-radio-with-child-button";
import OutletFormDatePicker from "components/forms/shared-form-components/outlet-form-datepicker";
import FormDecimal from "components/forms/shared-form-components/form-decimal";
import OutletFormTwinDropDown from "components/forms/shared-form-components/outlet-form-twin-dropdown";
import FormSearchDropDown from "components/forms/shared-form-components/form-search-dropdown";
import FormTripletDropDown from "components/forms/shared-form-components/form-triplet-dropdown";
import NestedDropdown from "components/forms/shared-form-components/nested-dropdown";
import FormButtons from "components/forms/shared-form-components/new-form-buttons";
import FormHeader from "components/forms/shared-form-components/new-form-header";
import StoreInputFields from "components/forms/shared-form-components/store-input-fields";

class FormComponent extends Component {
  renderFormComponent = () => {
    const {
      editRecord,
      editRecordData,
      formFields,
      upLoadFileStates,
      getFieldDecorator,
      currentSelectedRole,
      currentSelectedAiport,
      validatetwinSelect,
      isDisableImageUpload,
      onImageBeforeUpload,
      onRemove,
      formCurrentValues,
      validatetwinSelectNested,
      airportSelValue,
      selTerminalSideValue,
    } = this.props;
    // const { getFieldDecorator } = this.props.form;
    if (formFields) {
      var formDom = [];
      formDom.push(
        formFields.map((item, index) => {
          let data = [];
          if (item.display) {
            if(item.name === "is_preorder_support"){
              data =(
                <StoreInputFields
                fieldInfo={item}
                getFieldDecorator={getFieldDecorator}
                />
              )
            }
            else {
            switch (item.type) {
              case "text":
                data = (
                  <OutletFormText
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                    editRecord={editRecord}
                  />
                );
                break;
              case "integer":
                data = (
                  <OutletFormInteger
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                  />
                );
                break;
              case "radio_with_child":
                data = (
                  <FormRadioWithChildButton
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                  />
                );
                break;

              case "radio_with_nested_dropdown":
                data = (
                  <NestedDropdown
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                    formCurrentValues={formCurrentValues}
                    validatetwinSelect ={validatetwinSelectNested}
                    airportSelValue={airportSelValue}
                    selTerminalSideValue={selTerminalSideValue}

                  />
                );
                break;
              case "radio":
                data = (
                  <OutletFormRadio
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                  />
                );

                break;
              case "image":
                data = (
                  <OutletFormImage
                    upLoadFileStates={upLoadFileStates}
                    fieldInfo={item}
                    editRecordData={editRecordData}
                    getFieldDecorator={getFieldDecorator}
                    onImageBeforeUpload={onImageBeforeUpload}
                    onRemove={onRemove}
                    isDisableImageUpload={isDisableImageUpload}
                  />
                );
                break;
              case "decimal":
                data = (
                  <FormDecimal
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                  />
                );
                break;
              case "phone_number":
                data = (
                  <OutletFormPhoneNumber
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                  />
                );
                break;
              case "email":
                data = (
                  <OutletFormEmail
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                  />
                );
                break;
              case "twin_drop_down":
                data = (
                  <OutletFormTwinDropDown
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                    validatetwinSelect={validatetwinSelect}
                  />
                );
              case "triplet_drop_down":
              case "second_triplet_drop_down":
                data = (
                  <FormTripletDropDown
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                    currentSelectedRole={currentSelectedRole}
                    validatetwinSelect={validatetwinSelect}
                  />
                );
                break;
              case "third_triplet_drop_down":
                data = (
                  <FormSearchDropDown
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                    currentSelectedRole={currentSelectedRole}
                    currentSelectedAiport={currentSelectedAiport}
                  />
                );
                break;
              case "drop_down":
                data = (
                  <OutletFormDropDown
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                  />
                );
                break;
              case "datetime":
                data = (
                  <OutletFormDatePicker
                    fieldInfo={item}
                    getFieldDecorator={getFieldDecorator}
                  />
                );
                break;
              default:
                break;
            }
          }
          }
          return data;
        })
      );
    }

    return formDom;
  };
  render() {
    const {
      handleSubmit,
      formFields,
      headerName,
      isSaveButtonDisabled,
      handleCancel
    } = this.props;
    return (
      <div className="new-user">
        <Row className="new-user--header">
          <FormHeader headerName={headerName} />
        </Row>
        <Form onSubmit={handleSubmit}>
          <Row>{formFields && this.renderFormComponent()}</Row>
          <Row className="new-user--form--buttons">
            <FormButtons
              isSaveButtonDisabled={isSaveButtonDisabled}
              handleCancel={handleCancel}
            />
          </Row>
        </Form>
      </div>
    );
  }
}

export default FormComponent;
