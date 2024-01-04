import VVSTable from "components/form-control/VVSTable";
import React from "react";
import { Container } from "reactstrap";

export default function Voucher() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <VVSTable name="Voucher" title={"Voucher"} />
        </Container>
      </div>
    </React.Fragment>
  );
}
