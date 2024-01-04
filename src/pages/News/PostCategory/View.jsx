import React from "react";
import { Container } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";

export default function ListPosts() {
  const handleBeforeSave = row => {
    row.Category = "Post";
    row.Name = row.Name;
    row.Code = row.Name;
  };

  return (
    <div className="page-content">
      <Container fluid>
        <VVSTable
          name="PostCategory"
          title={"Danh mục bài viết"}
          whereQuery={{ Category: "Post" }}
          enableInlineEdit
          beforeSaveInlineEdit={handleBeforeSave}
        />
      </Container>
    </div>
  );
}
