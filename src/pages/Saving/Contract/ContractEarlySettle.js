import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";
import SelectField from "components/form-control/Select";
import { useForm } from "react-hook-form";
import moment from "moment";

export default function ContractEarlySettle() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <VVSTable
            name="Contract"
            title="Hợp đồng cần tất toán sớm"
            disableAdd
            whereQuery={{
              isAllowEarlySettle: true,
            }}
          />
        </Container>
      </div>
    </React.Fragment>
  );
}
