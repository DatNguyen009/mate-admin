import React from "react";
import { Type } from "react-bootstrap-table2-editor";

import { formatNumber } from "helpers/erp_helper";

export const DATA_YOUR_SHORTCUTS = [
  {
    id: 1,
    typeBadge: "success",
    titleBadge: "Success",
    count: 4,
    path: "/item",
    title: "Item",
  },
  {
    id: 2,
    typeBadge: "dark",
    titleBadge: "Success",
    count: 4,
    path: "/order",
    title: "Sales Order",
  },
  {
    id: 3,
    typeBadge: "danger",
    titleBadge: "Success",
    count: 4,
    path: "/sales-analytics",
    title: "Sales Analytics",
  },
  {
    id: 4,
    typeBadge: "info",
    titleBadge: "Success",
    count: 4,
    path: "/sales-order-analysis",
    title: "Sales Order Analysis",
  },
  {
    id: 5,
    typeBadge: "warning",
    titleBadge: "Success",
    count: 4,
    path: "/dashboard",
    title: "Dashboard",
  },
];

export const DATABOXTAGS = [
  {
    title: "Selling",
    BoxTags: [
      {
        itemBoxTag: "Customer",
        path: "/customer",
      },
      {
        itemBoxTag: "Quotation",
        path: "/quotation",
      },
      {
        itemBoxTag: "Sales Order",
        path: "/sales-order",
      },
      {
        itemBoxTag: "Sales Invoice",
        path: "/sales-invoice",
      },
      {
        itemBoxTag: "Blanket Order",
        path: "/blanket-order",
      },
      {
        itemBoxTag: "Sales Partner",
        path: "/sales-partner",
      },
      {
        itemBoxTag: "Sales Person",
        path: "/sales-person",
      },
    ],
  },
  {
    title: "Items and Pricing",
    BoxTags: [
      {
        itemBoxTag: "Item",
        path: "/item",
      },
      {
        itemBoxTag: "Item Price",
        path: "/item-price",
      },
      {
        itemBoxTag: "Price List",
        path: "/price-list",
      },
      {
        itemBoxTag: "Item Group",
        path: "/item-group",
      },
      {
        itemBoxTag: "Product Bundle",
        path: "/product-bundle",
      },
      {
        itemBoxTag: "Promotional Schema",
        path: "/promotional-schema",
      },
      {
        itemBoxTag: "Pricing Rule",
        path: "/pricing-rule",
      },
      {
        itemBoxTag: "Shipping Rule",
        path: "/shipping-rule",
      },
      {
        itemBoxTag: "Coupon Rule",
        path: "/coupon-rule",
      },
    ],
  },
  {
    title: "Settings",
    BoxTags: [
      {
        itemBoxTag: "Selling Settings",
        path: "/selling-settings",
      },
      {
        itemBoxTag: "Terms and Conditions Template",
        path: "/terms-and-conditions",
      },
      {
        itemBoxTag: "Sales Taxes and Charges Template",
        path: "/sales-taxes-and-charges-template",
      },
      {
        itemBoxTag: "Lead Source",
        path: "/lead-source",
      },
      {
        itemBoxTag: "Customer Group",
        path: "/customer-group",
      },
      {
        itemBoxTag: "Contact",
        path: "/contact",
      },
      {
        itemBoxTag: "Address",
        path: "/address",
      },
      {
        itemBoxTag: "Territory",
        path: "/territory",
      },
      {
        itemBoxTag: "Campaign",
        path: "/campaign",
      },
    ],
  },
  {
    title: "Key Reports",
    BoxTags: [
      {
        itemBoxTag: "Sales Analytics",
        path: "/sales-analytics",
      },
      {
        itemBoxTag: "Sales Order Analysis",
        path: "/sales-order-analysis",
      },
      {
        itemBoxTag: "Sales Funnel",
        path: "/sales-funnel",
      },
      {
        itemBoxTag: "Sales Order Trends",
        path: "/sales-order-trends",
      },
      {
        itemBoxTag: "Quotation Trends",
        path: "/quotation-trends",
      },
      {
        itemBoxTag: "Customer Acquisition and Loyalty",
        path: "/customer-acquisition-and-loyalty",
      },
      {
        itemBoxTag: "Inactive Customers",
        path: "/inactive-customers",
      },
      {
        itemBoxTag: "Sales Person-wise Transaction Summary",
        path: "/sales-person-wise-transaction-summary",
      },
      {
        itemBoxTag: "Item-wise Sales History",
        path: "/item-wise-sales-history",
      },
    ],
  },
];

