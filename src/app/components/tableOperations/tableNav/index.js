import './index.scss';
import React, { Component } from 'react';
import { Select } from 'components/ui';

const { Option } = Select;
class TableNav extends Component {
  handleChange(value) {
    // console.log(`selected ${value}`);
    this.val = value;
  }

  render() {
    return (
      <div className="table__nav">
        <Select
          defaultValue="services"
          style={{ width: 122 }}
          onChange={this.handleChange}
          className="table__nav__select"
        >
          <Option value="fnb" className="table__nav__item">
            F &amp;B
          </Option>
          <Option value="services" className="table__nav__item">
            Services
          </Option>
          <Option value="facilities" className="table__nav__item">
            Facilities
          </Option>
          <Option value="retailOutlet" className="table__nav__item">
            Retail Outlet
          </Option>
        </Select>
      </div>
    );
  }
}
export default TableNav;
