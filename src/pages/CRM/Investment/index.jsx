import React, { useMemo } from "react";
import { Container } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";

const Investment = () => {
  const hasSaleRole = useMemo(() => {
    const role = localStorage.getItem("role");
    return role === "Sale";
  }, []);

  return (
    <div className="page-content">
      <Container fluid>
        <VVSTable
          name="Investment"
          title="Khách hàng mua gói tích luỹ"
          whereQuery={{
            isInvestor: true,
          }}
          showExportExcel
          disableAdd
          disableDelete={hasSaleRole}
        />
      </Container>
    </div>
  );
};

export default Investment;
