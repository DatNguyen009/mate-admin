import React, { useMemo } from "react";
import { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import moment from "moment";
import httpService from "services/httpService";
import BarChartLead from "components/Common/BarChartLead";
import StatusLeadPieChart from "components/Common/StatusLeadPieChart";
import PlatformLeadPieChart from "components/Common/PlatformLeadPieChart";
import ProvinceLeadPieChart from "components/Common/ProvinceLeadPieChart";
import Spacer from "components/Common/Spacing";
import { GET_SUMMARY_LEAD } from "helpers/url_helper";
import { provinceToRegion } from "helpers/province_helper";
import CardDetail from "components/Common/CardDetail";
import { LIST_REPORT_LEAD } from "constants/dataDashboard";
import RangePicker from "components/Common/RangePicker";

const ReportList = () => {
  const [dataCharts, setDataCharts] = useState({});
  const [totalLead, setTotalLead] = useState(0);
  const [filter, setFilter] = useState({
    dateTo: moment().endOf("month").format("YYYY-MM-DD"),
    dateFrom: moment()
      .startOf("month")
      .subtract(1, "year")
      .format("YYYY-MM-DD"),
  });
  useEffect(async () => {
    const data = await getDataSummarizeLead();
    const result = data?.reduce((acc, current) => {
      let data = current.count + acc;
      return data;
    }, 0);
    setTotalLead(result);
  }, []);

  const getDataSummarizeLead = async (startDate, endDate) => {
    try {
      const res = await httpService.post(GET_SUMMARY_LEAD, filter);
      if (res && res.result && res.result.code === 201) {
        const data = res.result.data;
        const province = {
          ...data,
          laedGroupByProvince: data.laedGroupByProvince.length
            ? data.laedGroupByProvince
                .map(item => ({
                  name: provinceToRegion(item.objectId)?.region,
                  value: item.count,
                }))
                .reduce((prev, value, index, arr) => {
                  const type = _.uniqBy(arr.map(key => key.name)).map(item => {
                    return {
                      objectId: !item ? "Không xác định" : item,
                      count: _.sumBy(
                        arr.filter(value => value.name === item),
                        "value"
                      ),
                    };
                  });
                  return type;
                })
            : [],
        };
        setDataCharts(province);
      }
      const data = [...res.result.data.leadGroupByMonth];
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  const getCount = index => {
    switch (index) {
      case 1:
        return totalLead || 0;
        break;
      case 2:
        return dataCharts.leadGroupByStatus?.length || 0;
        break;
      case 3:
        return dataCharts.laedGroupByProvince?.length || 0;
        break;
      case 4:
        return dataCharts.leadGroupByPlatform?.length || 0;
        break;
    }
  };

  const renderListReport = useMemo(
    () =>
      LIST_REPORT_LEAD.map(item => (
        <Col xl={3} key={item.id}>
          <CardDetail item={item} levelTitle={3} number={getCount(item.id)} />
        </Col>
      )),
    [filter, totalLead, dataCharts]
  );

  useEffect(async () => {
    const data = await getDataSummarizeLead();
    const result = !!data
      ? data?.reduce((acc, current) => {
          let data = current.count + acc;
          return data;
        }, 0)
      : 0;
    setTotalLead(result);
  }, [filter]);

  return (
    <React.Fragment>
      <Card body>
        <RangePicker
          picker="date"
          labelDateTo="Từ tháng"
          labelDateFrom="Đến tháng"
          onChange={date => {
            setFilter({
              dateFrom: moment(date.startDate).format("YYYY-MM-DD"),
              dateTo: moment(date.endDate).format("YYYY-MM-DD"),
            });
          }}
        />
      </Card>
      <Row>{renderListReport}</Row>
      <Row>
        <Col xl={6} lg={12} xs={12}>
          <Card>
            <CardBody className="card-body-height">
              <CardTitle className="mb-5">
                Số lượng khách hàng tiềm năng mới theo tháng
              </CardTitle>
              <BarChartLead dataCharts={dataCharts} />
            </CardBody>
          </Card>
        </Col>
        <Col xl={6} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body-height">
              <CardTitle className="mb-5">
                Khách hàng tiềm năng theo trạng thái
              </CardTitle>
              <StatusLeadPieChart dataCharts={dataCharts} />
            </CardBody>
          </Card>
        </Col>
        <Col xl={6} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body-height">
              <CardTitle className="mb-5">
                Khách hàng tiềm năng theo nguồn
              </CardTitle>
              <PlatformLeadPieChart dataCharts={dataCharts} />
            </CardBody>
          </Card>
        </Col>
        {/* <Col xl={6} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body-height">
              <CardTitle className="mb-5">
                Khách hàng tiềm năng theo khu vực
              </CardTitle>
              <ProvinceLeadPieChart dataCharts={dataCharts} />
            </CardBody>
          </Card>
        </Col> */}
      </Row>

      <Spacer size={50} />
    </React.Fragment>
  );
};

export default ReportList;
