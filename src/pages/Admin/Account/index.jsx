import React, { useEffect, useMemo, useState } from "react";
import { Container, Row } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";
import { getUserRole } from "helpers/erp_helper";
import { Col } from "antd";
import SelectField from "components/form-control/Select";
import { get, useForm } from "react-hook-form";

const FILTER_STATUS_ACCOUNT = [
  { index: 1, name: "Tất cả", value: null },
  { index: 2, name: "Chưa xác thực", value: "inactive" },
];

const Account = () => {
  const { register } = useForm({});
  const [filter, setFilter] = useState("Tất cả");
  const [roleState, setRoleState] = useState();

  useEffect(async () => {
    const role = await getUserRole();
    setRoleState(role[0]);
  }, []);

  const isAdmin = useMemo(() => roleState === "Admin", [roleState]);

  const getFilterData = type => {
    switch (type) {
      case "inactive":
        return {
          status: "inactive",
        };

      default:
        return {
          status: {
            $ne: "inactive",
          },
        };
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Row
          style={{
            position: "relative",
            marginBottom: "-35px",
            zIndex: 99,
            width: "max-content",
          }}
        >
          <h4>Tài khoản</h4>
        </Row>
        <VVSTable
          name="_User"
          disableDelete={!isAdmin}
          enableInlineEdit={false}
          disableAdd
          whereQuery={getFilterData(filter?.target?.value)}
        />
      </Container>
    </div>
  );
};

export default Account;
