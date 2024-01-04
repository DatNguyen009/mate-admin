import React from "react";
import { Input } from "reactstrap";
import PropTypes from "prop-types";

export default function ItemInput(props) {
  const { title, type, required, valueInput } = props;
  return (
    <div style={{ margin: "10px 0" }}>
      <span className={required}>{title}</span>
      <Input type={type} defaultValue={valueInput} />
    </div>
  );
}

ItemInput.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.string,
  valueInput: PropTypes.string,
};
