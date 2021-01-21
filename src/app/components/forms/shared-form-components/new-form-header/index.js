import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const FormHeader = ({ headerName }) => {
  return <div className="form-header">{headerName}</div>;
};
export default FormHeader;

FormHeader.propTypes = {
  headerName: PropTypes.string.isRequired
};

FormHeader.defaultProps = {};
