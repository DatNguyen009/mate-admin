import VVSTable from "components/form-control/VVSTable";
import moment from "moment";
import React from "react";
import { Container } from "reactstrap";

const ExtendContract = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <VVSTable
          title="Hợp đồng đến kỳ hạn"
          name="ExtendContract"
          whereQuery={{
            status: "effective",
            endDate: {
              $lte: {
                __type: "Date",
                iso: moment(),
              },
            },
          }}
          disableAdd
          disableDelete
        />
      </Container>
    </div>
  );
};

export default ExtendContract;
