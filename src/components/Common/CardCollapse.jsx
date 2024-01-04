import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, CardText, CardTitle, Col, Row } from "reactstrap";
import classNames from "classnames";
import { CommonText } from "./TextCommon";

export default function CardCollapse(props) {
  const {
    element,
    title,
    isModal,
    titleLevel = 1,
    defaultFlag = false,
    topRightElement,
  } = props;
  const [flag, setFlag] = useState(defaultFlag);
  const handleCollapse = () => {
    setFlag(flag => !flag);
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card
            body
            style={{ cursor: "pointer" }}
            className={classNames({ "p-0 py-1 m-0": isModal })}
          >
            <CardTitle className="mt-0 d-flex">
              <CardText className="card-collapse m-0" onClick={handleCollapse}>
                <CommonText level={titleLevel} className="m-0">
                  {title}
                </CommonText>
                <i
                  className={flag ? "bx bx-chevron-up" : "bx bx-chevron-down"}
                />
              </CardText>
              <div className="flex-grow-1" />
              {flag && (topRightElement || null)}
            </CardTitle>
            {flag && element}
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

CardCollapse.propTypes = {
  element: PropTypes.any,
  title: PropTypes.any,
  isModal: PropTypes.bool,
  titleLevel: PropTypes.number,
  defaultFlag: PropTypes.bool,
  topRightElement: PropTypes.node,
};
