import React from "react";
import { Input, Label, Row } from "reactstrap";

export default function CostingAndBilling() {
  return (
    <React.Fragment>
      <Row className="p-1">
        <div className="col-lg-6 col-md-12 mb-1">
          <Label className="label_modal">Estimated Cost</Label>
          <Input
            type="text"
            className="form-control"
            id="formrow-firstname-Input"
          />
        </div>
        <div className="col-lg-6 col-md-12 mb-1 ">
          <Label className="label_modal">Default Cost Center</Label>
          <Input
            type="text"
            className="form-control"
            id="formrow-firstname-Input"
          />
        </div>
        <div className="col-lg-6 col-md-12 mb-1 ">
          <Label className="label_modal">Company</Label>
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
