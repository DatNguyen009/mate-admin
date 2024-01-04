import InputField from "components/form-control/InputField";
import React from "react";
import { Card, CardText, Col, Row } from "reactstrap";
import PropTypes from "prop-types";

export default function ContainerEmergencyContact(props) {
  const { register } = props;
  return (
    <React.Fragment>
      <Card body>
        <CardText>
          <span
            style={{
              color: "black",
              fontWeight: "bold",
              marginRight: "10px",
            }}
          >
            Emergency Contact
          </span>
        </CardText>
        <Row>
          <Col lg="6">
            <InputField
              label="Emergency Contact Name"
              name="emergencyContactName"
              register={register}
            />
          </Col>
          <Col lg="6">
            <InputField
              label="Emergency Phone"
              name="emergencyContactPhone"
              register={register}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField
              label="Relation"
              name="emergencyContactRelation"
              register={register}
            />
          </Col>
        </Row>
      </Card>
    </React.Fragment>
  );
}

ContainerEmergencyContact.propTypes = {
  register: PropTypes.any,
};
