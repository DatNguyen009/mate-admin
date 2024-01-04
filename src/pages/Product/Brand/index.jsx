import VVSTable from "components/form-control/VVSTable";
import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";

export default function Brand() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <VVSTable name="Brand" title="Thương hiệu" enableInlineEdit />
        </Container>
      </div>
    </React.Fragment>
  );
}
