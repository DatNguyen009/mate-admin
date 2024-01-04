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
    text: "Mã vạch",
    field: "barcode",
  },
  {
    text: "Hình ảnh",
    field: "image.url",
    formatter: cell => (
      <img src={cell || ""} style={{ objectFit: "cover", width: "64px" }} />
    ),
  },
  {
    text: "Sản phẩm",
    field: "product",
  },
  {
    text: "Đơn giá",
    formatter: cell => formatNumber(Math.round(cell)),
    field: "sellingPrice",
    textAlign: "right",
  },
  {
    text: "Tiền công",
    formatter: formatNumber,
    field: "serviceFee",
    textAlign: "right",
  },
  {
    text: "Số lượng",
    field: "quantity",
    textAlign: "center",
  },
  {
    text: "Tổng",
    formatter: formatNumber,
    field: "total",
    textAlign: "right",
  },
];
const formatItem = orderInfo => {
  const items = orderInfo.items;
  items.forEach(
    item =>
      (item.product = `${item.product}. KLT:${item.totalWeight}. KLĐ:${item.stoneWeight}. KLV:${item.goldWeight}`)
  );
  return orderInfo;
};
export default function OrderInfo({ orderInfo, register }) {
  const formProps = useForm({
    mode: "onBlur",
    defaultValues: formatItem(orderInfo),
  });
  const { getValues } = formProps;
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
          getValues("customer.objectId") ? (
            <CommonText level={1} className="mt-0 mb-2">
              {`Khách hàng: ${
                getValues("customer.fullName") || ""
              }, SĐT: ${getValues("customer.phone")}`}
            </CommonText>
          ) : null
        }
      />
      <Row>
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
          <CommonText level={1}>Giảm từ voucher</CommonText>
          <CommonText level={1}>Trả thực</CommonText>
        </Col>
        <Col xs={1}>
          <div className="d-flex">
            <div className="flex-grow-1"></div>
            <CommonText level={1}>
              {formatNumber(getValues("subtotal"))}
            </CommonText>
          </div>
          <div className="d-flex">
            <div className="flex-grow-1"></div>
            <CommonText level={1}>
              {formatNumber(getValues("voucherDiscount")) || 0}
            </CommonText>
          </div>
          <div className="d-flex">
            <div className="flex-grow-1"></div>
            <CommonText level={1} className="text-danger">
              {formatNumber(getValues("total"))}
            </CommonText>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
}
OrderInfo.propTypes = {
  orderInfo: PropTypes.object,
  register: PropTypes.func,
};
