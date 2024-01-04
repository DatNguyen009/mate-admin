import React from "react";
import PropTypes from "prop-types";
import "../../../src/assets/scss/custom/components/_order.scss";
import RowOrder from "pages/Ecommerce/Order/RowOrder";
import { formatNumber } from "helpers/erp_helper";
import moment from "moment";

export default function Order(props) {
  const { orderItems, orderRef, total, inforCustomer, note } = props;
  const date = moment().format("DD");
  const month = moment().format("MM");
  const year = moment().format("YYYY");
  return (
    <React.Fragment>
      <div style={{ position: "relative", height: 792 }} ref={orderRef}>
        <div
          style={{
            position: "absolute",
            bottom: "16.5%",
            left: "54.5%",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            fontSize: 14,
          }}
        >
          <div style={{ fontWeight: 600 }}>
            {"KH: " + (inforCustomer?.fullName || "")}
          </div>
          <div style={{ fontWeight: 600 }}>
            {"SĐT: " + (inforCustomer?.phone || "")}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            width: "100%",
            height: 50,
            position: "absolute",
            top: "40%",
            left: "10%",
          }}
        >
          {orderItems?.length > 0 &&
            orderItems.map((orderItem, index) => (
              <div style={{ marginRight: "20px" }} key={orderItem.id}>
                <RowOrder orderItem={orderItem} index={index + 1} />
              </div>
            ))}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "27.5%",
            left: "77%",
            width: "100%",
            fontWeight: 600,
          }}
        >
          <span
            style={{
              color: "black",
              fontSize: 20,
            }}
          >
            {formatNumber(total)}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: "24%",
            left: "70%",
            width: "100%",
            gap: 55,
          }}
        >
          <span>{date}</span>
          <span>{month}</span>
          <span>{year}</span>
        </div>
        <div style={{ position: "absolute", left: "15%", bottom: "13%" }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>
            {note ? "Ghi chú: " + note : ""}
          </span>
        </div>
      </div>
    </React.Fragment>
  );
}

Order.propTypes = {
  orderItems: PropTypes.array,
  orderRef: PropTypes.any,
  total: PropTypes.number,
  inforCustomer: PropTypes.object,
  note: PropTypes.string,
};
