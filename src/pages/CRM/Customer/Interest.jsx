import React, { useMemo } from "react";
import { Container } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";
import { template } from "constants/dataTempleteExcel";

const Interest = () => {
  const hasSaleRole = useMemo(() => {
    const role = localStorage.getItem("role");
    return role === "Sale";
  }, []);

  return (
    <div className="page-content">
      <Container fluid>
        <VVSTable
          title="KH quan tâm"
          name="Lead"
          disableAdd={hasSaleRole}
          disableDelete={hasSaleRole}
          showImportExcel={!hasSaleRole}
          showExportExcel
          showAllotmentLead={!hasSaleRole}
          pointer="Employee"
          template={template.lead}
          whereQuery={{
            status: "Quan tâm",
          }}
          routingPath="/lead/new-lead"
        />
      </Container>
    </div>
  );
};

export default Interest;
