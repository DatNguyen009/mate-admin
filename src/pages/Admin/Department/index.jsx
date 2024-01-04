import React from "react";
import { Container } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";

export default function Department() {
  return (
    <div className="page-content">
      <Container fluid>
        <VVSTable name="Department" title="Danh sách Bộ phận" />
      </Container>
    </div>
  );
}
