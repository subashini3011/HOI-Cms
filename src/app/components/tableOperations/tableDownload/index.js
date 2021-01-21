import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Button } from 'components/ui';
import DOWNLOAD from 'images/download.png';
import './index.scss';

class TableDownload extends Component {
  handleDownLoadClick = () => {
    const { onDownloadClick } = this.props;
    onDownloadClick();
  };

  render() {
    const { downloadUrl, tablename } = this.props;
    return (
      <div className="table__download">
        {tablename && tablename === 'CMS Users' ? (
          <Button onClick={this.handleDownLoadClick}>
            <img src={DOWNLOAD} alt="download" />
            <span className="table__download__text">Download</span>
          </Button>
        ) : (
          <a href={downloadUrl} download>
            <Button>
              <img src={DOWNLOAD} alt="download" />
              <span className="table__download__text">Download</span>
            </Button>
          </a>
        )}
      </div>
    );
  }
}
export default TableDownload;

TableDownload.propTypes = {
  tablename: PropTypes.string,
  downloadUrl: PropTypes.string,
  onDownloadClick: PropTypes.func.isRequired
};

TableDownload.defaultProps = {
  tablename: '',
  downloadUrl: ''
};
