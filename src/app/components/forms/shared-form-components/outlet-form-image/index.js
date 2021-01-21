import React, { Component } from "react";
import "./index.scss";
import PropTypes from "prop-types";

import { Row, Upload, Form, Button, Icon, message } from "components/ui";
import { UploadSvg } from "components/svg-icons-component";

class OutletFormImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisableUpload: false
    };
  }

  render() {
    const {
      getFieldDecorator,
      fieldInfo,
      editRecordData,
      upLoadFileStates,
      isDisableImageUpload,
      onRemove,
      onImageBeforeUpload
    } = this.props;
    this.isDisableUpload = false;
    upLoadFileStates &&
      upLoadFileStates.find(item =>
        item.name === fieldInfo.name
          ? (this.isDisableUpload = item.isDisable)
          : null
      );
    const props = {
      listType: "picture",
      onRemove: e => onRemove(e, fieldInfo),

      beforeUpload: file => {
        if (file.type === "image/jpeg" || file.type === "image/png") {
          onImageBeforeUpload(fieldInfo, file);
        } else {
          message.error("You can only upload JPG/PNG file!");
          return false;
        }
        return false;
      },
      defaultFileList:
        fieldInfo && fieldInfo.value && fieldInfo.value !== "" && editRecordData
          ? [
              {
                uid: "1",
                name: fieldInfo.value,
                status: "done",
                url: fieldInfo.value
              }
            ]
          : null
    };
    return (
      <Row className="outlet-form__item" key={fieldInfo.name}>
        <Form.Item label={fieldInfo.label}>
          {getFieldDecorator(fieldInfo.name, {
            // initialValue:
            //   fieldInfo && fieldInfo.value ? fieldInfo.value : undefined,
            rules: [
              { required: fieldInfo.required, message: fieldInfo.placeholder }
            ]
          })(
            <Upload {...props}>
              <Button disabled={isDisableImageUpload || this.isDisableUpload}>
                <span className="new-airport--form--item__upload-text">
                  Upload {fieldInfo.label}
                </span>
                <Icon component={UploadSvg} />
              </Button>
            </Upload>
          )}
        </Form.Item>
      </Row>
    );
  }
}

export default OutletFormImage;

OutletFormImage.propTypes = {
  fieldInfo: PropTypes.arrayOf(PropTypes.any).isRequired,
  getFieldDecorator: PropTypes.func.isRequired,
  isDisableUpload: PropTypes.bool,
  editRecordData: PropTypes.arrayOf(PropTypes.any),
  upLoadFileStates: PropTypes.arrayOf(PropTypes.any)
};

OutletFormImage.defaultProps = {
  isDisableUpload: false,
  editRecordData: [],
  upLoadFileStates: []
};
