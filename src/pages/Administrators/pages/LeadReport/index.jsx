import React from "react";
import { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
import moment from "moment";
import httpService from "services/httpService";
import BarChartLead from "components/Common/BarChartLead";
import StatusLeadPieChart from "components/Common/StatusLeadPieChart";
import PlatformLeadPieChart from "components/Common/PlatformLeadPieChart";
import ProvinceLeadPieChart from "components/Common/ProvinceLeadPieChart";
import Spacer from "components/Common/Spacing";
import {
  LEAD_URL,
  GET_CALL_LOG,
  GET_MESSAGE,
  GET_SUMMARY_LEAD,
} from "helpers/url_helper";
import RefreshIcon from "components/Icon/RefreshIcon";
import { CommonButton } from "components/Common/ButtonCommon";
import { CommonText } from "components/Common/TextCommon";
import IChart from "components/Common/Charts";
import IDatePicker from "components/Common/DatePicker";
import {
  optionChart,
  seriesChart,
} from "pages/Administrators/constants/optionChart";
import { Horizontal } from "pages/Administrators/styles";
import DownloadExcel from "components/Common/DownloadExcel";
import { provinceToRegion } from "helpers/province_helper";

const LeadReport = () => {
  const [dataCharts, setDataCharts] = useState({});
  const [totalLead, setTotalLead] = useState(0);
  const [dateFrom, setDateFrom] = useState(
    moment().startOf("year").format("YYYY-MM-DD")
  );
  const [dateTo, setDateTo] = useState(moment().format("YYYY-MM-DD"));
  const [isFilter, setIsFilter] = useState(false);
  const [totalCallLog, setTotalCallLog] = useState(0);
  const [noAllLead, setNoAllLead] = useState(0);
  const [dataCallLog, setDataCallLog] = useState([]);
  const [totalMessage, setTotalMessage] = useState(0);
  const [dataMessage, setDataMessage] = useState([]);
  const [totalSocical, setTotalSocical] = useState(0);
  const [dataSocical, setDataSocical] = useState([]);
  const [dataTotalLocal, setTotalLocal] = useState(0);
  const [dataLocal, setDataLocal] = useState([]);
  const [dataDefault] = useState([{ name: "Không có số liệu", value: 0 }]);
  const [dataExcel, setDataExcel] = useState({});

  // LifeCycle
  useEffect(async () => {
    handleFetchData();
    getDataSummarizeLead(dateFrom, dateTo);
  }, [dateFrom, dateTo]);

  useEffect(async () => {
    const data = await getDataSummarizeLead();
    const result = data?.reduce((acc, current) => {
      let data = current.count + acc;
      return data;
    }, 0);
    setTotalLead(result);
    fetchLog(dateFrom, dateTo, GET_CALL_LOG, setTotalCallLog);
    getNoAllLead(LEAD_URL);
  }, []);

  //API
  const getDataSummarizeLead = async (startDate, endDate) => {
    try {
      if (isFilter) {
        var body = {
          dateFrom: moment(startDate).format("YYYY-MM-DD"),
          dateTo: moment(endDate).format("YYYY-MM-DD"),
        };
      } else {
        body = {
          dateFrom: moment().startOf("year").format("YYYY-MM-DD"),
          dateTo: moment().endOf("year").format("YYYY-MM-DD"),
        };
      }
      const res = await httpService.post(GET_SUMMARY_LEAD, body);
      const result = res.result.data;
      if (res && res.result && res.result.code === 201) {
        setDataCharts(res.result.data);
      }
      const dataSoical = result.leadGroupByPlatform.map(item => ({
        name: item.objectId === null ? "Không xác định" : item.objectId,
        value: item.count,
      }));

      setDataExcel(pre => ({
        ...pre,
        "Các tỉnh thành": result.laedGroupByProvince,
      }));

      const region = result.laedGroupByProvince.length
        ? result.laedGroupByProvince
            .map(item => ({
              name: provinceToRegion(item.objectId)?.region,
              value: item.count,
            }))
            .reduce((prev, value, index, arr) => {
              const type = _.uniqBy(arr.map(key => key.name)).map(item => {
                return {
                  name: !item ? "Không xác định" : item,
                  value: _.sumBy(
                    arr.filter(value => value.name === item),
                    "value"
                  ),
                };
              });
              return type;
            })
        : [];

      setTotalLocal(region.length);
      setTotalSocical(dataSoical.length);
      setDataLocal(region);
      setDataSocical(!dataSoical.length ? dataDefault : dataSoical);
      const data = [...res.result.data.leadGroupByMonth];
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const fetchLog = async (startDate, endDate, url, handleTotal, type) => {
    try {
      const resp = await httpService.get(url, {
        params: {
          where: {
            createdAt: {
              $gte: {
                __type: "Date",
                iso: moment(new Date(startDate)).startOf("month"),
              },
              $lte: {
                __type: "Date",
                iso: moment(new Date(endDate)).endOf("month"),
              },
            },
          },
          order: "-createdAt",
          count: 1,
          limit: 1000,
          // skip: 1000 * index,
        },
      });
      const data = resp.results;
      if (type)
        setDataExcel(pre => ({
          ...pre,
          [type]: data,
        }));

      handleTotal(resp.count);
      const status = data.reduce((prev, cur) => {
        if (cur.status) prev.push(cur.status);
        else {
          prev.push("Mới");
        }
        const uniq = [...new Set(prev)];
        return uniq;
      }, []);

      const listStatus = status.map((status, _, arr) => ({
        name: status,
        value: data.filter(
          item => item.status === status || (status === "Mới" && !item.status)
        ).length,
      }));
      return listStatus;
    } catch (err) {
      console.error(err);
    }
  };

  //count all lead
  const getNoAllLead = async url => {
    try {
      const resp = await httpService.get(url, {
        params: {
          count: 1,
          limit: 1,
        },
      });
      setNoAllLead(resp?.count || 0);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Feature
  const onChangeFilter = (date, setDate) => {
    setDate(date);
    setIsFilter(true);
    const payload = {
      ...(dateFrom && { dateFrom }),
      ...(dateTo && { dateTo }),
    };
    const startDate = moment(payload.dateFrom).format("YYYY-MM-DD");
    const endDate = moment(payload.dateTo).format("YYYY-MM-DD");
    getDataSummarizeLead(startDate, endDate);
  };

  const handleFetchData = async () => {
    const callLogData = await fetchLog(
      dateFrom,
      dateTo,
      GET_CALL_LOG,
      setTotalCallLog,
      "Lịch sử cuộc gọi"
    );
    const messageData = await fetchLog(
      dateFrom,
      dateTo,
      GET_MESSAGE,
      setTotalMessage,
      "Lịch sử tin nhắn"
    );

    setDataCallLog(!callLogData.length ? dataDefault : callLogData);
    setDataMessage(!messageData.length ? dataDefault : messageData);
  };
  const handleRefresh = async () => {
    handleFetchData();
  };
  return (
    <Container fluid style={{ position: "relative" }}>
      <CardTitle className="mb-2">
        <Row>
          <Col xs={6} sm={8}>
            <CardTitle className="mb-4 d-flex gap-2">
              <div className="pe-0 me-2 d-flex align-items-center">
                <CommonText className="text-nowrap m-0 me-2">
                  Từ ngày:
                </CommonText>
                <IDatePicker
                  width={120}
                  type="date"
                  picker="month"
                  formatDate="MM/YYYY"
                  value={dateFrom}
                  onChange={date => {
                    onChangeFilter(date, setDateFrom);
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
                    onChangeFilter(date, setDateTo);
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
      </CardTitle>
      <CommonText level={4} className="m-0 mb-4 ">
        Tổng số khách hàng tiềm năng:
        <span style={{ fontWeight: "bolder" }} className="m-0 mb-4 ">
          {" "}
          {totalLead}
        </span>
      </CommonText>
      <Container fluid>
        <Row>
          <Col xl={6} lg={6} xs={12} className="d-flex">
            <Card style={{ flex: "0 0 100%" }}>
              <CardBody className="card-body-height d-flex flex-column">
                <CardTitle className="mb-3 d-flex justify-content-between">
                  <span> Báo cáo dữ liệu về cuộc gọi</span>
                  <span className="fw-lighter">
                    Tổng khách hàng:
                    <span className="fw-bold me-4"> {noAllLead} </span>
                    Tổng cuộc gọi:
                    <span className="fw-bold"> {totalCallLog} </span>
                  </span>
                </CardTitle>
                <IChart
                  type="pie"
                  dataChart={dataCallLog}
                  style={{
                    flex: 1,
                  }}
                  optionData={optionChart}
                  series={seriesChart}
                />
              </CardBody>
            </Card>
          </Col>
          <Col xl={6} lg={6} xs={12}>
            <Card style={{ flex: "0 0 100%" }}>
              <CardBody className="card-body-height d-flex flex-column">
                <CardTitle className="mb-3 d-flex justify-content-between">
                  <span> Báo cáo dữ liệu về tin nhắn</span>
                  <span className="fw-lighter">
                    Tổng khách hàng:
                    <span className="fw-bold me-4"> {noAllLead} </span>
                    Tổng tin nhắn:
                    <span className="fw-bold"> {totalMessage} </span>
                  </span>
                </CardTitle>
                <IChart
                  type="pie"
                  dataChart={dataMessage}
                  style={{
                    flex: 1,
                  }}
                  optionData={optionChart}
                  series={seriesChart}
                />
              </CardBody>
            </Card>
          </Col>
          <Col xl={6} lg={6} xs={12}>
            <Card style={{ flex: "0 0 100%" }}>
              <CardBody className="card-body-height d-flex flex-column">
                <CardTitle className="mb-3 d-flex justify-content-between">
                  <span> Khách hàng tiềm năng theo nguồn</span>
                  <span className="fw-lighter">
                    Tổng nguồn:
                    <span className="fw-bold"> {totalSocical} </span>
                  </span>
                </CardTitle>
                <IChart
                  type="pie"
                  dataChart={dataSocical}
                  style={{
                    flex: 1,
                  }}
                  optionData={optionChart}
                  series={seriesChart}
                />
              </CardBody>
            </Card>
          </Col>
          <Col xl={6} lg={6} xs={12}>
            <Card style={{ flex: "0 0 100%" }}>
              <CardBody className="card-body-height d-flex flex-column">
                <CardTitle className="mb-3 d-flex justify-content-between">
                  <span> Khách hàng tiềm năng theo khu vực</span>
                  <span className="fw-lighter">
                    Tổng khu vực:
                    <span className="fw-bold"> {dataTotalLocal} </span>
                  </span>
                </CardTitle>
                <IChart
                  type="pie"
                  dataChart={dataLocal}
                  style={{
                    flex: 1,
                  }}
                  optionData={optionChart}
                  series={seriesChart}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Spacer size={50} />
    </Container>
  );
};

export default LeadReport;
