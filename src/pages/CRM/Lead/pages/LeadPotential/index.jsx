import React, { useMemo } from "react";
import { Container } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";
import { template } from "constants/dataTempleteExcel";
import { BADDATA } from "constants/dataLeadType";

const LeadPotential = () => {
  const hasSaleRole = useMemo(() => {
    const role = localStorage.getItem("role");
    return role === "Sale";
  }, []);

  return (
    <div className="page-content">
      <Container fluid>
        <VVSTable
          title="Data không tốt"
          name="Lead"
          disableAdd={hasSaleRole}
          disableDelete={hasSaleRole}
          showImportExcel={!hasSaleRole}
          showExportExcel
          showAllotmentLead={!hasSaleRole}
          pointer="Employee"
          template={template.lead}
          whereQuery={{
            status: {
              $in: BADDATA,
            },
          }}
        />
      </Container>
    </div>
  );
};

export default LeadPotential;
