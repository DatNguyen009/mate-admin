import React from "react";
import PropTypes from "prop-types";
import { Card } from "reactstrap";

import VVSTable from "components/form-control/VVSTable";
import { CommonText } from "components/Common/TextCommon";

const SavingOrderTable = props => {
  const { id } = props;
  return (
    <Card body>
      <CommonText level={1} className="m-0">
        Gói tích luỹ đã mua
      </CommonText>
      <VVSTable
        name="CustomerOrder"
        disableAdd
        disableDelete
        whereQuery={{
          paymentMethod: "saving",
          customer: {
            __type: "Pointer",
            className: "Customer",
            objectId: id,
          },
        }}
        className="m-0 p-0 shadow-none"
      />
    </Card>
  );
};

SavingOrderTable.propTypes = {
  id: PropTypes.string,
};

export default SavingOrderTable;
