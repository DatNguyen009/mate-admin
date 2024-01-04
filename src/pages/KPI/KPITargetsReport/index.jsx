import React, { useState, useEffect, useMemo } from "react";
import { Container } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";
import { CommonButton } from "components/Common/ButtonCommon";
import { Link, useHistory } from "react-router-dom";
import IDatePicker from "components/Common/DatePicker";
import { CommonText } from "components/Common/TextCommon";
import moment from "moment";
import { getUserRole } from "helpers/erp_helper";
import { Empty } from "antd";

const KPITargetsReport = () => {
  const [acceptedUserRole, setAcceptedUserRole] = useState("");
  const [monthFilter, setMonthFilter] = useState(moment().startOf("month"));
  const handleOnChange = e => {
    setMonthFilter(e ? moment(e).startOf("month") : "");
  };

  useEffect(async () => {
    const roles = await getUserRole();
    const accessRole = roles?.filter(
      role =>
        String(role).toUpperCase() === "MASTER" ||
        String(role).toUpperCase() === "SALE LEADER"
    );

    const finalRole =
      accessRole.length <= 0
        ? ""
        : accessRole?.find(role => String(role).toUpperCase() === "MASTER") ||
          accessRole[0];

    setAcceptedUserRole(finalRole);
  }, []);

  const isAdministratorsRole = useMemo(() => {
    return acceptedUserRole.toUpperCase() === "MASTER";
  }, [acceptedUserRole]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid style={{ position: "relative" }}>
          {acceptedUserRole ? (
            <>
              <div
                className="d-flex align-items-center"
                style={{
                  position: "absolute",
                  left: "250px",
                  height: "38px",
                  zIndex: "10",
                  gap: "16px",
                  width: "300px",
                }}
              >
                <CommonText
                  style={{
                    margin: "0",
                  }}
                >
                  {"Tháng"}
                </CommonText>
                <IDatePicker
                  value={monthFilter}
                  formatDate={"MM/YYYY"}
                  picker="month"
                  onChange={handleOnChange}
                  allowClear={false}
                />
              </div>
              {acceptedUserRole === "Master" ? (
                <VVSTable
                  showExportExcel
                  title="Chỉ tiêu cho Nhóm"
                  name="KPIGroupReport1"
                  whereQuery={{
                    team: {
                      $ne: null,
                    },
                    ...(monthFilter && {
                      kpiOfMonth: {
                        __type: "Date",
                        iso: moment(monthFilter).startOf("month"),
                      },
                    }),
                    type: "team",
                  }}
                  routingPath="/kpi-group/new-kpi-group"
                />
              ) : (
                <VVSTable
                  showExportExcel
                  title="Chỉ tiêu cho nhân viên "
                  name="KPIEmployeeReport1"
                  pointer="Kpi"
                  whereQuery={{
                    employee: {
                      $ne: null,
                    },
                    ...(monthFilter && {
                      kpiOfMonth: {
                        __type: "Date",
                        iso: moment(monthFilter).startOf("month"),
                      },
                    }),
                    type: "personal",
                  }}
                  routingPath="/kpi-employee/new-kpi-employee"
                />
              )}
            </>
          ) : (
            <Empty />
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default KPITargetsReport;
