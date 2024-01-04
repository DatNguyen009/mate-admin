import React from "react";
import { Container } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import FilterTable from "../../../components/Common/FilterTable";
import {
  COLUMNS_TABLE,
  DATA_FILTER_TABLE,
  DATA_TABLE_LEAVEAPPLICATION,
} from "../../../constants/dataHR";

export default function LeaveApplication() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="VVS" breadcrumbItem="Leave Application" />
          <FilterTable
            dataFilterTable={DATA_FILTER_TABLE}
            dataTable={DATA_TABLE_LEAVEAPPLICATION}
            columnTable={COLUMNS_TABLE}
          />
        </Container>
      </div>
    </React.Fragment>
  );
}
