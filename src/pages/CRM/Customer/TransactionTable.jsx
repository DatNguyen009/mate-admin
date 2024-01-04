import React from "react";
import PropTypes from "prop-types";
import { Card } from "reactstrap";

import VVSTable from "components/form-control/VVSTable";
import { CommonText } from "components/Common/TextCommon";

const TransactionTable = props => {
  const { transactionQuery } = props;
  return (
    <Card body>
      <CommonText level={1} className="m-0">
        Lịch sử giao dịch
      </CommonText>
      <VVSTable
        name="CustomerTransaction"
        disableAdd
        disableDelete
        disableSearch
        whereQuery={transactionQuery && { $or: transactionQuery }}
        className="m-0 p-0 shadow-none"
      />
    </Card>
  );
};

TransactionTable.propTypes = {
  transactionQuery: PropTypes.array,
};

export default TransactionTable;
