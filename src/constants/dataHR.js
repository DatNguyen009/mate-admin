import React from "react";
import { Type } from "react-bootstrap-table2-editor";
import moment from "moment";

import { formatNumber } from "helpers/erp_helper";
import BagdeStatus from "components/Common/BagdeStatus";

export const DATABOXTAGS = [
  {
    title: "Employee",
    BoxTags: [
      {
        itemBoxTag: "Employee",
        path: "/employee",
        countEmployee: [],
      },
      {
        itemBoxTag: "Employment Type",
        countEmployee: [],
        path: "/employment-type",
      },
      {
        itemBoxTag: "Branch",
        countEmployee: [],
        path: "/branch",
      },
      {
        itemBoxTag: "Department Tree",
        countEmployee: [],
        path: "/department/view/tree",
      },
      {
        itemBoxTag: "Designation",
        countEmployee: [],
        path: "/designation",
      },
      {
        itemBoxTag: "Employee Grade",
        countEmployee: [],
        path: "/employee-grade",
      },
      {
        itemBoxTag: "Employee Group",
        countEmployee: [],
        path: "/employee-group",
      },
      {
        itemBoxTag: "Employee Health Insurance",
        countEmployee: [],
        path: "/employee-health-insurance",
      },
    ],
  },
  {
    title: "Employee Lifecycle",
    BoxTags: [
      {
        itemBoxTag: "Employee Onboarding",
        countEmployee: [],
        path: "/employee-onboarding",
      },
      {
        itemBoxTag: "Employee Skill Map",
        countEmployee: [],
        path: "/employee-skill-map",
      },
      {
        itemBoxTag: "Employee Promotion",
        countEmployee: [],
        path: "/employee-promotion",
      },
      {
        itemBoxTag: "Employee Transfer",
        countEmployee: [],
        path: "/employee-transfer",
      },
      {
        itemBoxTag: "Grievance Type",
        countEmployee: [],
        path: "/grievance-type",
      },
      {
        itemBoxTag: "Employee Grievance",
        countEmployee: [],
        path: "/employee-grievance",
      },
      {
        itemBoxTag: "Employee Separation",
        countEmployee: [],
        path: "/employee-separation",
      },
      {
        itemBoxTag: "Employee Onboarding Template",
        countEmployee: [],
        path: "/employee-onboarding-template",
      },
      {
        itemBoxTag: "Employee Separation Template",
        countEmployee: [],
        path: "/employee-separation-template",
      },
    ],
  },
  {
    title: "Shift Management",
    BoxTags: [
      {
        itemBoxTag: "Shift Type",
        path: "/shift-type",
        countEmployee: [],
      },
      {
        itemBoxTag: "Shift Request",
        path: "/shift-request",
        countEmployee: [],
      },
      {
        itemBoxTag: "Shift Assignment",
        path: "/shift-assignment",
        countEmployee: [
          {
            id: 7,
            fullName: "Bruno Nash",
            status: {
              type: "success",
              title: "Active",
            },
            designation: "London",
            name: "HR-EMP-00038",
            startdate: "2019-10-01",
            action: "",
          },

          {
            id: 8,
            fullName: "Caesar Vance",
            status: {
              type: "success",
              title: "Active",
            },
            designation: "New York",
            name: "HR-EMP-00021",
            startdate: "2019-10-01",
            action: "",
          },
          {
            id: 7,
            fullName: "Bruno Nash",
            status: {
              type: "success",
              title: "Active",
            },
            designation: "London",
            name: "HR-EMP-00038",
            startdate: "2019-10-01",
            action: "",
          },

          {
            id: 8,
            fullName: "Caesar Vance",
            status: {
              type: "success",
              title: "Active",
            },
            designation: "New York",
            name: "HR-EMP-00021",
            startdate: "2019-10-01",
            action: "",
          },
        ],
      },
    ],
  },

  {
    title: "Leave",
    BoxTags: [
      {
        itemBoxTag: "Holiday List",
        path: "/holiday-list",
        countEmployee: [],
      },
      {
        itemBoxTag: "Leave Type",
        path: "/leave-type",
        countEmployee: [],
      },
      {
        itemBoxTag: "Leave Period",
        path: "/leave-period",
        countEmployee: [],
      },
      {
        itemBoxTag: "Leave Policy",
        path: "/leave-policy",
        countEmployee: [],
      },
      {
        itemBoxTag: "Leave Policy Assignment",
        path: "/leave-policy-assignment",
        countEmployee: [],
      },
      {
        itemBoxTag: "Leave Application",
        path: "/leave-application",
        countEmployee: [],
      },
      {
        itemBoxTag: "Leave Allocation",
        path: "/leave-allocation",
        countEmployee: [],
      },
      {
        itemBoxTag: "Leave Encashment",
        path: "/leave-encashment",
        countEmployee: [],
      },
      {
        itemBoxTag: "Leave Block List",
        path: "/leave-block-list",
        countEmployee: [],
      },
      {
        itemBoxTag: "Compensatory Leave Request",
        path: "/compensatory-leave-request",
        countEmployee: [],
      },
    ],
  },
  {
    title: "Attendance",
    BoxTags: [
      {
        itemBoxTag: "Employee Attendance Tool",
        path: "/employee-attendance-tool",
        countEmployee: [],
      },
      {
        itemBoxTag: "Attendance",
        path: "/attendance",
        countEmployee: [],
      },
      {
        itemBoxTag: "Attendance Request",
        path: "/attendance-request",
        countEmployee: [],
      },
      {
        itemBoxTag: "Upload Attendance",
        path: "/upload-attendance",
        countEmployee: [],
      },
      {
        itemBoxTag: "Employee Checkin",
        path: "/employee-checkin",
        countEmployee: [],
      },
    ],
  },
  {
    title: "Recruitment",
    BoxTags: [
      {
        itemBoxTag: "Job Opening",
        countEmployee: [],
        path: "/job-opening",
      },
      {
        itemBoxTag: "Job Applicant",
        countEmployee: [],
        path: "/job-applicant",
      },
      {
        itemBoxTag: "Job Offer",
        countEmployee: [],
        path: "/job-offer",
      },
      {
        itemBoxTag: "Job Applicant Source",
        countEmployee: [],
        path: "/job-applicant-source",
      },
      {
        itemBoxTag: "Terms and Condition",
        countEmployee: [],
        path: "/terms-and-conditions",
      },
    ],
  },
  {
    title: "Expense",
    BoxTags: [
      {
        itemBoxTag: "Expense Claim",
        countEmployee: [],
      },
      {
        itemBoxTag: "Travel Request",
        countEmployee: [],
      },
      {
        itemBoxTag: "Employee Advance",
        countEmployee: [],
      },
    ],
  },
  {
    title: "Settings",
    BoxTags: [
      {
        itemBoxTag: "HR Settings",
        countEmployee: [],
        path: "/hr-settings",
      },
      {
        itemBoxTag: "Daily Work Summary Group",
        countEmployee: [],
        path: "/daily-work-summary-group",
      },
      {
        itemBoxTag: "Team Updates",
        countEmployee: [],
      },
    ],
  },
  {
    title: "Fleet Management",
    BoxTags: [
      {
        itemBoxTag: "Driver",
        path: "/driver",
        countEmployee: [],
      },
      {
        itemBoxTag: "Vehicle",
        countEmployee: [],
        path: "/vehicle",
      },
      {
        itemBoxTag: "Vehicle Expenses",
        countEmployee: [],
        path: "/vehicle-log",
      },
    ],
  },
  {
    title: "Loans",
    BoxTags: [
      {
        itemBoxTag: " Loan Application",
        countEmployee: [],
      },
      {
        itemBoxTag: "Loan",
        countEmployee: [],
      },
      {
        itemBoxTag: "Loan Type",
        countEmployee: [],
      },
    ],
  },
  {
    title: "Training",
    BoxTags: [
      {
        itemBoxTag: "Training Program",
        countEmployee: [],
      },
      {
        itemBoxTag: "Training Event",
        countEmployee: [],
      },
      {
        itemBoxTag: "Training Result",
        countEmployee: [],
      },
      {
        itemBoxTag: "Training Feedback",
        countEmployee: [],
      },
    ],
  },
  {
    title: "Performance",
    BoxTags: [
      {
        itemBoxTag: "Appraisal",
        countEmployee: [],
        path: "/appraisal",
      },
      {
        itemBoxTag: "Appraisal Template",
        countEmployee: [],
        path: "/appraisal-template",
      },
      {
        itemBoxTag: "Energy Point Rule",
        countEmployee: [],
        path: "/energy-point-rule",
      },
      {
        itemBoxTag: "Enegry Point Log",
        countEmployee: [],
        path: "/energy-point-log",
      },
    ],
  },
  {
    title: "Key Reports",
    BoxTags: [
      {
        itemBoxTag: "Monthly Attendance Sheet",
        countEmployee: [],
      },
      {
        itemBoxTag: "Recruitment Analytics",
        countEmployee: [],
      },
      {
        itemBoxTag: "Employee Analytics",
        countEmployee: [],
      },
      {
        itemBoxTag: "Employee Leave Balance",
        countEmployee: [],
      },
      {
        itemBoxTag: "Employee Leave Balance Summary",
        countEmployee: [],
      },
      {
        itemBoxTag: "Employee Advance Summary",
        countEmployee: [],
      },
    ],
  },
  {
    title: "Other Reports",
    BoxTags: [
      {
        itemBoxTag: "Employee Information",
        countEmployee: [],
        path: "/employee",
      },
      {
        itemBoxTag: "Employee Birthday",
        countEmployee: [],
        path: "query-report/employee-birthday",
      },
      {
        itemBoxTag: "Employee Working on a Holiday",
        countEmployee: [],
      },
      {
        itemBoxTag: "Daily Work Summary Replies",
        countEmployee: [],
      },
    ],
  },
];

