import React, { useMemo } from "react";
import { Container } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";
import { template } from "constants/dataTempleteExcel";
import { BADDATA } from "constants/dataLeadType";

const Potential = () => {
  const hasSaleRole = useMemo(() => {
    const role = localStorage.getItem("role");
    return role === "Sale";
  }, []);

  return (
    <div className="page-content">
      <Container fluid>
        <VVSTable
          title="KH tiềm năng"
          name="Lead"
          disableAdd={hasSaleRole}
          disableDelete={hasSaleRole}
          showImportExcel={!hasSaleRole}
          showExportExcel
          showAllotmentLead={!hasSaleRole}
          pointer="Employee"
          template={template.lead}
          whereQuery={{
            status: "Tiềm năng",
          }}
        />
      </Container>
    </div>
  );
};

export default Potential;
