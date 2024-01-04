import React from "react";
import { Card, CardText, Col, Row } from "reactstrap";

export default function ContainerOverview() {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card body>
            <CardText>
              <span
                style={{
                  color: "black",
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              >
                Overview
              </span>
              <i className="fa fa-angle-up" />
            </CardText>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}
