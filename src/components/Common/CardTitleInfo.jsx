import React from "react";
import { CardTitle } from "reactstrap";
import PropTypes from "prop-types";

export default function CardTitleInfo(props) {
  const { title } = props;
  return (
    <CardTitle className="h3 mt-0 title-item">
      <i className="bx bx-file " />
      {title}
    </CardTitle>
  );
}

CardTitleInfo.propTypes = {
  title: PropTypes.string,
};
