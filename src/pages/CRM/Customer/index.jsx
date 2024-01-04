import React, { useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";
import VVSSelectModel from "components/form-control/VVSSelectModel";
import { useForm } from "react-hook-form";
import { language_vn } from "helpers/language_vn";
import moment from "moment";
import RangePicker from "components/Common/RangePicker";

const Customer = () => {
  const [employeeGroup, setEmployeeGroup] = useState({});
  const [employee, setEmployee] = useState({});
  const { handleSubmit, ...rest } = useForm({
    mode: "onBlur",
  });
  const [dateFrom, setDateFrom] = useState(
    moment().startOf("year").format("YYYY-MM-DD")
  );

  const [dateTo, setDateTo] = useState(
    moment().endOf("year").format("YYYY-MM-DD")
  );

  useEffect(() => {
    const { setValue } = rest;
    if (employeeGroup) {
      setValue("salesStaff", "");
      getFilterCustomer(employeeGroup, {});
      setEmployee({});
    }
  }, [employeeGroup]);

  const checkRoles = useMemo(
    () => localStorage.getItem("role") === "Admin",
    []
  );

  const getFilterCustomer = (group, employee) => {
    return {
      ...(group?.objectId && {
        salesTeam: {
          objectId: group.objectId,
          className: "EmployeeGroup",
          __type: "Pointer",
        },
      }),
      ...(employee?.objectId && {
        salesStaff: {
          objectId: employee.objectId,
          className: "Employee",
          __type: "Pointer",
        },
      }),
      createdAt: {
        $gte: {
          __type: "Date",
          iso: dateFrom,
        },
        $lte: {
          __type: "Date",
          iso: dateTo,
        },
      },
      user: {
        $inQuery: {
          where: {
            status: {
              $ne: "inactive",
            },
          },
          className: "_User",
        },
      },
    };
  };

  return (
    <div className="page-content">
      <form>
        <Row
          style={{
            position: "relative",
            marginBottom: "-35px",
            zIndex: 99,
            width: "max-content",
          }}
        >
          <h4 className="my-0 font-size-18 text-capitalize mb-2">
            Quản lí khách hàng
          </h4>
          {checkRoles && (
            <Row>
              <Col sm={3} className="mt-4">
                <VVSSelectModel
                  name="salesTeam"
                  model="EmployeeGroup"
                  {...rest}
                  conditionField={{ isActive: true }}
                  onSelect={setEmployeeGroup}
                  placeholder={language_vn.chooseGroup}
                  showOptionAll
                />
              </Col>
              <Col sm={3} className="mt-4">
                <VVSSelectModel
                  name="salesStaff"
                  model="Employee"
                  {...rest}
                  conditionField={{
                    group: {
                      objectId: employeeGroup?.objectId,
                      className: "EmployeeGroup",
                      __type: "Pointer",
                    },
                  }}
                  onSelect={setEmployee}
                  placeholder={language_vn.chooseEmployee}
                  showOptionAll
                />
              </Col>
              <Col xs={6} className="d-flex gap-4">
                <RangePicker
                  picker="date"
                  labelDateFrom="Đến tháng"
                  labelDateTo="Từ tháng"
                  dateFrom={dateFrom}
                  dateTo={dateTo}
                  onChange={date => {
                    setDateTo(date.endDate);
                    setDateFrom(date.startDate);
                  }}
                />
              </Col>
            </Row>
          )}
        </Row>
      </form>
      <Container fluid>
        <VVSTable
          name="Customer"
          enableInlineEdit={false}
          showImportExcel={checkRoles}
          showExportExcel={!checkRoles}
          disableAdd={!checkRoles}
          showAllotmentLead={checkRoles}
          disableDelete
          pointer="_User"
          whereQuery={getFilterCustomer(employeeGroup, employee)}
        />
      </Container>
    </div>
  );
};

export default Customer;
