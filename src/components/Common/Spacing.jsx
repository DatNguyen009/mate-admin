import React from "react";
import PropTypes from "prop-types";

export default function Spacer({ size }) {
  return <div style={{ height: size, width: size }}></div>;
}

Spacer.propTypes = {
  size: PropTypes.number,
};
