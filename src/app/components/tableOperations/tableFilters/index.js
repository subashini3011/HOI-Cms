import './index.scss';
import React, { Component } from 'react';
import { Button, Modal, Row, Col, Checkbox } from 'components/ui';
import PropTypes from 'prop-types';
import FILTER from 'images/filter.png';

class TableFilter extends Component {
  constructor(props) {
    super(props);
    const { filterKeys } = this.props;
    this.state = {
      visible: false,
      filterKeys
    };
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleApply = () => {
    const { filterKeys } = this.state;
    const { onApplyFilter } = this.props;
    this.setState({
      visible: false
    });
    onApplyFilter(filterKeys);
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  handleCheckbox(checkedValues) {
    checkedValues.push('Action');
    this.setState({ filterKeys: checkedValues });
  }

  render() {
    const { filterKeys, visible } = this.state;
    const { columns } = this.props;
    const selectedItems = filterKeys.includes('Action')
      ? filterKeys.length - 1
      : filterKeys.length;
    const totalItems = columns.find(item => item.title === 'Action')
      ? columns.length - 1
      : columns.length;

    const dom = columns.map(item => {
      return item.dataIndex !== 'Action' ? (
        <Col xl={6} md={8} xs={12} key={item} className="filtermodal__item">
          <Checkbox value={item.dataIndex}>{item.title}</Checkbox>
        </Col>
      ) : null;
    });

    return (
      <div className="table__filter">
        <Button onClick={this.showModal}>
          <span className="table__filter__button">
            <img src={FILTER} alt="filter" onClick={this.showModal} />
            <span className="table__filter__text">Filters</span>
          </span>
        </Button>

        <Modal
          visible={visible}
          onOk={this.handleApply}
          onCancel={this.handleCancel}
          closable={false}
          footer={[
            <Button
              key="submit"
              type="primary"
              onClick={this.handleApply}
              className="filtermodal__footer__applybutton"
            >
              APPLY
            </Button>,
            <Button
              key="back"
              onClick={this.handleCancel}
              className="filtermodal__footer__cancelbutton"
            >
              CANCEL
            </Button>
          ]}
          style={{ left: 85 }}
          className="filtermodal"
        >
          <div className="filtermodal__header">
            <div>Filters</div>
            <div>
              {selectedItems} of {totalItems} selected
            </div>
          </div>

          <Checkbox.Group
            style={{ width: '100%', maxHeight: '30rem', overflow: 'auto' }}
            defaultValue={filterKeys}
            onChange={this.handleCheckbox}
            className="checkbox"
          >
            <Row gutter={20}>{dom}</Row>
          </Checkbox.Group>
        </Modal>
      </div>
    );
  }
}
export default TableFilter;

TableFilter.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.any),
  filterKeys: PropTypes.arrayOf.isRequired,
  onApplyFilter: PropTypes.func.isRequired
};

TableFilter.defaultProps = {
  columns: []
};
