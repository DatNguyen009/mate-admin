import React, { useEffect } from "react";
import { Container } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";
import { getUserRole } from "helpers/erp_helper";
import { useState } from "react";

const Quote = () => {
  const user = JSON.parse(localStorage.getItem("User"));
  const [roles, setRoles] = useState();

  useEffect(() => {
    const getRole = async () => {
      const roles = await getUserRole();
      setRoles(roles);
    };
    getRole();
  }, []);

  return (
    <div className="page-content">
      <Container fluid>
        <VVSTable
          name="Quote"
          title="Báo giá"
          whereQuery={{
            ...(roles?.includes("Admin") || roles?.includes("Sale Leader")
              ? {}
              : {
                  createdBy: {
                    objectId: user?.objectId || null,
                    className: "_User",
                    __type: "Pointer",
                  },
                }),
          }}
        />
      </Container>
    </div>
  );
};

export default Quote;
