import VVSTable from "components/form-control/VVSTable";
import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";

export default function Vendor() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <VVSTable name="Vendor" title="Nhà cung cấp" enableInlineEdit />
        </Container>
      </div>
    </React.Fragment>
  );
}
