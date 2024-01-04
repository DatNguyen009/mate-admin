import { yupResolver } from "@hookform/resolvers/yup";
import CardDetail from "components/Common/CardDetail";
import { ChartKpi } from "components/Common/ChartKpi";
import Spacer from "components/Common/Spacing";
import { CommonText } from "components/Common/TextCommon";
import SelectField from "components/form-control/Select";
import SelectConst from "components/form-control/SelectConst";
import VVSTable from "components/form-control/VVSTable";
import { KPI_MANAGEMENT } from "constants/dataDashboard";
import { formatNumber, getUserRole } from "helpers/erp_helper";
import moment from "moment/moment";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  Col,
  Container,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import httpService from "services/httpService";
import styled from "styled-components";
import * as yup from "yup";
import React from "react";
import ModalCommon from "components/Common/ModalCommon";
import { CommonButton } from "components/Common/ButtonCommon";
import { CommonSelect } from "components/Common/inputCommon";
import {
  fetchKPIEmployee,
  fetchKPISumary,
  fetchDataForIncomeChart,
  fetchAllKPI,
} from "pages/Administrators/services/api";
import { useMemo } from "react";
import InputField from "components/form-control/InputField";
import Table from "components/form-control/Table";

const ContainerTable = styled.div`
  .card-body {
    padding: 20px 0px 0px;
    overflow: auto;
  }
`;
const HEADERS = (isTotal, roles) => {
  const cellTable = [
    {
      text: "Tên",
      CellComponent: InputField,
      cellComponentProps: (formValue, indexOfRow) => ({
        name: `detail.${indexOfRow}.fullName`,
        disabled: true,
      }),
    },
    {
      text: "Lương cơ bản",
      CellComponent: InputField,
      cellComponentProps: (formValue, indexOfRow) => ({
        name: `detail.${indexOfRow}.baseSalary`,
        disabled: true,
      }),
    },
    {
      text: "Hoa Hồng",
      CellComponent: InputField,
      cellComponentProps: (formValue, indexOfRow) => ({
        name: `detail.${indexOfRow}.commission`,
        disabled: true,
      }),
    },
    {
      text: "KPI Bonus",
      CellComponent: InputField,
      cellComponentProps: (formValue, indexOfRow) => ({
        name: `detail.${indexOfRow}.bonus`,
        disabled: true,
      }),
    },
    {
      text: "Tổng",
      CellComponent: InputField,
      cellComponentProps: (formValue, indexOfRow) => ({
        name: `detail.${indexOfRow}.total`,
        disabled: true,
      }),
    },
  ];
  if (isTotal === "groupId" && roles?.includes("Master")) {
    cellTable.splice(1, 1);
  }
  return cellTable;
};
const HEADERS1 = [
  {
    name: "Tổng doanh thu",
    value: "saleTotal",
  },
  {
    name: "Tổng số KPI thưởng",
    value: "bonus",
  },
  {
    name: "Tổng hoa hồng",
    value: "commision",
  },
];
const getCount = (data, index) => {
  switch (index) {
    case 1:
      return formatNumber(data?.bonus) || 0;
      break;
    case 2:
      return formatNumber(data?.saleTotal) || 0;
      break;
    case 3:
      return formatNumber(data?.commission) || 0;
      break;
    case 4:
      return Number(data?.contractTotal || 0);
      break;
  }
};

const randomColor = colorsNum => {
  const colors = [];
  for (let i = 0; i < colorsNum; i += 1) {
    var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    colors.push(randomColor);
  }
  return colors;
};

