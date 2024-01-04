import React, { useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";
import { template } from "constants/dataTempleteExcel";
import VVSSelectModel from "components/form-control/VVSSelectModel";
import { useForm } from "react-hook-form";
import { language_vn } from "helpers/language_vn";
import { getUserRole } from "helpers/erp_helper";
import RangePicker from "components/Common/RangePicker";
import moment from "moment";

const Lead = () => {
  const [employeeGroup, setEmployeeGroup] = useState({});
  const [employee, setEmployee] = useState({});
  const [rolesTable, setRolesTable] = useState({});
  const [dateFrom, setDateFrom] = useState(
    moment().startOf("year").format("YYYY-MM-DD")
  );

  const [dateTo, setDateTo] = useState(
    moment().endOf("year").format("YYYY-MM-DD")
  );
  const { handleSubmit, ...rest } = useForm({
    mode: "onBlur",
  });
  useEffect(async () => {
    const userRole = await getUserRole();

    if (!userRole.includes("Admin")) {
      const employee = JSON.parse(localStorage.getItem("Employee"));
      setRolesTable(employee);
    } else {
      setRolesTable("Admin");
    }
  }, []);

  const checkRoles = useMemo(() => rolesTable === "Admin", [rolesTable]);

  useEffect(() => {
    const { setValue } = rest;
    if (employeeGroup) {
      setValue("salesStaff", "");
      getFilterLead(employeeGroup, {});
      setEmployee({});
    }
  }, [employeeGroup]);

  const onSubmit = async values => {
    console.log("values", values);
  };

  const getFilterLead = (group, employee) => {
    return {
      ...(group?.objectId && {
        salesTeam: {
          objectId: group?.objectId,
          className: "EmployeeGroup",
          __type: "Pointer",
        },
      }),
      ...(employee?.objectId && {
        salesStaff: {
          objectId: employee?.objectId,
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
    };
  };
  return (
    <div className="page-content">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row
          style={{
            position: "relative",
            marginBottom: "-35px",
            zIndex: 99,
            width: "max-content",
          }}
        >
          <h4 className="my-0 font-size-18 text-capitalize mb-2">
            Quản lí khách hàng tiềm năng
          </h4>
          {rolesTable === "Admin" && (
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
          name="Lead"
          showImportExcel={checkRoles}
          disableAdd={!checkRoles}
          showExportExcel
          showAllotmentLead={checkRoles}
          pointer="Employee"
          template={template.lead}
          disableDelete={!checkRoles}
          whereQuery={
            rolesTable === "Admin" && getFilterLead(employeeGroup, employee)
          }
        />
      </Container>
    </div>
  );
};

export default Lead;
