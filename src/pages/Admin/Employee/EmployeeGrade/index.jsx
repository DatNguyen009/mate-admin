import VVSTable from "components/form-control/VVSTable";
import React from "react";
import { Container } from "reactstrap";

const EmployeeGrade = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <VVSTable title="Danh sách vị trí nhân viên" name="EmployeeGrade" />
      </Container>
    </div>
  );
};

export default EmployeeGrade;