export const DATA_YOUR_SHORTCUTS = [
  {
    id: 1,
    typeBadge: "success",
    titleBadge: "Success",
    count: 4,
    path: "/employee",
    title: "Employee",
  },
  {
    id: 2,
    typeBadge: "dark",
    titleBadge: "Success",
    count: 4,
    path: "/leave-application",
    title: "Leave Application",
  },
  {
    id: 3,
    typeBadge: "danger",
    titleBadge: "Success",
    count: 4,
    path: "/attendance",
    title: "Attendance",
  },
  {
    id: 4,
    typeBadge: "info",
    titleBadge: "Success",
    count: 4,
    path: "/job-applicant",
    title: "Job Applicant",
  },
  {
    id: 5,
    typeBadge: "warning",
    titleBadge: "Success",
    count: 4,
    path: "/query-report/Monthly Attendance Sheet",
    title: "Monthly Attendance Sheet",
  },
  {
    id: 6,
    typeBadge: "success",
    titleBadge: "Success",
    count: 4,
    path: "/dashboard-view/Human Resource",
    title: "DashBoard",
  },
];

export const DATA_FILTER_TABLE = [
  {
    id: "employee",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "employment-type",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "branch",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "designation",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "employee-grade",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "employee-group",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "employee-health-insurance",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "department/view/tree",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "leave-application",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "attendance",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "job-applicant",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "query-report/Monthly Attendance Sheet",
    isFilterDate: true,
    isFilterSearch: true,
  },
  {
    id: "employment-type",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "designation",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "employee-onboarding",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "employee-skill-map",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "employee-promotion",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "employee-transfer",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "shift-type",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "grievance-type",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "shift-request",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "employee-grievance",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "employee-onboarding-template",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "shift-assignment",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "holiday-list",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "employee-separation-template",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "employee-separation",
    isFilterDate: false,
    isFilterSearch: true,
  },

  {
    id: "holiday-list",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "attendance-request",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "leave-type",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "leave-period",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "leave-policy",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "leave-policy-assignment",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "leave-application",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "leave-allocation",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "leave-encashment",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "leave-block-list",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "compensatory-leave-request",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "employee-checkin",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "job-opening",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "job-applicant-source",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "job-offer",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "terms-and-conditions",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "department",
    isFilterDate: false,
    isFilterSearch: true,
  },
];
export const TABLE_REPORT_CONFIG = {
  Brand: {
    routingField: "name",
    tableName: "Danh mục nhóm hàng hóa",
    columns: [
      {
        field: "name",
        text: "Chi Nhánh",
        sort: true,
        search: "string",
      },
      {
        text: "Doanh Thu",
        field: "productCount",
        type: "number",
        privateUrl: `/parse/aggregate/TestTurnOver?group={"objectId": "$brand", "productCount":{"$sum":"$price"} }`,
      },
    ],
  },
  TestAgent: {
    routingField: "name",
    tableName: "Danh mục nhóm hàng hóa",
    columns: [
      {
        field: "name",
        text: "Đại lý",
        sort: true,
        search: "string",
      },
      {
        text: "Số chỉ (vàng)",
        field: "productCount",
        type: "number",
        privateUrl: `/parse/aggregate/TestTurnoverAgent?group={"objectId": "$agent", "productCount":{"$sum":"$turnover"} }`,
      },
    ],
  },
  Customer: {
    routingField: "name",
    tableName: "Danh mục nhóm hàng hóa",
    columns: [
      {
        field: "objectId",
        text: "Nền Tảng",
        sort: true,
        search: "string",
        privateUrl: `/parse/aggregate/Customer?group={"objectId":"$origin", "count":{"$sum": 1}}`,
      },
      {
        text: "Số lượng",
        field: "count",
        type: "number",
        privateUrl: `/parse/aggregate/Customer?group={"objectId":"$origin", "count":{"$sum": 1}}`,
      },
    ],
  },
};
export const TABLE_CONFIG = {
  Category: {
    routingField: "name",
    tableName: "Danh mục nhóm hàng hóa",
    columns: [
      {
        field: "name",
        text: "Tên",
        sort: true,
        search: "string",
      },
      {
        text: "Số lượng mặt hàng",
        field: "productCount",
        type: "number",
        privateUrl: `/parse/aggregate/Product?group={"objectId": "$category", "productCount":{"$sum":1} }`,
      },
    ],
  },
  ImportItem: {
    routingField: "product.name",
    include: ["product"],
    columns: [
      {
        field: "product.name",
        text: "Tên",
        sort: true,
        search: "string",
      },
      {
        field: "importedPrice",
        text: "Giá nhập",
        sort: true,
      },
      {
        field: "quantity",
        text: "Số lượng",
        sort: true,
        search: "string",
      },
      {
        field: "total",
        text: "Tổng",
        sort: true,
      },
    ],
  },
  ImportedSession: {
    routingField: "code",
    include: ["creator"],
    columns: [
      {
        field: "code",
        text: "Mã phiếu",
        sort: true,
        search: "string",
      },
      {
        field: "status",
        text: "Trạng thái",
        sort: true,
        search: { options: { values: ["Hoàn thành", "Đang xử lý", "Hủy"] } },
      },
      {
        field: "createdAt",
        text: "Ngày tạo",
        sort: true,
        formatter: cell => <div>{moment(cell).format("DD-MM-YYYY")}</div>,
        // reverseFormatter: value => ({
        //   __type: "Date",
        //   iso: new Date(value)
        // })
      },
    ],
  },
  Employee: {
    routingField: "series",
    include: ["company"],
    columns: [
      {
        field: "fullName",
        text: "Full Name",
        sort: true,
        search: "text",
      },
      {
        field: "status",
        text: "Status",
        sort: true,
        search: { options: { values: ["Active", "Left", "Suspended"] } },
      },
      {
        field: "designation",
        text: "Designation",
        sort: true,
        search: {
          options: { model: "SysCfg", filter: { category: "Designation" } },
        },
      },
      {
        field: "series",
        text: "Code",
        sort: true,
        search: "string",
      },
    ],
  },
  Appointment: {
    include: ["customer"],
    columns: [
      {
        field: "customer.fullName",
        text: "Người yêu cầu",
      },
      {
        field: "phoneNumber",
        text: "Số điện thoại",
      },
      {
        field: "quanlityOfGoldForSale",
        text: "Số vàng",
      },
      {
        field: "paymentMethod",
        text: "Phương thức",
      },
      {
        field: "scheduledTime",
        text: "Thời gian /địa điểm",
        formatter: cell => (
          <div>{cell && moment(cell.iso).format("DD-MM-YYYY")}</div>
        ),
      },
      {
        field: "status",
        text: "Phản hồi yêu cầu",
      },
    ],
  },
  Transaction: {
    include: ["customer"],
    columns: [
      {
        field: "objectId",
        text: "Mã GD",
      },
      {
        field: "customer.fullName",
        text: "Khách  hàng",
      },
      {
        field: "amount",
        text: "Số tiền",
      },
      {
        field: "type",
        text: "Phương thức",
      },
      {
        field: "",
        text: "Tài khoản nguồn",
      },
      {
        field: "",
        text: "Tài khoản đích",
      },
      {
        field: "status",
        text: "Trạng thái",
      },
    ],
  },
  Branch: {
    enableInlineEdit: true,
    routingField: "objectId",
    columns: [
      {
        field: "name",
        text: "Name",
        sort: true,
        search: "string",
      },
      {
        field: "companyName",
        text: "Company Name",
        sort: true,
        search: "string",
      },
      {
        field: "address.location",
        text: "Address",
        sort: true,
        search: "string",
      },
      {
        field: "isActive",
        text: "IsActive",
        sort: true,
        search: "boolean",
        formatter: cell => (
          <BagdeStatus
            typeBadge={cell ? "Active" : "Inactive"}
            titleBadge={cell ? "Active" : "Inactive"}
          />
        ),
      },
      {
        field: "createdAt",
        text: "Created At",
        sort: true,
        search: "string",
        formatter: cell => <div>{moment(cell).format("YYYY-MM-DD HH:mm")}</div>,
      },
    ],
  },
  ActivityType: {
    routingField: "name",
    columns: [
      {
        field: "name",
        text: "Activity Type",
        sort: true,
        search: true,
      },
      {
        field: "defaultBillingRate",
        text: "Default Billing Rate",
        sort: true,
        search: true,
      },
      {
        field: "defaultCostingRate",
        text: "Default Costing Rate",
        sort: true,
        search: true,
      },
    ],
  },
  ActivityCost: {
    routingField: "name",
    include: ["employee", "activityType"],

    columns: [
      {
        field: "name",
        text: "Name",
        sort: true,
        search: true,
      },
      {
        field: "title",
        text: "Title",
        sort: true,
        search: true,
      },
      {
        field: "activityType.name",
        text: "Activity Type",
        sort: true,
        search: true,
      },
    ],
  },
  Timesheet: {
    routingField: "series",
    include: ["company", "customer", "employee", "project"],
    columns: [
      {
        field: "series",
        text: "Name",
        sort: true,
        search: true,
      },
      {
        field: "employee.fullName",
        text: "Title",
        sort: true,
        search: true,
      },
      {
        field: "status",
        text: "Status",
        sort: true,
        search: true,
      },
      {
        field: "employee.doj",
        text: "Start Date",
        sort: true,
        search: true,
      },
      {
        field: "amountBilled",
        text: "% Amount Billed",
        sort: true,
        search: true,
      },
    ],
  },

  ExpenseClaim: {
    routingField: "series",
    columns: [
      {
        field: "fullName",
        text: "Title",
        sort: true,
        search: "text",
      },
      {
        field: "status",
        text: "Status",
        sort: true,
        search: { options: { values: ["Active", "Left", "Suspended"] } },
      },
      {
        field: "grandTotal",
        text: "Grand Total",
        sort: true,
      },
      {
        field: "totalClaimedAmount",
        text: "Total Claimed Amount",
        sort: true,
      },
      {
        field: "totalAmountReimbursed",
        text: "Total Amount Reimbursed",
        sort: true,
      },
      {
        field: "series",
        text: "Code",
        sort: true,
        search: "string",
      },
    ],
  },
  Voucher: {
    include: ["branch"],
    columns: [
      {
        field: "series",
        text: "Mã ID",
      },
      {
        field: "name",
        text: "Tên Voucher",
      },
      {
        field: "type",
        text: "Loại",
      },
      {
        field: "fixed",
        text: "Số lượng",
      },
      {
        field: "startDate",
        text: "Ngày bắt đầu",
        formatter: cell => <div>{moment(cell.iso).format("DD-MM-YYYY")}</div>,
      },
      {
        field: "endDate",
        text: "Ngày kết thúc",
        formatter: cell => <div>{moment(cell.iso).format("DD-MM-YYYY")}</div>,
      },
      {
        field: "branch.name",
        text: "Chi nhánh",
      },
    ],
  },
  Promotion: {
    columns: [
      {
        field: "series",
        text: "Mã giảm giá",
      },
      {
        field: "type",
        text: "Loại giảm giá",
      },
      {
        field: "isActive",
        text: "Trạng thái",
        formatter: cell => (cell ? <span>active</span> : <span>Inactive</span>),
      },
      {
        field: "percent",
        text: "Gía trị giảm",
        formatter: cell => <span>{cell ? cell + "%" : ""}</span>,
      },
      {
        field: "fixed",
        text: "Số lượng",
      },
    ],
  },
  Quotation: {
    routingField: "name",
    include: ["customer", "company"],
    columns: [
      {
        field: "title",
        text: "Title",
        sort: true,
      },
      {
        field: "status",
        text: "Status",
        sort: true,
        formatter: cell => <BagdeStatus typeBadge={cell} titleBadge={cell} />,
      },
      {
        field: "date",
        text: "Date",
        sort: true,
      },
      {
        field: "grandTotal",
        text: "Grand Total",
        sort: true,
      },
      {
        field: "name",
        text: "Name",
        sort: true,
      },
    ],
  },
  Appraisal: {
    routingField: "series",
    include: ["appraisalTemplate"],
    columns: [
      {
        field: "series",
        text: "Title",
        sort: true,
      },
      {
        field: "department",
        text: "Department",
        sort: true,
      },
      {
        field: "appraisalTemplate.name",
        text: "Appraisal Template",
        sort: true,
      },
    ],
  },
  AppraisalTemplate: {
    routingField: "name",
    columns: [
      {
        field: "name",
        text: "Title",
        sort: true,
      },
      {
        field: "description",
        text: "Description",
        sort: true,
      },
    ],
  },

  ShiftType: {
    routingField: "name",
    columns: [
      {
        field: "name",
        text: "Name",
        sort: true,
      },
      {
        field: "startTime",
        text: "Start Time",
        sort: true,
      },
      {
        field: "endTime",
        text: "End Time",
        sort: true,
      },
    ],
  },
  SalesOrder: {
    routingField: "name",
    include: ["customer"],
    columns: [
      {
        field: "customer.name",
        text: "Customer Name",
        sort: true,
      },
      {
        field: "status",
        text: "Status",
        sort: true,
        formatter: cell => <BagdeStatus typeBadge={cell} titleBadge={cell} />,
      },
      {
        field: "deliveryDate",
        text: "Delivery Date",
        sort: true,
      },
      {
        field: "grandTotal",
        text: "Grand Total",
        sort: true,
        formatter: cell => <div>{formatNumber(cell)} VND</div>,
      },
      {
        field: "name",
        text: "Name",
        sort: true,
      },
    ],
  },
  Address: {
    routingField: "objectId",
    columns: [
      {
        field: "name",
        text: "Name",
        sort: true,
      },
      {
        field: "status",
        text: "Status",
        sort: true,
      },
      {
        field: "addressType",
        text: "Address Type",
        sort: true,
      },
      {
        field: "cityTown",
        text: "City/Town",
        sort: true,
      },
    ],
  },
  TaxWithholdingCategory: {
    routingField: "name",
    columns: [
      {
        field: "name",
        text: "Name",
        sort: true,
      },
      {
        field: "categoryName",
        text: "Category Name",
        sort: true,
      },
    ],
  },

  Tag: {
    routingField: "tagId",
    columns: [
      {
        field: "name",
        text: "Name",
        sort: true,
      },
    ],
  },
  DailyWorkSummaryGroup: {
    routingField: "series",
    columns: [
      {
        field: "name",
        text: "Name",
        sort: true,
      },
      {
        field: "series",
        text: "Code",
        sort: true,
      },
    ],
  },
  EnergyPointRule: {
    routingField: "name",
    columns: [
      {
        field: "name",
        text: "Name",
        sort: true,
      },

      {
        field: "enabled",
        text: "Enabled",
        sort: true,
        formatter: (cell, row) => {
          return <input type="checkbox" defaultChecked={cell ? true : false} />;
        },
      },
      {
        field: "ruleName",
        text: "Rule Name",
        sort: true,
      },
      {
        field: "condition",
        text: "Condition",
        sort: true,
      },
    ],
  },
  StockAuditSession: {
    columns: [
      {
        field: "auditor",
        text: "Auditor",
      },
      {
        field: "numberAudit",
        text: "Number Audit",
      },
      {
        field: "status",
        text: "Status",
      },
    ],
  },
  StockAuditItem: {
    columns: [
      {
        field: "name",
        text: "Name",
      },
      {
        field: "actualStock",
        text: "Actual Stock",
      },
      {
        field: "current",
        text: "Current",
      },
      {
        field: "difference",
        text: "Difference",
      },
    ],
  },
  EnergyPointLog: {
    routingField: "name",
    columns: [
      {
        field: "user",
        text: "User",
        sort: true,
      },
      {
        field: "status",
        text: "Status",
        sort: true,
        formatter: cell => <BagdeStatus typeBadge={cell} titleBadge={cell} />,
      },
      {
        field: "points",
        text: "Points",
        sort: true,
      },
      {
        field: "referenceDocumentType",
        text: "Reference Document Type",
        sort: true,
      },
      {
        field: "reason",
        text: "Reason",
        sort: true,
      },
    ],
  },
  Supplier: {
    routingField: "name",
    include: ["supplierGroup"],

    columns: [
      {
        field: "name",
        text: "Supplier Name",
        sort: true,
      },
      {
        field: "disabled",
        text: "Status",
        sort: true,
        formatter: cell => {
          return (
            <BagdeStatus
              typeBadge={cell ? "invalid" : "info"}
              titleBadge={cell ? "Disable" : "Enable"}
            />
          );
        },
      },
      {
        field: "supplierGroup.name",
        text: "Supplier Group",
        sort: true,
      },
    ],
  },
  SupplierGroup: {
    routingField: "name",
    include: ["parentSupplierGroup"],
    columns: [
      {
        field: "name",
        text: "Name",
        sort: true,
      },
      {
        field: "isGroup",
        text: "Is Group",
        sort: true,
        formatter: (cell, row) => {
          return <input type="checkbox" defaultChecked={cell ? true : false} />;
        },
      },
      {
        field: "parentSupplierGroup.name",
        text: "Parent Supplier Group",
        sort: true,
      },
    ],
  },
  HolidayList: {
    routingField: "name",
    columns: [
      {
        field: "name",
        text: "Name",
        sort: true,
      },
      {
        field: "fromDate",
        text: "From Date",
        sort: true,
      },
      {
        field: "toDate",
        text: "To Date",
        sort: true,
      },
      {
        field: "totalHolidays",
        text: "Total Holidays",
        sort: true,
      },
    ],
  },
  Driver: {
    routingField: "series",
    include: ["employee"],
    columns: [
      {
        field: "series",
        text: "Name",
        sort: true,
      },
      {
        field: "fullName",
        text: "Full Name",
        sort: true,
      },
      {
        field: "status",
        text: "Status",
        sort: true,
        formatter: cell => {
          return <BagdeStatus typeBadge={cell} titleBadge={cell} />;
        },
      },
      {
        field: "employee.fullName",
        text: "Employee",
        sort: true,
      },
    ],
  },
  Vehicle: {
    routingField: "licensePlate",
    include: ["employee"],
    columns: [
      {
        field: "licensePlate",
        text: "Name",
        sort: true,
      },
      {
        field: "model",
        text: "Model",
        sort: true,
      },

      {
        field: "odometerValue",
        text: "Odometer Value (Last)",
        sort: true,
      },
    ],
  },
  VehicleLog: {
    routingField: "series",
    include: ["licensePlate", "employee", "supplier"],
    columns: [
      {
        field: "series",
        text: "Name",
        sort: true,
      },
      {
        field: "licensePlate.licensePlate",
        text: "License Plate",
        sort: true,
      },
      {
        field: "employee.fullName",
        text: "Employee Name",
        sort: true,
      },
    ],
  },
  LoanType: {
    routingField: "series",

    columns: [
      {
        field: "loanName",
        text: "Name",
        sort: true,
      },
      {
        field: "status",
        text: "Status",
        sort: true,
        formatter: cell => <BagdeStatus typeBadge={cell} titleBadge={cell} />,
      },
    ],
  },
  LoanApplication: {
    routingField: "series",
    include: [
      "applicantForCustomer",
      "applicantForEmployee",
      "company",
      "loanType",
    ],
    columns: [
      {
        field: "series",
        text: "Name",
        sort: true,
      },
      {
        field: "status",
        text: "Status",
        sort: true,
        formatter: cell => <BagdeStatus typeBadge={cell} titleBadge={cell} />,
      },
      {
        field: "company.name",
        text: "Company",
        sort: true,
      },
      {
        field: "loanType.loanName",
        text: "Loan Type",
        sort: true,
      },
      {
        field: "loanAmount",
        text: "Loan Amount",
        sort: true,
      },
      {
        field: "applicant",
        text: "Applicant",
        sort: true,
      },
    ],
  },
  Loan: {
    routingField: "series",
    include: ["company", "loanType"],
    columns: [
      {
        field: "series",
        text: "Name",
        sort: true,
      },
      {
        field: "status",
        text: "Status",
        sort: true,
        formatter: cell => <BagdeStatus typeBadge={cell} titleBadge={cell} />,
      },
      {
        field: "postingDate",
        text: "Posting Date",
        sort: true,
      },
      {
        field: "loanType.loanName",
        text: "Loan Type",
        sort: true,
      },
    ],
  },
  LoanSecurityPledge: {
    routingField: "series",
    include: [
      "applicantForCustomer",
      "applicantForEmployee",
      "company",
      "loan",
      "loanApplication",
    ],
    columns: [
      {
        field: "series",
        text: "Name",
        sort: true,
      },

      {
        field: "company.name",
        text: "Company",
        sort: true,
      },
      {
        field: "status",
        text: "Status",
        sort: true,
        formatter: cell => <BagdeStatus typeBadge={cell} titleBadge={cell} />,
      },
      {
        field: "loan.series",
        text: "Loan",
        sort: true,
      },

      {
        field: "loanApplication.series",
        text: "Loan Application",
        sort: true,
      },
    ],
  },
  LoanSecurityUnpledge: {
    routingField: "series",
    include: [
      "applicantForCustomer",
      "applicantForEmployee",
      "company",
      "loan",
    ],
    columns: [
      {
        field: "series",
        text: "Name",
        sort: true,
      },
      {
        field: "company.name",
        text: "Company",
        sort: true,
      },
      {
        field: "status",
        text: "Status",
        sort: true,
        formatter: cell => <BagdeStatus typeBadge={cell} titleBadge={cell} />,
      },
      {
        field: "loan.series",
        text: "Loan",
        sort: true,
      },
    ],
  },
  SalesPartner: {
    routingField: "name",
    include: ["territory"],
    columns: [
      {
        field: "name",
        text: "Name",
        sort: true,
      },
      {
        field: "partnerType",
        text: "Partner Type",
        sort: true,
      },
      {
        field: "territory.name",
        text: "Territory",
        sort: true,
      },
    ],
  },
  LoanRepayment: {
    routingField: "name",
    include: ["againstLoan", "applicant"],
    columns: [
      {
        field: "name",
        text: "Name",
        sort: true,
      },
      {
        field: "status",
        text: "Status",
        sort: true,
        formatter: cell => <BagdeStatus typeBadge={cell} titleBadge={cell} />,
      },
      {
        field: "againstLoan.applicant",
        text: "Applicant",
        sort: true,
      },
      {
        field: "againstLoan.series",
        text: "Against Loan",
        sort: true,
      },
      {
        field: "postingDate",
        text: "Posting Date",
        sort: true,
      },
    ],
  },
  LoanWriteOff: {
    routingField: "name",
    include: ["loan", "company", ""],
    columns: [
      {
        field: "name",
        text: "Name",
        sort: true,
      },
      {
        field: "status",
        text: "Status",
        sort: true,
        formatter: cell => <BagdeStatus typeBadge={cell} titleBadge={cell} />,
      },
      {
        field: "loan.series",
        text: "Loan",
        sort: true,
      },
      {
        field: "company",
        text: "Company",
        sort: true,
      },
      {
        field: "postingDate",
        text: "Posting Date",
        sort: true,
      },
    ],
  },
  BankAccountType: {
    routingField: "name",
    columns: [
      {
        field: "name",
        text: "Name",
        sort: true,
      },
    ],
  },
  BankAccountSubtype: {
    routingField: "name",
    columns: [
      {
        field: "name",
        text: "Name",
        sort: true,
      },
    ],
  },
  Account: {
    routingField: "objectId",
    columns: [
      {
        field: "name",
        text: "Name",
        sort: true,
      },
      {
        field: "code",
        text: "Account Name",
        sort: true,
      },
      {
        field: "type",
        text: "Type",
        sort: true,
      },
    ],
  },
  ShiftAssignment: {
    routingField: "name",
    include: ["employee", "shiftType"],
    columns: [
      {
        field: "employee.fullName",
        text: "Employee Name",
        sort: true,
      },
      {
        field: "status",
        text: "Status",
        sort: true,
      },
      {
        field: "shiftType.name",
        text: "Shift Type",
        sort: true,
      },
      {
        field: "startDate",
        text: "Start Date",
        sort: true,
      },
      {
        field: "name",
        text: "Name",
        sort: true,
      },
    ],
  },
  LoanSecurityType: {
    routingField: "name",
    columns: [
      {
        field: "name",
        text: "Name",
        sort: true,
      },
      {
        field: "disabled",
        text: "Status",
        sort: true,
        formatter: cell => (
          <BagdeStatus
            typeBadge={cell ? "invalid" : "active"}
            titleBadge={cell ? "Disabled" : "Enable"}
          />
        ),
      },
    ],
  },
  LoanSecurity: {
    routingField: "name",
    columns: [
      {
        field: "name",
        text: "Name",
        sort: true,
      },
      {
        field: "disabled",
        text: "Status",
        sort: true,
        formatter: cell => (
          <BagdeStatus
            typeBadge={cell ? "invalid" : "active"}
            titleBadge={cell ? "Disabled" : "Enable"}
          />
        ),
      },
    ],
  },
  LoanSecurityPrice: {
    routingField: "series",
    include: ["loanSecurity"],

    columns: [
      {
        field: "series",
        text: "Name",
        sort: true,
      },
      {
        field: "loanSecurity.name",
        text: "Loan Security",
        sort: true,
      },
      {
        field: "loanSecurityPrice",
        text: "Loan Security Price",
        sort: true,
      },
    ],
  },

  Contract: {
    routingField: "code",
    include: [
      "employee",
      "partyNameCustomer",
      "partyNameEmployee",
      "partyNameSupplier",
    ],
    columns: [
      {
        field: "employee.fullName",
        text: "Name",
        formatter: (cell, row) => {
          let partyName = "";
          if (row.partyType === "customer")
            partyName = row.partyNameCustomer.name;
          if (row.partyType === "supplier")
            partyName = row.partyNameSupplier.name;
          if (row.partyType === "employee")
            partyName = row.partyNameEmployee.fullName;

          return <div>{row.partyType ? partyName : cell}</div>;
        },
        sort: true,
      },
      {
        field: "isActive",
        text: "Status",
        formatter: cell => (
          <BagdeStatus
            typeBadge={cell ? "Active" : "InActive"}
            titleBadge={cell ? "Active" : "InActive"}
          />
        ),
        sort: true,
      },
      {
        field: "startDate",
        text: "Start Date",
        formatter: cell => <div>{moment(cell.iso).format("DD-MM-YYYY")}</div>,
        sort: true,
      },
      {
        field: "type",
        text: "Type",
        sort: true,
      },
      {
        field: "code",
        text: "Name",
        sort: true,
      },
    ],
  },
  LoanDisbursement: {
    routingField: "series",
    include: ["company", "againstLoan"],
    columns: [
      {
        field: "series",
        text: "Name",
        sort: true,
      },
      {
        field: "againstLoan.series",
        text: "Against Loan",
        sort: true,
      },
      {
        field: "applicantType",
        text: "Applicant Type",
        sort: true,
      },
    ],
  },
  BankAccount: {
    routingField: "name",
    include: ["company", "companyAccount"],
    columns: [
      {
        field: "name",
        text: "Name",
        sort: true,
      },
      {
        field: "accountName",
        text: "Account Name",
        sort: true,
      },
      {
        field: "companyAccount.name",
        text: "Company Account",
        sort: true,
      },
    ],
  },

  Bank: {
    routingField: "bankName",
    columns: [
      {
        field: "bankName",
        text: "Name",
        sort: true,
      },
      {
        field: "swiftNumber",
        text: "SWIFT number",
        sort: true,
      },
    ],
  },
  ProcessLoanInterestAccrual: {
    routingField: "series",
    columns: [
      {
        field: "series",
        text: "Name",
        sort: true,
      },
      {
        field: "postingDate",
        text: "Posting Date",
        sort: true,
      },
    ],
  },
  ProcessLoanSecurityShortfall: {
    routingField: "series",
    columns: [
      {
        field: "series",
        text: "Name",
        sort: true,
      },
      {
        field: "updateTime",
        text: "Update Time",
        sort: true,
      },
    ],
  },
  PaymentTerm: {
    routingField: "series",
    columns: [
      {
        field: "name",
        text: "Name",
        sort: true,
      },
    ],
  },
  FiscalYear: {
    routingField: "name",
    columns: [
      {
        field: "name",
        text: "Year Name",
        sort: true,
      },
      {
        field: "isDisabled",
        text: "Status",
        formatter: cell => (
          <BagdeStatus
            typeBadge={cell ? "Disabled" : "Enabled"}
            titleBadge={cell ? "Disabled" : "Enabled"}
          />
        ),
        sort: true,
      },
      {
        field: "yearStartDate.iso",
        text: "Year Start Date",
        formatter: cell => moment(cell).format("DD-MM-YYYY"),
        sort: true,
      },
      {
        field: "yearEndDate.iso",
        text: "Year End Date",
        formatter: cell => moment(cell).format("DD-MM-YYYY"),
        sort: true,
      },
    ],
  },
  AccountingDimension: {
    routingField: "refDocumentType",
    columns: [
      {
        field: "refDocumentType",
        text: "Name",
        sort: true,
      },
      {
        field: "isDisabled",
        text: "Status",
        formatter: cell => (
          <BagdeStatus
            typeBadge={cell ? "Disabled" : "Enabled"}
            titleBadge={cell ? "Disabled" : "Enabled"}
          />
        ),
        sort: true,
      },
      {
        field: "dimensionName",
        text: "Dimension Name",
        sort: true,
      },
    ],
  },

  JournalEntryTemplate: {
    routingField: "title",
    include: ["company"],
    columns: [
      {
        field: "title",
        text: "Template Title",
        sort: true,
      },
      {
        field: "type",
        text: "Journal Entry Type",
        sort: true,
      },
      {
        field: "company.name",
        text: "Company",
        sort: true,
      },
    ],
  },
  QualityInspection: {
    routingField: "series",
    columns: [
      {
        text: "Name",
        field: "series",
        sort: true,
      },
      {
        text: "Status",
        field: "status",
        sort: true,
        formatter: cell => <BagdeStatus typeBadge={cell} titleBadge={cell} />,
      },
      {
        text: "Report Date",
        field: "reportDate",
        sort: true,
        formatter: cell => <span>{moment(cell.iso).format("YYYY-MM-DD")}</span>,
      },
      {
        text: "Inspection Type",
        field: "inspectionType",
        sort: true,
      },
      {
        text: "Reference Name",
        field: "referenceName",
        sort: true,
      },
    ],
  },
  Category: {
    routingField: "name",
    tableName: "Danh mục nhóm hàng hóa",
    columns: [
      {
        field: "name",
        text: "Tên",
        sort: true,
        search: "string",
      },
      {
        text: "Số lượng mặt hàng",
        field: "productCount",
        type: "number",
        privateUrl: `/parse/aggregate/Product?group={"objectId": "$category", "productCount":{"$sum":1} }`,
      },
    ],
  },
  Product: {
    routingField: "objectId",
    include: ["category"],
    columns: [
      {
        text: "ID",
        field: "productId",
        sort: true,
      },
      {
        text: "Product Name",
        field: "name",
        sort: true,
        width: 250,
      },
      {
        text: "Price",
        field: "sellingPrice",
        sort: true,
        formatter: cell => <div>{formatNumber(cell)} VND</div>,
      },
      {
        text: "Category",
        field: "category.name",
        sort: true,
      },
      {
        text: "Status",
        field: "status",
        sort: true,
        formatter: cell => <BagdeStatus typeBadge={cell} titleBadge={cell} />,
      },
      {
        text: "Created At",
        field: "createdAt",
        sort: true,
        formatter: cell => (
          <span>{moment(cell).format("YYYY-DD-MM HH:mm")}</span>
        ),
      },
    ],
  },
  Customer: {
    routingField: "objectId",
    columns: [
      {
        text: "Customer ID",
        field: "customerId",
        sort: true,
      },
      {
        text: "Customer Name",
        field: "fullName",
        sort: true,
      },
      {
        text: "Phone Number",
        field: "mobileNo",
        sort: true,
      },
      {
        text: "Status",
        field: "status",
        sort: true,
        formatter: cell => <BagdeStatus typeBadge={cell} titleBadge={cell} />,
      },
    ],
  },
  Post: {
    routingField: "objectId",
    include: ["category", "createdBy"],
    columns: [
      {
        text: "Title",
        field: "title",
        sort: true,
        width: 300,
      },
      {
        text: "Category",
        field: "category.Name",
        sort: true,
      },
      {
        text: "Created By",
        field: "createdBy.fullName",
        sort: true,
      },
      {
        text: "Status",
        field: "status",
        sort: true,
        formatter: cell => <BagdeStatus typeBadge={cell} titleBadge={cell} />,
      },
      {
        text: "Created At",
        field: "createdAt",
        sort: true,
        formatter: cell => (
          <span>{moment(cell).format("YYYY-DD-MM HH:mm")}</span>
        ),
      },
    ],
  },
  AgentReport: {
    routingField: "series",
    columns: [
      {
        field: "agency",
        text: "Đại lý",
        sort: true,
        search: "text",
      },
      {
        field: "quantity",
        text: "Số chỉ vàng",
        sort: true,
        search: "text",
      },
    ],
  },
  EmployeeReport: {
    routingField: "series",
    columns: [
      {
        field: "employeeId",
        text: "Mã NV",
        sort: true,
        search: "text",
      },
      {
        field: "fullName",
        text: "Tên nhân viên",
        sort: true,
        search: "text",
      },
      {
        field: "numberOfNewGuests",
        text: "Số khách mới",
        sort: true,
        search: "text",
      },
      {
        field: "numberOfContracts",
        text: "Số lượng hợp đồng",
        sort: true,
        search: "text",
      },
      {
        field: "numberOfContracts",
        text: "Số lượng hợp đồng",
        sort: true,
        search: "text",
      },
      {
        field: "turnover",
        text: "Doanh thu",
        sort: true,
        search: "text",
      },
    ],
  },
  CustomerReport: {
    routingField: "series",
    columns: [
      {
        field: "customerId",
        text: "Mã KH",
        sort: true,
        search: "text",
      },
      {
        field: "customerName",
        text: "Tên khách hàng",
        sort: true,
        search: "text",
      },
      {
        field: "customerResources",
        text: "Nguồn khách hàng",
        sort: true,
        search: "text",
      },
    ],
  },
  ProductCategory: {
    routingField: "objectId",
    columns: [
      {
        text: "Product Category",
        field: "name",
        sort: true,
      },
      {
        text: "Status",
        field: "isActive",
        sort: true,
        formatter: cell => (
          <BagdeStatus
            typeBadge={cell ? "Active" : "Inactive"}
            titleBadge={cell ? "Active" : "Inactive"}
          />
        ),
      },
      {
        text: "Created At",
        field: "createdAt",
        sort: true,
      },
    ],
  },
};

