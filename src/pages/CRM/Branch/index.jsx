import VVSTable from "components/form-control/VVSTable";
import React from "react";
import { Container } from "reactstrap";

export default function Branch() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <VVSTable title={"Chi nhánh"} name="Branch" />
        </Container>
      </div>
    </React.Fragment>
  );
}
