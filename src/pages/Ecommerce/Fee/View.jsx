import VVSTable from "components/form-control/VVSTable";
import RoleCard from "pages/Users/User/NewUser/roleCard";
import React from "react";
import { Container } from "reactstrap";

export default function Fee() {
  const handleBeforeSave = row => {
    row.Category = "fee";
    row.isActive = row.isActive ? row.isActive === "true" : false;
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <VVSTable
            name="Fee"
            whereQuery={{ Category: "fee" }}
            title={"Quản lí phí"}
            beforeSaveInlineEdit={handleBeforeSave}
            enableInlineEdit
            disableSearch
          />
        </Container>
      </div>
    </React.Fragment>
  );
}
