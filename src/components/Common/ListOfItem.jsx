import React, { useState, useEffect } from "react";
import { CommonText } from "components/Common/TextCommon";
import { Card, Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import BagdeStatus from "./BagdeStatus";
import httpService from "services/httpService";
import moment from "moment";
import { language_vn } from "helpers/language_vn";
import { useHistory } from "react-router-dom";
export default function ListOfItem(props) {
  const { title, modelName, orderField, limit } = props;
  const [rows, setRows] = useState([]);
  const history = useHistory();

  const renderOrder = (status, content) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return (
          <Col
            xl={4}
            lg={4}
            className="orderTitle"
            style={{ borderLeft: "3px solid #556ee6", cursor: "pointer" }}
            onClick={() => onNavigationOrderDetail(content)}
          >
            <CommonText level={7} mt={0} style={{ cursor: "pointer" }}>
              Mã đơn hàng
            </CommonText>
            <CommonText
              level={8}
              mt={0}
              color="#333333"
              style={{ cursor: "pointer" }}
            >
              {content}
            </CommonText>
          </Col>
        );
      case "pending":
        return (
          <Col
            xl={4}
            lg={4}
            className="orderTitle"
            style={{ borderLeft: "3px solid #f1b44c", cursor: "pointer" }}
            onClick={() => onNavigationOrderDetail(content)}
          >
            <CommonText level={7} mt={0}>
              Mã đơn hàng
            </CommonText>
            <CommonText level={8} mt={0} color="#333333">
              {content}
            </CommonText>
          </Col>
        );
      case "completed":
        return (
          <Col
            xl={4}
            lg={4}
            className="orderTitle"
            style={{ borderLeft: "3px solid #34c38f", cursor: "pointer" }}
            onClick={() => onNavigationOrderDetail(content)}
          >
            <CommonText level={7} mt={0} style={{ cursor: "pointer" }}>
              Mã đơn hàng
            </CommonText>
            <CommonText
              level={8}
              mt={0}
              color="#333333"
              style={{ cursor: "pointer" }}
            >
              {content}
            </CommonText>
          </Col>
        );
      case "unconfirmed":
        return (
          <Col
            xl={4}
            lg={4}
            className="orderTitle"
            style={{ borderLeft: "3px solid #f46a6a", cursor: "pointer" }}
            onClick={() => onNavigationOrderDetail(content)}
          >
            <CommonText level={7} mt={0} style={{ cursor: "pointer" }}>
              Mã đơn hàng
            </CommonText>
            <CommonText
              level={8}
              mt={0}
              color="#333333"
              style={{ cursor: "pointer" }}
            >
              {content}
            </CommonText>
          </Col>
        );
      case "canceled":
        return (
          <Col
            xl={4}
            lg={4}
            className="orderTitle"
            style={{ borderLeft: "3px solid #f46a6a" }}
            onClick={() => onNavigationOrderDetail(content)}
          >
            <CommonText level={7} mt={0} style={{ cursor: "pointer" }}>
              Mã đơn hàng
            </CommonText>
            <CommonText
              level={8}
              mt={0}
              color="#333333"
              style={{ cursor: "pointer" }}
            >
              {content}
            </CommonText>
          </Col>
        );
    }
  };

  useEffect(async () => {
    const res = await httpService.get(
      "parse/classes/" + modelName + "?order=-" + orderField + "&limit=" + limit
    );

    setRows(
      res.results?.map(element => {
        return {
          order: element.code,
          status: element.status,
          startDate: moment(element.createdAt.iso).format("DD-MM-YYYY"),
          startTime: moment(element.createdAt.iso).format("hh:mm A"),
        };
      })
    );
  }, []);

  const onNavigationOrderDetail = code => {
    history.push(`/order/${code}`);
  };

  return (
    <div className="orderCurrent">
      <Card>
        <CommonText level={10} color="#101010">
          {title}
        </CommonText>
        <div className="detailOrder">
          {rows.map((row, index) => (
            <Row key={index}>
              {renderOrder(row.status, row.order)}
              <Col
                xl={4}
                lg={4}
                className="detailTime"
                onClick={() => onNavigationOrderDetail(row?.order)}
              >
                <CommonText
                  level={7}
                  mt={0}
                  mb={0}
                  color="#333333"
                  style={{ cursor: "pointer" }}
                >
                  {row.startDate}
                </CommonText>
                <CommonText
                  level={7}
                  mt={0}
                  mb={0}
                  style={{ cursor: "pointer" }}
                >
                  {row.startTime}
                </CommonText>
              </Col>
              <Col
                xl={4}
                lg={4}
                className="status"
                style={{ cursor: "pointer" }}
              >
                <BagdeStatus
                  titleBadge={
                    row.status === language_vn.ORDER_STATUS_UNCONFIRMED
                      ? "Chờ xác nhận"
                      : row.status === language_vn.ORDER_STATUS_CONFIRMED
                      ? "Đã xác nhận"
                      : row.status === language_vn.ORDER_STATUS_PROCESSING
                      ? "Đang xử lý"
                      : row.status === language_vn.ORDER_STATUS_DELIVERING
                      ? "Đang giao"
                      : row.status === language_vn.ORDER_STATUS_COMPLETED
                      ? "Đã hoàn thành"
                      : row.status === language_vn.ORDER_STATUS_CANCELLED
                      ? "Đã hủy"
                      : row.status === language_vn.ORDER_STATUS_PENDING
                      ? "Chờ xác nhận"
                      : ""
                  }
                  typeBadge={row.status}
                />
              </Col>
            </Row>
          ))}
        </div>
      </Card>
    </div>
  );
}

ListOfItem.propTypes = {
  modelName: PropTypes.string,
  title: PropTypes.string,
  orderField: PropTypes.string,
  limit: PropTypes.number,
};
