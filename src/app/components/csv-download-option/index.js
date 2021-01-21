import React, { Component } from 'react';
import './index.scss';

import { CSVLink, CSVDownload } from 'react-csv';

// import ToolTip from 'components/tool-tip';

const CSVDownloadOption = props => {
  const { csvData, filename } = props;
  return (
    <div className="csv-download-option__viewbutton">
      <CSVLink
        filename={filename}
        data={csvData}
        className="ant-btn csv-download-option__viewbutton-text"
      >
        Export
      </CSVLink>
      {/* <CSVDownload data={csvData} target="_blank" /> */}
    </div>
  );
};

export default CSVDownloadOption;
