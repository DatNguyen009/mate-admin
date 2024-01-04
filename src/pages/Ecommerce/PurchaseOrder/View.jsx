import VVSTable from "components/form-control/VVSTable";
import React from "react";
import { Container, Row, Col } from "reactstrap";

export default function PurchaseOrder() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <VVSTable
            title={"Đơn Mua Hàng"}
            name="PurchaseOrder"
            disableAdd
            disableDelete
          />
        </Container>
      </div>
    </React.Fragment>
  );
}
