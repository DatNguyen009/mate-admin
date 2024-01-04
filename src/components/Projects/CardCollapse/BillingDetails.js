import Spacing from "components/Common/Spacing";
import React from "react";
import { Input, Label, Row } from "reactstrap";

export default function BillingDetails() {
  return (
    <React.Fragment>
      <Row className="p-1">
        <div className="col-lg-6 col-md-12 mb-1">
          <Label className="label_modal">Total Billable Hours</Label>
          <Input
            type="text"
            className="form-control"
            id="formrow-firstname-Input"
            value={0}
          />
        </div>
        <div className="col-lg-6 col-md-12 mb-1 ">
          <Label className="label_modal">Total Billable Amount (VND)</Label>
          <Input
            type="text"
            className="form-control"
            id="formrow-firstname-Input"
            value="VND 0,00"
          />
          <Spacing size={16} />
          <Label className="label_modal">Total Costing Amount (VND)</Label>
          <Input
            type="text"
            className="form-control"
            id="formrow-firstname-Input"
            value="VND 0,00"
          />
        </div>
      </Row>
    </React.Fragment>
  );
}
