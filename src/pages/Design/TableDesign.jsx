import VVSTableDesign from "components/Common/VVSTableDesign";
import React from "react";
import { Container } from "reactstrap";

const TableDesign = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <VVSTableDesign modelName="BlanketOrder" />
      </Container>
    </div>
  );
};

export default TableDesign;
