import VVSTable from "components/form-control/VVSTable";
import React from "react";
import { Container, Row, Col } from "reactstrap";

export default function InterestRate() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <VVSTable
            title={"Quản Lý -Lãi suất"}
            name="InterestRate"
            enableInlineEdit
          />
        </Container>
      </div>
    </React.Fragment>
  );
}
