import React, { useEffect, useState } from "react";
import { Row, Col, Container, Card, CardBody, CardTitle } from "reactstrap";
import HeaderCreateItem from "components/Common/HeaderReport";

import httpService from "services/httpService";
import Spacer from "components/Common/Spacing";
import moment from "moment";
import { LIST_REPORT } from "constants/dataDashboard";
import CardDetail from "components/Common/CardDetail";
import _ from "lodash";
import { GET_CONTRACT, GET_TRANSACTION } from "helpers/url_helper";
import IChart from "components/Common/Charts";
import { formatNumber } from "helpers/erp_helper";
import InformationCard from "components/Common/InformationCard";
import { CommonButton } from "components/Common/ButtonCommon";
import RefreshIcon from "components/Icon/RefreshIcon";
import MediaButton from "pages/CRM/Customer/Button";
import { Horizontal } from "pages/Administrators/styles";
import DownloadExcel from "components/Common/DownloadExcel";
import IDatePicker from "components/Common/DatePicker";
import { CommonText } from "components/Common/TextCommon";

const month = [
  {
    createdAt: "2022-01-01",
  },
  {
    createdAt: "2022-02-01",
  },
  {
    createdAt: "2022-03-01",
  },
  {
    createdAt: "2022-04-01",
  },
  {
    createdAt: "2022-05-01",
  },
  {
    createdAt: "2022-06-01",
  },
  {
    createdAt: "2022-07-01",
  },
  {
    createdAt: "2022-08-01",
  },
  {
    createdAt: "2022-09-01",
  },
  {
    createdAt: "2022-10-01",
  },
  {
    createdAt: "2022-11-01",
  },
  {
    createdAt: "2022-12-01",
  },
];

