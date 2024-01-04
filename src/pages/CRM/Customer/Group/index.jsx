import React from "react";
import { Container } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";

const CustomerGroup = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <VVSTable
          name="CustomerGroup"
          title={"Nhóm Khách Hàng"}
          enableInlineEdit={false}
        />
      </Container>
    </div>
  );
};

export default CustomerGroup;