export const COLUMNS_TABLE = [
  {
    path: "employee",
    columnsPage: [
      {
        dataField: "fullName",
        text: "Full Name",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        dataField: "designation",
        text: "Designation",
        sort: true,
      },
      {
        dataField: "series",
        text: "Name",
        sort: true,
      },
    ],
  },

  {
    path: "projects",
    columnsPage: [
      {
        dataField: "id",
        text: "Id",
        sort: true,
      },
      {
        dataField: "fullName",
        text: "Full Name",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },

      {
        dataField: "startdate",
        text: "Start Date",
        sort: true,
      },
    ],
  },
  {
    path: "department/view/tree",
    columnsPage: [
      {
        dataField: "department",
        text: "Department",
        sort: true,
      },
    ],
  },
  {
    path: "leave-application",
    columnsPage: [
      {
        dataField: "employee.firstName",
        text: "Employee Name",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        dataField: "fromDate",
        text: "From Date",
        sort: true,
      },
      {
        dataField: "totalLeaveDays",
        text: "Total Leave Days",
        sort: true,
      },
      {
        dataField: "series",
        text: "Name",
        sort: true,
      },
    ],
  },
  {
    path: "attendance",
    columnsPage: [
      {
        dataField: "fullName",
        text: "Employee Name",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        dataField: "attendanceDate",
        text: "Attendance Date",
        sort: true,
        formatter: (cell, row) => <span>{row.date.iso.slice(0, 10)}</span>,
      },
      {
        dataField: "series",
        text: "Name",
        sort: true,
      },
    ],
  },

  {
    path: "job-applicant",
    columnsPage: [
      {
        dataField: "id",
        text: "Id",
        sort: true,
      },
      {
        dataField: "name",
        text: "Application Name",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        dataField: "rate",
        text: "Rate",
        sort: true,
      },
      {
        dataField: "jobOpening.jobTitle",
        text: "Job Opening",
        sort: true,
      },
    ],
  },
  {
    path: "query-report/Monthly Attendance Sheet",
    columnsPage: [
      {
        dataField: "id",
        text: "Id",
        sort: true,
      },
      {
        dataField: "fullName",
        text: "Application Name",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        dataField: "jobOpen",
        text: "Job Opening",
        sort: true,
      },
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
    ],
  },
  {
    path: "employment-type",
    columnsPage: [
      {
        dataField: "employmentType",
        text: "Employment Type",
        sort: true,
      },
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
    ],
  },
  {
    path: "branch",
    columnsPage: [
      {
        dataField: "id",
        text: "No",
        sort: true,
      },
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "branch",
        text: "Branch",
        sort: true,
      },
    ],
  },
  {
    path: "designation",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "designation",
        text: "Designation",
        sort: true,
      },
    ],
  },
  {
    path: "employee-grade",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
    ],
  },
  {
    path: "employee-group",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
    ],
  },
  {
    path: "employee-health-insurance",
    columnsPage: [
      {
        dataField: "name",
        text: "Health Insurance Name",
        sort: true,
      },
    ],
  },
  {
    path: "employee-onboarding",
    columnsPage: [
      {
        dataField: "employeeName",
        text: "Employee Name",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },

      {
        dataField: "dateOfJoining.iso",
        text: "Date of Joining",
        sort: true,
        formatter: (cell, row) => <p>{cell.slice(0, 10)}</p>,
      },
      {
        dataField: "department",
        text: "Department",
        sort: true,
      },
      {
        dataField: "designation",
        text: "Designation",
        sort: true,
      },
      {
        dataField: "series",
        text: "Name",
        sort: true,
      },
    ],
  },
  {
    path: "employee-skill-map",
    columnsPage: [
      {
        dataField: "employee.firstName",
        text: "Employee Name",
        sort: true,
      },
      {
        dataField: "employee.employeeId",
        text: "Name",
        sort: true,
      },
    ],
  },
  {
    path: "employee-promotion",
    columnsPage: [
      {
        dataField: "employee.firstName",
        text: "Employee Name",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        dataField: "employee.employeeId",
        text: "Employee",
        sort: true,
      },
    ],
  },
  {
    path: "employee-transfer",
    columnsPage: [
      {
        dataField: "employee.firstName",
        text: "Employee Name",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        dataField: "employee.series",
        text: "EmployeeId",
        sort: true,
      },
      {
        dataField: "series",
        text: "Name",
        sort: true,
      },
    ],
  },
  {
    path: "grievance-type",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "description",
        text: "Description",
        sort: true,
      },
    ],
  },
  {
    path: "shift-type",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "startTime",
        text: "Start Time",
        sort: true,
      },
      {
        dataField: "endTime",
        text: "End Time",
        sort: true,
      },
    ],
  },
  {
    path: "shift-request",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "employee.firstName",
        text: "Employee Name",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        dataField: "employeeId",
        text: "Employee",
        sort: true,
      },
      {
        dataField: "shiftType.name",
        text: "Shift Type",
        sort: true,
      },
      {
        dataField: "company.name",
        text: "Company",
        sort: true,
      },
      {
        dataField: "fromDate",
        text: "From Date",
        sort: true,
      },
      {
        dataField: "toDate",
        text: "To Date",
        sort: true,
      },
    ],
  },
  {
    path: "employee-grievance",
    columnsPage: [
      {
        dataField: "subject",
        text: "Subject",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        dataField: "date",
        text: "Date",
        sort: true,
      },
      {
        dataField: "grievanceAgainstParty",
        text: "Grievance Against Party",
        sort: true,
      },
      {
        dataField: "grievanceType",
        text: "Grievance Type",
        sort: true,
      },
      {
        dataField: "series",
        text: "Name",
        sort: true,
      },
    ],
  },
  {
    path: "shift-assignment",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "employee.employeeId",
        text: "Employee Name",
        sort: true,
      },

      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        dataField: "shiftType.name",
        text: "Shift Type",
        sort: true,
      },
      {
        dataField: "startDate",
        text: "Start Date",
        sort: true,
      },
      {
        dataField: "endDate",
        text: "End Date",
        sort: true,
      },
    ],
  },
  {
    path: "employee-separation",
    columnsPage: [
      {
        dataField: "employee.firstName",
        text: "Employee Name",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        dataField: "employee.departmentAndGrade.department",
        text: "Department",
        sort: true,
      },
      {
        dataField: "employee.departmentAndGrade.designation",
        text: "Designation",
        sort: true,
      },
      {
        dataField: "resignationLetterDate",
        text: "Resignation Letter Date",
        sort: true,
      },
      {
        dataField: "series",
        text: "Name",
        sort: true,
      },
    ],
  },
  {
    path: "holiday-list",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "fromDate",
        text: "From Date",
        sort: true,
      },
      {
        dataField: "toDate",
        text: "To Date",
        sort: true,
      },
      {
        dataField: "totalHolidays",
        text: "Total Holidays",
        sort: true,
      },
    ],
  },
  {
    path: "leave-type",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "leaveTypeName",
        text: "Leave Type Name",
        sort: true,
      },
      {
        dataField: "maximumContinuousDaysApplicable",
        text: "Maximum Continuous Days Applicable",
        sort: true,
      },
      {
        dataField: "isCarryForward",
        text: "Is Carry Forward",
      },
    ],
  },
  {
    path: "holiday-list",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "fromDate",
        text: "From Date",
        sort: true,
      },
      {
        dataField: "toDate",
        text: "To Date",
        sort: true,
      },
      {
        dataField: "totalHolidays",
        text: "Total Holidays",
        sort: true,
      },
    ],
  },
  {
    path: "employee-onboarding-template",
    columnsPage: [
      {
        dataField: "designation",
        text: "Designation",
        sort: true,
      },
      {
        dataField: "department",
        text: "Department",
        sort: true,
      },
      {
        dataField: "employeeGrade.name",
        text: "Employee Grade",
        sort: true,
      },
      {
        dataField: "series",
        text: "Name",
        sort: true,
      },
    ],
  },
  {
    path: "employee-separation-template",
    columnsPage: [
      {
        dataField: "designation",
        text: "Designation",
        sort: true,
      },
      {
        dataField: "department",
        text: "Department",
        sort: true,
      },
      {
        dataField: "employeeGrade.name",
        text: "Employee Grade",
        sort: true,
      },
      {
        dataField: "series",
        text: "Name",
        sort: true,
      },
    ],
  },
  {
    path: "leave-period",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "fromDate",
        text: "From Date",
        sort: true,
      },
      {
        dataField: "toDate",
        text: "To Date",
        sort: true,
      },

      {
        dataField: "company.name",
        text: "Company",
        sort: true,
      },
    ],
  },
  {
    path: "leave-policy",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
    ],
  },

  {
    path: "leave-policy-assignment",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        dataField: "employee.employeeId",
        text: "Employee",
        sort: true,
      },
      {
        dataField: "leavePolicy.name",
        text: "Leave Policy",
        sort: true,
      },
    ],
  },
  {
    path: "leave-allocation",
    columnsPage: [
      {
        dataField: "id",
        text: "No",
        sort: true,
      },
      {
        dataField: "series",
        text: "Name",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        dataField: "employee.employeeId",
        text: "Employee",
        sort: true,
      },
      {
        dataField: "employee.firstName",
        text: "Employee Name",
        sort: true,
      },
      {
        dataField: "leaveType.name",
        text: "Leave Type",
        sort: true,
      },
    ],
  },
  {
    path: "leave-encashment",
    columnsPage: [
      {
        dataField: "id",
        text: "No",
        sort: true,
      },
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        dataField: "leavePeriod.name",
        text: "Leave Period",
        sort: true,
      },
      {
        dataField: "employee.employeeId",
        text: "Employee",
        sort: true,
      },
      {
        dataField: "leaveType.name",
        text: "Leave Type",
        sort: true,
      },
    ],
  },
  {
    path: "leave-block-list",
    columnsPage: [
      {
        dataField: "id",
        text: "No",
        sort: true,
      },
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "leaveBlockListName",
        text: "Leave BLock List Name",
        sort: true,
      },
      {
        dataField: "company.name",
        text: "Company",
        sort: true,
      },
      {
        dataField: "appliesToCompany",
        text: "Applies to Company",
      },
    ],
  },
  {
    path: "compensatory-leave-request",
    columnsPage: [
      {
        dataField: "id",
        text: "No",
        sort: true,
      },
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        dataField: "employee.employeeId",
        text: "Employee",
        sort: true,
      },
    ],
  },
  {
    path: "attendance-request",
    columnsPage: [
      {
        dataField: "employee.firstName",
        text: "Employee Name",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        dataField: "employee.employeeId",
        text: "EmployeeId",
        sort: true,
      },
      {
        dataField: "fromDate",
        text: "From Date",
        sort: true,
      },
      {
        dataField: "toDate",
        text: "To Date",
        sort: true,
      },
      {
        dataField: "reason",
        text: "Reason",
        sort: true,
      },
    ],
  },
  {
    path: "employee-checkin",
    columnsPage: [
      {
        dataField: "employeeName",
        text: "Employee Name",
        sort: true,
      },
      {
        dataField: "logType",
        text: "Log Type",
        sort: true,
      },
      {
        dataField: "time",
        text: "Time",
        sort: true,
      },
    ],
  },
  {
    path: "job-opening",
    columnsPage: [
      {
        dataField: "jobTitle",
        text: "Job Title",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        dataField: "department",
        text: "Department",
        sort: true,
      },
    ],
  },
  {
    path: "job-applicant-source",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
    ],
  },
  {
    path: "job-offer",
    columnsPage: [
      {
        dataField: "id",
        text: "No",
        sort: true,
      },
      {
        dataField: "jobApplicant.name",
        text: "Applicant Name",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        dataField: "designation",
        text: "Designation",
        sort: true,
      },
      {
        dataField: "company.name",
        text: "Company",
        sort: true,
      },
      {
        dataField: "series",
        text: "Name",
        sort: true,
      },
    ],
  },
  {
    path: "department",
    columnsPage: [
      {
        dataField: "id",
        text: "No",
        sort: true,
      },
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        dataField: "department",
        text: "Department",
        sort: true,
      },
      {
        dataField: "parentDepartment",
        text: "Parent Department",
        sort: true,
      },
      {
        dataField: "isGroup",
        text: "Is Group",
        formatter: (cell, row) => (
          <input type="checkbox" checked={row?.isGroup} disabled />
        ),
      },
    ],
  },
  {
    path: "terms-and-conditions",
    columnsPage: [
      {
        dataField: "id",
        text: "No",
        sort: true,
      },
      {
        dataField: "title",
        text: "Name",
        sort: true,
      },
      {
        dataField: "disable",
        text: "Status",
      },
      {
        dataField: "disabled",
        text: "Disabled",
      },
    ],
  },
];

