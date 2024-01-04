import React from "react";
import { Container } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";

export default function Posts() {
  return (
    <div className="page-content">
      <Container fluid>
        <VVSTable name="Post" title={"Bài viết tin tức"} />
      </Container>
    </div>
  );
}
