import React from "react";
import { Col, Input, Label, Row } from "reactstrap";
import Spacing from "components/Common/Spacing";

export default function CustomerDetails() {
  return (
    <React.Fragment>
      <Row className="p-1">
        <div className="col-lg-6 col-md-12 ">
          <Label className="label_modal">Customer</Label>
          <Input
            type="text"
            className="form-control"
            id="formrow-firstname-Input"
          />
        </div>
        <div className="col-lg-6 col-md-12  ">
          <Label className="label_modal">Sales Order</Label>
          <Input
            type="text"
            className="form-control"
            id="formrow-firstname-Input"
          />
        </div>
      </Row>
    </React.Fragment>
  );
}
