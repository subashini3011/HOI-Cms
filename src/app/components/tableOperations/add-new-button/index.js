import React from 'react';
import { Button } from 'components/ui';
import PropTypes from 'prop-types';
import './index.scss';

const AddNewRow = ({ onAddNewClick, addButtonText }) => {
  return (
    <div className="table__addrow">
      <Button type="primary" size="small" onClick={onAddNewClick}>
        +&nbsp;Add New&nbsp;{addButtonText}
      </Button>
    </div>
  );
};
export default AddNewRow;

AddNewRow.propTypes = {
  addButtonText: PropTypes.string,
  onAddNewClick: PropTypes.func.isRequired
};

AddNewRow.defaultProps = {
  addButtonText: ''
};
