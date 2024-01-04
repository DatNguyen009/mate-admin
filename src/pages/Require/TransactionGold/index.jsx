import VVSTable from "components/form-control/VVSTable";
import React from "react";
import { useLocation } from "react-router-dom";
import { Container } from "reactstrap";
export default function TransactionGold() {
  const { hash } = useLocation();
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <VVSTable
            name="Appointment"
            disableAdd
            title={
              hash === "#receive_gold"
                ? "Hẹn nhận vàng"
                : hash === "#sell_gold"
                ? "Bán vàng"
                : "Bán vàng tích luỹ"
            }
            whereQuery={{
              type:
                hash === "#receive_gold"
                  ? "receive_gold"
                  : hash === "#sell_gold"
                  ? "sell_gold"
                  : "sell_saving_gold",
            }}
          />
        </Container>
      </div>
    </React.Fragment>
  );
}
