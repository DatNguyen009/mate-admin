import React from "react";
import { Col, Container, Row } from "reactstrap";
import VVSTableCompact from "components/Common/VVSTableCompact";
import ChartDashboard from "components/Common/ChartDashboard";
import HeaderCreateItem from "components/Common/HeaderReport";

import { DATA_CHART } from "constants/dataDashboard";
import { formatData } from "helpers/erp_helper";
const EmployeeDetailReport = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <HeaderCreateItem title="Báo cáo doanh thu chi nhánh" />
        <Row className="d-flex">
          <Col xs={12} lg={8} style={{ flex: 1 }}>
            <VVSTableCompact
              modelName="EmployeeDetailReport"
              dataCol={DATA_CHART[0].data}
            />
          </Col>
          <Col xs={12} lg={4} style={{ flex: 1 }}>
            <ChartDashboard
              title={DATA_CHART[0]?.title}
              typeDefault="line"
              data={formatData(DATA_CHART[0].data, ["branch", "turnover"])}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EmployeeDetailReport;
