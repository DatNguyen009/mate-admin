import { Popover } from "antd";
import { toastrErrorAlert } from "components/Common/AlertToastr";
import { CommonButton } from "components/Common/ButtonCommon";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import Spacer from "components/Common/Spacing";
import { CommonText } from "components/Common/TextCommon";
import Table from "components/form-control/Table";
import VVSSelectModel from "components/form-control/VVSSelectModel";
import _ from "lodash";
import moment from "moment";
import EvictionAllotment from "pages/CRM/Lead/components/Popover/EvictionAllotment";
import {
  HEADERS_EMPLOYEE_ALLOTMENTLEAD,
  HEADERS_GROUP_ALLOTMENTLEAD,
} from "pages/CRM/Lead/constants/columnTable";
import {
  createAllotmentData,
  fetchEmployeeByGroup,
  fetchEmployeeGroup,
  fetchLeadAllotment,
  fetchSysCfgAllotment,
} from "pages/CRM/Lead/services/api";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Card, Col, Container, Row } from "reactstrap";

const DEFAULT_TEAM_EMPOYEE = {
  groups: "groups",
  employee: "employee",
};

export default function AllotmentLead() {
  const { state } = useLocation();
  const [leads, setLeads] = useState([]);
  const [leadId, setLeadId] = useState("");
  const [isAllotmentGroup, setIsAllotmenGroup] = useState(false);
  const [isAllotmentEmployee, setIsAllotmenEmployee] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [selectedAllotmentTeamAEmployee, setSelectedAllotmentTeamAEmployee] =
    useState(DEFAULT_TEAM_EMPOYEE.groups);
  const [employeeGroup, setEmployeeGroup] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({});

  const formProps = useForm({
    mode: "onBlur",
    defaultValues: {
      groups: [],
    },
  });

  const {
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = formProps;

  const onSubmit = async values => {
    const filterValues = values.groups?.map(item => {
      delete item.name;
      return item.groupId === values?.objectId
        ? {
            ...item,
            rate: Number(item.percentage),
            employees: values.employee.map(item => {
              delete item.name;
              return {
                ...item,
                rate: Number(item.percentage),
              };
            }),
          }
        : { ...item, rate: Number(item.percentage) };
    });
    const groupTotal = _.sum(filterValues.map(item => Number(item.percentage)));

    const employeeTotal = _.sum(
      values.employee.map(item => Number(item.percentage))
    );
    if (
      (groupTotal === 100 && !values.employee.length) ||
      employeeTotal === 100
    ) {
      await createAllotmentData(filterValues);
    } else {
      toastrErrorAlert("Phân bổ không đủ 100%");
    }
    setIsAllotmenGroup();
    setIsAllotmenEmployee();
  };

  useEffect(() => {
    fetchLeadAllotment(state?.modelName, setLeads);
    fetchEmployeeGroup(setLeadId, setEmployeeGroup);

    return;
  }, []);

  useEffect(async () => {
    const { data } = await fetchSysCfgAllotment();
    const handleFilter = item =>
      data.find(group => group?.groupId === item.objectId);
    if (isAllotmentGroup) {
      const math = Math.round(100 / employeeGroup.length);
      const counter =
        Math.ceil(math * employeeGroup.length) !== 100
          ? 100 - math * employeeGroup.length
          : 0;

      const groupData = employeeGroup.map((item, index) => {
        const filterGroup = handleFilter(item);
        return {
          name: item.name,
          groupId: item.objectId,
          percentage: index === 0 ? Number(math + counter) : Number(math),
          ...(filterGroup?.groupId === item.objectId && {
            employees: filterGroup.employees,
          }),
          joinFrom: !filterGroup?.joinFrom
            ? moment().toISOString()
            : filterGroup?.joinFrom,
        };
      });
      reset({ ...getValues(), groups: groupData });
    } else {
      const groupData = employeeGroup.map(item => {
        const filterGroup = handleFilter(item);
        return {
          name: item.name,
          groupId: item.objectId,
          percentage: !filterGroup?.percentage
            ? 0
            : Number(filterGroup?.percentage),
          ...(filterGroup?.groupId === item.objectId && {
            employees: filterGroup.employees,
          }),
          joinFrom: !filterGroup?.joinFrom
            ? moment().toISOString()
            : filterGroup?.joinFrom,
        };
      });
      reset({
        ...getValues(),
        groups: groupData,
      });
    }
  }, [employeeGroup, isAllotmentGroup, selectedAllotmentTeamAEmployee]);

  useEffect(async () => {
    const math = Math.round(100 / employee.length);
    const counter =
      Math.ceil(math * employee.length) !== 100
        ? 100 - math * employee.length
        : 0;
    const { data } = await fetchSysCfgAllotment();
    const selectGroup = data.find(
      item => item.groupId === selectedEmployee?.objectId
    );
    if (isAllotmentEmployee) {
      const data = employee.map((item, index, arr) => {
        const filterEmployee = selectGroup?.employees?.find(
          employee => employee?.employeeId === item.objectId
        );
        return {
          name: item.fullName,
          employeeId: item.objectId,
          percentage: index === 0 ? Number(math + counter) : Number(math),
          joinFrom: !filterEmployee?.joinFrom
            ? moment().toISOString()
            : filterEmployee?.joinFrom,
        };
      });
      reset({ ...getValues(), employee: data });
    } else {
      const employeeData = employee?.map(item => {
        const filterEmployee = selectGroup?.employees?.find(
          employee => employee?.employeeId === item.objectId
        );
        return {
          name: item.fullName,
          employeeId: item.objectId,
          percentage: !filterEmployee ? 0 : Number(filterEmployee.percentage),
          joinFrom: filterEmployee?.joinFrom || moment().toISOString(),
        };
      });

      reset({
        ...getValues(),
        employee: employeeData,
      });
    }
  }, [employee, isAllotmentEmployee, selectedEmployee]);

  useEffect(async () => {
    if (selectedEmployee?.objectId) {
      const { res } = await fetchEmployeeByGroup(
        selectedEmployee,
        state?.modelName
      );
      setEmployee(res.results);
      setIsAllotmenGroup();
      setIsAllotmenEmployee();
    }
  }, [selectedEmployee, selectedAllotmentTeamAEmployee]);

  return (
    <Container fluid>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex gap-3" style={{ position: "relative" }}></div>
        <Card body>
          <div className="d-flex align-items-center justify-content-between">
            <CommonText>
              Số lượng khách hàng tiềm năng chưa được phân bổ:
              <strong className="text-danger">{leads.length}</strong>
            </CommonText>
            <CommonButton level={0} type="submit">
              Phân bổ
            </CommonButton>
          </div>
          <Spacer size={20} />
          <div className="d-flex gap-3">
            <div className="form-check ">
              <input
                type="radio"
                id="radio4"
                name="positions"
                className="form-check-input"
                value="toast-top-right"
                defaultChecked
                onClick={() => {
                  setSelectedAllotmentTeamAEmployee(
                    DEFAULT_TEAM_EMPOYEE.groups
                  );
                }}
              />
              <CommonText className="form-check-label" style={{ marginTop: 0 }}>
                <label htmlFor="radio4"> Phân bổ theo nhóm</label>
              </CommonText>
            </div>
            <div className="form-check ">
              <input
                type="radio"
                id="radio5"
                name="positions"
                className="form-check-input"
                value="toast-top-right"
                onClick={() => {
                  setSelectedAllotmentTeamAEmployee(
                    DEFAULT_TEAM_EMPOYEE.employee
                  );
                }}
              />
              <CommonText className="form-check-label" style={{ marginTop: 0 }}>
                <label htmlFor="radio5"> Phân bổ nhân viên trong nhóm </label>
              </CommonText>
            </div>
          </div>

          {selectedAllotmentTeamAEmployee === "groups" ? (
            <Row className="mt-3">
              <Table
                headers={HEADERS_GROUP_ALLOTMENTLEAD(
                  isAllotmentGroup,
                  setIsAllotmenGroup
                )}
                formProps={{
                  errors,
                  ...formProps,
                }}
                name="groups"
                disableAdd
                disableDelete
              />
            </Row>
          ) : selectedAllotmentTeamAEmployee === "employee" ? (
            <Row className="mt-3">
              <CommonText className="mb-3 mt-0">Chọn nhóm</CommonText>
              <Col sm={4} className="mb-3">
                <VVSSelectModel
                  model="EmployeeGroup"
                  name="selectedEmployee"
                  placeholder="Chọn nhóm"
                  errors={errors}
                  onSelect={item => {
                    setSelectedEmployee(item);
                  }}
                  {...formProps}
                  conditionField={{
                    isActive: true,
                  }}
                />
              </Col>
              <div className="d-flex justify-content-between">
                <CommonText className="mb-3 mt-0">
                  Danh sách nhân viên phân bổ tuỳ chọn
                </CommonText>
              </div>
              <Table
                headers={HEADERS_EMPLOYEE_ALLOTMENTLEAD(
                  isAllotmentEmployee,
                  setIsAllotmenEmployee
                )}
                defaultRowValue={{}}
                formProps={{
                  errors,
                  ...formProps,
                }}
                disableAdd
                disableDelete
                name="employee"
              />
            </Row>
          ) : undefined}
        </Card>
      </form>
    </Container>
  );
}
