import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tooltip } from "reactstrap";

function TooltipCommon(props) {
  const { content, target } = props;
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <Tooltip
      placement="top"
      isOpen={tooltipOpen}
      target={target}
      toggle={toggle}
    >
      {content}
    </Tooltip>
  );
}

TooltipCommon.propTypes = {
  content: PropTypes.string,
  target: PropTypes.string.isRequired,
};
export default TooltipCommon;
