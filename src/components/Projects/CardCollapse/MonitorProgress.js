import React from "react";
import { Col, Input, Label, Row } from "reactstrap";
import Spacing from "components/Common/Spacing";

export default function MonitorProgress() {
  return (
    <React.Fragment>
      <div className="form-check mb-4">
        <Input
          type="checkbox"
          className="form-check-Input"
          id="horizontal-customCheck"
        />
        <Label className="form-check-label" htmlFor="horizontal-customCheck">
          Collect Progress
        </Label>
      </div>
    </React.Fragment>
  );
}
