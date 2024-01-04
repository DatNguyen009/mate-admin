import React from "react";
import { Container, Row } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";

const TweetPage = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <Row
          style={{
            position: "relative",
            marginBottom: "-35px",
            zIndex: 99,
            width: "max-content",
          }}
        >
          <h4>Nhật ký bài đăng</h4>
        </Row>
        <VVSTable name="Tweet" disableDelete disableAdd />
      </Container>
    </div>
  );
};

export default TweetPage;
