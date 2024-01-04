import React from "react";
import PropTypes from "prop-types";

export default function ViewableCommon(props) {
  return (
    <React.Fragment>
      {props?.if() ? props?.caseTrue : props.caseFalse}
    </React.Fragment>
  );
}

ViewableCommon.propTypes = {
  if: PropTypes.func,
  caseTrue: PropTypes.element,
  caseFalse: PropTypes.element,
};