export const DATA_DEPARTMENT_TREE = [
  {
    id: 1,
    department: "Accounts - T",
  },
  {
    id: 2,
    department: "Accounts - T2",
  },
  {
    id: 3,
    department: "Accounts - vb",
  },
  {
    id: 4,
    department: "Customer Service - T",
  },
  {
    id: 5,
    department: "Customer Service - T2",
  },
  {
    id: 6,
    department: "Customer Service - vb",
  },
  {
    id: 7,
    department: "Dispatch - T",
  },
  {
    id: 8,
    department: "Dispatch - T",
  },
  {
    id: 9,
    department: "Dispatch - vb",
  },
  {
    id: 10,
    department: "Human Resources - T",
  },
  {
    id: 11,
    department: "Human Resources - T2",
  },
  {
    id: 12,
    department: "Human Resources - vb",
  },
  {
    id: 13,
    department: "Legal - T",
  },
  {
    id: 14,
    department: "Legal - T2",
  },
  {
    id: 15,
    department: "Legal - vb",
  },
  {
    id: 16,
    department: "Management - T",
  },
  {
    id: 17,
    department: "Management - T2",
  },
  {
    id: 18,
    department: "Management - vb",
  },
  {
    id: 19,
    department: "Marketing - T",
  },
  {
    id: 20,
    department: "Marketing - T2",
  },
  {
    id: 21,
    department: "Marketing - vb",
  },
  {
    id: 22,
    department: "Operations - T",
  },
  {
    id: 23,
    department: "Operations - T2",
  },
  {
    id: 24,
    department: "Operations - vb",
  },
  {
    id: 25,
    department: "Legal - vb",
  },
  {
    id: 26,
    department: "Legal - vb",
  },
  {
    id: 27,
    department: "Legal - vb",
  },
];

