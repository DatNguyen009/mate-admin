import React from "react";
import { Container } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";

const Branch = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <VVSTable name="Branch" />
      </Container>
    </div>
  );
};

export default Branch;
