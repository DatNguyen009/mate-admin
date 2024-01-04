import { Col, Row } from "antd";
import VVSTable from "components/form-control/VVSTable";
import { formatNumber } from "helpers/erp_helper";
import { useRoles } from "hooks/useRoles";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Container } from "reactstrap";
import httpService from "services/httpService";

const format = "YYYY/MM/DD";

export default function TransactionDepositCompleted() {
  const { roles } = useRoles();
  const history = useHistory();
  const [dateFrom] = useState(moment().startOf("M").format(format));
  const [dateTo] = useState(moment().format(format));
  const [depositSummary, setDepositSummary] = useState({});

  useEffect(async () => {
    const url = "/parse/functions/transaction-report";
    const { result } = await httpService.post(url, {
      dateFrom,
      dateTo,
    });

    const { depositByMonth } = result.data;
    setDepositSummary(depositByMonth[0]);
  }, [dateFrom, dateTo]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row className="gap-3 justify-content-between mb-2">
            <Col sm={12} md={6}>
              <h4
                className="my-0 font-size-18 text-capitalize"
                style={{ whiteSpace: "pre" }}
              >
                Danh sách yêu cầu nạp tiền thành công
              </h4>
            </Col>
            <Col
              sm={12}
              md={6}
              className="d-flex gap-2 align-items-center justify-content-end"
            >
              <h4 className="my-0 font-size-16 text-capitalize d-flex gap-1">
                <span style={{ whiteSpace: "pre" }}>
                  Tổng từ đầu tháng đến nay :{" "}
                </span>
              </h4>
              <span
                className="btn btn-secondary p-1"
                onClick={() => history.push("/report")}
                style={{ whiteSpace: "pre" }}
              >
                <b>
                  {" "}
                  {depositSummary ? formatNumber(depositSummary?.total) : 0} VNĐ
                </b>
              </span>
            </Col>
          </Row>
          <VVSTable
            name={`${
              roles?.includes("Accountant")
                ? "Transaction_Accountant"
                : "Transaction"
            }`}
            disableAdd
            disableDelete
            whereQuery={{
              type: "deposit",
              status: "completed",
              customer: {
                $inQuery: {
                  where: {
                    objectId: {
                      $exists: true,
                    },
                  },
                  className: "Customer",
                },
              },
            }}
            showExportExcel
            pointer="Customer"
            enableConfirmWithDraw
          />
        </Container>
      </div>
    </React.Fragment>
  );
}
