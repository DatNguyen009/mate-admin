import React from "react";
import PropTypes from "prop-types";
import { formatNumber } from "helpers/erp_helper";

export default function RowOrder(props) {
  const { orderItem, index } = props;
  return (
    <div style={{ width: "100%", display: "flex", paddingLeft: 50 }}>
      <div style={{ width: 24, fontSize: 15 }}>{index}</div>
      <div style={{ width: 286.5, fontSize: 15 }}>
        {orderItem.barcode + " - " + orderItem.product}
      </div>
      <div style={{ width: 130, fontSize: 15, textAlign: "left" }}>
        {" "}
        {orderItem.category}
      </div>
      <div style={{ width: 95, fontSize: 15, textAlign: "center" }}>
        {" "}
        {orderItem.totalWeight}
        {" chỉ "}
      </div>
      <div
        style={{
          width: 100,
          fontSize: 15,
          textAlign: "center",
          // paddingLeft: "25px",
        }}
      >
        {" "}
        {formatNumber(Math.round(orderItem.sellingPrice))}
      </div>
      <div
        style={{
          width: 100,
          fontSize: 15,
          textAlign: "center",
          paddingLeft: "30px",
        }}
      >
        {" "}
        {formatNumber(orderItem.serviceFee)}
      </div>
      <div
        style={{
          width: 100,
          fontSize: 15,
          textAlign: "center",
          paddingLeft: "35px",
        }}
      >
        {" "}
        {formatNumber(orderItem.total)}
      </div>
    </div>
  );
}

RowOrder.propTypes = {
  orderItem: PropTypes.object,
  index: PropTypes.any,
};
