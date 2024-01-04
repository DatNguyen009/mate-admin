import RangePicker from "components/Common/RangePicker";
import SelectField from "components/form-control/Select";
import VVSTable from "components/form-control/VVSTable";
import { useRoles } from "hooks/useRoles";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

const FILTER_CONTRACT_OPTIONS = [
  { index: 1, name: "Đã Yêu Cầu", value: "unfinished" },
  { index: 2, name: "Đã hoàn thành", value: "completed" },
  { index: 3, name: "Đã huỷ", value: "canceled" },
  { index: 4, name: "Tất cả", value: "all" },
];

const FILTER_CONTRACT_OPTIONS_WITHOUTADMIN = [
  { index: 1, name: "Đã Yêu Cầu", value: "unfinished" },
];

const TRANSACTION_TYPE = {
  deposit: "deposit",
  withdraw: "withdraw",
  withdrawRef: "withdraw-referral",
  pay: "pay",
};

export default function TransactionMoney() {
  const { hash } = useLocation();
  const { register } = useForm({});
  const [filter, setFilter] = useState("");
  const { roles } = useRoles();
  const [dateFrom, setDateFrom] = useState(
    moment().startOf("year").format("YYYY-MM-DD")
  );

  const [dateTo, setDateTo] = useState(
    moment().endOf("year").format("YYYY-MM-DD")
  );

  const getFilterData = type => {
    const filterDate = {
      createdAt: {
        $gte: {
          __type: "Date",
          iso: dateFrom,
        },
        $lte: {
          __type: "Date",
          iso: dateTo,
        },
      },
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
    };
    switch (type) {
      case "unfinished":
        return {
          status: "requested",
          ...filterDate,
        };
      case "completed":
        return {
          status: "completed",
          ...filterDate,
        };
      case "canceled":
        return {
          status: "canceled",
          ...filterDate,
        };
      case "all":
        return {
          ...filterDate,
        };

      default:
        return {
          status: "requested",
          ...filterDate,
        };
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
            <h4 className="my-0 font-size-18 text-capitalize mb-2">
              Danh sách yêu cầu{" "}
              {hash?.slice(1) === TRANSACTION_TYPE.deposit
                ? "Nạp tiền"
                : hash?.slice(1) === TRANSACTION_TYPE.withdraw
                ? "Rút tiền"
                : hash?.slice(1) === TRANSACTION_TYPE.pay
                ? "Thanh toán"
                : hash?.slice(1) === TRANSACTION_TYPE.withdrawRef
                ? "Rút tiền hoa hồng"
                : ""}
            </h4>
            <Col sm={6} className="mt-4">
              <SelectField
                name="filter"
                options={
                  roles?.includes("Admin")
                    ? FILTER_CONTRACT_OPTIONS
                    : FILTER_CONTRACT_OPTIONS_WITHOUTADMIN
                }
                register={register}
                onChange={setFilter}
              />
            </Col>
            <Col xs={6} className="d-flex gap-4">
              <RangePicker
                picker="date"
                labelDateFrom="Đến tháng"
                labelDateTo="Từ tháng"
                dateFrom={dateFrom}
                dateTo={dateTo}
                onChange={date => {
                  setDateTo(date.endDate);
                  setDateFrom(date.startDate);
                }}
              />
            </Col>
          </Row>
          <VVSTable
            name="Transaction"
            disableAdd
            disableDelete
            filter={{
              field: "type",
              defaultValue: hash?.slice(1) || "",
            }}
            whereQuery={getFilterData(filter?.target?.value)}
            showExportExcel={roles?.includes("Admin")}
            pointer="Customer"
            enableConfirmWithDraw
          />
        </Container>
      </div>
    </React.Fragment>
  );
}