export default function KPIReport() {
  const [incomeChartMonth, setIncomeChartMonth] = useState([]);
  const [incomeChartDay, setIncomeChartDay] = useState([]);
  const [dataEmployeeGroup, setDataEmployeeGroup] = useState([]);
  const [dataEmployee, setDataEmployee] = useState([]);
  const [dataExtra, setDataExtra] = useState([]);
  const [dataEly, setdataEly] = useState("employeeId");
  const [dataElyG, setDataElyG] = useState("groupId");
  const [dataSummary, setDataSummary] = useState({});
  const [roles, setRoles] = useState();

  const [dateFrom, setDateFrom] = useState(moment().format("YYYY-MM-DD"));
  const [dateTo, setDateTo] = useState(moment().format("YYYY-MM-DD"));
  const [kpiGroup, setKpiGroup] = useState([]);

  const [kpiEmployee, setKpiEmployee] = useState([]);
  const [colorsHex, setColorsHex] = useState([]);
  const [queryFilter, setQueryFilter] = useState({});

  const [showChart, setShowChart] = useState("saleTotal");
  const [isShowModalBonusKPI, setIsShowModalBonusKPI] = useState(false);
  const DATE_FORMAT = "YYYY-MM-DD";
  const chartRef = useRef();

  const {
    formState: { errors },
    getValues,
    ...rest
  } = useForm({
    mode: "onBlur",
  });
  const { total } = getValues();
  const { setValue, reset } = rest;

  const getAllKpi = useMemo(async () => {
    const { dataGroup, dataEmployee, allEmployeeOption, allGroupOption } =
      await fetchAllKPI();

    if (roles?.includes("Master")) {
      setDataExtra(dataGroup);
      setDataEmployeeGroup(allGroupOption);
      setColorsHex(randomColor(dataGroup.length));
      setKpiGroup(dataGroup);
      setValue("team", "groupId");
    } else {
      setDataExtra(dataEmployee);
      setDataEmployee(allEmployeeOption);
      setKpiEmployee(dataEmployee);
      setValue("employee", "employeeId");
    }
  }, [roles]);

  const getEmployee = async e => {
    const fetchEmployees = fetchKPIEmployee(e);
    setDataEmployee(fetchEmployees);
  };
  const isMaster = useMemo(
    () => dataElyG === "groupId" && roles?.includes("Master"),
    [dataEly, dataElyG, roles]
  );
  const handleChangeEmployeeGroup = async e => {
    const findGroup = dataEmployeeGroup.find(item => item.value === e);

    if (findGroup.value === "groupId") {
      setDataElyG(e);
      setValue("employee", "employeeId");
      const employeeOption = kpiEmployee.map(item => {
        return {
          value: item.objectId,
          text: item.fullName,
        };
      });
      employeeOption.unshift({ text: "Tất cả nhân viên", value: "employeeId" });
      setDataEmployee(employeeOption);
      setDataExtra(kpiGroup);
      return;
    }

    const selectedGroup = kpiGroup.find(item => item.objectId === e);
    setDataExtra([selectedGroup]);
    getEmployee(e);
    setDataElyG(e);
  };

  const handleChangeEmployee = e => {
    const findEmloyee = dataEmployee.find(item => item.value === e);
    if (findEmloyee.value === "employeeId") {
      setdataEly(e);
      setKpiEmployee(kpiEmployee);
      return;
    }
    const selectedEmployee = kpiEmployee?.find(item => item.objectId === e);
    setdataEly(e);
    setDataExtra([selectedEmployee]);
  };

  const filterTable = (dateFrom = "", dateTo = "") => {
    if (!dataExtra.length) return {};

    if (dataEly === "employeeId" && dataElyG === "groupId") {
      setQueryFilter({
        ...(dateFrom &&
          dateTo && {
            to: {
              $gte: {
                __type: "Date",
                iso: dateFrom,
              },
              $lte: {
                __type: "Date",
                iso: dateTo,
              },
            },
          }),
      });
      return {};
    }

    setQueryFilter({
      ...(dataEly !== "employeeId" && {
        employee: {
          __type: "Pointer",
          objectId: dataEly,
          className: "Employee",
        },
      }),

      ...(dataElyG !== "groupId" && {
        team: {
          __type: "Pointer",
          objectId: dataElyG,
          className: "EmployeeGroup",
        },
      }),

      ...(dateFrom &&
        dateTo && {
          to: {
            $gte: {
              __type: "Date",
              iso: dateFrom,
            },
            $lte: {
              __type: "Date",
              iso: dateTo,
            },
          },
        }),
    });
  };

  useEffect(() => {
    const payload = {
      ...(dateFrom && { dateFrom }),
      ...(dateTo && { dateTo }),
    };

    const startDate = moment(payload.dateFrom)
      .startOf("month")
      .format("YYYY-MM-DD");
    const endDate = moment(payload.dateTo).endOf("month").format("YYYY-MM-DD");

    filterTable(startDate, endDate);
  }, [dateFrom, dateTo]);

  useEffect(async () => {
    const detailDataEmloyee = await fetchKPISumary(dataEly, dataElyG);
    setDataSummary(detailDataEmloyee.dataFindSumary);
    filterTable();
    reset({
      ...getValues(),
      detail: isMaster
        ? detailDataEmloyee.dataDetailGroup
        : detailDataEmloyee.dataDetail,
      total: isMaster
        ? detailDataEmloyee.totalDetailGroup
        : detailDataEmloyee.totalDetail,
    });
  }, [dataEly, dataElyG, roles]);

  useEffect(async () => {
    (async () => {
      const roles = await getUserRole();
      setRoles(roles);
    })();
    fetchDataForIncomeChart(
      moment().startOf("month").format(DATE_FORMAT),
      moment().endOf("month").format(DATE_FORMAT)
    ).then(result => setIncomeChartMonth(result));

    fetchDataForIncomeChart(
      moment().startOf("day").format(DATE_FORMAT),
      moment().endOf("day").format(DATE_FORMAT)
    ).then(result => setIncomeChartDay(result));

    const keyDownHandler = event => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsShowModalBonusKPI();
      }
    };
    document.addEventListener("keydown", keyDownHandler);
  }, []);
  return (
    <>
      <Container fluid>
        <Card body>
          <Row>
            <Col xs={3}>
              <div style={{ minHeight: 89 }}>
                {roles?.includes("Master") ? (
                  <SelectConst
                    label="Đội nhóm"
                    name="team"
                    errors={errors}
                    {...rest}
                    options={dataEmployeeGroup}
                    onChange={e => handleChangeEmployeeGroup(e.target.value)}
                  />
                ) : (
                  <SelectConst
                    label="Nhân viên"
                    name="employee"
                    errors={errors}
                    {...rest}
                    options={dataEmployee}
                    onChange={e => handleChangeEmployee(e.target.value)}
                  />
                )}
              </div>
            </Col>

            <Col xs={3} className="d-flex">
              <div className="d-flex align-items-center">
                <div style={{ marginRight: "20px" }}>
                  <CommonText level={8} mt={0} color={"#495057"}>
                    Từ tháng
                  </CommonText>
                  <input
                    type="month"
                    style={{
                      border: "1px solid #ced4da",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      color: "#495057",
                    }}
                    min="2022-01"
                    value={dateFrom}
                    onChange={e => setDateFrom(e.target.value)}
                  />
                </div>
                <div style={{ marginRight: "20px" }}>
                  <CommonText level={8} mt={0} color={"#495057"}>
                    Đến tháng
                  </CommonText>
                  <input
                    type="month"
                    lang="vi-VN"
                    style={{
                      border: "1px solid #ced4da",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      color: "#495057",
                    }}
                    value={dateTo}
                    onChange={e => setDateTo(e.target.value)}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Card>

        <Row>
          {KPI_MANAGEMENT(setIsShowModalBonusKPI).map(item => (
            <Col xl={3} key={item.id} style={item.style} onClick={item.onClick}>
              <CardDetail item={item} number={getCount(dataSummary, item.id)} />
            </Col>
          ))}
        </Row>

        <Row>
          <Col xl={6}>
            <Card body style={{ maxHeight: 400 }}>
              <Row>
                <Col xl={5}>
                  <SelectField
                    label="Hiển thị"
                    name="filterBy"
                    options={HEADERS1}
                    {...rest}
                    errors={errors}
                    onChange={e => {
                      setShowChart(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <ChartKpi
                ref={chartRef}
                colors={colorsHex}
                showChart={showChart}
              />
            </Card>
          </Col>
          <Col xl={6}>
            <ContainerTable>
              <Card body style={{ maxHeight: 400 }}>
                <VVSTable
                  title={
                    <h4 className="mx-2 my-0 font-size-18 text-capitalize">
                      Danh sách nhóm đạt KPI trong tháng
                    </h4>
                  }
                  name="Product"
                  disableAdd
                  disableDelete
                  disableSearch
                />
              </Card>
            </ContainerTable>
          </Col>
        </Row>
      </Container>

      <ModalCommon
        modalTitle="Chi Tiết Tổng Số KPI"
        isShowModal={isShowModalBonusKPI}
        onClose={() => setIsShowModalBonusKPI()}
        style={{ maxWidth: "60%", width: "100%" }}
      >
        <ModalHeader className="d-block">
          {total && (
            <Row>
              <Col sx={3}>
                Tổng {isMaster ? "nhóm" : "nhân viên"}: {total.totalLength}
              </Col>
              <Col sx={3}>
                Tổng thưởng:{" "}
                {total.totalBonus && formatNumber(total.totalBonus)}
              </Col>
              <Col sx={3}>
                Tổng hoa hồng:{" "}
                {total.totalComission && formatNumber(total.totalComission)}
              </Col>
              <Col sx={3}>
                Tổng tất cả: {total.total && formatNumber(total.total)}
              </Col>
            </Row>
          )}
        </ModalHeader>
        <ModalBody>
          <Row className="px-3">
            <Table
              disableAdd
              disableDelete
              headers={HEADERS(dataElyG, roles)}
              formProps={{
                errors,
                ...rest,
              }}
              name="detail"
            />
          </Row>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalCommon>
    </>
  );
}
