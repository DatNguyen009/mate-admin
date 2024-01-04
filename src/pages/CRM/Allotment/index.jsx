import { Tabs } from "antd";
import React from "react";
import { Col, Container, Row } from "reactstrap";
import styled from "styled-components";
import Reallotment from "./pages/Reallotment";
import AllotmentLead from "./pages/AllotmentLead";

const items = [
  {
    key: "1",
    label: `Phân Bổ Thủ Công`,
    children: <Reallotment />,
  },
  {
    key: "2",
    label: `Phân Bổ Tự Động`,
    children: <AllotmentLead />,
  },
];

function Allotment() {
  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <h4>Phân bổ dữ liệu KH</h4>
          <Col className="mt-4">
            <CustomerTabs defaultActiveKey="1" type="card" items={items} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const CustomerTabs = styled(Tabs)`
  &.ant-tabs-card.ant-tabs-top .ant-tabs-tab {
    user-select: none;
    border-radius: 12px 12px 0px 0px;
  }
`;

export default Allotment;
