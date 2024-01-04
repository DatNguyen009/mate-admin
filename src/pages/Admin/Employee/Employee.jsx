import React from "react";
import { Container } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";

export default function Employee() {
  return (
    <div className="page-content">
      <Container fluid>
        <VVSTable
          name="Employee"
          title="Nhân viên"
          showCancelAllotment
          // whereQuery={{
          //   roles: {
          //     $inQuery: {
          //       where: { $or: [{ name: "Staff" }, { name: "Admin" }] },
          //       className: "_Role",
          //     },
          //   },
          // }}
        />
      </Container>
    </div>
  );
}
