import React from "react";
import { Container } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";
import { CommonButton } from "components/Common/ButtonCommon";

const KPIGroup = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <VVSTable
          showExportExcel
          title="Chỉ tiêu cho Nhóm"
          name="KPIGroup"
          whereQuery={{
            team: {
              $ne: null,
            },
            type: "team",
          }}
        />
      </Container>
    </div>
  );
};

export default KPIGroup;