export const DATA_TABLE_LEAVEAPPLICATION = [];

export const DATA_EMPLOYMENT_TYPE = [
  {
    id: 1,
    fullName: "Apprentice",
    employmentType: "Apprentice",
    name: "Apprentice",
    action: "",
  },
  {
    id: 2,
    fullName: "Intern",
    employmentType: "Intern",
    name: "Intern",
    action: "",
  },
  {
    id: 13,
    fullName: "Piecework",
    employmentType: "Piecework",
    name: "Piecework",
    action: "",
  },
  {
    id: 4,
    fullName: "Commission",
    employmentType: "Commission",
    name: "Commission",
    action: "",
  },
  {
    id: 5,
    fullName: "Contract",
    employmentType: "Contract",
    name: "Contract",
    action: "",
  },
  {
    id: 6,
    fullName: "Probation",
    employmentType: "Probation",
    name: "Probation",
    action: "",
  },
  {
    id: 7,
    fullName: "Part-time",
    employmentType: "Part-time",
    name: "Part-time",
    action: "",
  },
  {
    id: 8,
    fullName: "Full-time",
    employmentType: "Full-time",
    name: "Full-time",
    action: "",
  },
];
export const DATA_BRANCH = [
  {
    id: 1,
    fullName: "Ha Noi",
    branch: "Ha Noi",
    name: "Ha Noi",
    action: "",
  },
  {
    id: 2,
    fullName: "Ho Chi Minh",
    branch: "Ho Chi Minh",
    name: "Ho Chi Minh",
    action: "",
  },
];
export const DATA_DESIGNATION = [
  {
    id: 1,
    fullName: "Researcher",
    designation: "Researcher",
    name: "Researcher",
    action: "",
  },
  {
    id: 2,
    fullName: "Designer",
    designation: "Designer",
    name: "Designer",
    action: "",
  },
  {
    id: 3,
    fullName: "Software Developer",
    designation: "Software Developer",
    name: "Software Developer",
    action: "",
  },
  {
    id: 4,
    fullName: "Head of Marketing and Sales",
    designation: "Head of Marketing and Sales",
    name: "Head of Marketing and Sales",
    action: "",
  },
  {
    id: 5,
    fullName: "Project Manager",
    designation: "Project Manager",
    name: "Project Manager",
    action: "",
  },
  {
    id: 6,
    fullName: "HR Manager",
    designation: "HR Manager",
    name: "HR Manager",
    action: "",
  },
  {
    id: 7,
    fullName: "Business Development Manager",
    designation: "Business Development Manager",
    name: "Business Development Manager",
    action: "",
  },
  {
    id: 8,
    fullName: "Administrative Officer",
    designation: "Administrative Officer",
    name: "Administrative Officer",
    action: "",
  },
  {
    id: 9,
    fullName: "Associate",
    designation: "Associate",
    name: "Associate",
    action: "",
  },
  {
    id: 10,
    fullName: "Secretary",
    designation: "Secretary",
    name: "Secretary",
    action: "",
  },
  {
    id: 11,
    fullName: "Accountant",
    designation: "Accountant",
    name: "Accountant",
    action: "",
  },
  {
    id: 12,
    fullName: "Engineer",
    designation: "Engineer",
    name: "Engineer",
    action: "",
  },
  {
    id: 13,
    fullName: "Analyst",
    designation: "Analyst",
    name: "Analyst",
    action: "",
  },
  {
    id: 14,
    fullName: "Manager",
    designation: "Manager",
    name: "Manager",
    action: "",
  },
  {
    id: 15,
    fullName: "CEO",
    designation: "CEO",
    name: "CEO",
    action: "",
  },
];

