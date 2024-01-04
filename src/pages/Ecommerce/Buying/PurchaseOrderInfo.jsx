import { CommonText } from "components/Common/TextCommon";
import InputField from "components/form-control/InputField";
import Table from "components/form-control/Table";
import { formatNumber } from "helpers/erp_helper";
import React from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Card, Col, Row } from "reactstrap";
import TextareaField from "components/form-control/Textarea";
const orderInfoHeader = [
  {
    text: "Loại vàng",
    field: "goldType",
  },
  {
    text: "Giá mua(vnđ/chỉ)",
    field: "buyingPrice",
    formatter: cell => formatNumber(Math.round(cell)),
    textAlign: "right",
  },
  {
    text: "Khối lượng(chỉ)",
    field: "weight",
    textAlign: "center",
  },
  {
    text: "Tổng",
    formatter: cell => formatNumber(Math.round(cell)),
    field: "total",
    textAlign: "right",
  },
];
export default function PurchaseOrderInfo({ info, register }) {
  const { items, customer, total } = info;
  const formProps = useForm({
    mode: "onBlur",
    defaultValues: { items },
  });
  return (
    <React.Fragment>
      <Table
        headers={orderInfoHeader}
        formProps={{
          errors: formProps.formState.errors,
          ...formProps,
        }}
        name="items"
        disableAdd
        disableDelete
        title={
          customer?.objectId ? (
            <CommonText level={1} className="mt-0 mb-2">
              {`Khách hàng: ${customer.fullName || ""}, SĐT: ${
                customer.phone || ""
              }`}
            </CommonText>
          ) : null
        }
      />
      <Row className="me-2">
        <Col xs={4}>
          <TextareaField
            name="note"
            register={register}
            label="Ghi chú"
            rows={3}
          />
        </Col>
        <Col xs={2} className="ms-auto">
          <CommonText level={1}>Tổng tiền</CommonText>
        </Col>
        <Col xs={1}>
          <div className="d-flex">
            <div className="flex-grow-1"></div>
            <CommonText level={1} className="text-danger">
              {formatNumber(total)}
            </CommonText>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
}
PurchaseOrderInfo.propTypes = {
  info: PropTypes.object,
  register: PropTypes.func,
};
