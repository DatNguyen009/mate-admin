import VVSTable from "components/form-control/VVSTable";
import React from "react";
import { Container, Row, Col } from "reactstrap";

export default function ProductSaving() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <VVSTable
            title={"Sản phẩm tích lũy"}
            name="ProductSaving"
            whereQuery={{ isAllowedSaving: true }}
          />
        </Container>
      </div>
    </React.Fragment>
  );
}
