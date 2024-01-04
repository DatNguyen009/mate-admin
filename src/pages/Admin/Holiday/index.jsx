import React, { useState } from "react";
import { Container } from "reactstrap";
import IDatePicker from "components/Common/DatePicker";
import { CommonText } from "components/Common/TextCommon";
import moment from "moment";
import VVSTable from "components/form-control/VVSTable";

export default function Holiday() {
  return (
    <div className="page-content">
      <Container fluid>
        <VVSTable title="Ngày nghỉ lễ" name="HolidayList" />
      </Container>
    </div>
  );
}
