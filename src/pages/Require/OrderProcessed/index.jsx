import VVSTable from "components/form-control/VVSTable";
import React from "react";
import { Container } from "reactstrap";

export default function OrderProcessed() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <VVSTable
            name="Order"
            disableAdd
            title={"Đon hàng cần xử lý"}
            whereQuery={{
              paymentMethod: {
                $in: ["banktransfer", "cod"],
              },
              status: "unconfirmed",
            }}
          />
        </Container>
      </div>
    </React.Fragment>
  );
}
