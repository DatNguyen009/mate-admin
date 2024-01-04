import React from "react";
import PropTypes from "prop-types";
import { Card } from "reactstrap";

import { CommonText } from "components/Common/TextCommon";
import VVSTable from "components/form-control/VVSTable";

const ContractTable = props => {
  const { id } = props;
  return (
    <Card body>
      <VVSTable
        title={
          <CommonText level={1} className="m-0">
            Danh sách gói tích lũy đã mua
          </CommonText>
        }
        name="CustomerContract"
        whereQuery={{
          customer: {
            __type: "Pointer",
            className: "Customer",
            objectId: id,
          },
        }}
        disableAdd
        disableDelete
        className="m-0 p-0 shadow-none"
      />
    </Card>
  );
};

ContractTable.propTypes = {
  id: PropTypes.string,
};

export default ContractTable;