export const TITLE_STATUS = {
  employee: "employee",
  employmentType: "employment-type",
  designation: "designation",
  branch: "branch",
  employeeGrade: "employee-grade",
  project: "project",
  projectType: "project-type",
  activityType: "activity-type",
  employeeGroup: "employee-group",
  employeeHealthInsurance: "employee-health-insurance",
  departmentTree: "tree",
  shiftType: "shift-type",
  employeeSeparation: "employee-separation",
  jobApplicantSource: "job-applicant-source",
};

export const DATA_TABLE_COMMON = [
  {
    tableName: "Educational Qualification",
    columns: [
      {
        dataField: "school",
        text: "School/University",
      },
      {
        dataField: "qualification",
        text: "Qualification",
      },
      {
        dataField: "level",
        text: "Level",
        editor: {
          type: Type.SELECT,
          options: [
            {
              label: "Graduate",
              value: "Graduate",
            },
            {
              label: "Post Graduate",
              value: "Post Graduate",
            },
            {
              label: "Under Graduate",
              value: "Under Graduate",
            },
          ],
        },
      },
      {
        dataField: "yearOfPassing",
        text: "Year of Passing",
      },
    ],
  },
  {
    tableName: "Previous Work Experience",
    columns: [
      {
        dataField: "company",
        text: "Company",
      },
      {
        dataField: "designation",
        text: "Designation",
      },
      {
        dataField: "salary",
        text: "Salary",
      },
      {
        dataField: "address",
        text: "Address",
      },
    ],
  },
  {
    tableName: "History In Company",
    columns: [
      {
        dataField: "branch",
        text: "Branch",
      },
      {
        dataField: "department",
        text: "Department",
      },
      {
        dataField: "designation",
        text: "Designation",
      },
      {
        dataField: "fromDate",
        text: "From Date",
        editor: {
          type: Type.DATE,
        },
      },
      {
        dataField: "toDate",
        text: "To Date",
        editor: {
          type: Type.DATE,
        },
      },
    ],
  },
  {
    tableName: "Activities",
    columns: [
      {
        dataField: "activityName",
        text: "Activity Name",
      },
      {
        dataField: "user",
        text: "User",
      },
      {
        dataField: "role",
        text: "Role",
        editor: {
          type: Type.SELECT,
          options: [
            {
              label: "Guest",
              value: "Guest",
            },
            {
              label: "System Manager",
              value: "System Manager",
            },
            {
              label: "All",
              value: "All",
            },
            {
              label: "Administrator",
              value: "Administrator",
            },
            {
              label: "Website Manager",
              value: "Website Manager",
            },
            {
              label: "Dashboard Manager",
              value: "Dashboard Manager",
            },
            {
              label: "Script Manager",
              value: "Script Manager",
            },
          ],
        },
      },
    ],
  },
  {
    tableName: "Employee Skills",
    columns: [
      {
        dataField: "skill",
        text: "Skill",
        editor: {
          type: Type.SELECT,
          options: [
            {
              label: "Front-end",
              value: "frontEnd",
            },
            {
              label: "Back-end",
              value: "backEnd",
            },
            {
              label: "Full-stack",
              value: "fullStack",
            },
          ],
        },
      },
      {
        dataField: "proficiency",
        text: "Proficiency",
      },
      {
        dataField: "evaluationDate",
        text: "Evaluation Date",
        editor: {
          type: Type.DATE,
        },
      },
    ],
  },
  {
    tableName: "Trainings",
    columns: [
      {
        dataField: "training",
        text: "Training",
        editor: {
          type: Type.SELECT,
          options: [
            {
              label: "training",
              value: "Training",
            },
          ],
        },
      },
      {
        dataField: "trainingDate",
        text: "Training Date",
        editor: {
          type: Type.DATE,
        },
      },
    ],
  },
  {
    tableName: "Employee Promotion Detail",
    columns: [
      {
        dataField: "property",
        text: "Property",
        editor: {
          type: Type.SELECT,
          options: [
            {
              label: "training",
              value: "Training",
            },
          ],
        },
      },
      {
        dataField: "current",
        text: "Current",
      },
      {
        dataField: "new",
        text: "New",
      },
    ],
  },
  {
    tableName: "Leave Policy Details",
    columns: [
      {
        dataField: "leaveType",
        text: "Leave Type",
        editor: {
          type: Type.SELECT,
          options: [
            {
              label: "Leave Type",
              value: "leaveType",
            },
          ],
        },
      },
      {
        dataField: "annualAllocation",
        text: "Annual Allocation",
      },
    ],
  },
  {
    tableName: "Leave Block List Dates",
    columns: [
      {
        dataField: "blockDate",
        text: "Block Date",
        editor: {
          type: Type.DATE,
        },
      },
      {
        dataField: "reason",
        text: "Reason",
      },
    ],
  },
  {
    tableName: "Leave Block List Allowed",
    columns: [
      {
        dataField: "allowUser",
        text: "Allow User",
        editor: {
          type: Type.SELECT,
          options: [{ label: "user", value: "user" }],
        },
      },
    ],
  },
  {
    tableName: "Employee-group/employee",
    columns: [
      {
        dataField: "employee",
        text: "Employee",
      },
      {
        dataField: "employeeName",
        text: "Employee Name",
      },
    ],
  },
  {
    tableName: "Job Offer Terms",
    columns: [
      {
        dataField: "offerTerm",
        text: "Offer Term",
      },
      {
        dataField: "value",
        text: "Value / Description",
      },
    ],
  },
  {
    tableName: "Leave Approver",
    columns: [
      {
        dataField: "no",
        text: "No.",
      },
      {
        dataField: "approver",
        text: "Approver",
      },
    ],
  },
  {
    tableName: "Expense Approver",
    columns: [
      {
        dataField: "no",
        text: "No.",
      },
      {
        dataField: "approver",
        text: "Approver",
      },
    ],
  },
  {
    tableName: "Shift Request Approver",
    columns: [
      {
        dataField: "no",
        text: "No.",
      },
      {
        dataField: "approver",
        text: "Approver",
      },
    ],
  },
  {
    tableName: "Activities",
    columns: [
      {
        dataField: "activityName",
        text: "Activity Name",
      },
      {
        dataField: "user",
        text: "User",
      },
      {
        dataField: "role",
        text: "Role",
      },
    ],
  },
];

