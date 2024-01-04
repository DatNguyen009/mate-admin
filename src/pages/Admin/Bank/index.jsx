import React from "react";
import { Container } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";

export default function Bank() {
  return (
    <div className="page-content">
      <Container fluid>
        <VVSTable
          name="Bank"
          title="Tài khoản ngân hàng"
          whereQuery={{ Category: "bank" }}
        />
      </Container>
    </div>
  );
}
