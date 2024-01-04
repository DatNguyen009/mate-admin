import React from "react";
import PropTypes from "prop-types";

const CheckBox = props => {
  const { name, register, label, disabled, onChange } = props;
  return (
    <div className="form-check form-check-success">
      <input
        type="checkbox"
        className="form-check-input mr-3"
        id={`${name}|checkbox`}
        disabled={disabled}
        {...register(name)}
        onChange={onChange}
      />
      <label htmlFor={`${name}|checkbox`}>{label}</label>
    </div>
  );
};

CheckBox.propTypes = {
  register: PropTypes.func,
  label: PropTypes.any,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default CheckBox;
