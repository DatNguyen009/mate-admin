import VVSTable from "components/form-control/VVSTable";
import { Container } from "reactstrap";
import React, { useMemo } from "react";
import { useRoles } from "hooks/useRoles";
import { Col, Row } from "antd";
import RangePicker from "components/Common/RangePicker";
import { useState } from "react";
import moment from "moment";
import { useEffect } from "react";
import httpService from "services/httpService";
import { formatNumber } from "helpers/erp_helper";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const format = "YYYY/MM/DD";

export default function TransactionWithdrawCompleted() {
  const { roles } = useRoles();
  const history = useHistory();
  const [dateTo] = useState(moment().format(format));
  const [dateFrom] = useState(moment().startOf("M").format(format));
  const [withDrawSummary, setWithdrawSummary] = useState({});

  useEffect(async () => {
    const url = "/parse/functions/transaction-report";
    const { result } = await httpService.post(url, {
      dateFrom,
      dateTo,
    });

    const { withdrawByMonth } = result.data;
    setWithdrawSummary(withdrawByMonth[0]);
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
                Danh sách yêu cầu rút tiền thành công
              </h4>
            </Col>
            <Col
              sm={12}
              md={6}
              className="d-flex gap-1 align-items-center justify-content-end"
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
                  {withDrawSummary
                    ? formatNumber(Math.abs(withDrawSummary.total))
                    : 0}{" "}
                  VNĐ
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
              type: "withdraw",
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
