import React from "react";
import { Container, Row } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";

const EmailTemplatePage = () => {
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
          <h4>Email Template</h4>
        </Row>
        <VVSTable name="EmailTemplate" disableAdd disableDelete />
      </Container>
    </div>
  );
};

export default EmailTemplatePage;
