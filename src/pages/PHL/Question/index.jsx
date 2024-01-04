import VVSTable from "components/form-control/VVSTable";
import React from "react";
import { Container } from "reactstrap";

export default function Question() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <VVSTable title="Question" name="Question" disableDelete />
        </Container>
      </div>
    </React.Fragment>
  );
}
