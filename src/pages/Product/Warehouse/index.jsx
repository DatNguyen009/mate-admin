import VVSTable from "components/form-control/VVSTable";
import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";

export default function WareHouse() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <VVSTable name="WareHouse" title="Kho" />
        </Container>
      </div>
    </React.Fragment>
  );
}
