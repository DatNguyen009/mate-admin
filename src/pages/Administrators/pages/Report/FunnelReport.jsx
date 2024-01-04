import React from "react";
import FunnelChart from "components/Common/FunnelChart";
import HeaderCreateItem from "components/Common/HeaderReport";
import {
  GET_OPPORTUNITY,
  GET_SUMMARY_LEAD,
  LEAD_URL,
} from "helpers/url_helper";
import { sumBy } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
import httpService from "services/httpService";
import { Horizontal } from "pages/Administrators/styles";
import RefreshIcon from "components/Icon/RefreshIcon";
import { CommonButton } from "components/Common/ButtonCommon";
import { CommonText } from "components/Common/TextCommon";
import IDatePicker from "components/Common/DatePicker";
import styled from "styled-components";
import DownloadExcel from "components/Common/DownloadExcel";

export const sortFunnel = [
  "Tổng",
  "Mới",
  "Gọi không được",
  "Khách không nghe máy",
  "Không quan tâm",
  "Khách quan tâm",
  "Khách tiềm năng",
  "Khách đã mua/đầu tư",
];
const ContainerNoData = styled.div(props => ({
  fontSize: 18,
  display: "flex",
  alignItems: "center",
  height: props.height,
  justifyContent: "center",
  flexDirection: "column",
  [`> i`]: {
    fontSize: 32,
  },
}));

export default function FunnelReportAll() {
  const [dataCustomer, setDataCustomer] = useState({});
  const [dataOpportunity, setDataOpportunity] = useState({});
  const [dataExcel, setDataExcel] = useState({});
  const [dateFrom, setDateFrom] = useState(
    moment().month(0).startOf("month").format("YYYY-MM-DD")
  );
  const [dateTo, setDateTo] = useState(moment().format("YYYY-MM-DD"));
  const [isFilter, setIsFilter] = useState(false);

  useEffect(async () => {
    await getDataSummarizeLead(dateFrom, dateTo);
  }, [dateFrom, dateTo]);
  const handleRefresh = async () => {
    await getDataSummarizeLead();
  };
  const getDataSummarizeLead = async (startDate, endDate) => {
    try {
      let body = {
        dateFrom: startDate,
        dateTo: endDate,
      };
      if (!isFilter) {
        body = {
          dateFrom: moment().startOf("month").format("YYYY-MM-DD"),
          dateTo: moment().endOf("month").format("YYYY-MM-DD"),
        };
      }
      const res = await httpService.post(GET_SUMMARY_LEAD, body);
      const resOpportunity = await httpService.get(GET_OPPORTUNITY, {
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
      const resLead = await httpService.get(LEAD_URL);
      const dataOpportunity = resOpportunity.results;

      setDataExcel({ "Báo Cáo Phễu": dataOpportunity });

      const filterdata = dataOpportunity.reduce(
        (newValue, currentValue, index, arr) => [
          {
            objectId: "Tổng lead",
            count: resLead.results.length,
          },
          {
            objectId: "Tổng khách hàng quan tâm",
            count: arr.filter(item => item.stage === "Khách hàng quan tâm")
              .length,
          },
          {
            objectId: "Tổng cơ hội",
            count: arr.filter(item => item.stage === "Demo/ Giới thiệu").length,
          },
          {
            objectId: "Win",
            count: arr.filter(item => item.stage === "Kết thúc thành công")
              .length,
          },
        ],
        []
      );
      setDataOpportunity(filterdata);

      if (res && res.result && res.result.code === 201) {
        const data = {
          ...res.result.data,
          leadGroupByStatus: [
            {
              objectId: "Tổng",
              count: sumBy(res.result.data.leadGroupByStatus, "count"),
            },
            ...res.result.data.leadGroupByStatus,
          ],
        };
        const filterList = sortFunnel.reduce((pre, curr) => {
          data.leadGroupByStatus.forEach(element => {
            element.objectId === curr && pre?.push(element);
          });
          return pre;
        }, []);
        setDataCustomer(filterList);
      }
      const data = [...res.result.data.leadGroupByMonth];
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container fluid>
      <CardTitle>
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
                    setIsFilter(true);
                    setDateFrom(moment(date._d).format("YYYY-MM-DD"));
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
                    setIsFilter(true);
                    setDateTo(moment(date._d).format("YYYY-MM-DD"));
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
      <Row className="d-flex justify-content-center ">
        {/* <Col xl={6} lg={6} xs={12} className="d-flex ">
          <Card style={{ flex: 1 }}>
            <CardBody className="card-body-height">
              <CardTitle className="d-flex justify-content-between mb-2 mt-2">
                <span> Trạng thái theo khách hàng tiềm năng</span>
              </CardTitle>
            </CardBody>
            {!(
              dataCustomer[0]?.objectId === "Tổng" &&
              dataCustomer[0]?.count === 0
            ) && (
              <FunnelChart
                name="Trạng thái KH tiềm năng"
                dataChart={dataCustomer}
                sort="none"
                height={600}
              />
            )}
          </Card>
        </Col> */}
        <Col xs={12} className="d-flex ">
          <Card style={{ flex: 1 }}>
            <CardBody className="card-body-height ">
              <CardTitle className="d-flex justify-content-between mb-2 mt-2">
                <span> Báo cáo bán hàng dạng phễu</span>
              </CardTitle>
            </CardBody>
            {dataOpportunity.length ? (
              <FunnelChart
                name="Trạng thái cơ hội"
                dataChart={dataOpportunity}
                sort="none"
                height={600}
                maxSize="45%"
                left="15%"
              />
            ) : (
              <ContainerNoData height={600}>
                <i className="fas fa-database" />
                <span>No data</span>
              </ContainerNoData>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
