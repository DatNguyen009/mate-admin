import React from "react";
import { Container } from "reactstrap";
import Breadcrumbs from "components/Common/Breadcrumb";
import FilterTable from "components/Common/FilterTable";
import { COLUMNS_TABLE, DATA_FILTER_TABLE } from "constants/dataHR";

export default function MonthlyAttendanceSheet() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="VVS" breadcrumbItem="Monthly Attendance Sheet" />
          <FilterTable
            dataFilterTable={DATA_FILTER_TABLE}
            dataTable={[]}
            columnTable={COLUMNS_TABLE}
          />
        </Container>
      </div>
    </React.Fragment>
  );
}
