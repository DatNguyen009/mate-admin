import React from "react";
import { Container } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";

const SendMass = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <VVSTable name="SendMass" title="Gửi tin nhắn" />
      </Container>
    </div>
  );
};

export default SendMass;
