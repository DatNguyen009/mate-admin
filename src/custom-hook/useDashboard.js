import React from "react";
import { useState, useEffect } from "react";
import { formatData, getUserRole } from "helpers/erp_helper";
import { Col, Row } from "reactstrap";
import CardDetail from "components/Common/CardDetail";
import {
  DATA_CURRENT,
  LIST_ITEM,
  LIST_ITEM_SALE,
} from "constants/dataDashboard";
import ChartDashboard from "components/Common/ChartDashboard";
import ListOfItem from "components/Common/ListOfItem";
import moment from "moment";
import httpService from "services/httpService";

const ROLE = {
  SALE: "Sale",
  ADMIN: "Admin",
  SALELEADER: "SaleLeader",
};
const getCount = (index, summary) => {
  if (!summary) return;

  switch (index) {
    case 1:
      return summary.contractCount;
      break;
    case 2:
      return summary.orderCount;
      break;
    case 3:
      return summary.totalEmployee;
      break;
    case 4:
      return summary.customerCout;
      break;
  }
};
const DATE_FORMAT = "YYYY-MM-DD";

export const useDashboard = () => {
  const [role, setRole] = useState();
  const [incomeChartDay, setIncomeChartDay] = useState([]);
  const [incomeChartMonth, setIncomeChartMonth] = useState([]);
  const [summaryDashboard, setSummaryDashboard] = useState();

  useEffect(async () => {
    const userRole = await getUserRole();
    setRole(userRole);
  }, []);

  useEffect(() => {
    getDataForIncomeChart(
      moment().startOf("month").format(DATE_FORMAT),
      moment().endOf("month").format(DATE_FORMAT)
    ).then(result => setIncomeChartMonth(result));

    getDataForIncomeChart(
      moment().startOf("day").format(DATE_FORMAT),
      moment().endOf("day").format(DATE_FORMAT)
    ).then(result => setIncomeChartDay(result));
    getSummaryDashboard();
  }, []);

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

  const getSummaryDashboard = async () => {
    try {
      const res = await httpService.post("parse/functions/dashboard-summary");
      if (res.result && res.result.statusCode) {
        setSummaryDashboard(res.result.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const renderSummary = summary => {
    if (!role) return;

    if (role.includes(ROLE.SALE || ROLE.SALELEADER)) {
      return (
        <>
          <Row>
            {summaryDashboard &&
              LIST_ITEM_SALE.map(item => (
                <Col xl={3} key={item.id}>
                  <CardDetail item={item} />
                </Col>
              ))}
          </Row>
          <Row>
            <Col xl={6}></Col>
            <Col xl={6}>
              <ListOfItem
                title={DATA_CURRENT[0]?.title}
                modelName={DATA_CURRENT[0]?.modelName}
                orderField={DATA_CURRENT[0]?.orderField}
                limit={DATA_CURRENT[0]?.limit}
              />
            </Col>
          </Row>
        </>
      );
    }
    if (role.includes(ROLE.ADMIN)) {
      return (
        <>
          <Row>
            {summaryDashboard &&
              LIST_ITEM.map(item => (
                <Col xl={3} key={item.id}>
                  <CardDetail
                    item={item}
                    number={getCount(item.id, summaryDashboard)}
                  />
                </Col>
              ))}
          </Row>
          <Row>
            <Col xl={6}>
              <ChartDashboard
                title={"Doanh thu tháng " + moment().format("MM")}
                typeDefault="bar"
                data={formatData(incomeChartMonth, ["objectId", "total"])}
              />
            </Col>
            <Col xl={6}>
              <ListOfItem
                title={DATA_CURRENT[0]?.title}
                modelName={DATA_CURRENT[0]?.modelName}
                orderField={DATA_CURRENT[0]?.orderField}
                limit={DATA_CURRENT[0]?.limit}
              />
            </Col>
          </Row>
          <Row>
            <Col xl={6}>
              <ChartDashboard
                title="Doanh thu hôm nay"
                typeDefault="bar"
                data={formatData(incomeChartDay, ["objectId", "total"])}
              />
            </Col>
          </Row>
        </>
      );
    }
  };

  return { role, renderSummary };
};
