import React from "react";
import { Container } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";

const ProductCategory = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <VVSTable name="Category" title={"Danh mục hàng hóa"} />
      </Container>
    </div>
  );
};

export default ProductCategory;
