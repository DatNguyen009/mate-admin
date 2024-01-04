import VVSTable from "components/form-control/VVSTable";
import React from "react";
import { Container } from "reactstrap";

export default function Promotion() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <VVSTable name="Promotion" title="Khuyến mãi" />
        </Container>
      </div>
    </React.Fragment>
  );
}
