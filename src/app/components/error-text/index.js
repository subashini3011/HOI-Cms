import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const ErrorText = props => {
  const { errorMessage } = props;
  return <h2 className="error-text">{errorMessage}</h2>;
};

ErrorText.propTypes = {
  errorMessage: PropTypes.string
};

ErrorText.defaultProps = {
  errorMessage: 'invalid'
};

export default ErrorText;
