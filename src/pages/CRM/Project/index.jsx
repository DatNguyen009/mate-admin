import React from "react";
import { Container } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";

const Project = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <VVSTable name="Project" title="Dự án" />
      </Container>
    </div>
  );
};

export default Project;
