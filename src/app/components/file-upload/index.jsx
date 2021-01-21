import React, { Component } from "react";
import "./index.scss";
import PropTypes from "prop-types";

import { Row, Upload, Button, Icon, message } from "components/ui";
import { UploadSvg } from "components/svg-icons-component";

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      getFieldDecorator,
      editRecordData,
      isDisableImageUpload,
      onRemove,
      name,
      label,
      value,
      uploadName,
      onImageBeforeUpload,
      record
    } = this.props;

    const props = {
      // listType: 'picture',
      onRemove: e => onRemove(e, uploadName, record),

      beforeUpload: file => {
        // if (file.type === 'image/jpeg' || file.type === 'image/png' || true) {
        onImageBeforeUpload(uploadName, file, record);
        // } else {
        //   message.error('You can only upload JPG/PNG file!');
        //   return false;
        // }
        return false;
      },
      defaultFileList:
        value && value !== "" && editRecordData
          ? [
              {
                uid: "1",
                name: value,
                status: "done",
                url: value
              }
            ]
          : null
    };
    return (
      <Row className="" key={uploadName}>
        <Upload {...props}>
          <Button disabled={isDisableImageUpload}>
            <span className="new-airport--form--item__upload-text">
              Upload {label}
            </span>
            <Icon component={UploadSvg} />
          </Button>
        </Upload>
      </Row>
    );
  }
}

export default FileUpload;

FileUpload.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  editRecordData: PropTypes.arrayOf(PropTypes.any),
  upLoadFileStates: PropTypes.arrayOf(PropTypes.any)
};

FileUpload.defaultProps = {
  editRecordData: [],
  upLoadFileStates: []
};
