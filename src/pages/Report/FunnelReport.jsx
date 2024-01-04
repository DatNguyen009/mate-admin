import FunnelChart from "components/Common/FunnelChart";
import HeaderCreateItem from "components/Common/HeaderReport";
import {
  GET_OPPORTUNITY,
  GET_SUMMARY_LEAD,
  LEAD_URL,
} from "helpers/url_helper";
import { sumBy } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import httpService from "services/httpService";
import { CommonButton } from "components/Common/ButtonCommon";
import IDatePicker from "components/Common/DatePicker";
import { CommonText } from "components/Common/TextCommon";

export const sortFunnel = [
  "Tổng",
  "Mới",
  "Gọi không được",
  "Không nghe máy",
  "Sai thông tin",
  "Không quan tâm",
  "Tìm hiểu",
  "Quan tâm",
  "Tiềm năng",
  "Đã mua/đầu tư",
];

export default function FunnelReport() {
  const [dataCustomer, setDataCustomer] = useState({});
  const [dataOpportunity, setDataOpportunity] = useState({});
  const [filter, setFilter] = useState({
    dateTo: moment().endOf("month").format("YYYY-MM-DD"),
    dateFrom: moment()
      .startOf("month")
      .subtract(1, "year")
      .format("YYYY-MM-DD"),
  });

  useEffect(async () => {
    await getDataSummarizeLead();
  }, [filter]);

  const getDataSummarizeLead = async (startDate, endDate) => {
    try {
      const queryUrl = {
        params: {
          where: {
            createdAt: {
              $gte: {
                __type: "Date",
                iso: filter.dateFrom,
              },
              $lte: {
                __type: "Date",
                iso: filter.dateTo,
              },
            },
          },
          count: 1,
        },
      };
      const res = await httpService.post(GET_SUMMARY_LEAD, filter);
      const resOpportunity = await httpService.get(GET_OPPORTUNITY, queryUrl);
      const resLead = await httpService.get(LEAD_URL, queryUrl);
      const dataOpportunity = resOpportunity.results;
      const filterdata = dataOpportunity.reduce(
        (newValue, currentValue, index, arr) => [
          {
            objectId: "Tổng lead",
            count: resLead.count,
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
    <div className="page-content">
      <Container fluid>
        <CommonText level={3} color="#2a3042" mb={17}>
          Báo cáo phễu
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
                  value={filter.dateFrom}
                  onChange={date => {
                    setFilter(pre => ({
                      ...pre,
                      dateFrom: moment(date)
                        .startOf("month")
                        .format("YYYY-MM-DD"),
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
                  value={filter.dateTo}
                  onChange={date => {
                    setFilter(pre => ({
                      ...pre,
                      dateTo: moment(date).endOf("month").format("YYYY-MM-DD"),
                    }));
                  }}
                />
              </div>
            </Col>
          </Row>
        </Card>
        <Row className="d-flex justify-content-center ">
          <Col xl={6} lg={6} xs={12}>
            <Card>
              <CardBody className="card-body-height">
                <CardTitle className="d-flex justify-content-between mb-2 mt-2">
                  <span> Trạng thái theo khách hàng tiềm năng</span>
                </CardTitle>
              </CardBody>
              <FunnelChart
                name="Trạng thái KH tiềm năng"
                dataChart={dataCustomer}
                sort="none"
                height={600}
              />
            </Card>
          </Col>
          <Col xl={6} lg={6} xs={12}>
            <Card>
              <CardBody className="card-body-height ">
                <CardTitle className="d-flex justify-content-between mb-2 mt-2">
                  <span> Báo cáo bán hàng dạng phễu</span>
                </CardTitle>
              </CardBody>
              <FunnelChart
                name="Trạng thái cơ hội"
                dataChart={dataOpportunity}
                sort="none"
                height={600}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