export const TABLE_COMMON_CONFIG = {
  Expenses: {
    columns: [
      {
        dataField: "ExpenseDate",
        text: "Expense Date",
      },
      {
        dataField: "expenseClaimType",
        text: "Expense Claim Type",
      },
      {
        dataField: "description",
        text: "Description",
      },
      {
        dataField: "amount",
        text: "Amount",
      },
      {
        dataField: "sanctionedAmount",
        text: "Sanctioned Amount",
      },
    ],
  },

  ExpenseTaxesandCharges: {
    columns: [
      {
        dataField: "accountHead",
        text: "Account Head",
      },
      {
        dataField: "rate",
        text: "Rate",
      },
      {
        dataField: "amount",
        text: "Amount",
      },
      {
        dataField: "total",
        text: "Total",
      },
    ],
  },

  AdvancePayments: {
    columns: [
      {
        dataField: "employeeAdvance",
        text: "Employee Advance",
      },
      {
        dataField: "postingDate",
        text: "Posting Date",
      },
      {
        dataField: "advancePaid",
        text: "Advance Paid",
      },
      {
        dataField: "unclaimedAmount",
        text: "Unclaimed amount",
      },
      {
        dataField: "allocatedAmount",
        text: "Allocated amount",
      },
    ],
  },

  Contract: {
    columns: [
      {
        dataField: "name",
        text: "Name",
      },
      {
        dataField: "startDate",
        text: "Start Date",
        editor: {
          type: Type.DATE,
        },
      },
      {
        dataField: "endDate",
        text: "End Date",
        editor: {
          type: Type.DATE,
        },
      },
      {
        dataField: "contractType",
        text: "Type",
      },
      {
        dataField: "company",
        text: "Company",
      },

      {
        dataField: "attachment",
        text: "Attachment",
      },
    ],
  },
  AppraisalTemplate: {
    columns: [
      {
        dataField: "kra",
        text: "KRA",
      },
      {
        dataField: "weightage",
        text: "Weightage (%)",
      },
    ],
  },
  Appraisal: {
    columns: [
      {
        dataField: "kra",
        text: "KRA",
      },
      {
        dataField: "weightage",
        text: "Weightage (%)",
      },
      {
        dataField: "score",
        text: "Score (0-5)",
      },
      {
        dataField: "scoreEarned",
        text: " Score Earned",
        editable: false,
      },
    ],
  },

  SelectUsers: {
    columns: [
      {
        dataField: "user",
        text: "Users",
      },
    ],
  },

  Driver: {
    columns: [
      {
        dataField: "driverLicenceClass",
        text: "Driver licence class",
      },
      {
        dataField: "description",
        text: "Description",
      },
      {
        dataField: "issuingDate",
        text: "Issuing Date",
        editor: {
          type: Type.DATE,
        },
      },
      {
        dataField: "expiryDate",
        text: "Expiry Date",
        editor: {
          type: Type.DATE,
        },
      },
    ],
  },
  VehicleLog: {
    columns: [
      {
        dataField: "serviceItem",
        text: "Service Item",
        editor: {
          type: Type.SELECT,
          options: [
            {
              label: "Brake Oil",
              value: "Brake Oil",
            },
            {
              label: "Brake Pad",
              value: "Brake Pad",
            },
            {
              label: "Clutch Plate",
              value: "Clutch Plate",
            },
            {
              label: "Engine Oil",
              value: "Engine Oil",
            },
            {
              label: "Oil Change",
              value: "Oil Change",
            },
            {
              label: "Wheels",
              value: "Wheels",
            },
          ],
        },
      },
      {
        dataField: "type",
        text: "Type",
        editor: {
          type: Type.SELECT,
          options: [
            {
              label: "",
              value: "",
            },
            {
              label: "Inspection",
              value: "Inspection",
            },
            {
              label: "Service",
              value: "Service",
            },
            {
              label: "Change",
              value: "Change",
            },
          ],
        },
      },
      {
        dataField: "frequency",
        text: "Frequency",
        editor: {
          type: Type.SELECT,
          options: [
            {
              label: "",
              value: "",
            },
            {
              label: "Mileage",
              value: "Mileage",
            },
            {
              label: "Monthly",
              value: "Monthly",
            },
            {
              label: "Quarterly",
              value: "Quarterly",
            },
            {
              label: "Half Yearly",
              value: "Half Yearly",
            },
            {
              label: "Yearly",
              value: "Yearly",
            },
          ],
        },
      },
      {
        dataField: "expense",
        text: "Expense",
      },
    ],
  },
  Holidays: {
    columns: [
      {
        dataField: "date",
        text: "Date",
        editor: {
          type: Type.DATE,
        },
      },
      {
        dataField: "description",
        text: "Description",
      },
    ],
  },

  Product: [
    {
      dataField: "product",
      text: "Product Name",
    },
  ],
  Category: [
    {
      dataField: "category",
      text: "Category Name",
    },
  ],
  Brand: [
    {
      dataField: "brand",
      text: "Brand",
    },
  ],
  LoanApplication: {
    columns: [
      {
        dataField: "loanSecurity",
        text: "Loan Security",
      },
      {
        dataField: "quantity",
        text: "Quantity",
      },
      {
        dataField: "loanSecurityPrice",
        text: "Loan Security Price",
      },
      {
        dataField: "Amount",
        text: "Amount",
      },
    ],
  },

  LoanSecurityPledge: {
    columns: [
      {
        dataField: "loanSecurity",
        text: "Loan Security",
      },
      {
        dataField: "quantity",
        text: "Quantity",
      },
      {
        dataField: "loanSecurityPrice",
        text: "Loan Security Price",
      },
      {
        dataField: "Amount",
        text: "Amount",
      },
    ],
  },
  LoanSecurityUnpledge: {
    columns: [
      {
        dataField: "loanSecurity",
        text: "Loan Security",
      },
      {
        dataField: "quantity",
        text: "Quantity",
      },
      {
        dataField: "loanSecurityPrice",
        text: "Loan Security Price",
      },
      {
        dataField: "Amount",
        text: "Amount",
      },
    ],
  },
};
