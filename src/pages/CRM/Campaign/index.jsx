import React from "react";
import { Container } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";

const Campaign = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <VVSTable name="Campaign" title="Chiến dịch" />
      </Container>
    </div>
  );
};

export default Campaign;
