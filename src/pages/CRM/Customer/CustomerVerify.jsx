import VVSTable from "components/form-control/VVSTable";
import React, { useMemo } from "react";
import { Container } from "reactstrap";

export default function CustomerVerify() {
  const hasSaleRole = useMemo(() => {
    const role = localStorage.getItem("role");
    return role === "Sale";
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <VVSTable
            title="Khách hàng đã xác thực"
            name="Customer"
            disableAdd
            showExportExcel
            disableDelete={hasSaleRole}
            whereQuery={{
              user: {
                $select: {
                  query: {
                    className: "_User",
                    where: {
                      status: "verified",
                    },
                  },
                  key: "objectId",
                },
              },
            }}
          />
        </Container>
      </div>
    </React.Fragment>
  );
}
