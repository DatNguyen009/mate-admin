import VVSTable from "components/form-control/VVSTable";
import React from "react";
import { Container } from "reactstrap";

const EmployeeGroup = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <VVSTable title="Danh sách Đội nhóm" name="EmployeeGroup" />
      </Container>
    </div>
  );
};

export default EmployeeGroup;
