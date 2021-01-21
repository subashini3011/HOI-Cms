import './index.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, InputNumber } from 'antd';

class CommonTable extends Component {
  onOffsetChange = value => {
    const { onOffsetChange } = this.props;
    if (value && onOffsetChange) {
      onOffsetChange(value);
    }
  };

  onPageChange = pageNumber => {
    const { onPageChange } = this.props;
    if (onPageChange) {
      onPageChange(pageNumber);
    }
  };

  showTotal = () => {
    return (
      <span className="commontable__wrapper__pagination">
        <InputNumber
          min={1}
          max={10}
          defaultValue={6}
          onChange={this.onOffsetChange}
        />
        <span className="commontable__wrapper__pagination__text">per Page</span>
      </span>
    );
  };

  render() {
    const {
      disablePagination,
      dataSource,
      offset,
      pageNumber,
      totalData,
      columns,
      filterKeys
    } = this.props;
    const columnsFiltered = columns.filter(columnItem =>
      filterKeys.includes(columnItem.dataIndex)
    );
    return (
      <Table
        size="medium"
        columns={columnsFiltered}
        dataSource={dataSource}
        pagination={
          disablePagination
            ? false
            : {
                pageSize: offset,
                current: pageNumber,
                showTotal: this.showTotal,
                total: totalData,
                onChange: this.onPageChange
              }
        }
        key
        className="commontable__wrapper"
      />
    );
  }
}
export default CommonTable;

CommonTable.propTypes = {
  disablePagination: PropTypes.bool,
  dataSource: PropTypes.arrayOf(PropTypes.any).isRequired,
  filterKeys: PropTypes.arrayOf(PropTypes.any),
  columns: PropTypes.arrayOf(PropTypes.any).isRequired,
  totalData: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  onOffsetChange: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired
};

CommonTable.defaultProps = {
  disablePagination: false,
  filterKeys: []
};
