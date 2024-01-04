import React from "react";
import { Container } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";

const Competitor = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <VVSTable name="Competitor" title="Đối thủ" />
      </Container>
    </div>
  );
};

export default Competitor;
