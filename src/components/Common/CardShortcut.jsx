import React from "react";
import { Link } from "react-router-dom";
import { Card, CardText, Col, Row } from "reactstrap";
import PropTypes from "prop-types";
import BagdeStatus from "./BagdeStatus";

export default function CardShortcut(props) {
  const { dataShortcut, title } = props;
  return (
    <React.Fragment>
      <h2 className="cardShortcut__title">{title}</h2>
      <Row>
        {dataShortcut?.map((item, id) => (
          <Col md={4} key={id}>
            <Link to={item.path || ""}>
              <Card body className="cardShortcut__body">
                <CardText>
                  <span className="cardShortcut__body--title">
                    {item.title}
                  </span>
                  <BagdeStatus
                    typeBadge={item.typeBadge}
                    titleBadge={item.titleBadge}
                    count={item.count}
                  />
                </CardText>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
}

CardShortcut.propTypes = {
  dataShortcut: PropTypes.array,
  title: PropTypes.string,
};
