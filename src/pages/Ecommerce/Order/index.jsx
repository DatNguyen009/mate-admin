import SelectField from "components/form-control/Select";
import VVSTable from "components/form-control/VVSTable";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col } from "reactstrap";

const FILTER_ORDER_OPTIONS = [
  { index: 1, name: "Tất cả", value: "all" },
  { index: 2, name: "Đang xử lý", value: "processing" },
  { index: 3, name: "Đang giao hàng", value: "delivering" },
  { index: 4, name: "Chờ xác nhận", value: "unconfirmed" },
  { index: 5, name: "Đã xác nhận", value: "confirmed" },
  { index: 6, name: "Đã huỷ", value: "canceled" },
  { index: 7, name: "Đã hoàn thành", value: "completed" },
];

export default function Order() {
  const [filter, setFilter] = useState("");
  const { register } = useForm({});

  const getFilterData = type => {
    switch (type) {
      case "confirmed":
        return {
          status: "confirmed",
        };

      case "unconfirmed":
        return {
          status: "unconfirmed",
        };

      case "canceled":
        return {
          status: "canceled",
        };

      case "completed":
        return {
          status: "completed",
        };

      case "processing":
        return {
          status: "processing",
        };

      case "delivering":
        return {
          status: "delivering",
        };

      case "all":
        return {};

      default:
        return {};
    }
  };

  useEffect(() => {
    if (filter?.target?.value) {
      getFilterData(filter?.target?.value);
    }
  }, [filter?.target?.value]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row
            style={{
              position: "relative",
              marginBottom: "-35px",
              zIndex: 99,
              width: "max-content",
            }}
          >
            <h4 className="my-0 font-size-18 text-capitalize mb-2">Đơn Hàng</h4>
            <Col sm={12}>
              <SelectField
                name="filter"
                options={FILTER_ORDER_OPTIONS}
                register={register}
                onChange={setFilter}
              />
            </Col>
          </Row>
          <VVSTable
            name="Order"
            disableAdd
            disableDelete
            whereQuery={getFilterData(filter?.target?.value)}
          />
        </Container>
      </div>
    </React.Fragment>
  );
}