export const DATA_DROPDOWN_LISTVIEW_SELLING = [
  {
    id: 1,
    icon: "bx bx-file",
    name: "Report",
  },
  {
    id: 2,
    icon: "bx bxs-dashboard",
    name: "Dashboard",
  },
  {
    id: 3,
    icon: "bx bxs-layout",
    name: "Kanban",
  },
];

export const DATA_DROPDOWN_MENU_SELLING = [
  {
    id: 1,
    name: "Import",
  },
  {
    id: 2,
    name: "User Permissions",
  },
  {
    id: 3,
    name: "Role Permissions Manager",
  },
  {
    id: 4,
    name: "Customize",
  },
  {
    id: 5,
    name: "Toggle Sidebar",
  },
  {
    id: 6,
    name: "Share URL",
  },
  {
    id: 7,
    name: "List Setting",
  },
];

export const DATA_FILTER_TABLE = [
  {
    id: "user",
    isFilterDate: false,
    isFilterSearch: true,
  },
];

export const COLUMNS_TABLE = [
  {
    path: "user",
    columnsPage: [
      {
        dataField: "id",
        text: "No",
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
        dataField: "userType",
        text: "User Type",
        sort: true,
      },
      {
        dataField: "username",
        text: "Name",
        sort: true,
      },
    ],
  },
];

export const TITLE_STATUS_SELLING = {
  user: "user",
};

export const DATA_TABLE_COMMON = {
  userEmails: [
    {
      dataField: "no",
      text: "No.",
    },
    {
      dataField: "emailAccount",
      text: "Email Account",
    },
    {
      dataField: "awaitingPassword",
      text: "Awaiting Password",
    },
  ],
  socialLogins: [
    {
      dataField: "no",
      text: "No.",
    },
    {
      dataField: "provider",
      text: "Provider",
    },
    {
      dataField: "username",
      text: "Username",
    },
    {
      dataField: "userId",
      text: "User ID",
    },
  ],
  items: [
    {
      dataField: "itemCode",
      text: "Item Code",
    },
    {
      dataField: "quantity",
      text: "Quantity",
    },
    {
      dataField: "rate",
      text: "Rate",
    },
    {
      dataField: "amount",
      text: "Amount",
    },
  ],
  salesTaxesAndCharges: [
    {
      dataField: "type",
      text: "Type",
    },
    {
      dataField: "account",
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
  paymentSchedule: [
    {
      dataField: "paymentTerm",
      text: "Payment Term",
    },
    {
      dataField: "description",
      text: "Description",
    },
    {
      dataField: "dueDate",
      text: "Due Date",
      editor: {
        type: Type.DATE,
      },
    },
    {
      dataField: "invoicePortion",
      text: "Invoice Portion",
    },
    {
      dataField: "paymentAmount",
      text: "Payment Amount",
    },
  ],
  salesOrderItems: [
    {
      dataField: "itemCode",
      text: "Item Code",
    },
    {
      dataField: "deliveryDate",
      text: "Delivery Date",
      editor: {
        type: Type.DATE,
      },
    },
    {
      dataField: "quantity",
      text: "Quantity",
      formatter: cell => <div>{formatNumber(cell)}</div>,
    },
    {
      dataField: "rate",
      text: "Rate (VND)",
      formatter: cell => <div>{formatNumber(cell)}</div>,
    },
    {
      dataField: "amount",
      text: "Amount (VND)",
      formatter: cell => <div>{formatNumber(cell)}</div>,
      editable: false,
    },
  ],
  salesTeam: [
    {
      dataField: "salesPerson",
      text: "Sales Person",
    },
    {
      dataField: "contribution",
      text: "Contribution (%)",
    },
    {
      dataField: "contributionToNetTotal",
      text: "Contribution to Net Total",
    },
    {
      dataField: "commissionRate",
      text: "Commission Rate",
    },
    {
      dataField: "incentives",
      text: "Incentives",
    },
  ],
  salesPartner: {
    targets: [
      {
        dataField: "itemGroup",
        text: "Item Group",
      },
      {
        dataField: "fiscalYear",
        text: "Fiscal Year",
      },
      {
        dataField: "targetQty",
        text: "Target Qty",
      },
      {
        dataField: "targetAmount",
        text: "Target Amount",
      },
      {
        dataField: "targetDistribution",
        text: "Target Distribution",
      },
    ],
  },
};

export const TABLE_CONFIG_SELLING = {
  Quotation: {
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
};
