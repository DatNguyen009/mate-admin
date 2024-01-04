import React from "react";
import { Row } from "reactstrap";
import PropTypes from "prop-types";

export default function HeaderCreateItemGoBack(props) {
  const { title, children } = props;
  return (
    <Row>
      <div className="d-flex align-items-center">
        <div onClick={() => history.back()} style={{ cursor: "pointer" }}>
          <i className="fas fa-arrow-left"></i>
          <span style={{ marginLeft: "16px" }}>Quay lại</span>
        </div>
      </div>
      <div className=" d-sm-flex align-items-center justify-content-between pb-3">
        <div className="d-flex align-items-center" style={{ gap: 10 }}>
          <h4 className="mb-0 font-size-18 text-capitalize">{title}</h4>
        </div>
        {children}
      </div>
    </Row>
  );
}

HeaderCreateItemGoBack.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
};
