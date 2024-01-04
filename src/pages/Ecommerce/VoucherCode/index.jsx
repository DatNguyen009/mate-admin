import VVSTable from "components/form-control/VVSTable";
import React from "react";
import { Container } from "reactstrap";

export default function VoucherCode() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <VVSTable
            name="VoucherCode"
            showImportExcel
            title={"Voucher Code"}
            disableAdd
          />
        </Container>
      </div>
    </React.Fragment>
  );
}
