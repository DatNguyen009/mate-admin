import React from "react";
import { Container } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";

export default function PO() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <VVSTable name="PO" disableDelete />
        </Container>
      </div>
    </React.Fragment>
  );
}
