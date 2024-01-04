import React from "react";
import { Container } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";
import { CommonButton } from "components/Common/ButtonCommon";

const KPIEmployee = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <VVSTable
          showExportExcel
          title="Chỉ tiêu cho nhân viên "
          name="KPIEmployee"
          pointer="Kpi"
          whereQuery={{
            employee: {
              $ne: null,
            },
            type: "personal",
          }}
        />
      </Container>
    </div>
  );
};

export default KPIEmployee;
