import React from "react";
import { Button, Col, Label, Row } from "reactstrap";
import { Field } from "formik";

export default function ContainerERPNextUser() {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Label className="form-label">Relation</Label>
          <Field name="fullName" type="text" className={"form-control"} />
          <p>
            System User (login) ID. If set, it will become default for all HR
            forms.
          </p>
          <Button color="light">Create User</Button>
        </Col>
      </Row>
    </React.Fragment>
  );
}
