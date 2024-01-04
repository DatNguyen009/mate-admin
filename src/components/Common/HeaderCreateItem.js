import React from "react";
import { Row } from "reactstrap";
import PropTypes from "prop-types";
import { BreadCrumbs } from "./Breadcrumbs";
import classNames from "classnames";

export default function HeaderCreateItem(props) {
  const { title, children, saved, source } = props;
  return (
    <Row>
      <BreadCrumbs source={source} />
      <div className=" d-sm-flex align-items-center justify-content-between pb-3">
        <div className="d-flex align-items-center" style={{ gap: 10 }}>
          <h4 className="mb-0 font-size-18 text-capitalize">{title}</h4>
          {/* <span
            style={{ padding: 6 }}
            className={classNames(
              "cardShortcut__status",
              !saved
                ? "badge badge-soft-warning cardShortcut__status--warning"
                : "badge badge-soft-success cardShortcut__status--success"
            )}
          >
            {saved ? "Saved " : "Not Saved"}
          </span> */}
        </div>
        {children}
      </div>
    </Row>
  );
}

HeaderCreateItem.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  saved: PropTypes.bool,
  source: PropTypes.string,
};
