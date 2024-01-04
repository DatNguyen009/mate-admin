import VVSTable from "components/form-control/VVSTable";
import React from "react";
import { Container } from "reactstrap";

export default function Template() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <VVSTable title="Template" name="Template" />
        </Container>
      </div>
    </React.Fragment>
  );
}
