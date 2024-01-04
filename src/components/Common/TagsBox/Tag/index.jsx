import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export default function Tag({ children, to }) {
  return (
    <Link className="itemTags" to={to}>
      <div className="badge bg-light itemTags__icon">
        <i className="bx bx-plus"></i>
      </div>
      <div className="badge bg-light text-center">
        <div className="d-flex">{children}</div>
      </div>
    </Link>
  );
}
Tag.propTypes = {
  children: PropTypes.string,
  to: PropTypes.string,
};
