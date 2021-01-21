import React, { Component } from 'react';
import { Icon, Input } from 'components/ui';
import PropTypes from 'prop-types';
import './index.scss';

class TableSearch extends Component {
  onSearchChange = e => {
    const { onSearchChange } = this.props;
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  render() {
    const { searchKey } = this.props;
    return (
      <Input
        prefix={
          <Icon
            type="search"
            style={{ color: '#444444', fontSize: 12, marginBottom: 2 }}
          />
        }
        value={searchKey}
        placeholder="Search by keyword"
        onChange={this.onSearchChange}
        style={{ width: 182 }}
        className="table__search"
      />
      /* <Search  icon="search"><span className="table__search__text">Search by keyword</span></Search> */
    );
  }
}
export default TableSearch;

TableSearch.propTypes = {
  searchKey: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired
};

TableSearch.defaultProps = {
  searchKey: ''
};
