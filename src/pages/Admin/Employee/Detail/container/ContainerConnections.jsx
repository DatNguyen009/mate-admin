import React from "react";
import { Card, CardText, Col, Row } from "reactstrap";
import BoxTags from "components/Hr/Employee/Detail/BoxTags";
import { DATABOXTAGS } from "constants/dataHR";

export default function ContainerConnections() {
  return (
    <React.Fragment>
      <Row>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "33% 33% 34%",
          }}
        >
          <BoxTags dataBoxtags={DATABOXTAGS} />
        </div>
      </Row>
    </React.Fragment>
  );
}
