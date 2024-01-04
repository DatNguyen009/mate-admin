import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import { CommonText } from "components/Common/TextCommon";
import { LIST_ITEM, DATA_CURRENT } from "constants/dataDashboard";
import ChartDashboard from "components/Common/ChartDashboard";
import ListOfItem from "components/Common/ListOfItem";
import CardDetail from "components/Common/CardDetail";
import { formatData, getUserRole } from "helpers/erp_helper";
import httpService from "services/httpService";
import moment from "moment/moment";
import { useDashboard } from "custom-hook/useDashboard";

export default function Dashboard() {
  const { renderSummary } = useDashboard();

  return (
    <div className="page-content">
      <Container fluid>
        <CommonText level={3} color="#1A1A1A" mb={17}>
          Dashboard
        </CommonText>
        {renderSummary()}
      </Container>
    </div>
  );
}
