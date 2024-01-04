import React, { useMemo } from "react";
import { Container } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";
import { template } from "constants/dataTempleteExcel";

const CustomerInterest = () => {
  const hasSaleRole = useMemo(() => {
    const role = localStorage.getItem("role");
    return role === "Sale";
  }, []);

  return (
    <div className="page-content">
      <Container fluid>
        <VVSTable
          title="Khách hàng tìm hiểu"
          name="Lead"
          disableAdd={hasSaleRole}
          disableDelete={hasSaleRole}
          showImportExcel={!hasSaleRole}
          showExportExcel
          showAllotmentLead={!hasSaleRole}
          pointer="Employee"
          template={template.lead}
          whereQuery={{
            status: "Tìm hiểu",
          }}
          routingPath="/lead/new-lead"
        />
      </Container>
    </div>
  );
};

export default CustomerInterest;
