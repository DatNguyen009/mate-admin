import React from "react";
import { CardText } from "reactstrap";
import PropTypes from "prop-types";

export default function CardTextInfo(props) {
  const { text } = props;
  return (
    <CardText className="cardText card_hover">
      <i className="bx bxs-circle" />
      {text}
    </CardText>
  );
}

CardTextInfo.propTypes = {
  text: PropTypes.string,
};
