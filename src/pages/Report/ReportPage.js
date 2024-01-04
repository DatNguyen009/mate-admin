import React, { useEffect, useMemo, useState } from "react";
import { Row, Col, Container, Card, CardBody, CardTitle } from "reactstrap";
import httpService from "services/httpService";
import moment from "moment";
import { LIST_REPORT } from "constants/dataDashboard";
import CardDetail from "components/Common/CardDetail";
import _ from "lodash";
import { formatNumber } from "helpers/erp_helper";
import IChart from "components/Common/Charts";
import { CommonText } from "components/Common/TextCommon";
import RangePicker from "components/Common/RangePicker";

const handleSortMonth = sumary => {
  const defaultSumary = Array(12)
    .fill("")
    .map((_, index) => {
      return {
        name: `Tháng ${index + 1}`,
        value: 0,
      };
    });
  if (!!sumary.length) {
    const totalSumary = sumary
      .map(item => ({
        name: `${item.objectId.month}/${item.objectId.year}`,
        value: Math.abs(item.total),
      }))
      .sort((a, b) => {
        let fa = new Date(`01/${a.name}`),
          fb = new Date(`01/${b.name}`);

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    return totalSumary;
  }
  return defaultSumary;
};

const ReportPages = () => {
  const [depositSummary, setDepositSummary] = useState([]);
  const [withDrawSummary, setWithDrawSummary] = useState([]);
  const [contract, setContract] = useState([]);
  const [dateFrom, setDateFrom] = useState(
    moment().subtract(1, "months").format("YYYY-MM-DD")
  );
  const [dateTo, setDateTo] = useState(moment().format("YYYY-MM-DD"));
  const [totalContract, setTotalContract] = useState(0);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalWithDraw, setTotalWithDraw] = useState(0);

  useEffect(async () => {
    const url = "/parse/functions/transaction-report";
    const { result } = await httpService.post(url, {
      dateFrom,
      dateTo,
    });
    const {
      depositByMonth,
      totalTransactionByMonth,
      withdrawByMonth,
      totalContract: contract,
      contractByMonth,
    } = result.data;

    const totalDeposit = totalTransactionByMonth.find(
      item => item.objectId === "deposit"
    );
    const totalWithdraw = totalTransactionByMonth.find(
      item => item.objectId === "withdraw"
    );
    const totalContract = contract.find(item => item.objectId === "effective");
    const deposit = handleSortMonth(depositByMonth);
    const withdraw = handleSortMonth(withdrawByMonth);
    const contractSumary = handleSortMonth(contractByMonth);
    setTotalDeposit(totalDeposit ? totalDeposit.total : 0);
    setTotalWithDraw(totalWithdraw ? totalWithdraw.total : 0);
    setTotalContract(totalContract ? totalContract.total : 0);
    setWithDrawSummary(withdraw);
    setDepositSummary(deposit);
    setContract(contractSumary);
  }, [dateFrom, dateTo]);

  const renderListReport = useMemo(
    () =>
      LIST_REPORT.map((item, index) => (
        <Col xl={3} key={item.id}>
          <CardDetail
            levelTitle={3}
            item={item}
            number={
              index === 0
                ? totalDeposit
                : index === 1
                ? totalWithDraw * -1
                : totalContract
            }
            formattor={formatNumber}
          />
        </Col>
      )),
    [dateFrom, dateTo, totalContract, totalDeposit, totalWithDraw]
  );
  return (
    <div className="page-content">
      <Container fluid style={{ position: "relative" }}>
        <CommonText level={3} color="#2a3042" mb={17}>
          Báo cáo tổng
        </CommonText>
        <Card body>
          <Row>
            <Col xs={8} className="d-flex gap-4">
              <RangePicker
                picker="date"
                labelDateFrom="Từ tháng"
                labelDateTo="Đến tháng"
                dateFrom={dateFrom}
                dateTo={dateTo}
                onChange={date => {
                  setDateTo(date.endDate);
                  setDateFrom(date.startDate);
                }}
              />
            </Col>
          </Row>
        </Card>
        <Row>{renderListReport}</Row>
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
      </Container>
    </div>
  );
};

export default ReportPages;