const ReportTotal = () => {
  const [depositSummary, setDepositSummary] = useState([]);
  const [withDrawSummary, setWithDrawSummary] = useState([]);
  const [contract, setContract] = useState([]);
  const [dateFrom, setDateFrom] = useState(
    moment().startOf("year").format("YYYY-MM-DD")
  );
  const [dateTo, setDateTo] = useState(moment().format("YYYY-MM-DD"));
  const [totalContract, setTotalContract] = useState(0);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalWithDraw, setTotalWithDraw] = useState(0);
  const [dataExcel, setDataExcel] = useState([]);

  // useEffect(() => {
  //   getRechargeWidthDrawSumary("deposit", true);
  //   getRechargeWidthDrawSumary("withdraw", true);
  //   getContractSumary(true);
  // }, []);

  useEffect(() => {
    getRechargeWidthDrawSumary("deposit", true);
    getRechargeWidthDrawSumary("withdraw", true);
    getContractSumary(true);
  }, [dateFrom, dateTo]);

  const getRechargeWidthDrawSumary = async (type, isFilter) => {
    const params = {
      params: {
        where: {
          type,
          status: "completed",
          ...(isFilter && {
            createdAt: {
              $gte: {
                __type: "Date",
                iso: moment(new Date(dateFrom)).startOf("month"),
              },
              $lte: {
                __type: "Date",
                iso: moment(new Date(dateTo)).endOf("month"),
              },
            },
          }),
        },
        order: "-createdAt",
        count: 1,
        limit: 1000,
      },
    };

    try {
      let transactions = [];
      const res = await httpService.get(GET_TRANSACTION, params);
      transactions = [...res.results];
      setDataExcel(pre => ({
        ...pre,
        [type === "withdraw" ? "Tiền Rút" : "Tiền Nạp"]: res.results,
      }));

      if (res.results?.length < res.count) {
        const pageIndex = Math.ceil(res.count / res.results?.length);
        for (let index = 1; index < pageIndex; index++) {
          const res = await httpService.get(GET_TRANSACTION, {
            params: {
              where: {
                type,
                status: "completed",
                ...(isFilter && {
                  createdAt: {
                    $gte: {
                      __type: "Date",
                      iso: moment(new Date(dateFrom)).startOf("month"),
                    },
                    $lte: {
                      __type: "Date",
                      iso: moment(new Date(dateTo)).endOf("month"),
                    },
                  },
                }),
              },
              order: "-createdAt",
              count: 1,
              limit: 1000,
              skip: 1000 * index,
            },
          });
          transactions = [...transactions, ...res.results];
        }
      }

      if (res.results) {
        transactions = [...transactions, ...month];
        const groupedByMonth = _.groupBy(transactions, item => {
          return item.createdAt.substring(5, 7);
        });

        const sumTotal = transactions.reduce((partialSum, item) => {
          return partialSum + Number(item?.amount || 0);
        }, 0);

        const newGroupMap = Object.entries(groupedByMonth).map(
          ([key, group]) => {
            const sumTotalDeposit = group.reduce((partialSum, item) => {
              return partialSum + Number(item?.amount || 0);
            }, 0);

            return {
              name: `Tháng ${key}`,
              value: sumTotalDeposit,
            };
          }
        );
        const sortGroup = newGroupMap.sort((a, b) => {
          let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });

        if (type === "deposit") {
          setDepositSummary(sortGroup);
          setTotalDeposit(sumTotal);
        }
        if (type === "withdraw") {
          setWithDrawSummary([
            ...sortGroup.map(item => {
              return {
                ...item,
                value: item.value * -1,
              };
            }),
          ]);
          setTotalWithDraw(sumTotal);
        }
      }
    } catch (err) {
      console.error("error", err);
    }
  };

  const getContractSumary = async isFilter => {
    const params = {
      params: {
        where: {
          status: "completed",
          ...(isFilter && {
            createdAt: {
              $gte: {
                __type: "Date",
                iso: moment(dateFrom).startOf("day"),
              },
              $lte: {
                __type: "Date",
                iso: moment(dateTo).endOf("day"),
              },
            },
          }),
        },
        order: "-createdAt",
        count: 1,
        limit: 1000,
      },
    };

    try {
      let contracts;
      const res = await httpService.get(GET_CONTRACT, params);
      contracts = [...res.results];
      setDataExcel(pre => ({
        ...pre,
        ["Tổng Danh Thu"]: res.results,
      }));
      if (res.results?.length < res.count) {
        const pageIndex = Math.ceil(res.count / res.results?.length);
        for (let index = 1; index < pageIndex; index++) {
          const res = await httpService.get(GET_CONTRACT, {
            params: {
              where: {
                status: "completed",
                ...(isFilter && {
                  createdAt: {
                    $gte: {
                      __type: "Date",
                      iso: moment(dateFrom).startOf("day"),
                    },
                    $lte: {
                      __type: "Date",
                      iso: moment(dateTo).endOf("day"),
                    },
                  },
                }),
              },
              order: "-createdAt",
              count: 1,
              limit: 1000,
              skip: 1000 * index,
            },
          });
          contracts = [...contracts, ...res.results];
        }
      }

      if (res.results) {
        contracts = [...contracts, ...month];
        const groupedByMonth = _.groupBy(contracts, item => {
          return item.createdAt.substring(5, 7);
        });
        const sumTotal = contracts.reduce((partialSum, item) => {
          return partialSum + Number(item?.total || 0);
        }, 0);
        const newGroupMap = Object.entries(groupedByMonth).map(
          ([key, group]) => {
            const sumTotalDeposit = group.reduce((partialSum, item) => {
              return partialSum + Number(item?.total || 0);
            }, 0);

            return {
              name: `Tháng ${key}`,
              value: sumTotalDeposit,
            };
          }
        );

        const sortGroup = newGroupMap.sort((a, b) => {
          let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
        setTotalContract(sumTotal);
        setContract(sortGroup);
      }
    } catch (err) {
      console.error("error", err);
    }
  };
  const handleRefresh = () => {
    getContractSumary(true);
    getRechargeWidthDrawSumary("deposit", true);
    getRechargeWidthDrawSumary("withdraw", true);
  };
  return (
    <Container fluid style={{ position: "relative" }}>
      <Row>
        <Col xs={6} sm={8}>
          <CardTitle className="mb-4 d-flex gap-2">
            <div className="pe-0 me-2 d-flex align-items-center">
              <CommonText className="text-nowrap m-0 me-2">Từ ngày:</CommonText>
              <IDatePicker
                width={120}
                type="date"
                picker="month"
                formatDate="MM/YYYY"
                value={dateFrom}
                onChange={date => {
                  setDateFrom(date);
                }}
              />
            </div>
            <div className="p-0 d-flex align-items-center">
              <CommonText className="text-nowrap m-0 me-2">
                Đến ngày:{" "}
              </CommonText>
              <IDatePicker
                width={120}
                type="date"
                formatDate="MM/YYYY"
                picker="month"
                value={dateTo}
                onChange={date => {
                  setDateTo(date);
                }}
              />
            </div>
            <div>
              <CommonButton
                style={{ position: "relative" }}
                onClick={handleRefresh}
              >
                <RefreshIcon />
              </CommonButton>
            </div>
          </CardTitle>
        </Col>
        <Col xs={6} sm={4}>
          <div className="mb-4 d-flex justify-content-end pe-3 align-items-center">
            <DownloadExcel data={dataExcel} />
          </div>
        </Col>
      </Row>

      <Row>
        {LIST_REPORT.map((item, index) => (
          <Col xl={3} key={item.id}>
            <CardDetail
              item={item}
              number={
                index === 0
                  ? formatNumber(totalDeposit) || 0
                  : index === 1
                  ? formatNumber(totalWithDraw * -1) || 0
                  : formatNumber(totalContract) || 0
              }
              styleContentCard={{
                fontSize: 17,
              }}
            />
          </Col>
        ))}
      </Row>
      <Row>
        <Col xl={12} lg={12} xs={12}>
          <Card>
            <CardBody className="card-body-height">
              <CardTitle>Tổng tiền đã nạp</CardTitle>
              {depositSummary && (
                <IChart type="bar" dataChart={depositSummary} />
              )}
            </CardBody>
          </Card>
        </Col>
        <Col xl={12} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body-height">
              <CardTitle>Tổng tiền đã rút</CardTitle>
              {withDrawSummary && (
                <IChart type="bar" dataChart={withDrawSummary} />
              )}
            </CardBody>
          </Card>
        </Col>
        <Col xl={12} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body-height">
              <CardTitle>Tổng doanh thu(hợp đồng)</CardTitle>
              {contract && <IChart type="bar" dataChart={contract} />}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <InformationCard title="Báo cáo tổng quan" type="chart" />
        </Col>
      </Row>
    </Container>
  );
};

export default ReportTotal;
