import React from "react";
import { Type } from "react-bootstrap-table2-editor";

export const DATA_YOUR_SHORTCUTS = [
  {
    id: 1,
    typeBadge: "success",
    titleBadge: "Success",
    count: 1,
    path: "/loan-application",
    title: "Loan Application",
  },
  {
    id: 2,
    typeBadge: "dark",
    titleBadge: "Success",
    count: 2,
    path: "/loan",
    title: "Loan",
  },
  {
    id: 3,
    typeBadge: "info",
    titleBadge: "Success",
    count: 3,
    path: "/dashboard",
    title: "Dashboard",
  },
];

export const DATABOXTAGS = [
  {
    title: "Loan",
    BoxTags: [
      {
        itemBoxTag: "Loan Type",
        path: "/loan-type",
      },
      {
        itemBoxTag: "Loan Application",
        path: "/loan-application",
      },
      {
        itemBoxTag: "Loan",
        path: "/loan",
      },
    ],
  },
  {
    title: "Loan Processes",
    BoxTags: [
      {
        itemBoxTag: "Process Loan Security Shortfall",
        path: "/process-loan-security-shortfall",
      },
      {
        itemBoxTag: "Process Loan Interest Accrual",
        path: "/process-loan-interest-accrual",
      },
    ],
  },
  {
    title: "Disbursement and Repayment",
    BoxTags: [
      {
        itemBoxTag: "Loan Disbursement",
        path: "/loan-disbursement",
      },
      {
        itemBoxTag: "Loan Repayment",
        path: "/loan-repayment",
      },
      {
        itemBoxTag: "Loan Write Off",
        path: "/loan-write-off",
      },
      {
        itemBoxTag: "Loan Interest Accrual",
        path: "/loan-interest-accrual",
      },
    ],
  },
  {
    title: "Loan Security",
    BoxTags: [
      {
        itemBoxTag: "Loan Security Type",
        path: "/loan-security-type",
      },
      {
        itemBoxTag: "Loan Security Price",
        path: "/loan-security-price",
      },
      {
        itemBoxTag: "Loan Security",
        path: "/loan-security",
      },
      {
        itemBoxTag: "Loan Security Pledge",
        path: "/loan-security-pledge",
      },
      {
        itemBoxTag: "Loan Security Unpledge",
        path: "/loan-security-unpledge",
      },
      {
        itemBoxTag: "Loan Security Shortfall",
        path: "/loan-security-shortfall",
      },
    ],
  },
  {
    title: "Reports",
    BoxTags: [
      {
        itemBoxTag: "Loan Repayment and Closure",
        path: "/loan-repayment-and-closure",
      },
      {
        itemBoxTag: "Loan Security Status",
        path: "/loan-security-status",
      },
    ],
  },
];

export const DATA_DROPDOWN_LISTVIEW_LOANS = [
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

export const DATA_DROPDOWN_MENU_LOANS = [
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
