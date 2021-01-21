import React, { Component } from "react";
import "./index.scss";
import { Icon, Button, Upload, message } from "components/ui";

class BulkUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileList: [],
      uploading: false,
      isDisableBulkUpload: false
    };
  }

  onClickUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    formData.append("fileUpload", fileList[0]);
    this.props.handleBulkUpload(formData);
  };

  render() {
    const { uploading, fileList } = this.state;

    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
            isDisableBulkUpload: false
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
          isDisableBulkUpload: true
        }));
        return false;
      },
      fileList
    };

    return (
      <div>
        <div className="bulk-upload__text">Bulk Upload</div>
        <div className="bulk-upload">
          <Upload {...props} className="bulk-upload-selectfile ">
            <Button disabled={this.state.isDisableBulkUpload}>
              <span className="bulk-upload-selectfile-placeholder">
                Select a File
              </span>
            </Button>
          </Upload>
          <Button
            type="primary"
            onClick={this.onClickUpload}
            loading={uploading}
            className="bulk-upload-btn "
          >
            {uploading ? "Uploading" : "Bulk Upload"}
          </Button>
        </div>
      </div>
    );
  }
}
export default BulkUpload;
