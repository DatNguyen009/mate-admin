import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Row } from "reactstrap";
import _ from "lodash";

import { CommonLabel } from "components/Common/inputCommon";
import { CommonText } from "components/Common/TextCommon";
import { formatNumber } from "helpers/erp_helper";
import VVSTable from "components/form-control/VVSTable";

const WalletInformation = props => {
  const { customerAccount, customerId } = props;
  const accounts = customerAccount?.filter(a => a.type !== "bank");

  return (
    <Card body>
      <CommonText level={1} className="m-0">
        Thông tin ví
      </CommonText>
      <Row>
        <Col>
          <CommonLabel>Mã số ví</CommonLabel>
          {accounts?.map(a => (
            <input
              key={a.objectId}
              className="form-control mb-2"
              type="text"
              readOnly
              defaultValue={a.objectId}
            />
          ))}
        </Col>
        <Col>
          <CommonLabel>Số tiền trong ví (VND)</CommonLabel>
          {accounts?.map(a => (
            <input
              key={a.objectId}
              className="form-control mb-2"
              type="text"
              readOnly
              defaultValue={a.balance > 0 ? formatNumber(a.balance) : 0}
            />
          ))}
        </Col>
        <Col>
          <CommonLabel>Danh sách ví</CommonLabel>
          {accounts?.map(a => (
            <input
              key={a.objectId}
              className="form-control mb-2"
              type="text"
              readOnly
              defaultValue={
                a.type === "wallet"
                  ? "Ví"
                  : a.type === "saving"
                  ? "Ví tiết kiệm"
                  : a.type === "interest"
                  ? "Lãi"
                  : _.startCase(a.type)
              }
            />
          ))}
        </Col>
      </Row>
      <VVSTable
        title={<CommonText level={1}>Danh sách tài khoản liên kết</CommonText>}
        name="CustomerAccount"
        whereQuery={{
          type: "bank",
          customer: {
            __type: "Pointer",
            className: "Customer",
            objectId: customerId,
          },
        }}
        disableAdd
        disableDelete
        className="m-0 p-0 shadow-none"
      />
    </Card>
  );
};

WalletInformation.propTypes = {
  customerAccount: PropTypes.array,
  customerId: PropTypes.string,
};

export default WalletInformation;
