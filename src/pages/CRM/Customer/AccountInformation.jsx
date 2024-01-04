import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";

import { CommonText } from "components/Common/TextCommon";
import { CommonInputt, CommonLabel } from "components/Common/inputCommon";

const AccountInformation = props => {
  const { userDetail } = props;
  return (
    <Card body>
      <CommonText level={1} className="m-0">
        <span>Thông tin tài khoản </span>
        <Link className="link-detail" to={`/account/${userDetail?.objectId}`}>
          (chi tiết)
        </Link>
      </CommonText>
      <Row>
        <Col>
          <CommonLabel>Tên đăng nhập</CommonLabel>
          <CommonInputt
            className="form-control"
            value={userDetail?.username || ""}
            readOnly
            onChange={() => {}}
          />
        </Col>
        <Col>
          <CommonLabel>Họ tên</CommonLabel>
          <CommonInputt
            className="form-control"
            value={userDetail?.fullName || ""}
            readOnly
            onChange={() => {}}
          />
        </Col>
        <Col>
          <CommonLabel>Email</CommonLabel>
          <CommonInputt
            className="form-control"
            value={userDetail?.email || ""}
            readOnly
            onChange={() => {}}
          />
        </Col>
      </Row>
    </Card>
  );
};

AccountInformation.propTypes = {
  userDetail: PropTypes.object,
};

export default AccountInformation;
