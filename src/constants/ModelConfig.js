import React from "react";
import * as yup from "yup";
import moment from "moment/moment";
import VVSSelectModel from "components/form-control/VVSSelectModel";
import SelectConst from "components/form-control/SelectConst";
import InputField from "components/form-control/InputField";
import { formatNumber } from "helpers/erp_helper";
import BagdeStatus from "components/Common/BagdeStatus";
import FileAttachments from "components/Common/FileAttachments";
import httpService from "services/httpService";
import CheckBox from "components/form-control/CheckBox";
import vi from "moment/locale/vi";
import { language_vn } from "helpers/language_vn";
import { KEY } from "./keyField";
import { handleCheckAction } from "helpers/check_type_log";
import { getTextByRole, roles } from "helpers/lifestyle_helper";

const MODEL_CONFIG = {
  Appointment: {
    include: ["customer", "order"],
    routingField: "objectId",
    columns: [
      {
        text: "Người yêu cầu",
        type: "model",
        field: "customer.fullName",
        modelNames: ["Customer"],
      },
      {
        text: "Số điện thoại",
        type: "string",
        field: "customer.phone",
      },
      {
        text: "Mã đơn hàng",
        type: "string",
        field: "order.code",
        modelNames: ["Order"],
      },
      {
        text: "Nhận vàng",
        type: "string",
        field: "type",
        searchOptions: "transactionGold",
        disableSearch: true,
      },
      {
        text: "Thời gian",
        type: "string",
        field: "scheduledTime",
        formatter: cell => cell && moment(cell?.iso).format("DD-MM-YYYY"),
        disableSearch: true,
      },
      {
        text: "Phản hồi yêu cầu",
        type: "string",
        field: "status",
        formatter: cell => (
          <BagdeStatus
            titleBadge={
              cell === "confirmed"
                ? language_vn.confirmed
                : cell === "unconfirmed"
                ? language_vn.unConfirmed
                : cell === "canceled"
                ? language_vn.canceled
                : cell
            }
            typeBadge={cell}
          />
        ),
        searchOptions: "transactionGoldStatusTable",
      },
    ],
  },
  Branch: {
    routingField: "objectId",
    columns: [
      {
        text: "Tên Chi nhánh",
        field: "name",
        type: "string",
      },
      {
        text: "Địa chỉ",
        field: "address.location",
        type: "string",
      },
      {
        text: "Trạng thái",
        field: "isActive",
        type: "boolean",
        formatter: cell => {
          return (
            <input
              className="form-check-input"
              type="checkbox"
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "10px",
                border: "1px solid black",
                backgroundColor: cell ? "green" : "white",
              }}
              disabled
              checked={cell}
            />
          );
        },
        disableSearch: true,
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "date",
        formatter: cell => moment(cell).format("DD-MM-YYYY, HH:mm"),
      },
    ],
  },

  KPIAssignment: {
    routingPath: "/kpi-group/objectId",
    include: ["kpi", "employee", "team"],
    columns: [
      {
        text: "Tên nhân viên",
        field: "employee.fullName",
        type: "model",
        modelNames: ["Employee"],
      },
      {
        text: "KPI",
        field: "kpi.name",
        type: "model",
      },
      {
        text: "Doanh thu",
        field: "saleTotal",
        type: "number",
        formatter: cell => <span>{formatNumber(cell) || 0} VNĐ</span>,
      },
      {
        text: "Hoa Hồng",
        field: "commission",
        type: "number",
        formatter: cell => <span>{formatNumber(cell) || 0} VNĐ</span>,
      },
      {
        text: "Thưởng KPI",
        field: "bonus",
        type: "number",
        formatter: cell => <span>{formatNumber(cell) || 0} VNĐ</span>,
      },

      {
        text: "Đội nhóm",
        field: "team.name",
        type: "model",
        modelNames: ["EmployeeGroup"],
      },
      {
        text: "Ngày bắt đầu",
        field: "from",
        type: "date",
        formatter: cell => (
          <span>{moment(cell?.iso).format("DD-MM-YYYY")}</span>
        ),
      },
      {
        text: "Ngày hết hạn",
        field: "to",
        type: "date",
        formatter: cell => (
          <span>{moment(cell?.iso).format("DD-MM-YYYY")}</span>
        ),
      },
    ],
  },

  Kpi: {
    routingPath: "/kpi/objectId",
    include: ["employeeGrade"],
    columns: [
      {
        text: "Tên KPI",
        field: "name",
        type: "string",
      },
      {
        text: "Doanh số bắt buộc",
        field: "requiredSalesFrom",
        type: "number",
        formatter: cell => {
          if (!cell) return <></>;
          const requiredSalesFrom = JSON.parse(cell);
          return <span>{formatNumber(requiredSalesFrom?.revenue)} VNĐ</span>;
        },
      },
      // {
      //   text: "Doanh số bắt buộc đến",
      //   field: "requiredSalesTo",
      //   type: "number",
      //   formatter: cell => <span>{formatNumber(cell)} VNĐ</span>,
      // },
      {
        text: "Đối tượng áp dụng",
        type: "string",
        field: "type",
        formatter: cell => (
          <span>
            {cell === "personal"
              ? "Nhân viên"
              : cell === "team"
              ? "Nhóm"
              : cell}
          </span>
        ),
        dependentField: true,
      },
      {
        text: "Trạng thái",
        field: "isActive",
        type: "boolean",
        formatter: cell => (
          <div className="form-check form-check-success">
            <input
              type="checkbox"
              className="form-check-input"
              checked={cell}
              onChange={() => {}}
            />
          </div>
        ),
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "date",
        formatter: cell => (
          <span>{moment(cell).format("DD-MM-YYYY HH:mm")}</span>
        ),
      },
    ],
  },
  KPIEmployee: {
    modelName: "KPIAssignment",
    routingPath: "/kpi-employee/objectId",
    include: ["kpi", "employee"],
    columns: [
      {
        text: "Tên nhân viên",
        field: "employee.fullName",
        type: "model",
        modelNames: ["Employee"],
      },
      {
        text: "KPI",
        field: "kpi.name",
        type: "model",
      },
      {
        text: "Doanh thu",
        field: "saleTotal",
        type: "number",
        formatter: cell => <span>{formatNumber(cell) || 0} VNĐ</span>,
      },
      {
        text: "Hoa Hồng",
        field: "commission",
        type: "number",
        formatter: cell => <span>{formatNumber(cell) || 0} VNĐ</span>,
      },
      {
        text: "Thưởng KPI",
        field: "bonus",
        type: "number",
        formatter: cell => <span>{formatNumber(cell) || 0} VNĐ</span>,
      },
      {
        text: "Trạng thái",
        field: "isActive",
        type: "boolean",
        formatter: cell => (
          <div className="form-check form-check-success">
            <input
              type="checkbox"
              className="form-check-input"
              checked={cell}
              onChange={() => {}}
            />
          </div>
        ),
      },
      {
        text: "Ngày bắt đầu",
        field: "from",
        type: "date",
        formatter: cell => (
          <span>{moment(cell?.iso).format("DD-MM-YYYY")}</span>
        ),
      },
      {
        text: "Ngày hết hạn",
        field: "to",
        type: "date",
        formatter: cell => (
          <span>{moment(cell?.iso).format("DD-MM-YYYY")}</span>
        ),
      },
    ],
  },
  KPIGroup: {
    modelName: "KPIAssignment",
    routingField: "objectId",
    include: ["kpi", "team"],
    columns: [
      {
        text: "Tên nhóm",
        field: "team.name",
        type: "model",
        modelNames: ["EmployeeGroup"],
      },
      {
        text: "KPI",
        field: "kpi.name",
        type: "model",
      },
      {
        text: "Doanh thu",
        field: "saleTotal",
        type: "number",
        formatter: cell => <span>{formatNumber(cell) || 0} VNĐ</span>,
      },
      {
        text: "Hoa Hồng",
        field: "commission",
        type: "number",
        formatter: cell => <span>{formatNumber(cell) || 0} VNĐ</span>,
      },
      {
        text: "Thưởng KPI",
        field: "bonus",
        type: "number",
        formatter: cell => <span>{formatNumber(cell) || 0} VNĐ</span>,
      },
      {
        text: "Trạng thái",
        field: "isActive",
        type: "boolean",
        formatter: cell => (
          <div className="form-check form-check-success">
            <input
              type="checkbox"
              className="form-check-input"
              checked={cell}
              onChange={() => {}}
            />
          </div>
        ),
      },
      {
        text: "Ngày bắt đầu",
        field: "from",
        type: "date",
        formatter: cell => (
          <span>{moment(cell?.iso).format("DD-MM-YYYY")}</span>
        ),
      },
      {
        text: "Ngày hết hạn",
        field: "to",
        type: "date",
        formatter: cell => (
          <span>{moment(cell?.iso).format("DD-MM-YYYY")}</span>
        ),
      },
    ],
  },

  Customer: {
    include: ["accounts", "user", "salesTeam", "salesStaff"],
    routingField: "objectId",
    columns: [
      {
        text: "Mã KH",
        field: "code",
        type: "string",
      },
      {
        text: "Họ và tên",
        field: "fullName",
        type: "string",
      },
      {
        text: "SĐT",
        field: "phone",
        type: "string",
      },
      {
        text: "Đã xác thực",
        field: "user.status",
        type: "boolean",
        formatter: cell => {
          const isVerified = cell === "verified";
          return (
            <input
              className="form-check-input"
              type="checkbox"
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "10px",
                border: "1px solid black",
                backgroundColor: isVerified ? "green" : "white",
              }}
              disabled
              checked={isVerified}
            />
          );
        },
      },
      {
        text: "Sale hỗ trợ",
        type: "model",
        field: "salesStaff.fullName",
        modelNames: ["Employee"],
      },
      {
        text: "Đội sales",
        type: "model",
        field: "salesTeam.name",
        modelNames: ["EmployeeGroup"],
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "string",
        formatter: cell => (
          <span>{moment(cell).format("DD-MM-YYYY HH:mm")}</span>
        ),
        disableSearch: true,
      },
      {
        text: "Ngày tác động gần nhất",
        field: "updatedAt",
        type: "date",
        formatter: cell => (
          <div style={{ marginLeft: "20%" }}>
            {cell ? moment(cell).format("DD-MM-YYYY hh:mm") : "-"}
          </div>
        ),
      },
    ],
  },

  Post: {
    routingField: "objectId",
    include: ["category", "createdBy"],
    columns: [
      {
        text: "Tiêu đề",
        field: "title",
        type: "string",
      },
      {
        text: "Danh mục",
        field: "category.Name",
        type: "string",
        disableSearch: true,
      },
      {
        text: "Đăng bài",
        field: "status",
        type: "string",
        formatter: cell => (
          <div className="form-check form-check-success d-flex justify-content-center p-0">
            <input
              className="form-check-input"
              type="checkbox"
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "10px",
                border: "1px solid black",
                backgroundColor: cell === "Publish" ? "green" : "white",
              }}
              disabled
              checked={cell === "Publish"}
            />
          </div>
        ),
        disableSearch: true,
      },
      {
        text: "Thông báo trên app",
        field: "sendPushNotification",
        type: "boolean",
        formatter: cell => (
          <div className="form-check form-check-success d-flex justify-content-center p-0">
            <input
              className="form-check-input"
              type="checkbox"
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "10px",
                border: "1px solid black",
                backgroundColor: cell ? "green" : "white",
              }}
              disabled
              checked={cell}
            />
          </div>
        ),
      },
      {
        text: "Hiển thị popup ở home",
        field: "showPopup",
        type: "boolean",
        formatter: cell => (
          <div className="form-check form-check-success d-flex justify-content-center p-0">
            <input
              className="form-check-input"
              type="checkbox"
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "10px",
                border: "1px solid black",
                backgroundColor: cell ? "green" : "white",
              }}
              disabled
              checked={cell}
            />
          </div>
        ),
      },
      {
        text: "Bài viết nổi bật",
        field: "isFeatured",
        type: "boolean",
        formatter: cell => (
          <div className="form-check form-check-success d-flex justify-content-center p-0">
            <input
              className="form-check-input"
              type="checkbox"
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "10px",
                border: "1px solid black",
                backgroundColor: cell ? "green" : "white",
              }}
              disabled
              checked={cell}
            />
          </div>
        ),
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "date",
        formatter: cell => moment(cell).format("DD-MM-yyyy"),
      },
    ],
  },
  Order: {
    include: ["customer"],
    routingField: ["code"],
    columns: [
      {
        text: "Mã đơn",
        field: "code",
        type: "string",
      },
      {
        text: "Tổng tiền",
        field: "total",
        type: "number",
        formatter: cell => formatNumber(cell),
        disableSearch: true,
      },
      {
        text: "Trạng thái",
        field: "status",
        type: "string",
        searchOptions: "orderStatus",
        formatter: cell => (
          <BagdeStatus
            titleBadge={
              cell === language_vn.ORDER_STATUS_UNCONFIRMED
                ? "Chờ xác nhận"
                : cell === language_vn.ORDER_STATUS_CONFIRMED
                ? "Đã xác nhận"
                : cell === language_vn.ORDER_STATUS_PROCESSING
                ? "Đang xử lý"
                : cell === language_vn.ORDER_STATUS_DELIVERING
                ? "Đang giao"
                : cell === language_vn.ORDER_STATUS_COMPLETED
                ? "Đã hoàn thành"
                : cell === language_vn.ORDER_STATUS_CANCELLED
                ? "Đã hủy"
                : cell === language_vn.ORDER_STATUS_PENDING
                ? "Chờ xác nhận"
                : ""
            }
            typeBadge={cell}
          />
        ),
      },
      {
        text: "Thanh toán qua",
        field: "paymentMethod",
        type: "string",
        searchOptions: "paymentMethod",
        formatter: cell => (
          <>
            {cell === language_vn.COD
              ? language_vn.cash
              : cell === language_vn.WALLET
              ? language_vn.from_wallet
              : cell === language_vn.BANKTRANSFER
              ? language_vn.transfer
              : cell === language_vn.SAVING && language_vn.buySaving}
          </>
        ),
      },
      {
        text: "Mua qua",
        field: "branchName",
        type: "string",
        formatter: cell => {
          if (!cell) return "App";
          return `Chi nhánh ${cell}`;
        },
      },
      {
        text: "Khách hàng",
        field: "customer.fullName",
        type: "model",
        modelNames: ["Customer"],
      },
      {
        text: "SĐT",
        field: "customer.phone",
        type: "model",
        modelNames: ["Customer"],
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "date",
        formatter: cell => moment(cell).format("DD-MM-yyyy"),
      },
    ],
  },
  CustomerAccount: {
    modelName: "Account",
    include: ["bank"],
    columns: [
      {
        text: "Mã tài khoản",
        field: "objectId",
        sort: true,
        type: "string",
      },
      {
        text: "Số tài khoản",
        field: "accountNumber",
        sort: true,
        type: "string",
      },
      {
        text: "Tên chủ thẻ",
        field: "name",
        sort: true,
        type: "string",
      },
      {
        text: "Ngân hàng",
        field: "bank.Name",
        sort: true,
        type: "model",
        modelNames: ["SysCfg"],
      },
      {
        text: "Ngày liên kết",
        field: "createdAt",
        sort: true,
        formatter: cell => (
          <span>{moment(cell).format("YYYY-MM-DD HH:mm")}</span>
        ),
      },
    ],
  },
  CustomerOrder: {
    modelName: "Order",
    routingPath: "/order/code",
    columns: [
      {
        text: "Mã đơn hàng",
        field: "code",
        type: "string",
      },
      {
        text: "Sản phẩm",
        field: "orderItems",
        formatter: cell => (
          <span>
            {_.truncate(
              cell.map(p => ` ${p.product};`),
              20
            )}
          </span>
        ),
      },
      {
        text: "Tổng giá trị",
        field: "total",
        formatter: cell => <span>{formatNumber(cell)} VND</span>,
      },
      {
        text: "Trạng thái",
        field: "status",
        type: "string",
        formatter: cell => (
          <BagdeStatus
            titleBadge={
              cell === "confirmed"
                ? language_vn.confirmed
                : cell === "unconfirmed"
                ? "Chờ xác nhận"
                : cell === "canceled"
                ? "Đã huỷ"
                : cell === "pending"
                ? "Chờ xác nhận"
                : cell === "completed"
                ? "Đã hoàn thành"
                : cell === "processing"
                ? "Đang xử lý"
                : cell === "delivering"
                ? "Đang giao hàng"
                : cell
            }
            typeBadge={cell}
          />
        ),
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "date",
        formatter: cell => (
          <span>{moment(cell).format("YYYY-MM-DD HH:mm")}</span>
        ),
        sort: true,
      },
    ],
  },
  CustomerTransaction: {
    include: ["target", "source"],
    modelName: "Transaction",
    routingPath: "/transaction/code",
    columns: [
      {
        text: "Mã GD",
        field: "code",
        type: "string",
      },
      {
        text: "Loại GD",
        field: "type",
        type: "string",
        formatter: cell => (
          <span>
            {cell === "pay"
              ? "Thanh toán"
              : cell === "deposit"
              ? "Nạp tiền"
              : cell === "interest"
              ? "Lãi"
              : cell === "withdraw"
              ? "Rút tiền"
              : cell === "refund"
              ? "Rút tiền gốc"
              : cell === "reward"
              ? "Thành viên mới"
              : cell === "withdraw-referral"
              ? "Rút tiền hoa hồng"
              : cell === "fee"
              ? "Phí"
              : cell}
          </span>
        ),
      },
      {
        text: "Số tiền",
        field: "amount",
        type: "string",
        formatter: cell => <span>{formatNumber(cell)} VND</span>,
      },
      {
        text: "Tài khoản nhận",
        field: "target.type",
        type: "string",
        formatter: cell => (
          <span>
            {" "}
            {cell === "wallet"
              ? "Ví"
              : cell === "bank"
              ? "Ngân hàng"
              : _.startCase(cell)}
          </span>
        ),
      },
      {
        text: "Nội dung",
        field: "memo",
        type: "string",
      },
      {
        text: "Trạng thái",
        field: "status",
        type: "string",
        formatter: cell => (
          <BagdeStatus
            titleBadge={
              cell === "requested"
                ? language_vn.requested
                : cell === "completed"
                ? language_vn.completed
                : cell === "canceled"
                ? language_vn.canceled
                : cell
            }
            typeBadge={cell}
          />
        ),
      },
      {
        text: "Ngày thực hiện",
        field: "createdAt",
        type: "date",
        formatter: cell => <span>{moment(cell).format("DD-MM-YYYY")}</span>,
      },
    ],
  },
  CustomerContract: {
    modelName: "Contract",
    routingPath: "/contract/code",
    columns: [
      {
        text: "Mã hợp đồng",
        field: "code",
        sort: true,
        type: "string",
      },
      {
        text: "Số kỳ",
        field: "noPeriods",
        sort: true,
        type: "string",
      },
      {
        text: "Lãi suất",
        field: "rate",
        sort: true,
        type: "string",
        formatter: cell => <span>{cell}% / năm</span>,
      },
      {
        text: "Tổng giá trị",
        field: "total",
        sort: true,
        type: "string",
        formatter: cell => <span>{formatNumber(cell)} VND</span>,
      },
      {
        text: "Trạng thái",
        field: "status",
        sort: true,
        type: "string",
        formatter: cell => (
          <BagdeStatus
            typeBadge={cell}
            titleBadge={
              cell === "effective"
                ? "Gói hoạt động"
                : cell === "completed"
                ? "Đã thanh lý"
                : cell === "early-settled"
                ? "Đã tất toán sớm"
                : cell === "pending"
                ? "Đang xử lý"
                : cell === "canceled"
                ? "Đã huỷ"
                : ""
            }
          />
        ),
      },
      {
        text: "Ngày bắt đầu",
        field: "startDate",
        sort: true,
        formatter: cell => (
          <span>{moment(cell?.iso).format("DD-MM-YYYY")}</span>
        ),
      },
      {
        text: "Ngày kết thúc",
        field: "endDate",
        sort: true,
        formatter: cell => (
          <span>{moment(cell?.iso).format("DD-MM-YYYY")}</span>
        ),
      },
    ],
  },
  OrderItem: {
    include: ["product"],
    columns: [
      {
        text: "Mã SP",
        field: "product.barcode",
        type: "string",
        modelNames: ["Product"],
        type: "model",
      },
      {
        text: "Hình ảnh",
        field: "product.image.url",
        type: "string",
        formatter: cell => (
          <img src={cell || ""} style={{ objectFit: "cover", width: "64px" }} />
        ),
      },
      {
        text: "Sản phẩm",
        field: "name",
        type: "string",
      },
      {
        text: "Tiền công",
        field: "product.serviceFee",
        type: "number",
        formatter: cell => formatNumber(cell),
        textAlign: "right",
      },
      {
        text: "Đơn giá",
        field: "sellingPrice",
        type: "number",
        formatter: cell => formatNumber(cell),
        textAlign: "right",
      },
      {
        text: "Số lượng",
        field: "quantity",
        type: "number",
        textAlign: "center",
      },
      {
        text: "Thành tiền",
        field: "total",
        type: "number",
        textAlign: "right",
        formatter: cell => formatNumber(cell),
      },
    ],
  },

  Transaction: {
    include: [
      "order",
      "target.bank",
      "target.customer",
      "customer",
      "customer.salesStaff",
      "source.bank",
    ],
    routingField: "code",
    columns: [
      {
        text: "Mã giao dịch",
        type: "string",
        field: "code",
      },
      {
        text: "Số tiền",
        type: "number",
        field: "amount",
        formatter: cell => formatNumber(Math.abs(cell)),
        disableSearch: true,
      },
      {
        text: "Loại giao dịch",
        type: "string",
        field: "type",
        searchOptions: "transactionMoney",
        disableSearch: true,
        formatter: cell => (
          <span>
            {cell === "pay"
              ? "Thanh toán"
              : cell === "deposit"
              ? "Nạp tiền"
              : cell === "interest"
              ? "Lãi"
              : cell === "withdraw"
              ? "Rút tiền"
              : cell === "refund"
              ? "Tất toán sớm"
              : cell === "withdraw-referral"
              ? "Rút tiền hoa hồng"
              : cell === "fee"
              ? "Phí"
              : cell}
          </span>
        ),
      },
      {
        text: "Trạng thái",
        type: "string",
        field: "status",
        searchOptions: "transactionStatus",
        formatter: cell => (
          <BagdeStatus
            titleBadge={
              cell === "requested"
                ? language_vn.requested
                : cell === "completed"
                ? language_vn.completed
                : cell === "canceled"
                ? language_vn.canceled
                : cell
            }
            typeBadge={cell}
          />
        ),
      },
      {
        text: "Tên khách hàng",
        type: "model",
        field: "customer.fullName",
        modelNames: ["Customer"],
      },
      {
        text: "Sale hỗ trợ",
        sort: true,
        field: "customer.salesStaff.fullName",
        type: "string",
        disableSearch: true,
      },
      {
        text: "SĐT",
        type: "model",
        field: "customer.phone",
        modelNames: ["Customer"],
      },
      {
        text: "Nội dung",
        type: "string",
        field: "memo",
        // modelNames: ["Account"],
        // formatter: (cell, row) => {
        //   return cell && cell === "wallet"
        //     ? "Ví cá nhân"
        //     : cell === "saving"
        //       ? "Ví tích luỹ"
        //       : cell === "bank"
        //         ? `${row.target?.bank?.Name ? row.target?.bank?.Name + ". " : ""}${row.target?.accountNumber
        //           ? "STK: " + row.target?.accountNumber
        //           : ""
        //         }`
        //         : "";
        // },
      },

      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "string",
        disableSearch: true,
        formatter: cell => <span>{moment(cell).format("DD/MM/YYYY")}</span>,
      },
    ],
  },
  Transaction_Accountant: {
    modelName: "Transaction",
    include: [
      "order",
      "target.bank",
      "target.customer",
      "customer",
      "customer.salesStaff",
      "source.bank",
    ],
    routingField: "code",
    columns: [
      {
        text: "Mã giao dịch",
        type: "string",
        field: "code",
      },
      {
        text: "Số tiền",
        type: "number",
        field: "amount",
        formatter: cell => formatNumber(Math.abs(cell)),
        disableSearch: true,
      },
      {
        text: "Tên khách hàng",
        type: "model",
        field: "customer.fullName",
        modelNames: ["Customer"],
      },
      {
        text: "Loại giao dịch",
        type: "string",
        field: "type",
        searchOptions: "transactionMoney",
        disableSearch: true,
        formatter: cell => (
          <span>
            {cell === "pay"
              ? "Thanh toán"
              : cell === "deposit"
              ? "Nạp tiền"
              : cell === "interest"
              ? "Lãi"
              : cell === "withdraw"
              ? "Rút tiền"
              : cell === "refund"
              ? "Tất toán sớm"
              : cell === "withdraw-referral"
              ? "Rút tiền hoa hồng"
              : cell === "fee"
              ? "Phí"
              : cell}
          </span>
        ),
      },
      {
        text: "Trạng thái",
        type: "string",
        field: "status",
        searchOptions: "transactionStatus",
        formatter: cell => (
          <BagdeStatus
            titleBadge={
              cell === "requested"
                ? language_vn.requested
                : cell === "completed"
                ? language_vn.completed
                : cell === "canceled"
                ? language_vn.canceled
                : cell
            }
            typeBadge={cell}
          />
        ),
      },
      // {
      //   text: "Địa chỉ",
      //   type: "string",
      //   field: "customer.addressLine1",
      //   formatter: cell => {
      //     const address = typeof cell === "string" && JSON?.parse(cell);
      //     return (
      //       <div>
      //         {address ? (
      //           <>
      //             <span>{address.addr} </span>
      //             <span>{address.district} </span>
      //             <span>{address.city} </span>
      //           </>
      //         ) : (
      //           "-"
      //         )}
      //       </div>
      //     );
      //   },
      // },
      {
        text: "Nội dung",
        type: "string",
        field: "memo",
      },

      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "string",
        disableSearch: true,
        formatter: cell => <span>{moment(cell).format("DD/MM/YYYY")}</span>,
      },
    ],
  },
  Department: {
    routingField: "objectId",
    include: ["leader", "branch"],
    columns: [
      {
        text: "Tên bộ phận",
        type: "string",
        field: "name",
      },
      {
        text: "Leader",
        field: "leader.fullName",
        type: "model",
        modelNames: ["Employee"],
      },
      {
        text: "Thuộc chi nhánh",
        field: "branch.name",
        type: "model",
        modelNames: ["Branch"],
      },
      {
        text: "Trạng thái",
        field: "isActive",
        type: "boolean",
        formatter: cell => (
          <div className="form-check form-check-success">
            <input
              type="checkbox"
              className="form-check-input"
              checked={cell}
              onChange={() => {}}
            />
          </div>
        ),
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "date",
        formatter: cell => (
          <span>{moment(cell).format("DD-MM-YYYY HH:mm")}</span>
        ),
      },
      {
        text: "Ngày cập nhật",
        field: "updatedAt",
        type: "date",
        formatter: cell => (
          <span>{moment(cell).format("DD-MM-YYYY HH:mm")}</span>
        ),
      },
    ],
  },

  PostCategory: {
    modelName: "SysCfg",
    columns: [
      {
        text: "Tên danh mục",
        type: "string",
        field: "Name",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
    ],
  },
  Fee: {
    modelName: "SysCfg",
    columns: [
      {
        text: "Mã",
        type: "string",
        field: "serriesCode",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
      {
        text: "Loại",
        type: "string",
        field: "type",
        searchOptions: "typeFee",
        editInlineOptions: {
          cellComponent: SelectConst,
          cellComponentProps: (formProps, rowName) => ({
            sysCfgName: "typeFee",
          }),
        },
      },
      {
        text: "Tối thiểu",
        type: "number",
        field: "valueFrom",
        formatter: cell => formatNumber(cell),
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
      {
        text: "Tối đa",
        type: "number",
        field: "valueTo",
        formatter: cell => formatNumber(cell),
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
      // {
      //   text: "Tiền phí",
      //   type: "number",
      //   field: "fee",
      //   formatter: cell => formatNumber(cell),
      //   editInlineOptions: {
      //     cellComponent: InputField,
      //     cellComponentProps: (row, watch=null) => ({}),
      //   },
      // },
      {
        text: "Trạng thái",
        type: "boolean",
        field: "isActive",
        formatter: cell => {
          return (
            <input
              className="form-check-input"
              type="checkbox"
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "10px",
                border: "1px solid black",
                backgroundColor: cell ? "green" : "white",
              }}
              disabled
              checked={cell}
            />
          );
        },
        searchOptions: "statusFee",
        editInlineOptions: {
          cellComponent: SelectConst,
          cellComponentProps: (formProps, rowName) => ({
            sysCfgName: "statusFee",
          }),
        },
      },
      {
        text: "Ngày tạo",
        type: "string",
        field: "createdAt",
        formatter: cell => moment(cell).format("DD-MM-YYYY"),
        hiddenInEditMode: true,
      },
    ],
    validationSchema: yup.object().shape({
      SysCfg: yup.array().of(
        yup.object().shape({
          serriesCode: yup.string().required("Yêu cầu nhập mã ID"),
          type: yup.string().required("Yêu cầu chọn loại"),
          valueFrom: yup.number().typeError("Yêu cầu nhập giá"),
          valueTo: yup.number().typeError("Yêu cầu nhập giá"),
          fee: yup.number().typeError("Yêu cầu phí"),
          numberOfTransaction: yup.number().typeError("Yêu cầu nhập số lần"),
        })
      ),
    }),
  },
  Product: {
    routingField: "objectId",
    include: ["category"],
    columns: [
      {
        text: "Mã sản phẩm",
        field: "productId",
        type: "string",
      },
      {
        text: "Tên sản phẩm",
        field: "name",
        type: "string",
      },
      {
        text: "Giá",
        field: "sellingPrice",
        type: "number",
        formatter: cell => <span>{formatNumber(cell)}</span>,
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
      {
        text: "Tên danh mục",
        type: "model",
        field: "category.name",
        modelNames: ["Category"],
      },
      {
        text: "Trạng thái",
        field: "status",
        type: "string",
        formatter: cell => (
          <BagdeStatus
            titleBadge={cell === "in stock" ? "Còn hàng" : cell}
            typeBadge={cell}
          />
        ),
      },
      {
        text: "Barcode",
        field: "barcode",
        type: "string",
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "date",
        formatter: cell => moment(cell).format("DD-MM-YYYY"),
      },
    ],
  },

  ProductSaving: {
    routingField: "objectId",
    include: ["category"],
    modelName: "Product",
    columns: [
      {
        text: "Mã sản phẩm",
        field: "productId",
        type: "string",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
      {
        text: "Tên sản phẩm",
        field: "name",
        type: "string",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
      {
        text: "Giá",
        field: "sellingPrice",
        type: "number",
        formatter: cell => <span>{cell && formatNumber(cell)} VND</span>,
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
      {
        text: "Tên danh mục",
        type: "model",
        field: "category.name",
        modelNames: ["Category"],
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
      {
        text: "Trạng thái",
        field: "status",
        type: "string",
        formatter: cell => (
          <BagdeStatus
            titleBadge={
              cell === "in stock"
                ? "Còn hàng"
                : cell === "out Of Stock"
                ? "Hết hàng"
                : cell
            }
            typeBadge={cell}
          />
        ),
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },

      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "date",
        formatter: cell => moment(cell).format("DD-MM-YYYY"),
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
    ],
  },
  ProductVariance: {
    columns: [
      {
        text: "Màu sắc",
        field: "color",
        type: "string",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: row => ({}),
        },
      },
      {
        text: "Kích thước",
        field: "size",
        type: "string",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: row => ({}),
        },
      },
      {
        text: "Khối lượng vàng (chỉ)",
        field: "goldWeight",
        type: "string",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({
            onFocus: async e => {
              const { setValue, getValues } = formProps;

              if (getValues(`${rowName}.goldWeight`)) return;

              const url = "/parse/classes/GoldWeight";
              const response = await httpService.get(url);
              const weightData = response.results[0];
              const updatedAt = new Date(weightData.updatedAt);
              const diffMs = Date.now() - updatedAt;
              const diffMins = Math.round(
                ((diffMs % 86400000) % 3600000) / 60000
              );
              if (diffMins < 10) {
                setValue(
                  `${rowName}.goldWeight`,
                  Number(weightData.value) * 10
                );
              }
            },
          }),
        },
      },
      {
        text: "Khối lượng đá (chỉ)",
        field: "stoneWeight",
        type: "string",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({
            onFocus: async e => {
              const { setValue, getValues } = formProps;

              if (getValues(`${rowName}.stoneWeight`)) return;

              const url = "/parse/classes/GoldWeight";
              const response = await httpService.get(url);
              const weightData = response.results[0];
              const updatedAt = new Date(weightData.updatedAt);
              const diffMs = Date.now() - updatedAt;
              const diffMins = Math.round(
                ((diffMs % 86400000) % 3600000) / 60000
              );
              if (diffMins < 10) {
                setValue(
                  `${rowName}.stoneWeight`,
                  Number(weightData.value) * 10
                );
              }
            },
          }),
        },
      },
      {
        text: "Khối lượng tổng (chỉ)",
        field: "totalWeight",
        type: "string",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({
            onFocus: async e => {
              const { setValue, getValues } = formProps;

              if (getValues(`${rowName}.totalWeight`)) return;

              const url = "/parse/classes/GoldWeight";
              const response = await httpService.get(url);
              const weightData = response.results[0];
              const updatedAt = new Date(weightData.updatedAt);
              const diffMs = Date.now() - updatedAt;
              const diffMins = Math.round(
                ((diffMs % 86400000) % 3600000) / 60000
              );
              if (diffMins < 10) {
                setValue(
                  `${rowName}.totalWeight`,
                  Number(weightData.value) * 10
                );
              }
            },
          }),
        },
      },
    ],
  },
  Category: {
    routingField: "objectId",
    columns: [
      {
        text: "Tên danh mục",
        field: "name",
        type: "string",
      },
      {
        text: "Trạng thái",
        field: "isActive",
        type: "boolean",
        formatter: cell => (
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "10px",
                border: "1px solid black",
                backgroundColor: cell ? "green" : "white",
              }}
              disabled
              checked={cell}
            />
          </div>
        ),
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "date",
        formatter: cell => moment(cell).format("DD-MM-YYYY"),
      },
    ],
  },

  VoucherCode: {
    // routingField: "objectId",
    include: ["brand"],
    columns: [
      {
        text: "Mã Voucher",
        field: "code",
        type: "string",
      },
      {
        text: "Thương hiệu",
        type: "brand",
        field: "brand.name",
        modelNames: ["Brand"],
      },
      {
        text: "Trang thái",
        field: "status",
        type: "string",
        formatter: cell => (
          <span>
            <BagdeStatus
              titleBadge={
                cell === "bought"
                  ? "Đã sử dụng"
                  : cell === "available"
                  ? "Chưa sử dụng"
                  : "-"
              }
              typeBadge={cell}
            />
          </span>
        ),
      },
      {
        text: "Giá",
        field: "price",
        type: "number",
        formatter: formatNumber,
      },
      {
        text: (
          <div
            style={{
              margin: "auto",
            }}
          >
            Ngày bắt đầu
          </div>
        ),
        field: "startDate",
        type: "date",
        formatter: cell => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            {cell ? moment(cell?.iso).format("DD/MM/YYYY") : "-"}
          </div>
        ),
      },
      {
        text: (
          <div
            style={{
              margin: "auto",
            }}
          >
            Ngày kết thúc
          </div>
        ),
        field: "endDate",
        type: "date",
        formatter: cell => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            {cell ? moment(cell?.iso).format("DD/MM/YYYY") : "-"}
          </div>
        ),
      },
    ],
  },

  Voucher: {
    routingField: "objectId",
    include: ["campaign"],
    columns: [
      {
        text: "Mã Voucher",
        field: "code",
        type: "string",
      },
      {
        text: "Tên Voucher",
        field: "name",
        type: "string",
      },
      {
        text: "Ngày bắt đầu",
        field: "startDate.iso",
        type: "date",
        formatter: cell => moment(cell).format("DD-MM-YYYY"),
      },
      {
        text: "Ngày kết thúc",
        field: "endDate.iso",
        type: "date",
        formatter: cell => moment(cell).format("DD-MM-YYYY"),
      },
      {
        text: "Chương trình",
        type: "model",
        field: "campaign.name",
        modelNames: ["Campaign"],
      },
    ],
  },

  ["import-item"]: {
    include: ["product", "productVariance"],
    modelName: "StockChangeItem",
    columns: [
      {
        text: "Sản phẩm",
        type: "model",
        field: "product.name",
        modelNames: ["Product"],
        editInlineOptions: {
          cellComponent: VVSSelectModel,
          cellComponentProps: (formProps, rowName) => ({
            model: "Product",
          }),
        },
      },
      // {
      //   text: "Biến thể",
      //   type: "model",
      //   field: "productVariance.barcode",
      //   modelNames: ["ProductVariance"],
      //   formatter: (_, rowValue) => {
      //     const productVariance = rowValue?.productVariance || null;
      //     return formatProductVariance(productVariance);
      //   },
      //   editInlineOptions: {
      //     cellComponent: VVSSelectModel,
      //     cellComponentProps: (formProps, rowName) => {
      //       const { watch } = formProps;
      //       const productId = watch(`${rowName}.product.objectId`);
      //       return {
      //         model: "ProductVariance",
      //         conditionField: {
      //           product: {
      //             __type: "Pointer",
      //             className: "Product",
      //             objectId: productId,
      //           },
      //         },
      //         customizeOptions: [CreateProductVarianceModal],
      //         customizeRender: item => (
      //           <React.Fragment>
      //             <div className="text-wrap fw-bold">
      //               {formatProductVariance(item)}
      //             </div>
      //             <div className="text-wrap">{`Barcode: ${item.barcode}`}</div>
      //           </React.Fragment>
      //         ),
      //       };
      //     },
      //   },
      // },
      {
        text: "Giá nhập",
        field: "importedPrice",
        sort: true,
        type: "number",
        formatter: formatNumber,
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => {
            return {};
          },
        },
      },
      {
        text: "Số lượng",
        sort: true,
        type: "number",
        field: "quantity",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
      // {
      //   text: "Tổng",
      //   sort: false,
      //   type: "number",
      //   field: "total",
      // },
    ],
    validationSchema: yup.object().shape({
      StockChangeItem: yup.array().of(
        yup.object().shape({
          product: yup.object().shape({
            name: yup.string().required("Trường này bắt buộc"),
          }),
          // productVariance: yup
          //   .object()
          //   .shape({})
          //   .test(
          //     "hasVariance",
          //     "Sản phẩm có biến thể",
          //     async (value, formContext) => {
          //       const { product } = formContext.parent;
          //       if (!product.objectId || value.objectId) return true;
          //       const url = "/parse/classes/ProductVariance";
          //       const params = {
          //         where: {
          //           product: {
          //             __type: "Pointer",
          //             className: "Product",
          //             objectId: product.objectId,
          //           },
          //         },
          //       };
          //       const response = await httpService.get(url, { params });
          //       if (!response.results.length) return true;
          //       return false;
          //     }
          //   ),
          quantity: yup.number().typeError("Không hợp lệ"),
          // importedPrice: yup.number().typeError("Không hợp lệ"),
        })
      ),
    }),
  },
  import: {
    modelName: "StockChangeSession",
    include: ["branch", "wareHouse", "vendor"],
    columns: [
      {
        text: "Mã phiếu",
        sort: true,
        type: "string",
        field: "code",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
      {
        field: "createdAt",
        text: "Ngày tạo",
        sort: true,
        hiddenInEditMode: true,
        formatter: cell => moment(cell).format("yyyy-MM-DD"),
      },
      {
        text: "Nhà cung cấp",
        sort: true,
        type: "model",
        field: "vendor.name",
        modelNames: ["Vendor"],
        editInlineOptions: {
          cellComponent: VVSSelectModel,
          cellComponentProps: (formProps, rowName) => ({
            model: "Vendor",
          }),
        },
      },
      {
        text: "Trạng thái",
        field: "status",
        type: "string",
        searchOptions: "StockSessionStatus",
        editInlineOptions: {
          cellComponent: SelectConst,
          cellComponentProps: (formProps, rowName) => ({
            sysCfgName: "StockSessionStatus",
          }),
        },
      },
      // {
      //   text: "Phiếu scan",
      //   field: "scanImage",
      //   type: "file",
      //   hiddenInEditMode: true,
      //   formatter: cell =>
      //     cell ? <FileAttachments attachments={[cell]} disableDelete /> : "",
      // },
    ],
    validationSchema: yup.object().shape({
      StockChangeSession: yup.array().of(
        yup.object().shape({
          code: yup.string().required(),
          status: yup.string().required(),
        })
      ),
    }),
  },
  ["stock-adjustment"]: {
    modelName: "StockChangeSession",
    include: ["wareHouse"],
    columns: [
      {
        text: "Mã phiếu",
        type: "string",
        field: "code",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
      {
        text: "Ngày tạo",
        type: "string",
        field: "createdAt",
        formatter: cell => moment(cell).format("yyyy-MM-DD"),
        hiddenInEditMode: true,
      },
      {
        text: "Trạng thái",
        field: "status",
        type: "string",
        searchOptions: "StockSessionStatus",
        editInlineOptions: {
          cellComponent: SelectConst,
          cellComponentProps: (formProps, rowName) => ({
            sysCfgName: "StockSessionStatus",
          }),
        },
      },
    ],
    validationSchema: yup.object().shape({
      StockChangeSession: yup.array().of(yup.object().shape({})),
    }),
  },
  ["stock-adjustment-item"]: {
    modelName: "StockChangeItem",
    include: ["product", "ProductVariance"],
    columns: [
      {
        text: "Sản phẩm",
        type: "model",
        field: "product.name",
        modelNames: ["Product"],
        editInlineOptions: {
          cellComponent: VVSSelectModel,
          cellComponentProps: (formProps, rowName) => ({
            model: "Product",
          }),
        },
      },
      // {
      //   text: "Biến thể",
      //   type: "model",
      //   field: "productVariance.barcode",
      //   modelNames: ["ProductVariance"],
      //   editInlineOptions: {
      //     cellComponent: VVSSelectModel,
      //     cellComponentProps: (formProps, rowName) => {
      //       const { watch } = formProps;
      //       const productId = watch(`${rowName}.product.objectId`);
      //       return {
      //         model: "ProductVariance",
      //         conditionField: {
      //           product: {
      //             __type: "Pointer",
      //             className: "Product",
      //             objectId: productId,
      //           },
      //         },
      //         customizeOptions: [CreateProductVarianceModal],
      //         customizeRender: item => (
      //           <React.Fragment>
      //             <div className="text-wrap fw-bold">
      //               {formatProductVariance(item)}
      //             </div>
      //             <div className="text-wrap">{`Barcode: ${item.barcode}`}</div>
      //           </React.Fragment>
      //         ),
      //       };
      //     },
      //   },
      // },
      {
        text: "Số lượng thay đổi",
        type: "number",
        field: "quantity",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
      {
        text: "Lí do",
        type: "string",
        field: "reason",
        searchOptions: "stockAdjustmentReason",
        editInlineOptions: {
          cellComponent: SelectConst,
          cellComponentProps: (formProps, rowName) => ({
            sysCfgName: "stockAdjustmentReason",
          }),
        },
      },
    ],
    validationSchema: yup.object().shape({
      StockChangeItem: yup.array().of(yup.object().shape({})),
    }),
  },
  ["stock-audit"]: {
    modelName: "StockAuditSession",
    include: ["wareHouse"],
    columns: [
      {
        text: "Mã phiếu",
        type: "string",
        field: "code",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
      {
        text: "Ngày tạo",
        type: "string",
        field: "createdAt",
        formatter: cell => moment(cell).format("yyyy-MM-DD"),
        hiddenInEditMode: true,
      },
      {
        text: "Trạng thái",
        field: "status",
        type: "string",
        searchOptions: "StockSessionStatus",
        editInlineOptions: {
          cellComponent: SelectConst,
          cellComponentProps: (formProps, rowName) => ({
            sysCfgName: "StockSessionStatus",
          }),
        },
      },
    ],
    validationSchema: yup.object().shape({
      StockAuditSession: yup.array().of(yup.object().shape({})),
    }),
  },
  ["stock-audit-item"]: {
    modelName: "StockAuditItem",
    include: ["product", "ProductVariance"],
    columns: [
      {
        text: "Sản phẩm",
        type: "model",
        field: "product.name",
        modelNames: ["Product"],
        editInlineOptions: {
          cellComponent: VVSSelectModel,
          cellComponentProps: (formProps, rowName) => ({
            model: "Product",
          }),
        },
      },
      // {
      //   text: "Biến thể",
      //   type: "model",
      //   field: "productVariance.barcode",
      //   modelNames: ["ProductVariance"],
      //   editInlineOptions: {
      //     cellComponent: VVSSelectModel,
      //     cellComponentProps: (formProps, rowName) => {
      //       return {
      //         model: "ProductVariance",
      //         conditionField: {
      //           product: {
      //             __type: "Pointer",
      //             className: "Product",
      //             objectId: watch(`${row}.product.objectId`),
      //           },
      //         },
      //       };
      //     },
      //   },
      // },
      {
        text: "Số lượng tồn kho",
        type: "number",
        field: "expectedQuantity",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => {
            const { setValue, getValues } = formProps;
            return {
              onChange: () =>
                setValue(
                  `${rowName}.difference`,
                  getValues(`${rowName}.expectedQuantity`) -
                    getValues(`${rowName}.actualQuantity`)
                ),
            };
          },
        },
      },
      {
        text: "Số lượng cập nhật",
        type: "number",
        field: "actualQuantity",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => {
            const { setValue, getValues } = formProps;
            return {
              onChange: () =>
                setValue(
                  `${rowName}.difference`,
                  getValues(`${rowName}.expectedQuantity`) -
                    getValues(`${rowName}.actualQuantity`)
                ),
            };
          },
        },
      },

      {
        text: "Chênh lệch",
        type: "number",
        field: "difference",
        hiddenInEditMode: true,
      },
    ],
    validationSchema: yup.object().shape({
      StockAuditItem: yup.array().of(yup.object().shape({})),
    }),
  },
  Contract: {
    include: ["customer", "interestRateRef", "customer.salesStaff"],
    routingField: "code",
    columns: [
      {
        text: "Mã HĐ",
        sort: true,
        type: "string",
        field: "code",
      },
      {
        text: "Khách hàng",
        field: "customer.fullName",
        type: "model",
        modelNames: ["Customer"],
        sort: true,
      },
      {
        text: "Gói tích luỹ",
        sort: true,
        field: "interestRateRef.name",
        modelNames: ["InterestRate"],
        type: "model",
      },
      {
        text: "Giá trị gói",
        sort: true,
        field: "total",
        type: "number",
        formatter: cell => formatNumber(cell),
        disableSearch: true,
      },
      {
        text: "Tháng đã gửi",
        sort: true,
        field: "noPaidPeriods",
        type: "number",
        disableSearch: true,
      },
      {
        text: "Sale hỗ trợ",
        sort: true,
        field: "customer.salesStaff.fullName",
        type: "string",
        disableSearch: true,
      },
      {
        text: "Tiền đã gửi",
        sort: true,
        field: "paidAmount",
        type: "number",
        formatter: cell => formatNumber(cell),
        disableSearch: true,
      },
      {
        text: "Số điện thoại",
        field: "customer.phone",
        sort: true,
        type: "string",
      },
      {
        text: "Trạng thái",
        sort: true,
        field: "status",
        type: "string",
        formatter: cell => (
          <BagdeStatus
            titleBadge={
              cell === "effective"
                ? "Đang hiêụ lực"
                : cell === "completed"
                ? "Đã thanh lý"
                : cell === "early-settled"
                ? "Đã tất toán sớm"
                : cell === "pending"
                ? "Đang xử lý"
                : cell === "canceled"
                ? "Đã huỷ"
                : ""
            }
            typeBadge={cell}
          />
        ),
        disableSearch: true,
      },

      {
        text: "Ngày bắt đầu",
        sort: true,
        field: "startDate.iso",
        formatter: cell => moment(cell).format("DD-MM-YYYY"),
        type: "date",
      },
      {
        text: "Ngày hết hạn",
        sort: true,
        field: "endDate.iso",
        formatter: cell => moment(cell).format("DD-MM-YYYY"),
        type: "date",
      },
    ],
  },
  Contract_Accountant: {
    modelName: "Contract",
    include: ["customer", "interestRateRef", "customer.salesStaff"],
    routingField: "code",
    columns: [
      {
        text: "Mã HĐ",
        sort: true,
        type: "string",
        field: "code",
      },
      {
        text: "Khách hàng",
        field: "customer.fullName",
        type: "model",
        modelNames: ["Customer"],
        sort: true,
      },
      {
        text: "Gói tích luỹ",
        sort: true,
        field: "interestRateRef.name",
        modelNames: ["InterestRate"],
        type: "model",
      },
      {
        text: "Giá trị gói",
        sort: true,
        field: "total",
        type: "number",
        formatter: cell => formatNumber(cell),
        disableSearch: true,
      },
      {
        text: "Tháng đã gửi",
        sort: true,
        field: "noPaidPeriods",
        type: "number",
        disableSearch: true,
      },
      {
        text: "Sale hỗ trợ",
        sort: true,
        field: "customer.salesStaff.fullName",
        type: "string",
        disableSearch: true,
      },
      {
        text: "Tiền đã gửi",
        sort: true,
        field: "paidAmount",
        type: "number",
        formatter: cell => formatNumber(cell),
        disableSearch: true,
      },
      {
        text: "Trạng thái",
        sort: true,
        field: "status",
        type: "string",
        formatter: cell => (
          <BagdeStatus
            titleBadge={
              cell === "effective"
                ? "Đang hiêụ lực"
                : cell === "completed"
                ? "Đã thanh lý"
                : cell === "early-settled"
                ? "Đã tất toán sớm"
                : cell === "pending"
                ? "Đang xử lý"
                : cell === "canceled"
                ? "Đã huỷ"
                : ""
            }
            typeBadge={cell}
          />
        ),
        disableSearch: true,
      },

      {
        text: "Ngày bắt đầu",
        sort: true,
        field: "startDate.iso",
        formatter: cell => moment(cell).format("DD-MM-YYYY"),
        type: "date",
      },
      {
        text: "Ngày hết hạn",
        sort: true,
        field: "endDate.iso",
        formatter: cell => moment(cell).format("DD-MM-YYYY"),
        type: "date",
      },
    ],
  },
  ContractPeriod: {
    include: ["transaction", "transaction.target", "transaction.source"],
    columns: [
      {
        text: "Mã GD",
        sort: true,
        type: "model",
        field: "transaction.code",
        modelNames: ["Transaction"],
      },
      {
        text: "Số tiền",
        sort: true,
        type: "model",
        field: "transaction.amount",
        modelNames: ["Transaction"],
        formatter: cell => Math.abs(cell) || 0,
      },
      {
        text: "Số kỳ",
        sort: true,
        type: "number",
        field: "period",
      },
      {
        text: "Phương thức",
        sort: true,
        type: "model",
        field: "transaction.type",
        modelNames: ["Transaction"],
        formatter: cell => (
          <span>
            {cell === "pay"
              ? "Thanh toán"
              : cell === "deposit"
              ? "Nạp tiền"
              : cell === "interest"
              ? "Lãi"
              : cell === "withdraw"
              ? "Rút tiền"
              : cell === "refund"
              ? "Rút tiền gốc"
              : cell === "reward"
              ? "Thành viên mới"
              : cell}
          </span>
        ),
      },
      {
        text: "Trạng thái",
        sort: true,
        type: "model",
        field: "transaction.status",
        modelNames: ["Transaction"],
        formatter: cell => (
          <span>
            {cell === "requested"
              ? language_vn.requested
              : cell === "completed"
              ? language_vn.completed
              : cell === "canceled"
              ? language_vn.canceled
              : cell}
          </span>
        ),
      },
      {
        text: "Tài khoản nguồn",
        sort: true,
        type: "model",
        field: "transaction.source.name",
        modelNames: ["Transaction", "Account"],
      },
      {
        text: "Tài khoản đích",
        sort: true,
        type: "model",
        field: "transaction.target.name",
        modelNames: ["Transaction", "Account"],
      },
      {
        text: "Ngày giao dịch",
        sort: true,
        type: "date",
        field: "transaction.createdAt",
        modelNames: ["Transaction"],
        formatter: cell => moment(cell).format("yyyy-MM-DD"),
      },
    ],
  },
  export: {
    modelName: "StockChangeSession",
    include: ["wareHouse"],
    columns: [
      {
        text: "Mã phiếu",
        field: "code",
        type: "string",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "string",
        formatter: cell => moment(cell).format("yyyy-MM-DD"),
        hiddenInEditMode: true,
      },
      {
        text: "Trạng thái",
        field: "status",
        type: "string",
        searchOptions: "StockSessionStatus",
        editInlineOptions: {
          cellComponent: SelectConst,
          cellComponentProps: (formProps, rowName) => ({
            sysCfgName: "StockSessionStatus",
          }),
        },
      },
    ],
    validationSchema: yup.object().shape({
      StockChangeSession: yup.array().of(
        yup.object().shape({
          code: yup.string().required("Trường này bắt buộc"),
          status: yup.string().required("Trường này bắt buộc"),
        })
      ),
    }),
  },
  [`export-item`]: {
    modelName: "StockChangeItem",
    include: ["product", "productVariance"],
    columns: [
      {
        text: "Sản phẩm",
        type: "model",
        field: "product.name",
        modelNames: ["Product"],
        editInlineOptions: {
          cellComponent: VVSSelectModel,
          cellComponentProps: (formProps, rowName) => ({
            model: "Product",
          }),
        },
      },
      // {
      //   text: "Biến thể",
      //   type: "model",
      //   field: "productVariance.barcode",
      //   modelNames: ["ProductVariance"],
      //   editInlineOptions: {
      //     cellComponent: VVSSelectModel,
      //     cellComponentProps: (formProps, rowName) => {
      //       const { watch } = formProps;
      //       const productId = watch(`${rowName}.product.objectId`);
      //       return {
      //         model: "ProductVariance",
      //         conditionField: {
      //           product: {
      //             __type: "Pointer",
      //             className: "Product",
      //             objectId: productId,
      //           },
      //         },
      //         customizeOptions: [CreateProductVarianceModal],
      //         customizeRender: item => (
      //           <React.Fragment>
      //             <div className="text-wrap fw-bold">
      //               {formatProductVariance(item)}
      //             </div>
      //             <div className="text-wrap">{`Barcode: ${item.barcode}`}</div>
      //           </React.Fragment>
      //         ),
      //       };
      //     },
      //   },
      // },
      {
        text: "Số lượng",
        field: "quantity",
        type: "number",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
    ],
    validationSchema: yup.object().shape({
      StockChangeItem: yup.array().of(yup.object().shape({})),
    }),
  },
  ["stock-transfer"]: {
    modelName: "StockChangeSession",
    include: ["wareHouse"],
    columns: [
      {
        text: "Mã phiếu",
        field: "code",
        type: "string",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "string",
        formatter: cell => moment(cell).format("yyyy-MM-DD"),
        hiddenInEditMode: true,
      },
      {
        text: "Trạng thái",
        field: "status",
        type: "string",
        searchOptions: "StockSessionStatus",
        editInlineOptions: {
          cellComponent: SelectConst,
          cellComponentProps: (formProps, rowName) => ({
            sysCfgName: "StockSessionStatus",
          }),
        },
      },
    ],
    validationSchema: yup.object().shape({
      StockChangeSession: yup.array().of(
        yup.object().shape({
          code: yup.string().required("Trường này bắt buộc"),
          status: yup.string().required("Trường này bắt buộc"),
        })
      ),
    }),
  },
  [`stock-transfer-item`]: {
    modelName: "StockChangeItem",
    include: ["product", "productVariance"],
    columns: [
      {
        text: "Sản phẩm",
        type: "model",
        field: "product.name",
        modelNames: ["Product"],
        editInlineOptions: {
          cellComponent: VVSSelectModel,
          cellComponentProps: (formProps, rowName) => ({
            model: "Product",
          }),
        },
      },
      // {
      //   text: "Biến thể",
      //   type: "model",
      //   field: "productVariance.barcode",
      //   modelNames: ["ProductVariance"],
      //   editInlineOptions: {
      //     cellComponent: VVSSelectModel,
      //     cellComponentProps: (formProps, rowName) => {
      //       const { watch } = formProps;
      //       const productId = watch(`${rowName}.product.objectId`);
      //       return {
      //         model: "ProductVariance",
      //         conditionField: {
      //           product: {
      //             __type: "Pointer",
      //             className: "Product",
      //             objectId: productId,
      //           },
      //         },

      //         customizeOptions: [CreateProductVarianceModal],
      //         customizeRender: item => (
      //           <React.Fragment>
      //             <div className="text-wrap fw-bold">
      //               {formatProductVariance(item)}
      //             </div>
      //             <div className="text-wrap">{`Barcode: ${item.barcode}`}</div>
      //           </React.Fragment>
      //         ),
      //       };
      //     },
      //   },
      // },
      {
        text: "Số lượng",
        field: "quantity",
        type: "number",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
    ],
    validationSchema: yup.object().shape({
      StockChangeItem: yup.array().of(yup.object().shape({})),
    }),
  },
  [`stock-report`]: {
    modelName: "StockReport",
    include: ["product", "productVariance"],
    columns: [
      {
        text: "Barcode",
        type: "model",
        field: "product.barcode",
        modelNames: ["Product"],
      },
      {
        text: "Sản phẩm",
        type: "model",
        field: "product.name",
        modelNames: ["Product"],
      },
      // {
      //   text: "Biến thể",
      //   type: "model",
      //   field: "productVariance.barcode",
      //   modelNames: ["ProductVariance"],
      // },
      {
        text: "Số lượng",
        field: "quantity",
        type: "number",
      },
    ],
    validationSchema: yup.object().shape({
      StockChangeItem: yup.array().of(yup.object().shape({})),
    }),
  },
  InterestRate: {
    columns: [
      {
        text: "Lãi suất(%)",
        field: "rate",
        textAlign: "center",
        type: "number",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
      {
        text: "Kỳ hạn",
        field: "noPeriods",
        type: "number",
        formatter: cell => (cell ? cell + " tháng" : ""),
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
    ],
    validationSchema: yup.object().shape({
      InterestRate: yup.array().of(
        yup.object().shape({
          valueFrom: yup.number().typeError("Yêu cầu nhập số"),
          valueTo: yup.string().required("Yêu cầu nhập số"),
          rate: yup.number().typeError("Yêu cầu nhập số"),
          noPeriods: yup.number().typeError("Yêu cầu nhập số"),
          isActive: yup.boolean().typeError("Yêu cầu tình trạng"),
          updatedAt: yup.date().typeError("Yêu cầu chọn ngày"),
        })
      ),
    }),
  },
  TransactionAttachment: {
    include: ["createdBy"],
    columns: [
      {
        text: "Ngày cập nhật",
        field: "updatedAt",
        type: "date",
        formatter: cell => moment(cell).format("DD-MM-yyyy"),
      },
      {
        text: "Người tạo",
        field: "createdBy.username",
        modelNames: ["_User"],
        type: "model",
      },
      {
        text: "File đính kèm",
        field: "attachments",
        type: "array",
        formatter: cell => <FileAttachments attachments={cell} disableDelete />,
      },
      {
        text: "Ghi chú",
        field: "note",
        type: "string",
      },
    ],
  },
  AppointmentAttachment: {
    include: ["createdBy"],
    columns: [
      {
        text: "Ngày cập nhật",
        field: "updatedAt",
        type: "date",
        formatter: cell => moment(cell).format("DD-MM-yyyy"),
      },
      {
        text: "Người tạo",
        field: "createdBy.username",
        modelNames: ["_User"],
        type: "model",
      },
      {
        text: "File đính kèm",
        field: "attachments",
        type: "array",
        formatter: cell => <FileAttachments attachments={cell} disableDelete />,
      },
      {
        text: "Ghi chú",
        field: "note",
        type: "string",
      },
    ],
  },
  ContractAttachment: {
    include: ["createdBy"],
    columns: [
      {
        text: "Ngày cập nhật",
        field: "updatedAt",
        type: "date",
        formatter: cell => moment(cell).format("DD-MM-yyyy"),
      },
      {
        text: "Người tạo",
        field: "createdBy.username",
        modelNames: ["_User"],
        type: "model",
      },
      {
        text: "File đính kèm",
        field: "attachments",
        type: "array",
        formatter: cell => <FileAttachments attachments={cell} disableDelete />,
      },
      {
        text: "Ghi chú",
        field: "note",
        type: "string",
      },
    ],
  },
  Promotion: {
    include: [],
    routingField: "series",
    columns: [
      {
        text: "Mã giảm giá",
        field: "series",
        type: "string",
      },
      {
        text: "Tên",
        field: "name",
        type: "string",
      },
      {
        text: "Loại giảm giá",
        field: "type",
        type: "string",
        searchOptions: "promotionType",
      },
      {
        text: "Trạng thái",
        field: "isActive",
        type: "boolean",
        searchOptions: "promotionStatus",
        formatter: cell => {
          return (
            <input
              className="form-check-input"
              type="checkbox"
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "10px",
                border: "1px solid black",
                backgroundColor: cell ? "green" : "white",
              }}
              disabled
              checked={cell}
            />
          );
        },
        disableSearch: true,
      },
      {
        text: "Giảm theo %",
        field: "percent",
        type: "number",
        formatter: cell => (cell ? cell + "%" : "0%"),
      },
      {
        text: "Giảm cố định",
        field: "fixed",
        type: "number",
        formatter: cell => (cell ? formatNumber(Number(cell)) : 0),
      },
      {
        text: "Ngày bắt đầu",
        field: "startDate.iso",
        type: "date",
        formatter: cell => moment(cell).format("YYYY-MM-DD"),
      },
      {
        text: "Ngày kết thúc",
        field: "endDate.iso",
        type: "date",
        formatter: cell => moment(cell).format("YYYY-MM-DD"),
      },
    ],
  },
  _User: {
    routingField: "objectId",
    modelName: "UserInfo",
    include: ["superiorId", "user"],
    columns: [
      {
        text: "Tên",
        field: "fullName",
        sort: true,
        type: "string",
      },
      {
        text: "Tên đăng nhập",
        field: "user.username",
        type: "model",
        modelNames: ["_User"],
      },
      {
        text: "Email",
        field: "email",
        sort: true,
        type: "string",
      },
      {
        text: "Số điện thoại",
        field: "phoneNumber",
        sort: true,
        type: "string",
      },
      {
        text: "Vai trò",
        field: "role",
        sort: true,
        type: "string",
        formatter: (cell, row) => (
          <span>{getTextByRole(cell, row?.userType).title}</span>
        ),
        searchOptions: "roles",
      },
      {
        text: "Trạng thái",
        type: "boolean",
        field: "isActive",
        formatter: cell => {
          return (
            <input
              className="form-check-input"
              type="checkbox"
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "10px",
                border: "1px solid black",
                backgroundColor: cell === undefined || cell ? "green" : "white",
              }}
              disabled
              checked={cell === undefined || cell ? true : false}
            />
          );
        },
      },
      {
        text: "Cấp trên",
        field: "superiorId",
        type: "model",
        disableSearch: true,
        formatter: (cell, row) => {
          return <span>{row?.role === roles.USER ? "" : cell?.fullName}</span>;
        },
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "string",
        formatter: cell => <span>{moment(cell).format("DD-MM-YYYY")}</span>,
        disableSearch: true,
      },
    ],
  },
  Lead: {
    routingPath: "/lead/objectId",
    include: ["salesStaff", "salesTeam"],
    columns: [
      {
        text: "Họ tên",
        field: "name",
        type: "string",
      },
      {
        text: "SĐT",
        field: "phone",
        type: "string",
      },
      {
        text: "Email",
        field: "email",
        type: "string",
      },
      {
        text: "Nguồn",
        field: "source",
        type: "string",
        formatter: cell => <span>{_.capitalize(cell)}</span>,
      },
      {
        text: "Sale hỗ trợ",
        type: "model",
        field: "salesStaff.fullName",
        modelNames: ["Employee"],
      },
      {
        text: "Đội sales",
        type: "model",
        field: "salesTeam.name",
        modelNames: ["EmployeeGroup"],
      },
      {
        text: "Trạng thái",
        field: "status",
        type: "string",
        searchOptions: "leadStatus",
        formatter: cell => (
          <BagdeStatus
            titleBadge={
              cell === "Mới"
                ? "Mới"
                : cell === "Mở"
                ? "Mở"
                : cell === "Đã trả lời"
                ? "Đã trả lời"
                : cell === "Cơ hội"
                ? "Cơ hội"
                : cell === "Đã báo giá"
                ? "Đã báo giá"
                : cell === "Báo giá bị mất"
                ? "Báo giá bị mất"
                : cell === "Quan tâm"
                ? "Quan tâm"
                : cell === "Đã chuyển đổi"
                ? "Đã chuyển đổi"
                : cell === "Không nên liên hệ"
                ? "Không nên liên hệ"
                : cell
            }
            typeBadge={cell}
          />
        ),
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "date",
        formatter: cell => (
          <span>{moment(cell).format("DD-MM-YYYY HH:mm")}</span>
        ),
      },
      {
        text: "Ngày tác động gần nhất",
        field: "updatedAt",
        type: "date",
        formatter: cell => (
          <div style={{ marginLeft: "20%" }}>
            {cell ? moment(cell).format("DD-MM-YYYY hh:mm") : "-"}
          </div>
        ),
      },
    ],
  },

  Employee: {
    routingField: "objectId",
    include: ["department", "branch"],
    columns: [
      {
        text: "Mã nhân viên",
        field: "employeeId",
        type: "string",
        sort: true,
      },
      {
        text: "Họ tên",
        field: "fullName",
        type: "string",
        sort: true,
      },
      {
        text: "Email",
        field: "email",
        type: "string",
        sort: true,
      },
      {
        text: "Phòng ban",
        field: "department.Name",
        type: "model",
        modelNames: ["Department"],
        sort: true,
      },
      {
        text: "Chi nhánh",
        field: "branch.name",
        type: "model",
        modelNames: ["Branch"],
        sort: true,
      },
      {
        text: "Trạng thái",
        field: "isActive",
        sort: true,
        formatter: cell => {
          return (
            <input
              className="form-check-input"
              type="checkbox"
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "10px",
                border: "1px solid black",
                backgroundColor: cell ? "green" : "white",
              }}
              disabled
              checked={cell}
            />
          );
        },
      },
    ],
  },
  User: {
    modelName: "_User",
    columns: [
      {
        text: "User name",
        field: "username",
        type: "string",
      },
      {
        text: "phone",
        field: "phone",
        type: "string",
      },
      {
        text: "isActive",
        field: "isActive",
        type: "boolean",
        formatter: cell => (
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "10px",
                border: "1px solid black",
                backgroundColor: cell ? "green" : "white",
              }}
              disabled
              checked={cell}
            />
          </div>
        ),
      },
    ],
  },
  Question: {
    routingField: "objectId",
    columns: [
      {
        text: "Nội dung",
        field: "content",
        type: "string",
      },
      {
        text: "A",
        field: "A",
        type: "string",
        hiddenInNormalMode: true,
        hiddenInEditMode: true,
      },
      {
        text: "B",
        field: "B",
        type: "string",
        hiddenInNormalMode: true,
        hiddenInEditMode: true,
      },
      {
        text: "C",
        field: "C",
        type: "string",
        hiddenInNormalMode: true,
        hiddenInEditMode: true,
      },
      {
        text: "D",
        field: "D",
        type: "string",
        hiddenInNormalMode: true,
        hiddenInEditMode: true,
      },
      {
        text: "Câu trả lời",
        field: "correctAnswer",
        type: "string",
        formatter: (cell, row) => {
          return <span>{`${row[cell]}`}</span>;
        },
      },
    ],
  },
  EmployeeUser: {
    modelName: "_User",
    columns: [
      {
        text: "Tên tài khoản",
        field: "fullName",
        type: "string",
      },
      {
        text: "Email",
        field: "email",
        type: "string",
      },
      {
        text: "Role",
        field: "roles",
        type: "string",
        formatter: cell => <span>Staff</span>,
      },
      {
        text: "Status",
        field: "isActive",
        type: "string",
        formatter: cell => (
          <BagdeStatus
            typeBadge={cell ? "Active" : "Inactive"}
            titleBadge={cell ? "Active" : "Inactive"}
          />
        ),
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "string",
        formatter: cell => (
          <span>{moment(cell).format("DD-MM-YYYY HH:mm")}</span>
        ),
      },
    ],
  },
  WareHouse: {
    routingField: "objectId",
    include: ["branch"],
    columns: [
      {
        text: "Tên nhà kho",
        field: "name",
        type: "string",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
      {
        text: "Chi nhánh",
        field: "branch.name",
        type: "model",
        modelNames: ["Branch"],
        editInlineOptions: {
          cellComponent: VVSSelectModel,
          cellComponentProps: (formProps, rowName) => ({
            model: "Branch",
          }),
        },
      },
      {
        text: "Mặc định cho chi nhánh",
        field: "isBranchDefault",
        type: "boolean",
        formatter: cell => (
          <input
            className="form-check-input"
            type="checkbox"
            style={{
              width: "15px",
              height: "15px",
              borderRadius: "10px",
              border: "1px solid black",
              backgroundColor: cell ? "green" : "white",
            }}
            disabled
            checked={cell}
          />
        ),
        editInlineOptions: {
          cellComponent: CheckBox,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
      {
        text: "Địa chỉ",
        field: "address",
        type: "string",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
    ],
  },
  Template: {
    routingField: "objectId",
    columns: [
      {
        text: "Tiêu để mẫu",
        field: "title",
        type: "string",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
      {
        text: "Model",
        field: "model",
        type: "string",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
      {
        text: "Name",
        field: "name",
        type: "string",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
      {
        text: "Created At",
        field: "createdAt",
        type: "date",
        formatter: cell => <span>{moment(cell).format("DD-MM-YYYY")}</span>,
      },
    ],
  },
  Brand: {
    columns: [
      {
        text: "Tên thương hiệu",
        field: "name",
        type: "string",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
      {
        text: "Mã thương hiệu",
        field: "objectId",
        type: "string",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({
            disabled: true,
          }),
        },
      },
    ],
  },
  Vendor: {
    columns: [
      {
        text: "Nhà cung cấp",
        field: "name",
        type: "string",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
      {
        text: "Địa chỉ",
        field: "address",
        type: "string",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
      {
        text: "Số điện thoại",
        field: "phone",
        type: "string",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
    ],
  },
  PurchaseOrder: {
    include: ["customer", "branch"],
    routingField: "code",
    columns: [
      {
        text: "Mã đơn",
        field: "code",
        type: "string",
      },
      {
        text: "Khách hàng",
        field: "customer.fullName",
        type: "model",
        modelNames: ["Customer"],
      },
      {
        text: "Chi nhánh",
        field: "branch.name",
        type: "model",
        modelNames: ["Branch"],
      },
      {
        text: "Phương thức",
        field: "paymentMethod",
        type: "string",
        textAlign: "left",
      },
      {
        text: "Tổng tiền",
        field: "total",
        type: "number",
        formatter: cell => formatNumber(Math.round(cell)),
        textAlign: "right",
      },
    ],
  },
  PurchaseOrderItem: {
    columns: [
      {
        text: "Loại vàng",
        field: "goldType",
        type: "string",
      },
      {
        text: "Khối lượng(chỉ)",
        field: "weight",
        type: "number",
        textAlign: "center",
      },
      // {
      //   text: "Giá mua",
      //   field: "buyingPrice",
      //   type: "number",
      // },
      {
        text: "Tổng tiền",
        field: "total",
        type: "number",
        formatter: cell => formatNumber(Math.round(cell)),
        textAlign: "right",
      },
    ],
  },
  // HistoryCallLog: {
  //   modelName: "CallLog",
  //   include: ["customer"],
  //   columns: [
  //     {
  //       text: "Thời gian gọi",
  //       field: "createdAt",
  //       type: "date",
  //       formatter: cell => (
  //         <span>
  //           {moment(cell || "")
  //             .locale("vi", vi)
  //             .format("DD-MM-YYYY hh:mm A")}
  //         </span>
  //       ),
  //     },
  //     {
  //       text: "Tên khách hàng",
  //       field: "customerName",
  //       type: "string",
  //     },
  //     {
  //       text: "SĐT khách hàng",
  //       field: "phone",
  //       type: "string",
  //     },
  //     {
  //       text: "Thời lượng cuộc gọi",
  //       field: "duration",
  //       type: "number",
  //       formatter: cell => <span>{cell} giây</span>,
  //     },
  //     {
  //       text: "Loại",
  //       field: "direction",
  //       type: "string",
  //       formatter: cell => (
  //         <BagdeStatus
  //           titleBadge={
  //             cell === "Inbound"
  //               ? "Gọi đến"
  //               : cell === "Outbound"
  //               ? "Gọi đi"
  //               : ""
  //           }
  //           typeBadge={cell}
  //         />
  //       ),
  //     },
  //     {
  //       text: "Ext",
  //       field: "ext",
  //       type: "string",
  //     },
  //     {
  //       text: "File ghi âm",
  //       field: "recordedFileUrl",
  //       type: "string",
  //       formatter: cell => <a href={cell}>Tải file</a>,
  //     },
  //   ],
  // },

  CustomerGroup: {
    include: ["accounts", "user"],
    routingField: "objectId",
    columns: [
      {
        text: "Tên nhóm",
        field: "name",
        type: "string",
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "string",
        formatter: cell => (
          <span>{moment(cell).format("DD-MM-YYYY HH:mm")}</span>
        ),
        disableSearch: true,
      },
    ],
  },

  CustomerGroupMembers: {
    routingPath: "/customer/objectId",
    include: ["user"],
    modelName: "Customer",
    columns: [
      {
        text: "Mã KH",
        field: "code",
        type: "string",
        editInlineOptions: {
          cellComponent: VVSSelectModel,
          cellComponentProps: (formProps, rowName) => ({
            model: "Customer",
            configName: "CustomerMember",
            includeField: ["user"],
            onSelect: value => {
              if (!value) return;
              const { setValue } = formProps;
              setValue(`${rowName}.fullName`, value.fullName);
              setValue(`${rowName}.email`, value.email);
              setValue(`${rowName}.phone`, value.phone);
              setValue(`${rowName}.isActive`, value.isActive);
            },
          }),
        },
      },
      {
        text: "Họ và tên",
        field: "fullName",
        type: "string",
        dependentField: true,
      },
      {
        text: "SĐT",
        field: "phone",
        type: "string",
        dependentField: true,
      },
      {
        text: "Email",
        field: "email",
        type: "string",
        dependentField: true,
      },
    ],
  },
  Investment: {
    modelName: "Customer",
    include: ["accounts", "user"],
    routingField: "objectId",
    columns: [
      {
        text: "Mã KH",
        field: "code",
        type: "string",
      },
      {
        text: "Họ và tên",
        field: "fullName",
        type: "string",
      },
      {
        text: "SĐT",
        field: "phone",
        type: "string",
      },
      {
        text: "Xác thực",
        field: "user.status",
        type: "boolean",
        formatter: cell => {
          const isVerified = cell === "verifying" || cell === "verified";
          return (
            <input
              className="form-check-input"
              type="checkbox"
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "10px",
                border: "1px solid black",
                backgroundColor: isVerified ? "green" : "white",
              }}
              disabled
              checked={isVerified}
            />
          );
        },
      },
      {
        text: "Tổng tiền tích luỹ",
        field: "totalInvestment",
        type: "string",
        formatter: cell => formatNumber(cell),
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "string",
        formatter: cell => (
          <span>{moment(cell).format("DD-MM-YYYY HH:mm")}</span>
        ),
        disableSearch: true,
      },
    ],
  },

  DepartmentMembers: {
    routingPath: "/employee/objectId",
    include: ["group"],
    modelName: "Employee",
    columns: [
      {
        text: "Mã NV",
        field: "employeeId",
        type: "string",
        editInlineOptions: {
          cellComponent: VVSSelectModel,
          cellComponentProps: (formProps, rowName) => ({
            model: "Employee",
            includeField: ["group"],
            conditionField: {
              position: "employee",
            },
            onSelect: value => {
              if (!value) return;
              const { setValue } = formProps;
              setValue(`${rowName}.fullName`, value.fullName);
              setValue(`${rowName}.position`, value.position);
              setValue(`${rowName}.group`, value.group);
              setValue(`${rowName}.phone`, value.phone);
              setValue(`${rowName}.email`, value.email);
              setValue(`${rowName}.isActive`, value.isActive);
            },
          }),
        },
      },
      {
        text: "Họ và tên",
        field: "fullName",
        type: "string",
        dependentField: true,
      },
      {
        text: "Vị trí",
        field: "position",
        type: "string",
        dependentField: true,
      },
      {
        text: "Đội nhóm",
        type: "model",
        field: "group.name",
        modelNames: ["EmployeeGroup"],
        dependentField: true,
      },
      {
        text: "SĐT",
        field: "phone",
        type: "string",
        dependentField: true,
      },
      {
        text: "Email",
        field: "email",
        type: "string",
        dependentField: true,
      },
      {
        text: "Trạng thái",
        field: "isActive",
        type: "boolean",
        searchOptions: "interestStatus",
        formatter: cell => (
          <div className="form-check form-check-success">
            <input
              type="checkbox"
              className="form-check-input"
              checked={cell}
              onChange={() => {}}
            />
          </div>
        ),
        dependentField: true,
      },
    ],
  },

  EmployeeGroup: {
    routingField: "objectId",
    include: ["leader", "branch", "department"],
    columns: [
      {
        text: "Tên đội nhóm",
        field: "name",
        type: "string",
      },
      {
        text: "Leader",
        field: "leader.fullName",
        type: "model",
        modelNames: "Employee",
      },
      {
        text: "Thuộc chi nhánh",
        field: "branch.name",
        type: "model",
        modelNames: "Branch",
      },
      {
        text: "Bộ phận",
        field: "department.Name",
        type: "model",
        modelNames: "SysCfg",
      },
      {
        text: "Trạng thái",
        field: "isActive",
        type: "boolean",
        formatter: cell => (
          <div className="form-check form-check-success">
            <input
              type="checkbox"
              className="form-check-input"
              checked={cell}
              onChange={() => {}}
            />
          </div>
        ),
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "date",
        formatter: cell => (
          <span>{moment(cell).format("DD-MM-YYYY HH:mm")}</span>
        ),
      },
      {
        text: "Ngày cập nhật",
        field: "updatedAt",
        type: "date",
        formatter: cell => (
          <span>{moment(cell).format("DD-MM-YYYY HH:mm")}</span>
        ),
      },
    ],
  },

  EmployeeGroupMembers: {
    routingPath: "/employee/objectId",
    include: ["department"],
    modelName: "Employee",
    columns: [
      {
        text: "Mã NV",
        field: "employeeId",
        type: "string",
        editInlineOptions: {
          cellComponent: VVSSelectModel,
          cellComponentProps: (formProps, rowName) => ({
            model: "Employee",
            configName: "EmployeeMember",
            includeField: ["department"],
            conditionField: {
              groups: {
                $exists: false,
              },
            },
            onSelect: value => {
              if (!value) return;
              const { setValue } = formProps;
              setValue(`${rowName}.fullName`, value.fullName);
              setValue(`${rowName}.email`, value.email);
              setValue(`${rowName}.phone`, value.phone);
              setValue(`${rowName}.isActive`, value.isActive);
              setValue(`${rowName}.position`, value.position);
              setValue(`${rowName}.department`, value.department);
            },
          }),
        },
      },
      {
        text: "Họ và tên",
        field: "fullName",
        type: "string",
        dependentField: true,
      },
      {
        text: "Bộ phận",
        type: "model",
        field: "department.name",
        modelNames: ["Department"],
        dependentField: true,
      },
      {
        text: "SĐT",
        field: "phone",
        type: "string",
        dependentField: true,
      },
      {
        text: "Email",
        field: "email",
        type: "string",
        dependentField: true,
      },
    ],
  },
  EmployeeGrade: {
    routingField: "objectId",
    include: ["branch"],
    columns: [
      {
        text: "Tên vị trí",
        field: "name",
        type: "string",
      },
      {
        text: "Thuộc chi nhánh",
        field: "branch.name",
        type: "model",
        modelNames: "Branch",
      },
      {
        text: "Trạng thái",
        field: "isActive",
        type: "boolean",
        formatter: cell => (
          <div className="form-check form-check-success">
            <input
              type="checkbox"
              className="form-check-input"
              checked={cell}
              onChange={() => {}}
            />
          </div>
        ),
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "date",
        formatter: cell => (
          <span>{moment(cell).format("DD-MM-YYYY HH:mm")}</span>
        ),
      },
      {
        text: "Ngày cập nhật",
        field: "updatedAt",
        type: "date",
        formatter: cell => (
          <span>{moment(cell).format("DD-MM-YYYY HH:mm")}</span>
        ),
      },
    ],
  },
  EmployeeGradeMembers: {
    routingPath: "/employee/objectId",
    include: ["group"],
    modelName: "Employee",
    columns: [
      {
        text: "Mã NV",
        field: "employeeId",
        type: "string",
        editInlineOptions: {
          cellComponent: VVSSelectModel,
          cellComponentProps: (formProps, rowName) => ({
            model: "Employee",
            configName: "EmployeeMember",
            includeField: ["department"],
            conditionField: {
              position: "employee",
            },
            onSelect: value => {
              if (!value) return;
              const { setValue } = formProps;
              setValue(`${rowName}.fullName`, value.fullName);
              setValue(`${rowName}.group`, value.group);
              setValue(`${rowName}.phone`, value.phone);
              setValue(`${rowName}.email`, value.email);
              setValue(`${rowName}.isActive`, value.isActive);
            },
          }),
        },
      },
      {
        text: "Họ và tên",
        field: "fullName",
        type: "string",
        dependentField: true,
      },
      {
        text: "Đội nhóm",
        type: "model",
        field: "group.name",
        modelNames: ["EmployeeGroup"],
        dependentField: true,
      },
      {
        text: "SĐT",
        field: "phone",
        type: "string",
        dependentField: true,
      },
      {
        text: "Email",
        field: "email",
        type: "string",
        dependentField: true,
      },
      {
        text: "Trạng thái",
        field: "isActive",
        type: "boolean",
        searchOptions: "interestStatus",
        formatter: cell => (
          <div className="form-check form-check-success">
            <input
              type="checkbox"
              className="form-check-input"
              checked={cell}
              onChange={() => {}}
            />
          </div>
        ),
        dependentField: true,
      },
    ],
  },
  Bank: {
    routingField: "objectId",
    modelName: "SysCfg",
    columns: [
      {
        text: "Tên ngân hàng",
        type: "string",
        field: "vn_name",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
      {
        text: "Tên viết gọn",
        type: "string",
        field: "Name",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
    ],
  },
  Task: {
    include: ["project"],
    columns: [
      {
        text: "Tên dự án",
        field: "project.projectName",
        type: "model",
        modelNames: ["Project"],
      },
      {
        text: "Tên công việc",
        sort: true,
        type: "string",
        field: "name",
      },
      {
        text: "Độ ưu tiên",
        type: "string",
        field: "priority",
        formatter: cell => (
          <span>
            {cell === "high"
              ? "Cao"
              : cell === "medium"
              ? "Trung bình"
              : cell === "low"
              ? "Thấp"
              : cell}
          </span>
        ),
      },
      {
        text: "Trạng thái",
        sort: true,
        type: "string",
        field: "status",
        formatter: cell => (
          <span>
            {cell === "open"
              ? "Mở"
              : cell === "cancelled"
              ? "Hủy"
              : cell === "working"
              ? "Đang thực hiện"
              : cell === "completed"
              ? "Hoàn thành"
              : cell}
          </span>
        ),
      },
      {
        text: "Mô tả",
        sort: true,
        type: "string",
        field: "description",
      },
    ],
  },
  SMSTemplate: {
    modelName: "NotificationTemplate",
    routingField: "objectId",
    columns: [
      {
        text: "Chủ đề",
        field: "title",
        type: "string",
        dependentField: true,
      },

      {
        text: "Mẫu tin nhắn",
        field: "smsContent",
        type: "string",
        dependentField: true,
      },
    ],
  },
  SendMass: {
    routingField: "objectId",
    include: ["template"],
    columns: [
      {
        text: "Thời gian đặt lịch",
        field: "scheduledSendAt",
        type: "date",
        formatter: cell => (
          <span>{moment(new Date(cell?.iso)).format("DD-MM-YYYY HH:mm")}</span>
        ),
      },
      {
        text: "Tiêu đề",
        type: "model",
        field: "template.title",
        modelNames: ["NotificationTemplate"],
      },
      {
        text: "Trạng thái",
        type: "string",
        field: "status",
        formatter: cell => (
          <span>
            {cell === "new"
              ? "Mới"
              : cell === "scheduled"
              ? "Đã đặt lịch"
              : cell === "processing"
              ? "Đang xử lý"
              : cell === "canceled"
              ? "Đã huỷ"
              : cell === "completed"
              ? "Đã hoàn thành"
              : cell}
          </span>
        ),
        searchOptions: "sendMassStatus",
      },
      {
        text: "Loại",
        type: "string",
        field: "type",
        formatter: cell => (
          <span>
            {cell === "sendBulk"
              ? "Gửi hàng loạt"
              : cell === "sendOption"
              ? "Gửi tuỳ chọn"
              : cell}
          </span>
        ),
        searchOptions: "sendMassType",
      },
    ],
  },
  AppointmentCustomer: {
    modelName: "Appointment",
    include: ["customer"],
    columns: [
      {
        text: "Thời gian đặt lịch",
        field: "scheduledTime",
        type: "date",
        formatter: cell => (
          <span>{moment(new Date(cell?.iso)).format("DD-MM-YYYY HH:mm")}</span>
        ),
      },
      {
        text: "Loại vàng",
        field: "goldType",
        type: "string",
      },
      {
        text: "Phương thức",
        type: "string",
        field: "type",
        formatter: cell => (
          <span>
            {cell === language_vn.APPOINTMENT_TYPE_SELL_GOLD
              ? "Bán vàng"
              : language_vn.APPOINTMENT_TYPE_RECEIVE_GOLD
              ? "Nhận vàng"
              : cell}
          </span>
        ),
      },
      {
        text: "Trạng thái",
        type: "string",
        field: "status",
        formatter: cell => (
          <BagdeStatus
            titleBadge={
              cell === language_vn.APPOINTMENT_STATUS_CONFIRMED
                ? "Đã xác nhận"
                : cell === language_vn.APPOINTMENT_STATUS_CANCELLED
                ? "Đã huỷ"
                : cell === language_vn.APPOINTMENT_STATUS_UNCONFIRMED
                ? "Chưa xác nhận"
                : cell === language_vn.APPOINTMENT_STATUS_COMPLETED
                ? "Đã hoàn thành"
                : cell
            }
            typeBadge={cell}
          />
        ),
      },
      {
        text: "Ghi chú",
        field: "note",
        type: "string",
      },
    ],
  },
  TransactionContract: {
    modelName: "Transaction",
    include: [
      "order",
      "target.bank",
      "target.customer",
      "customer",
      "source.bank",
    ],
    routingPath: "/transaction/code",
    columns: [
      {
        text: "Nội dung",
        type: "string",
        field: "memo",
      },
      {
        text: "Số tiền",
        type: "number",
        field: "amount",
        formatter: cell => formatNumber(Math.abs(cell)),
      },
      {
        text: "Mã giao dịch",
        type: "string",
        field: "code",
      },
      {
        text: "Phương thức",
        type: "string",
        field: "type",
        formatter: cell => (
          <span>
            {cell === "pay"
              ? "Thanh toán"
              : cell === "deposit"
              ? "Nạp tiền"
              : cell === "interest"
              ? "Lãi"
              : cell === "withdraw"
              ? "Rút tiền"
              : cell === "refund"
              ? "Rút tiền gốc"
              : cell === "withdraw-referral"
              ? "Rút tiền hoa hồng"
              : cell === "fee"
              ? "Phí"
              : cell}
          </span>
        ),
      },
      {
        text: "Trạng thái",
        type: "string",
        field: "status",
        formatter: cell => (
          <BagdeStatus
            titleBadge={
              cell === "requested"
                ? language_vn.requested
                : cell === "completed"
                ? language_vn.completed
                : cell
            }
            typeBadge={cell}
          />
        ),
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "string",
        formatter: cell => (
          <span>{moment(cell).locale("vi", vi).format("DD/MM/YYYY")}</span>
        ),
      },
    ],
  },
  Campaign: {
    routingField: "objectId",
    include: ["customer", "lead"],
    columns: [
      {
        text: "Tên chiến dịch",
        field: "name",
        type: "string",
      },
      {
        text: "Ngày bắt đầu",
        field: "startDate",
        formatter: cell => (
          <span>
            {cell?.iso && moment(new Date(cell?.iso)).format("DD-MM-YYYY")}
          </span>
        ),
      },
      {
        text: "Ngày kết thúc",
        field: "endDate",
        formatter: cell => (
          <span>
            {cell?.iso && moment(new Date(cell?.iso)).format("DD-MM-YYYY")}
          </span>
        ),
      },
      {
        text: "Trạng thái",
        field: "isActive",
        type: "boolean",
        formatter: cell => {
          return (
            <input
              className="form-check-input"
              type="checkbox"
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "10px",
                border: "1px solid black",
                backgroundColor: cell ? "green" : "white",
              }}
              disabled
              checked={cell}
            />
          );
        },
      },
    ],
  },
  Competitor: {
    routingField: "objectId",
    include: ["customer", "lead"],
    columns: [
      {
        text: "Mã đối thủ",
        field: "competitorId",
        type: "string",
      },
      {
        text: "Tên đối thủ",
        field: "name",
        type: "string",
      },
      {
        text: "Website",
        field: "website",
        type: "string",
      },
      {
        text: "Điểm mạnh",
        field: "strength",
        type: "string",
      },
      {
        text: "Điểm yếu",
        field: "weakness",
        type: "string",
      },
    ],
  },
  Project: {
    routingField: "objectId",
    include: ["department"],
    columns: [
      {
        text: "Mã dự án",
        field: "name",
        type: "string",
      },
      {
        text: "Tên dự án",
        field: "projectName",
        type: "string",
      },
      {
        text: "Phòng ban",
        field: "department.name",
        type: "string",
      },
      {
        text: "Trạng thái",
        field: "status",
        formatter: status => {
          let customStatus = "Mở";
          if (status === "open") {
            customStatus = "Mở";
          } else if (status === "close") {
            customStatus = "Đóng";
          } else {
            customStatus = "Đang triển khai";
          }
          return <span>{customStatus}</span>;
        },
      },
      {
        text: "Ngày bắt đầu",
        field: "startDate",
        formatter: cell => (
          <span>
            {cell?.iso && moment(new Date(cell?.iso)).format("DD-MM-YYYY")}
          </span>
        ),
      },
      {
        text: "Ngày kết thúc",
        field: "endDate",
        formatter: cell => (
          <span>
            {cell?.iso && moment(new Date(cell?.iso)).format("DD-MM-YYYY")}
          </span>
        ),
      },
    ],
  },
  ExtendContract: {
    routingPath: "/contract/code",
    modelName: "Contract",
    include: ["customer"],
    columns: [
      {
        text: "Mã HĐ",
        sort: true,
        type: "string",
        field: "code",
      },
      {
        text: "Trạng thái HĐ",
        sort: true,
        type: "string",
        field: "status",
        formatter: cell => (
          <BagdeStatus
            titleBadge={
              cell === "effective"
                ? "Đang hiệu lực"
                : cell === "completed"
                ? "Đã thanh lý"
                : cell === "early-settled"
                ? "Đã tất toán sớm"
                : cell === "pending"
                ? "Đang xử lý"
                : cell === "canceled"
                ? "Đã huỷ"
                : ""
            }
            typeBadge={cell}
          />
        ),
        disableSearch: true,
      },
      {
        text: "Giá trị HĐ",
        sort: true,
        type: "string",
        field: "total",
        formatter: cell => <span>{formatNumber(cell)} VNĐ</span>,
        disableSearch: true,
      },
      {
        text: "Số kỳ",
        sort: true,
        type: "string",
        field: "noPeriods",
        formatter: cell => <span>{cell} tháng</span>,
        disableSearch: true,
      },
      {
        text: "Nơi đầu tư",
        sort: true,
        type: "string",
        field: "investment",
      },
      {
        text: "Ngày hết hạn HĐ",
        field: "endDate.iso",
        type: "string",
        sort: true,
        formatter: cell => <span>{moment(cell).format("DD/MM/YYYY")}</span>,
        disableSearch: true,
      },
      {
        text: "Họ và tên",
        field: "customer.fullName",
        type: "model",
        modelNames: ["Customer"],
        sort: true,
      },
      {
        text: "SĐT",
        field: "customer.phone",
        type: "model",
        modelNames: ["Customer"],
        sort: true,
      },
    ],
  },
  ExtensionManagement: {
    modelName: "Employee",
    include: ["department"],
    columns: [
      {
        text: "Ext",
        field: "extension",
        type: "string",
        sort: true,
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => ({}),
        },
      },
      {
        text: "Nhân viên",
        field: "fullName",
        type: "string",
        sort: true,
      },
      {
        text: "Bộ phận",
        field: "department.name",
        type: "model",
        modelNames: ["Department"],
        sort: true,
      },
      {
        text: "Trạng thái",
        field: "isActive",
        type: "boolean",
        sort: true,

        formatter: cell => (
          <div className="form-check form-check-success">
            <input
              type="checkbox"
              className="form-check-input"
              checked={cell}
              onChange={() => {}}
            />
          </div>
        ),
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "date",
        sort: true,
        formatter: cell => <span>{moment(cell).format("DD/MM/YYYY")}</span>,
      },
      {
        text: "Ngày cập nhật",
        field: "updatedAt",
        type: "date",
        sort: true,
        formatter: cell => <span>{moment(cell).format("DD/MM/YYYY")}</span>,
      },
    ],
  },
  HistoryCallLog: {
    modelName: "CallLog",
    include: ["customer"],
    columns: [
      {
        text: "Thời gian gọi",
        field: "callDate",
        type: "string",
        formatter: cell => (
          <span>
            {moment(cell || "")
              .locale("vi", vi)
              .format("DD-MM-YYYY hh:mm A")}
          </span>
        ),
      },
      {
        text: "Tên khách hàng",
        field: "customerName",
        type: "string",
      },
      {
        text: "SĐT khách hàng",
        field: "phone",
        type: "string",
      },
      {
        text: "Trạng thái khách hàng",
        field: "status",
        type: "string",
        formatter: cell => (
          <>
            {cell === "ANSWERED"
              ? "Đã trả lời"
              : cell === "NO ANSWER"
              ? "Không trả lời"
              : cell === "BUSY"
              ? "Bận"
              : cell === "FAILED"
              ? "Thất bại"
              : cell}
          </>
        ),
        disableSearch: true,
      },
      {
        text: "Thời lượng cuộc gọi",
        field: "duration",
        type: "number",
        formatter: cell => <span>{cell} giây</span>,
        disableSearch: true,
      },
      {
        text: "Loại",
        field: "direction",
        type: "string",
        searchOptions: "historyCallLog",
        formatter: cell => (
          <BagdeStatus
            titleBadge={
              cell === "Inbound"
                ? "Gọi đến"
                : cell === "Outbound"
                ? "Gọi đi"
                : ""
            }
            typeBadge={cell}
          />
        ),
      },
      {
        text: "Ext",
        field: "ext",
        type: "string",
        disableSearch: true,
      },
      {
        text: "File ghi âm",
        field: "recordedFileUrl",
        type: "string",
        formatter: (cell, row) =>
          ["NO ANSWER", "BUSY", "FAILED"].includes(row?.status) ? (
            ""
          ) : (
            <a href={cell}>Tải file</a>
          ),
        disableSearch: true,
      },
    ],
  },

  HistoryImpact: {
    modelName: "ChangeDataLog",
    include: ["user"],
    columns: [
      {
        text: "Tên nhân viên",
        field: "user.fullName",
        type: "string",
      },
      {
        text: "Hành động",
        field: "changes",
        type: "string",
        formatter: cell => {
          return cell.map((item, index) => {
            const status = Object.entries(item).flat();

            return (
              <div
                key={index}
                style={{ lineHeight: "1.5rem", display: "flex", gap: 10 }}
              >
                <div
                  style={{
                    width: 100,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {KEY[status[0]]}
                  <span>:</span>
                </div>
                {typeof status[1].oldValue === "object" ? (
                  <span>Đã thây đổi</span>
                ) : (
                  <>
                    <span>
                      {handleCheckAction(status[0], status[1].oldValue)}
                    </span>
                    <span> {"-->"} </span>
                    <span>
                      {handleCheckAction(status[0], status[1].newValue)}
                    </span>
                  </>
                )}
              </div>
            );
          });
        },
      },
      {
        text: "Thời gian",
        field: "createdAt",
        type: "string",
        formatter: cell => moment(cell).format("HH:MM DD/MM/YYYY"),
      },
    ],
  },
  Quote: {
    modelName: "Quotation",
    routingPath: "/quote/objectId",
    include: ["customer", "lead"],
    columns: [
      {
        text: "Mã báo giá",
        field: "quoteId",
        type: "string",
      },
      {
        text: "Ngày báo giá",
        field: "quotationDate",
        type: "string",
        formatter: cell => (
          <span>{moment(new Date(cell?.iso)).format("DD-MM-YYYY")}</span>
        ),
        disableSearch: true,
      },
      {
        text: "Trạng thái",
        field: "status",
        type: "string",
        formatter: cell => (
          <span>
            {cell === language_vn.QUOTATION_STATUS_AGREE
              ? "Đồng ý"
              : cell === language_vn.QUOTATION_STATUS_CONFIRMED
              ? "Đã xác nhận"
              : cell === language_vn.QUOTATION_STATUS_DRAFT
              ? "Bản thảo"
              : cell === language_vn.QUOTATION_STATUS_NEGOTIATE
              ? "Đàm phán"
              : cell === language_vn.QUOTATION_STATUS_REFUSE
              ? "Từ chối"
              : cell === language_vn.QUOTATION_STATUS_SENT
              ? "Đã gửi"
              : cell === language_vn.QUOTATION_STATUS_WAITFORCONFIRMATION
              ? "Chờ xác nhận"
              : cell}
          </span>
        ),
        searchOptions: "quoteStatus",
      },
      {
        text: "Khách hàng",
        field: "customer.fullName",
        type: "model",
        modelNames: ["Customer"],
        formatter: (cell, row) => (
          <span>{row?.lead ? row?.lead?.name : row?.customer?.fullName}</span>
        ),
        disableSearch: true,
      },
    ],
  },
  Message: {
    columns: [
      {
        text: "Nội dung",
        field: "message",
        type: "string",
      },
      {
        text: "Thời gian gửi",
        field: "createdAt",
        formatter: cell => (
          <span>{cell && moment(cell).format("DD-MM-YYYY HH:MM")}</span>
        ),
      },
      {
        text: "Trạng thái",
        field: "status",
        type: "string",
      },
    ],
  },

  Opportunity: {
    include: ["client", "productCategory", "lead"],
    routingPath: "/opportunity/objectId",
    columns: [
      {
        text: "Tên khách hàng",
        field: "client.fullName",
        type: "model",
        modelNames: ["Customer"],
        formatter: (cell, row) => (
          <span>{row?.lead ? row?.lead?.name : row?.client?.fullName}</span>
        ),
        disableSearch: true,
      },
      {
        text: "Tên cơ hội",
        sort: true,
        type: "string",
        field: "name",
      },
      {
        text: "Giai đoạn",
        field: "stage",
        type: "string",
        sort: true,
      },

      {
        text: "Loại cơ hội",
        field: "type",
        type: "string",
        sort: true,
      },
    ],
  },
  OpportunityQuote: {
    modelName: "Quotation",
    routingPath: "/quote/objectId",
    include: ["customer", "lead"],
    columns: [
      {
        text: "Mã báo giá",
        field: "quoteId",
        type: "string",
      },
      {
        text: "Ngày báo giá",
        field: "quotationDate",
        type: "string",
        formatter: cell => (
          <span>{moment(new Date(cell?.iso)).format("DD-MM-YYYY")}</span>
        ),
        disableSearch: true,
      },
      {
        text: "Trạng thái",
        field: "status",
        type: "string",
        formatter: cell => (
          <span>
            {cell === language_vn.QUOTATION_STATUS_AGREE
              ? "Đồng ý"
              : cell === language_vn.QUOTATION_STATUS_CONFIRMED
              ? "Đã xác nhận"
              : cell === language_vn.QUOTATION_STATUS_DRAFT
              ? "Bản thảo"
              : cell === language_vn.QUOTATION_STATUS_NEGOTIATE
              ? "Đàm phán"
              : cell === language_vn.QUOTATION_STATUS_REFUSE
              ? "Từ chối"
              : cell === language_vn.QUOTATION_STATUS_SENT
              ? "Đã gửi"
              : cell === language_vn.QUOTATION_STATUS_WAITFORCONFIRMATION
              ? "Chờ xác nhận"
              : cell}
          </span>
        ),
      },
      {
        text: "Khách hàng",
        field: "customer.fullName",
        type: "model",
        modelNames: ["Customer"],
        formatter: (cell, row) => (
          <span>{row?.lead ? row?.lead?.name : row?.customer?.fullName}</span>
        ),
        disableSearch: true,
      },
    ],
  },
  Kpi: {
    routingPath: "/kpi/objectId",
    include: ["employeeGrade"],
    columns: [
      {
        text: "Tên KPI",
        field: "name",
        type: "string",
      },
      {
        text: "Doanh số bắt buộc",
        field: "requiredSalesFrom",
        type: "number",
        formatter: cell => {
          if (!cell) return <></>;
          const requiredSalesFrom = JSON.parse(cell);
          return <span>{formatNumber(requiredSalesFrom?.revenue)} VNĐ</span>;
        },
      },
      // {
      //   text: "Doanh số bắt buộc đến",
      //   field: "requiredSalesTo",
      //   type: "number",
      //   formatter: cell => <span>{formatNumber(cell)} VNĐ</span>,
      // },
      {
        text: "Đối tượng áp dụng",
        type: "string",
        field: "type",
        formatter: cell => (
          <span>
            {cell === "personal"
              ? "Nhân viên"
              : cell === "team"
              ? "Nhóm"
              : cell}
          </span>
        ),
        dependentField: true,
      },
      {
        text: "Trạng thái",
        field: "isActive",
        type: "boolean",
        formatter: cell => (
          <div className="form-check form-check-success">
            <input
              type="checkbox"
              className="form-check-input"
              checked={cell}
              onChange={() => {}}
            />
          </div>
        ),
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "date",
        formatter: cell => (
          <span>{moment(cell).format("DD-MM-YYYY HH:mm")}</span>
        ),
      },
    ],
  },
  KpiReport: {
    modelName: "Kpi",
    routingPath: "/kpi/objectId",
    include: ["employeeGrade"],
    columns: [
      {
        text: "Tên KPI",
        field: "name",
        type: "string",
      },
      {
        text: "Doanh số bắt buộc",
        field: "requiredSalesFrom",
        type: "number",
        formatter: cell => {
          if (!cell) return <></>;
          const requiredSalesFrom = JSON.parse(cell);
          return <span>{formatNumber(requiredSalesFrom?.revenue)} VNĐ</span>;
        },
      },
      // {
      //   text: "Doanh số bắt buộc đến",
      //   field: "requiredSalesTo",
      //   type: "number",
      //   formatter: cell => <span>{formatNumber(cell)} VNĐ</span>,
      // },
      {
        text: "Đối tượng áp dụng",
        type: "string",
        field: "type",
        formatter: cell => (
          <span>
            {cell === "personal"
              ? "Nhân viên"
              : cell === "team"
              ? "Nhóm"
              : cell}
          </span>
        ),
        dependentField: true,
      },
      {
        text: "Trạng thái",
        field: "isActive",
        type: "boolean",
        formatter: cell => (
          <div className="form-check form-check-success">
            <input
              type="checkbox"
              className="form-check-input"
              checked={cell}
              onChange={() => {}}
            />
          </div>
        ),
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "date",
        formatter: cell => (
          <span>{moment(cell).format("DD-MM-YYYY HH:mm")}</span>
        ),
      },
    ],
  },
  KPIAssignment2: {
    modelName: "KPIAssignment",
    include: ["kpi", "employee", "team"],
    columns: [
      {
        text: "Nhân viên",
        field: "employee.fullName",
        type: "model",
        modelNames: ["Employee"],
      },
      {
        text: "KPI",
        field: "kpi.name",
        type: "model",
      },
      {
        text: "ÁP dụng cho tháng",
        field: "kpiOfMonth",
        type: "date",
        formatter: cell => <span>{moment(cell?.iso).format("MM")}</span>,
      },
      {
        text: "Doanh thu",
        field: "saleTotal",
        type: "number",
        formatter: cell => <span>{formatNumber(cell) || 0} VNĐ</span>,
      },
      {
        text: "Kết quả",
        field: "results",
        type: "string",
        formatter: cell => {
          const revenue = cell?.filter(
            item => item?.attributeName === "revenue"
          );
          return (
            <span>
              {cell &&
                `${Math.ceil(revenue?.progress || "")}% - ${
                  ASSESS.filter(item => item.value === revenue?.assess)?.name ||
                  "chưa phân loại"
                }`}
            </span>
          );
        },
      },
    ],
  },

  KPIGroupReport1: {
    modelName: "KPIAssignment",
    routingPath: "/kpi-group/objectId",
    include: ["kpi", "team"],
    columns: [
      {
        text: "Tên nhóm",
        field: "team.name",
        type: "model",
        modelNames: ["EmployeeGroup"],
      },
      {
        text: "KPI",
        field: "kpi.name",
        type: "model",
      },
      {
        text: "Doanh thu",
        field: "saleTotal",
        type: "number",
        formatter: cell => <span>{formatNumber(cell) || 0} VNĐ</span>,
      },
      {
        text: "Hoa Hồng",
        field: "commission",
        type: "number",
        formatter: cell => <span>{formatNumber(cell) || 0} VNĐ</span>,
      },
      {
        text: "Thưởng KPI",
        field: "bonus",
        type: "number",
        formatter: cell => <span>{formatNumber(cell) || 0} VNĐ</span>,
      },
      {
        text: "Trạng thái",
        field: "isActive",
        type: "boolean",
        formatter: cell => (
          <div className="form-check form-check-success">
            <input
              type="checkbox"
              className="form-check-input"
              checked={cell}
              onChange={() => {}}
            />
          </div>
        ),
      },
      {
        text: "KPI của tháng",
        field: "kpiOfMonth",
        type: "date",
        formatter: cell => <span>{moment(cell?.iso).format("MM-YYYY")}</span>,
      },
    ],
  },

  KPIEmployeeReport1: {
    modelName: "KPIAssignment",
    routingPath: "/kpi-employee/objectId",
    include: ["kpi", "employee"],
    columns: [
      {
        text: "Tên nhân viên",
        field: "employee.fullName",
        type: "model",
        modelNames: ["Employee"],
      },
      {
        text: "KPI",
        field: "kpi.name",
        type: "model",
      },
      {
        text: "Doanh thu",
        field: "saleTotal",
        type: "number",
        formatter: cell => <span>{formatNumber(cell) || 0} VNĐ</span>,
      },
      {
        text: "Hoa Hồng",
        field: "commission",
        type: "number",
        formatter: cell => <span>{formatNumber(cell) || 0} VNĐ</span>,
      },
      {
        text: "Thưởng KPI",
        field: "bonus",
        type: "number",
        formatter: cell => <span>{formatNumber(cell) || 0} VNĐ</span>,
      },
      {
        text: "Trạng thái",
        field: "isActive",
        type: "boolean",
        formatter: cell => (
          <div className="form-check form-check-success">
            <input
              type="checkbox"
              className="form-check-input"
              checked={cell}
              onChange={() => {}}
            />
          </div>
        ),
      },
      {
        text: "KPI của tháng",
        field: "kpiOfMonth",
        type: "date",
        formatter: cell => <span>{moment(cell?.iso).format("MM-YYYY")}</span>,
      },
    ],
  },
  EmployeeGroupReport: {
    modelName: "EmployeeGroup",
    routingPath: "/employee-group/objectId",
    include: ["leader", "branch", "department"],
    columns: [
      {
        text: "Tên đội nhóm",
        field: "name",
        type: "string",
      },
      {
        text: "Leader",
        field: "leader.fullName",
        type: "model",
        modelNames: "Employee",
      },
      {
        text: "Thuộc chi nhánh",
        field: "branch.name",
        type: "model",
        modelNames: "Branch",
      },
      {
        text: "Bộ phận",
        field: "department.Name",
        type: "model",
        modelNames: "SysCfg",
      },
      {
        text: "Trạng thái",
        field: "isActive",
        type: "boolean",
        formatter: cell => (
          <div className="form-check form-check-success">
            <input
              type="checkbox"
              className="form-check-input"
              checked={cell}
              onChange={() => {}}
            />
          </div>
        ),
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "date",
        formatter: cell => (
          <span>{moment(cell).format("DD-MM-YYYY HH:mm")}</span>
        ),
      },
      {
        text: "Ngày cập nhật",
        field: "updatedAt",
        type: "date",
        formatter: cell => (
          <span>{moment(cell).format("DD-MM-YYYY HH:mm")}</span>
        ),
      },
    ],
  },
  EmployeeHr: {
    modelName: "Employee",
    routingPath: "/employee/objectId",
    include: ["department", "group", "groups"],
    columns: [
      {
        text: "Mã nhân viên",
        field: "employeeId",
        sort: true,
        type: "string",
      },
      {
        text: "Họ tên",
        field: "fullName",
        sort: true,
        type: "string",
      },
      {
        text: "SĐT",
        field: "phone",
        sort: true,
        type: "string",
      },
      {
        text: "Bộ phận",
        type: "model",
        modelNames: ["Department"],
        field: "department.name",
        sort: true,
      },
      {
        text: "Đội nhóm",
        type: "string",
        field: "groups",
        sort: true,
        formatter: (cell, row) => {
          return <>{row?.groups && <p>{row?.groups[0]?.name}</p>}</>;
        },
      },
      {
        text: "Trạng thái",
        field: "isActive",
        sort: true,
        formatter: cell => (
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "10px",
                border: "1px solid black",
                backgroundColor: cell ? "green" : "white",
              }}
              disabled
              checked={cell}
            />
          </div>
        ),
      },
    ],
  },
  LeadReport: {
    modelName: "Lead",
    routingPath: "/lead/objectId",
    include: ["salesStaff", "salesTeam"],
    columns: [
      {
        text: "Họ tên",
        field: "name",
        type: "string",
      },
      {
        text: "SĐT",
        field: "phone",
        type: "string",
      },
      {
        text: "Email",
        field: "email",
        type: "string",
      },
      {
        text: "Giới tính",
        field: "gender",
        type: "string",
      },
      {
        text: "Nguồn",
        field: "approachFrom",
        type: "string",
      },
      {
        text: "Sale hỗ trợ",
        type: "model",
        field: "salesStaff.fullName",
        modelNames: ["Employee"],
      },
      {
        text: "Đội sales",
        type: "model",
        field: "salesTeam.name",
        modelNames: ["EmployeeGroup"],
      },
      {
        text: "Trạng thái",
        field: "status",
        type: "string",
        formatter: cell => (
          <BagdeStatus
            titleBadge={
              cell === "Mới"
                ? "Mới"
                : cell === "Mở"
                ? "Mở"
                : cell === "Đã trả lời"
                ? "Đã trả lời"
                : cell === "Cơ hội"
                ? "Cơ hội"
                : cell === "Đã báo giá"
                ? "Đã báo giá"
                : cell === "Báo giá bị mất"
                ? "Báo giá bị mất"
                : cell === "Quan tâm"
                ? "Quan tâm"
                : cell === "Đã chuyển đổi"
                ? "Đã chuyển đổi"
                : cell === "Không nên liên hệ"
                ? "Không nên liên hệ"
                : cell
            }
            typeBadge={cell}
          />
        ),
        searchOptions: "leadStatus",
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "date",
        formatter: cell => <span>{moment(cell).format("DD-MM-YYYY")}</span>,
      },
    ],
  },
  HolidayList: {
    modelName: "HolidayList",
    routingPath: "/holiday/objectId",
    columns: [
      {
        text: "Ngày lễ của năm",
        field: "year",
        type: "string",
      },
    ],
  },

  ["stock-product-item"]: {
    include: ["po", "product"],
    modelName: "POItem",
    columns: [
      {
        text: "Sản phẩm",
        type: "model",
        field: "product.name",
        modelNames: ["Product"],
        editInlineOptions: {
          cellComponent: VVSSelectModel,
          cellComponentProps: (formProps, rowName) => {
            return {
              model: "Product",
            };
          },
        },
      },
      {
        text: "Số lượng",
        type: "number",
        field: "quantity",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => {},
        },
      },
    ],
    validationSchema: yup.object().shape({
      StockProductItem: yup.array().of(
        yup.object().shape({
          product: yup.object().shape({
            name: yup.string().required("Vui lòng không để trống!"),
          }),
          quantity: yup
            .number()
            .min(1, "Trường số lượng phải lớn hơn hoặc bằng 1")
            .typeError("Vui lòng không để trống!"),
        })
      ),
    }),
  },
  StockChangeSession: {
    routingField: "objectId",
    include: ["target", "source", "creator", "supplier", "po", "order"],
    columns: [
      {
        text: "Code",
        field: "code",
        type: "string",
      },
      {
        text: "Người tạo",
        field: "creator.fullName",
        type: "model",
        modelNames: ["_User"],
      },
      {
        text: "Kho nhập",
        type: "model",
        field: "target.name",
        modelNames: ["WareHouse"],
      },
      {
        text: "Kho xuất",
        type: "model",
        field: "source.name",
        modelNames: ["WareHouse"],
      },
      {
        text: "Loại",
        field: "type",
        type: "string",
        searchOptions: "stockChangeSessionType",
      },
      {
        text: "Trạng thái",
        field: "status",
        type: "string",
        formatter: cell => (
          <BagdeStatus
            titleBadge={
              cell === "new"
                ? "Mới"
                : cell === "completed"
                ? "Đã hoàn thành"
                : cell === "approved"
                ? "Đã chấp nhận"
                : cell === "rejected"
                ? "Đã huỷ"
                : ""
            }
            typeBadge={cell}
          />
        ),

        disableSearch: true,
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "date",
        formatter: cell => (
          <span>{moment(cell).format("HH:mm DD-MM-YYYY")}</span>
        ),
      },
    ],
  },

  PO: {
    routingField: ["objectId"],
    modelName: "PO",
    include: ["product", "supplier", "creator"],
    columns: [
      {
        text: "Code",
        field: "code",
        type: "string",
      },
      {
        text: "Nhà cung cấp",
        sort: true,
        type: "model",
        field: "supplier.name",
        modelNames: ["supplier"],
      },
      {
        text: "Trạng thái",
        field: "status",
        type: "string",
        formatter: cell => (
          <BagdeStatus
            titleBadge={
              cell === "new"
                ? "Mới"
                : cell === "completed"
                ? "Đã hoàn thành"
                : cell === "approved"
                ? "Đã chấp nhận"
                : cell === "rejected"
                ? "Đã huỷ"
                : cell === "partially-received"
                ? "Đã nhập một lần"
                : ""
            }
            typeBadge={cell}
          />
        ),
      },
      {
        text: "Người tạo",
        sort: true,
        type: "model",
        field: "creator.fullName",
        modelNames: ["Employee"],
      },
      {
        text: "Ngày tạo",
        sort: true,
        field: "createdAt",
        formatter: cell => moment(cell).format("HH:mm DD-MM-YYYY"),
        type: "date",
      },
    ],
  },

  POItem: {
    modelName: "POItem",
    include: ["product", "po"],
    columns: [
      {
        text: "Sản phẩm",
        type: "model",
        field: "product.name",
        modelNames: ["Product"],
        disableSearch: true,
      },
      {
        text: "Số lượng(còn lại)",
        type: "number",
        field: "remainQuantity",
        disableSearch: true,
      },
      {
        text: "Số lượng(nhập)",
        type: "number",
        field: "quantity",
        editInlineOptions: {
          cellComponent: InputField,
          cellComponentProps: (formProps, rowName) => {},
        },
      },
    ],
    validationSchema: yup.object().shape({
      POItem: yup.array().of(
        yup.object().shape({
          quantity: yup
            .number()
            .min(1, "Trường số lượng phải lớn hơn hoặc bằng 1")
            .typeError("Vui lòng không để trống!"),
        })
      ),
    }),
  },
  OrderItem: {
    modelName: "OrderItem",
    include: ["product"],
    columns: [
      {
        text: "Sản phẩm",
        type: "model",
        field: "product.name",
        modelNames: ["Product"],
        disableSearch: true,
      },
      {
        text: "Số lượng",
        type: "number",
        field: "quantity",
        disableSearch: true,
      },
    ],
  },

  StockReport: {
    include: ["product", "warehouse"],
    columns: [
      {
        text: "Sản phẩm",
        type: "model",
        field: "product.name",
        modelNames: ["Product"],
      },
      {
        text: "Số lượng",
        type: "number",
        field: "quantity",
        disableSearch: true,
      },
    ],
  },

  StockCountSession: {
    include: ["warehouse", "creator"],
    columns: [
      {
        text: "Kho",
        type: "model",
        field: "warehouse.name",
        modelNames: ["WareHouse"],
      },
      {
        text: "Người tạo",
        type: "model",
        field: "creator.username",
        modelNames: ["_User"],
      },
      {
        text: "Trạng thái",
        field: "status",
        type: "string",
        formatter: cell => (
          <BagdeStatus
            titleBadge={
              cell === "new"
                ? "Mới"
                : cell === "completed"
                ? "Đã hoàn thành"
                : cell === "approved"
                ? "Đã chấp nhận"
                : cell === "rejected"
                ? "Đã huỷ"
                : ""
            }
            typeBadge={cell}
          />
        ),
        disableSearch: true,
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "date",
        formatter: cell => (
          <span>{moment(cell).format("HH:mm DD-MM-YYYY")}</span>
        ),
      },
    ],
  },

  StockCountItem: {
    modelName: "StockCountItem",
    include: ["product"],
    columns: [
      {
        text: "Sản phẩm",
        type: "model",
        field: "product.name",
        modelNames: ["Product"],
        disableSearch: true,
      },
      {
        text: "Số lượng(kho)",
        type: "number",
        field: "quantityReality",
      },
      {
        text: "Số lượng(thực tế)",
        type: "number",
        field: "quantity",
      },
      {
        text: "Số lượng(chênh lệch)",
        type: "number",
        field: "quantityDiff",
        formatter: (cell, row) => <>{row?.quantity - row?.quantityReality}</>,
      },
      {
        text: "Hình ảnh",
        field: "image.url",
        type: "string",
        formatter: cell => (
          <img src={cell || ""} style={{ objectFit: "cover", width: "64px" }} />
        ),
      },
      {
        text: "Ghi chú",
        type: "string",
        field: "note",
      },
      {
        text: "Lý do",
        type: "string",
        field: "reason",
      },
    ],
  },

  Seminar: {
    routingField: "objectId",
    include: ["owner", "salesTeam"],
    columns: [
      {
        text: "Tên",
        field: "subject",
        type: "string",
      },
      {
        text: "Diễn giả",
        field: "speaker",
        type: "string",
      },
      {
        text: "Từ ngày",
        field: "from",
        type: "date",
        formatter: cell => {
          return <span>{moment(cell?.iso).format("HH:mm DD-MM-YYYY")}</span>;
        },
      },
      {
        text: "Đến ngày",
        field: "to",
        type: "date",
        formatter: cell => (
          <span>{moment(cell?.iso).format("HH:mm DD-MM-YYYY")}</span>
        ),
      },
      {
        text: "Trạng thái",
        field: "approvalStatus",
        type: "string",
        formatter: cell => (
          <span>
            <BagdeStatus
              titleBadge={
                cell === "pending"
                  ? "Đang chờ"
                  : cell === "approved"
                  ? "Đã chấp nhận"
                  : "Đã từ chối"
              }
              typeBadge={cell}
            />
          </span>
        ),
        searchOptions: "seminarStatus",
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "date",
        formatter: cell => <span>{moment(cell).format("DD-MM-YYYY")}</span>,
      },
    ],
  },
  News: {
    routingField: "objectId",
    include: ["owner", "salesTeam"],
    columns: [
      {
        text: "Tiêu đề",
        field: "title",
        type: "string",
      },

      {
        text: "Trạng thái",
        type: "boolean",
        field: "isActive",
        formatter: cell => {
          return (
            <input
              className="form-check-input"
              type="checkbox"
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "10px",
                border: "1px solid black",
                backgroundColor: cell ? "green" : "white",
              }}
              disabled
              checked={cell}
            />
          );
        },
      },
      {
        text: "Ngày xuất bản",
        field: "publishDate",
        type: "date",
        formatter: cell => (
          <span>{moment(cell?.iso).format("DD-MM-YYYY")}</span>
        ),
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "date",
        formatter: cell => <span>{moment(cell).format("DD-MM-YYYY")}</span>,
      },
    ],
  },
  Tweet: {
    routingField: "objectId",
    include: ["userInfo"],
    columns: [
      {
        text: "Nội dung bàì đăng",
        field: "content",
        type: "string",
        formatter: cell => {
          return <span>{cell ? cell?.slice(0, 80) : "[Ảnh]"}</span>;
        },
      },
      {
        text: "Người tạo",
        field: "userInfo",
        type: "string",
        formatter: cell => {
          return <span>{cell?.fullName}</span>;
        },
      },
      {
        text: "SDT",
        field: "userInfo",
        type: "string",
        formatter: cell => {
          return <span>{cell?.phoneNumber}</span>;
        },
      },
      {
        text: "Email",
        field: "userInfo",
        type: "string",
        formatter: cell => {
          return <span>{cell?.email}</span>;
        },
      },
      {
        text: "Block",
        type: "boolean",
        field: "isBlocked",
        formatter: cell => {
          return (
            <input
              className="form-check-input"
              type="checkbox"
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "10px",
                border: "1px solid black",
                backgroundColor: cell ? "green" : "white",
              }}
              disabled
              checked={cell}
            />
          );
        },
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "date",
        formatter: cell => <span>{moment(cell).format("DD-MM-YYYY")}</span>,
      },
    ],
  },
  EmailTemplate: {
    routingField: "objectId",
    columns: [
      {
        text: "Tên",
        field: "description",
        type: "string",
      },
      {
        text: "Ngày tạo",
        field: "createdAt",
        type: "date",
        formatter: cell => <span>{moment(cell).format("DD-MM-YYYY")}</span>,
      },
      {
        text: "Ngày cập nhật",
        field: "updatedAt",
        type: "date",
        formatter: cell => <span>{moment(cell).format("DD-MM-YYYY")}</span>,
      },
    ],
  },
  SeminarRegistration: {
    include: ["userInfo"],
    columns: [
      {
        text: "Tên",
        field: "userInfo",
        type: "string",
        formatter: cell => <span>{cell?.fullName}</span>,
      },
      {
        text: "Email",
        field: "userInfo",
        type: "string",
        formatter: cell => <span>{cell?.email}</span>,
      },
      {
        text: "Số điện thoại",
        field: "userInfo",
        type: "string",
        formatter: cell => <span>{cell?.phoneNumber}</span>,
      },
    ],
  },
};
export default MODEL_CONFIG;
