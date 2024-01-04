import { CommonText } from "components/Common/TextCommon";
import React from "react";
import { Container } from "reactstrap";

import ReportList from "./ReportList";

const LeadReportPage = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <CommonText level={3} color="#2a3042" mb={17}>
            Báo cáo khách hàng tiềm năng
          </CommonText>
          <ReportList />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default LeadReportPage;
