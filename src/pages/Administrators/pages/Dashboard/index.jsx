import _ from "lodash";
import moment from "moment/moment";
import IChart from "components/Common/Charts";
import httpService from "services/httpService";
import { Col, Container, Row } from "reactstrap";
import { formatNumber } from "helpers/erp_helper";
import React, { useState, useEffect } from "react";
import ListOfItem from "components/Common/ListOfItem";
import CardDetail from "components/Common/CardDetail";
import { CommonText } from "components/Common/TextCommon";

import { LIST_ITEM, DATA_CURRENT } from "constants/dataDashboard";

const DATE_FORMAT = "YYYY-MM-DD";

export default function DashboardReport() {
  const [incomeChartMonth, setIncomeChartMonth] = useState([]);
  const [incomeChartDay, setIncomeChartDay] = useState([]);
  const [summaryDashboard, setSummaryDashboard] = useState();
  const [dataCurrent, setDataCurrent] = useState(DATA_CURRENT);

  useEffect(() => {
    getDataForIncomeChart().then(result => {
      const date = new Date();
      const data = result?.map(item => ({
        name: item.objectId,
        value: item.total,
      }));
      const sum = _.sumBy(data, "value");

      setIncomeChartMonth([
        { name: `Năm ${date.getUTCFullYear()}`, value: sum },
      ]);
    });

    getDataForIncomeChart(
      moment().startOf("day").format(DATE_FORMAT),
      moment().endOf("day").format(DATE_FORMAT)
    ).then(result => setIncomeChartDay(result));
    getSummaryDashboard();
  }, []);

  const getDataForIncomeChart = async (dateFrom, dateTo) => {
    const url = "parse/classes/Contract";
    try {
      const resp = await httpService.get(url, {
        params: {
          where: {
            createdAt: {
              $gte: {
                __type: "Date",
                iso: moment(new Date()).startOf("year"),
              },
              $lte: {
                __type: "Date",
                iso: moment(new Date()).endOf("year"),
              },
            },
          },
          order: "-createdAt",
          count: 1,
          limit: 1000,
        },
      });
      if (resp.results) {
        return resp.results;
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

  const getCount = index => {
    switch (index) {
      case 1:
        return summaryDashboard?.contractCount;
        break;
      case 2:
        return summaryDashboard?.totalContractCount;
        break;
      case 3:
        return summaryDashboard?.totalEmployee;
        break;
      case 4:
        return summaryDashboard?.customerCout;
        break;
    }
  };

  return (
    <Container fluid>
      <Row>
        {LIST_ITEM.map(item => (
          <Col xl={3} key={item.id}>
            <CardDetail item={item} number={getCount(item.id)} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col xl={6}>
          <IChart
            title={"Doanh thu năm " + moment().format("YYYY")}
            type="bar"
            dataChart={incomeChartMonth}
            optionData={{
              label: {
                show: true,
                position: "inside",
                formatter: params => {
                  let label = `${formatNumber(params.value)}  VND`;
                  return label.toLocaleString();
                },
              },
              grid: {
                left: "20%",
                right: "0%",
                bottom: "10%",
              },
            }}
          />
        </Col>
        <Col xl={6}>
          <ListOfItem
            title={dataCurrent[0]?.title}
            modelName={dataCurrent[0]?.modelName}
            orderField={dataCurrent[0]?.orderField}
            limit={dataCurrent[0]?.limit}
          />
        </Col>
      </Row>
    </Container>
  );
}
