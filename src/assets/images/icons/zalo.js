import React from "react";
import zalo from "./zalo-icon.png";
import PropTypes from "prop-types";

export default function ZaloIcon({ size, className }) {
  return (
    <img
      src={zalo}
      alt={zalo}
      width={size}
      height={size}
      className={className}
    />
  );
}
ZaloIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};
