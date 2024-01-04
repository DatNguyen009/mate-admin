import { yupResolver } from "@hookform/resolvers/yup";
import CardDetail from "components/Common/CardDetail";
import { CommonText } from "components/Common/TextCommon";
import { KPI_MANAGEMENT } from "constants/dataDashboard";
import moment from "moment/moment";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, Col, Container, Row } from "reactstrap";
import httpService from "services/httpService";
// import KPIAssignment from "../KPIAssignment";
import * as yup from "yup";
import SelectConst from "components/form-control/SelectConst";
import { ChartKpi } from "components/Common/ChartKpi";
import VVSTable from "components/form-control/VVSTable";
import { CommonButton } from "components/Common/ButtonCommon";
import Spacer from "components/Common/Spacing";
import { formatNumber } from "helpers/erp_helper";
import SelectField from "components/form-control/Select";
import IDatePicker from "components/Common/DatePicker";
import IChart from "components/Common/Charts";

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

export default function KPIManagement() {
  const [incomeChartMonth, setIncomeChartMonth] = useState([]);
  const [incomeChartDay, setIncomeChartDay] = useState([]);
  const [dataEmployeeGroup, setDataEmployeeGroup] = useState([]);
  const [dataEmployee, setDataEmployee] = useState([]);
  const [dataExtra, setDataExtra] = useState([]);
  const [dataEly, setdataEly] = useState("employeeId");
  const [dataElyG, setDataElyG] = useState("groupId");
  const [dataSummary, setDataSummary] = useState({});

  const [dateFrom, setDateFrom] = useState(
    moment().subtract(1, "months").format("YYYY-MM-DD")
  );
  const [dateTo, setDateTo] = useState(moment().format("YYYY-MM-DD"));
  const [kpiGroup, setKpiGroup] = useState([]);

  const [kpiEmployee, setKpiEmployee] = useState([]);
  const [colorsHex, setColorsHex] = useState([]);
  const [queryFilter, setQueryFilter] = useState({});
  const [showChart, setShowChart] = useState("saleTotal");
  const [query, setQuery] = useState({
    createdAt: {
      $gte: {
        __type: "Date",
        iso: moment()
          .startOf("month")
          .subtract(1, "months")
          .format("YYYY-MM-DD"),
      },
      $lte: {
        __type: "Date",
        iso: moment().endOf("month").format("YYYY-MM-DD"),
      },
    },
    team: {
      $ne: null,
    },
  });
  const DATE_FORMAT = "YYYY-MM-DD";

  const getDataSumary = async () => {
    const kpiAssignmentUrl = `/parse/classes/KPIAssignment`;
    const params = {
      params: {
        where: query,
      },
    };
    const resKpiAssignment = await httpService.get(kpiAssignmentUrl, params);

    const dataFindSumary = resKpiAssignment.results.reduce(
      (total, current) => {
        total.bonus += current.bonus;
        total.contractTotal += Number(current.contractTotal);
        total.saleTotal += current.saleTotal;
        total.commission += current.commission;

        return total;
      },
      { bonus: 0, contractTotal: 0, saleTotal: 0, commission: 0 }
    );

    setDataSummary(dataFindSumary);
  };
  useEffect(async () => {
    const kpiAssignmentUrl = `/parse/classes/KPIAssignment`;

    const params = {
      params: {
        where: query,
      },
    };
    const resKpiAssignment = await httpService.get(kpiAssignmentUrl, params);
    const dataFindSumary = resKpiAssignment.results.reduce(
      (total, current) => {
        total.bonus += current.bonus;
        total.contractTotal += current.contractTotal;
        total.saleTotal += current.saleTotal;
        total.commission += current.commission;

        return total;
      },
      { bonus: 0, contractTotal: 0, saleTotal: 0, commission: 0 }
    );

    setDataSummary(dataFindSumary);
  }, [query]);

  useEffect(() => {
    getAllKpi();
    getDataSumary();
  }, []);

  const getAllKpi = async () => {
    const { setValue } = rest;
    const employeeGroupUrl = `/parse/classes/EmployeeGroup?where={"isActive": true}`;
    const employeeUrl = "/parse/classes/Employee";

    const res = await httpService.get(employeeGroupUrl);

    const resEmployee = await httpService.get(employeeUrl);

    const employeeOption = resEmployee.results.map((item, index) => {
      return {
        text: item.fullName,
        value: item.objectId,
      };
    });
    const allEmployeeOption = [
      { text: "Tất cả nhân viên", value: "employeeId" },
      ...employeeOption,
    ];

    const employeeGroupOption = res.results.map((item, index) => {
      return {
        text: item.name,
        value: item.objectId,
      };
    });

    const allGroupOption = [
      {
        text: "Tất cả đội nhóm",
        value: "groupId",
      },
      ...employeeGroupOption,
    ];

    setColorsHex(randomColor(res.results.length));
    setDataEmployee(allEmployeeOption);
    setDataEmployeeGroup(allGroupOption);
    setDataExtra(res.results);
    setKpiGroup(res.results);
    setKpiEmployee(resEmployee.results);
    setValue("team", "groupId");
    setValue("employee", "employeeId");
  };

  const getEmployee = async e => {
    const employeeUrl = "/parse/classes/Employee";
    const params = {
      params: {
        where: {
          ...(e && {
            group: {
              objectId: e,
              className: "EmployeeGroup",
              __type: "Pointer",
            },
          }),
        },
      },
    };
    const resEmployee = await httpService.get(employeeUrl, params);

    const employeeOption = resEmployee.results.map((item, index) => {
      return {
        text: item.fullName,
        value: item.objectId,
      };
    });
    const allEmployeeOption = [
      { text: "Tất cả nhân viên", value: "employeeId" },
      ...employeeOption,
    ];

    setDataEmployee(allEmployeeOption);
  };

  const randomColor = colorsNum => {
    const colors = [];
    for (let i = 0; i < colorsNum; i += 1) {
      var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      colors.push(randomColor);
    }
    return colors;
  };

  const filterData = async e => {
    const { setValue } = rest;
    const findGroup = dataEmployeeGroup.find(item => item.value === e);

    if (findGroup.value === "groupId") {
      setDataElyG(e);
      setValue("employee", "employeeId");
      const test1 = kpiEmployee.map(item => {
        return {
          value: item.objectId,
          text: item.fullName,
        };
      });
      test1.unshift({ text: "Tất cả nhân viên", value: "employeeId" });
      setDataEmployee(test1);
      setDataExtra(kpiGroup);
      return;
    }

    const selectedGroup = kpiGroup.find(item => item.objectId === e);
    setDataExtra([selectedGroup]);
    getEmployee(e);
    setDataElyG(e);
  };

  useEffect(() => {
    getDataForIncomeChart(
      moment().startOf("month").format(DATE_FORMAT),
      moment().endOf("month").format(DATE_FORMAT)
    ).then(result => setIncomeChartMonth(result));

    getDataForIncomeChart(
      moment().startOf("day").format(DATE_FORMAT),
      moment().endOf("day").format(DATE_FORMAT)
    ).then(result => setIncomeChartDay(result));
  }, []);

  const schema = yup

    .object({})

    .required();

  const {
    formState: { errors },
    ...rest
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const getDataForIncomeChart = async (dateFrom, dateTo) => {
    const url = "parse/functions/order-summary";
    try {
      const resp = await httpService.post(url, { dateFrom, dateTo });

      if (resp.result && resp.result.statusCode === 201) {
        return resp.result.data;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getCount = index => {
    switch (index) {
      case 1:
        return dataSummary?.bonus || 0;
        break;
      case 2:
        return dataSummary?.saleTotal || 0;
        break;
      case 3:
        return dataSummary?.commission || 0;
        break;
      case 4:
        return Number(dataSummary?.contractTotal || 0);
        break;
    }
  };

  const changeEmployee = e => {
    const findEmloyee = dataEmployee.find(item => item.value === e);

    if (findEmloyee.value === "employeeId") {
      setdataEly(e);
      setKpiEmployee(kpiEmployee);
      return;
    }

    const selectedEmployee = kpiEmployee.find(item => item.objectId === e);
    setdataEly(e);
    setDataExtra([selectedEmployee]);
  };

  useEffect(() => {
    filterTable();
  }, [dataEly, dataElyG]);

  const filterTable = (dateFrom = "", dateTo = "") => {
    if (!dataExtra.length) return {};

    if (dataEly === "employeeId" && dataElyG === "groupId") {
      setQueryFilter({
        ...(dateFrom &&
          dateTo && {
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

  const chartRef = useRef();

  const onTableChangeHandler = data => {
    console.log(data);
    chartRef.current.reRender(data);

    const dataFindSumary = data.reduce(
      (total, current) => {
        total.bonus += current.bonus;
        total.contractTotal += current.contractTotal;
        total.saleTotal += current.saleTotal;
        total.commission += current.commission;

        return total;
      },
      { bonus: 0, contractTotal: 0, saleTotal: 0, commission: 0 }
    );
    setDataSummary(dataFindSumary);
  };

  const renderListReport = useMemo(
    () =>
      KPI_MANAGEMENT().map(item => (
        <Col xl={3} key={item.id}>
          <CardDetail
            item={item}
            levelTitle={3}
            formattor={formatNumber}
            number={getCount(item.id)}
          />
        </Col>
      )),
    [dateFrom, dateTo, dataSummary]
  );
  const handleFilter = () => {};
  return (
    <div className="page-content">
      <Container fluid>
        <CommonText level={3} color="#2a3042" mb={17}>
          Báo cáo KPI
        </CommonText>
        <Card body>
          <Row>
            <Col xs={12} className="d-flex gap-4">
              <div style={{ minHeight: 60 }}>
                <IDatePicker
                  label="Từ tháng"
                  type="date"
                  picker="month"
                  formatDate="MM/YYYY"
                  value={dateFrom}
                  onChange={date => {
                    setDateFrom(date);

                    setQuery(pre => ({
                      ...pre,
                      createdAt: {
                        ...pre.createdAt,
                        $gte: {
                          __type: "Date",
                          iso: moment(date)
                            .startOf("month")
                            .format("YYYY-MM-DD"),
                        },
                      },
                    }));
                  }}
                />
              </div>
              <div style={{ minHeight: 60 }}>
                <IDatePicker
                  label="Đến tháng"
                  type="date"
                  picker="month"
                  formatDate="MM/YYYY"
                  value={dateTo}
                  onChange={date => {
                    setDateTo(date);
                    setQuery(pre => ({
                      ...pre,
                      createdAt: {
                        ...pre.createdAt,
                        $lte: {
                          __type: "Date",
                          iso: moment(date).endOf("month").format("YYYY-MM-DD"),
                        },
                      },
                    }));
                  }}
                />
              </div>
              <div style={{ minHeight: 60, minWidth: 250 }}>
                <SelectConst
                  label="Đội nhóm"
                  name="team"
                  errors={errors}
                  {...rest}
                  options={dataEmployeeGroup}
                  onChange={e => {
                    if (e.target.value !== "groupId") {
                      setQuery(pre => ({
                        ...pre,
                        team: {
                          __type: "Pointer",
                          objectId: e.target.value,
                          className: "EmployeeGroup",
                        },
                      }));
                    } else {
                      setQuery(pre => {
                        return { ...pre, team: { $ne: null } };
                      });
                    }
                  }}
                />
              </div>
              {/* <div style={{ minHeight: 60, minWidth: 250 }}>
                <SelectConst
                  label="Nhân viên"
                  name="employee"
                  errors={errors}
                  {...rest}
                  options={dataEmployee}
                  onChange={e => {
                    changeEmployee(e.target.value);
                    if (e.target.value !== "groupId") {
                      setQuery(pre => ({
                        ...pre,
                        employee: {
                          __type: "Pointer",
                          objectId: e.target.value,
                          className: "EmployeeGroup"
                        }
                      }));
                    } else {
                      setQuery(pre => {
                        delete pre?.employee;
                        return { ...pre };
                      });
                    }
                  }}
                />
              </div> */}
            </Col>
          </Row>
        </Card>

        <Row>{renderListReport}</Row>
        <Container fluid>
          <VVSTable
            showExportExcel
            disableAdd
            disableSearch
            disableDelete
            title="Chỉ tiêu cho nhóm"
            name="KPIAssignment"
            whereQuery={query}
          />
        </Container>
        <Card body>
          <Col xl={3}>
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
          <Spacer size={40} />
          <Row>
            <Col xl={7}>
              <ChartKpi
                ref={chartRef}
                colors={colorsHex}
                showChart={showChart}
              />
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}
