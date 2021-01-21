import React from "react";
import PropTypes from "prop-types";
import "./index.scss";
import { Button } from "components/ui";

const FormButtons = ({
  isSaveButtonDisabled,
  handleCancel,
  outeletFormType,
  isSpinning
}) => {
  return (
    <div className="form-buttons">
      <Button type="primary" htmlType="submit" disabled={isSaveButtonDisabled}>
        Save
      </Button>
      <Button type="default" onClick={handleCancel}>
        Cancel
      </Button>
    </div>
  );
};
export default FormButtons;

FormButtons.propTypes = {
  isSaveButtonDisabled: PropTypes.bool,
  handleCancel: PropTypes.func.isRequired
};

FormButtons.defaultProps = {
  isSaveButtonDisabled: false
};
