import VVSTable from "components/form-control/VVSTable";
import React from "react";
import { Container } from "reactstrap";

export default function User() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <VVSTable title="User" name="User" />
        </Container>
      </div>
    </React.Fragment>
  );
}
