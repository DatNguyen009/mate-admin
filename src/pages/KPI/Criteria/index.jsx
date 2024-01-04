import VVSTable from "components/form-control/VVSTable";
import React from "react";
import { Container } from "reactstrap";

export default function Criteria() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <VVSTable title="Chỉ tiêu KPI" name="Kpi" />
        </Container>
      </div>
    </React.Fragment>
  );
}
