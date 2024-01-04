import { Type } from "react-bootstrap-table2-editor";
import { Input } from "reactstrap";
import React, { Component } from "react";
import useReuseData from "custom-hook/useReuseData";
import { fetchActivityType } from "redux-toolkit/slices/Projects/activityType";
import { checkExistItem } from "helpers/erp_helper";

export const DATABOXTAGS = [
  {
    title: "Projects",
    BoxTags: [
      {
        itemBoxTag: "Project",
        img: "img1",
        path: "/project",
        img: "img1",
      },
      {
        itemBoxTag: "Task",
        path: "/task",
      },
      {
        itemBoxTag: "Task Type",
        path: "/task-type",
      },
      {
        itemBoxTag: "Project Update",
        path: "/project-update",
      },
      {
        itemBoxTag: "Project Type",
        path: "/project-type",
      },
      {
        itemBoxTag: "Project Template",
        path: "/project-template",
      },
    ],
  },
  {
    title: "Time Tracking",
    BoxTags: [
      {
        itemBoxTag: "Timesheet",
        path: "/timesheet",
      },
      {
        itemBoxTag: "Activity Cost",
        path: "/activity-cost",
      },
      {
        itemBoxTag: "Activity Type",
        path: "/activity-type",
      },
    ],
  },
  {
    title: "Reports",
    BoxTags: [
      {
        itemBoxTag: "Daily Timesheet Summary",
        path: "/query-report/Daily%20Timesheet%20Summary",
      },
      {
        itemBoxTag: "Project Profitability",
        path: "/query-report/Project%20Profitability",
      },
      {
        itemBoxTag: "Project wise Stock Tracking",
        path: "/query-report/Project%20wise%20Stock%20Tracking",
      },
      {
        itemBoxTag: "Project Billing Summary",
        path: "/query-report/Project%20Billing%20Summary",
      },
      {
        itemBoxTag: "Delayed Tasks Summary",
        path: "/query-report/Delayed%20Tasks%20Summary",
      },
    ],
  },
];

export const DATA_YOUR_SHORTCUTS = [
  {
    id: 1,
    typeBadge: "success",
    titleBadge: "Success",
    path: "/project",
    title: "Project",
  },
  {
    id: 2,
    typeBadge: "pending",
    titleBadge: "Success",
    path: "/task",
    title: "Task",
  },
  {
    id: 3,
    typeBadge: "rejected",
    titleBadge: "Success",
    path: "/",
    title: "Timesheet",
  },
  {
    id: 5,
    typeBadge: "dark",
    titleBadge: "Success",
    path: "/dashboard",
    title: "Dashboard",
  },
];

export const DATA_FILTER_TABLE = [
  {
    id: "task",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "task-type",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "project",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "timesheet",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "query-report",
    isFilterDate: true,
    isFilterSearch: false,
  },
  {
    id: "project-template",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "project-type",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "project-update",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "activity-type",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "activity-cost",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "query-report/Project Billing Summary",
    isFilterDate: true,
    isFilterSearch: true,
  },
  {
    id: "query-report/Daily Timesheet Summary",
    isFilterDate: true,
    isFilterSearch: false,
  },
  {
    id: "query-report/Project Profitability",
    isFilterDate: true,
    isFilterSearch: true,
  },
  {
    id: "query-report/Project wise Stock Tracking",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "query-report/Delayed Tasks Summary",
    isFilterDate: true,
    isFilterSearch: true,
  },
];

export const COLUMNS_TABLE = [
  {
    path: "task",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
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
        dataField: "project.name",
        text: "Project",
        sort: true,
      },
      {
        dataField: "isGroup",
        text: "Is Group",
        sort: true,
      },
      {
        dataField: "priority",
        text: "Priority",
        sort: true,
      },
      {
        dataField: "isMilestone",
        text: "Is Milestone",
        sort: true,
      },
    ],
  },
  {
    path: "task-type",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
    ],
  },
  {
    path: "project",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "projectName",
        text: "Project Name",
        sort: true,
      },
      {
        dataField: "priority",
        text: "Priority",
        sort: true,
      },
      {
        dataField: "projectType.name",
        text: "Project Type",
        sort: true,
      },
      {
        dataField: "expectedStartDate",
        text: "Expected Start Date",
        sort: true,
      },
    ],
  },
  {
    path: "timesheet",
    columnsPage: [
      {
        dataField: "title",
        text: "Title",
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
      {
        dataField: "amountBilled",
        text: "% Amount Billed",
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
    path: "project-type",
    columnsPage: [
      {
        dataField: "name",
        text: "Project Type",
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
    path: "project-template",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "projectType",
        text: "Project Type",
        sort: true,
      },
    ],
  },
  {
    path: "project-update",
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
        dataField: "projectName",
        text: "Project",
        img: "img1",
        sort: true,
      },
    ],
  },
  {
    path: "activity-type",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "activityType",
        text: "Activity Type",
        sort: true,
      },
    ],
  },
  {
    path: "activity-cost",
    columnsPage: [
      {
        dataField: "title",
        text: "Title",
        sort: true,
      },
      {
        dataField: "activityType",
        text: "Activity Type",
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
    path: "query-report/Project Billing Summary",
    columnsPage: [
      {
        dataField: "title",
        text: "Title",
        sort: true,
      },
      {
        dataField: "activityType",
        text: "Activity Type",
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
    path: "query-report/Daily Timesheet Summary",
    columnsPage: [
      {
        dataField: "title",
        text: "Title",
        sort: true,
      },
      {
        dataField: "activityType",
        text: "Activity Type",
        sort: true,
      },
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "dateStart",
        text: "Date Start",
        sort: true,
      },
      {
        dataField: "dateEnd",
        text: "Date End",
        sort: true,
      },
    ],
  },
  {
    path: "query-report/Project Profitability",
    columnsPage: [
      {
        dataField: "company",
        text: "Company",
        sort: true,
      },
      {
        dataField: "dateStart",
        text: "Date Start",
        sort: true,
      },
      {
        dataField: "dateEnd",
        text: "Date End",
        sort: true,
      },
      {
        dataField: "customer",
        text: "Customer",
        sort: true,
      },
      {
        dataField: "project",
        img: "img1",
        text: "Project",
        img: "img1",
        sort: true,
      },
    ],
  },
  {
    path: "query-report/Delayed Tasks Summary",
    columnsPage: [
      {
        dataField: "id",
        text: "ID",
        sort: true,
      },
      {
        dataField: "task",
        text: "Task",
        sort: true,
      },
      {
        dataField: "subject",
        text: "Subject",
        sort: true,
      },
      {
        dataField: "priority",
        text: "Priority",
        sort: true,
      },
      {
        dataField: "progress",
        text: "Progress (%)",
        sort: true,
      },
      {
        dataField: "expectedStartDate",
        text: "Expected Start Date",
        sort: true,
      },
      {
        dataField: "expectedEndDate",
        text: "Expected End Date",
        sort: true,
      },
      {
        dataField: "actualEndDate",
        text: "Actual End Date",
        sort: true,
      },
      {
        dataField: "delay",
        text: "Delay (In Days)",
        sort: true,
      },
    ],
  },
  {
    path: "query-report/Project wise Stock Tracking",
    columnsPage: [
      {
        dataField: "projectId",
        text: "Project ID",
        sort: true,
      },
      {
        dataField: "costOfPurchasedItems",
        text: "Cost of Purchased Items",
        sort: true,
      },
      {
        dataField: "costOfIssuedItems",
        text: "Cost of Issued Items",
        sort: true,
      },
      {
        dataField: "name",
        text: "Project Name",
        sort: true,
      },
      {
        dataField: "projectStatus",
        text: "Project Status",
        sort: true,
      },
      {
        dataField: "company",
        text: "Company",
        sort: true,
      },
      {
        dataField: "custumer",
        text: "Custumer",
        sort: true,
      },
      {
        dataField: "projectValue",
        text: "Project Value",
        sort: true,
      },
      {
        dataField: "projectStartDate",
        text: "Project Start Date",
        sort: true,
      },
      {
        dataField: "completionDate",
        text: "Completion Date",
        sort: true,
      },
    ],
  },
];

export const PROJECT_DATA = [
  {
    id: 1,
    projectName: "ACB project",
    img: "img1",
    status: "Completed",
    name: "PROJ-0001",
    expectedEndDate: "21-07-2021",
    commentCount: 20,
    users: [
      { name: "user 1", img: "avatar6" },
      { name: "user 1", img: "avatar7" },
    ],
  },
  {
    id: 2,
    projectName: "BBB project",
    img: "img2",
    status: "Pending",
    type: "",
    name: "PROJ-0001",
    expectedEndDate: "22-07-2021",
    users: [
      { name: "user 1", img: "avatar1" },
      { name: "user 1", img: "avatar2" },
      { name: "user 1", img: "avatar3" },
      { name: "user 1", img: "avatar4" },
      { name: "user 1", img: "avatar5" },
    ],
  },
  {
    id: 3,
    projectName: "CCC project",
    img: "img3",
    status: "Delay",
    type: "",
    name: "PROJ-0001",
    expectedEndDate: "23-07-2021",
    users: [
      { name: "user 1", img: "avatar8" },
      { name: "user 1", img: "avatar1" },
      { name: "user 1", img: "avatar2" },
    ],
  },
  {
    id: 4,
    projectName: "DDD project",
    img: "img4",
    status: "Completed",
    type: "",
    name: "PROJ-0001",
    expectedEndDate: "08-05-2021",
    users: [{ name: "user 1", img: "avatar2" }],
  },
  {
    id: 5,
    projectName: "EEE project",
    img: "img5",
    status: "Completed",
    type: "",
    name: "PROJ-0001",
    expectedEndDate: "11-12-2021",
    users: [{ name: "user 1", img: "avatar2" }],
  },
  {
    id: 6,
    projectName: "FFF project",
    img: "img6",
    status: "Completed",
    type: "",
    name: "PROJ-0001",
    expectedEndDate: "03-10-2021",
    users: [{ name: "user 1", img: "avatar2" }],
  },
  {
    id: 7,
    projectName: "JJJ project",
    img: "img5",
    status: "Completed",
    type: "",
    name: "PROJ-0001",
    expectedEndDate: "03-10-2021",
    users: [{ name: "user 1", img: "avatar2" }],
  },
  {
    id: 8,
    projectName: "JJJ project",
    img: "img6",
    status: "Completed",
    type: "",
    name: "PROJ-0001",
    expectedEndDate: "03-10-2021",
    users: [{ name: "user 1", img: "avatar2" }],
  },
  {
    id: 9,
    projectName: "JJJ project",
    img: "img1",
    status: "Completed",
    type: "",
    name: "PROJ-0001",
    expectedEndDate: "03-10-2021",
    users: [{ name: "user 1", img: "avatar2" }],
  },
  {
    id: 10,
    projectName: "JJJ project",
    img: "img1",
    status: "Completed",
    type: "",
    name: "PROJ-0001",
    expectedEndDate: "03-10-2021",
    users: [{ name: "user 1", img: "avatar2" }],
  },
  {
    id: 11,
    projectName: "JJJ project",
    img: "img1",
    status: "Completed",
    type: "",
    name: "PROJ-0001",
    expectedEndDate: "03-10-2021",
    users: [{ name: "user 1", img: "avatar2" }],
  },
  {
    id: 12,
    projectName: "JJJ project",
    img: "img1",
    status: "Completed",
    type: "",
    name: "PROJ-0001",
    expectedEndDate: "03-10-2021",
    users: [{ name: "user 1", img: "avatar2" }],
  },
];

export const DATA_TABLE_PROJECT_TYPE = [
  {
    id: 1,
    name: "Other",
    projectType: "Other",
  },
  {
    id: 2,
    name: "External",
    projectType: "External",
  },
  {
    id: 3,
    name: "Internal",
    projectType: "Internal",
  },
];
export const DATA_PROEJCT_UPDATE = [
  {
    id: 1,
    name: "UPDATE-PROJ-0001-220408-0001",
    status: {
      type: "success",
      title: "Active",
    },
    projectName: "PROJ-00001",
  },
  {
    id: 2,
    name: "UPDATE-PROJ-0002-220408-0002",
    status: {
      type: "info",
      title: "Submited",
    },
    projectName: "PROJ-00002",
  },
  {
    id: 3,
    name: "UPDATE-PROJ-0003-220408-0003",
    status: {
      type: "danger",
      title: "Submited",
    },
    projectName: "PROJ-00003",
  },
];

export const DATA_TIMESHEET = [
  {
    id: 1,
    title: "Nguyen Van A",
    status: {
      type: "success",
      title: "Active",
    },
    startdate: "23-4-2022",
    amountBilled: "10%",
    name: "TS-2022-00001",
  },
  {
    id: 2,
    title: "Nguyen Van B",
    status: {
      type: "success",
      title: "Active",
    },
    startdate: "23-4-2022",
    amountBilled: "10%",
    name: "TS-2022-00001",
  },
  {
    id: 3,
    title: "Nguyen Van C",
    status: {
      type: "info",
      title: "Active",
    },
    startdate: "23-4-2022",
    amountBilled: "10%",
    name: "TS-2022-00001",
  },
  {
    id: 4,
    title: "Nguyen Van D",
    status: {
      type: "danger",
      title: "Danger",
    },
    startdate: "23-4-2022",
    amountBilled: "10%",
    name: "TS-2022-00001",
  },
  {
    id: 5,
    title: "Nguyen Van E",
    status: {
      type: "success",
      title: "Active",
    },
    startdate: "23-4-2022",
    amountBilled: "10%",
    name: "TS-2022-00001",
  },
];

export const DATA_ACTIVITY_TYPE = [
  {
    id: 1,
    name: "Communication",
    status: {
      type: "info",
      title: "Enabled",
    },
    activityType: "Communication",
  },
  {
    id: 2,
    name: "Execution",
    status: {
      type: "info",
      title: "Enabled",
    },
    activityType: "Execution",
  },
  {
    id: 3,
    name: "Proposal Writing",
    status: {
      type: "info",
      title: "Enabled",
    },
    activityType: "Proposal Writing",
  },
  {
    id: 4,
    name: "Research",
    status: {
      type: "info",
      title: "Enabled",
    },
    activityType: "Research",
  },
  {
    id: 5,
    name: "Planning",
    status: {
      type: "info",
      title: "Enabled",
    },
    activityType: "Planning",
  },
];

export const DATA_ACTIVITY_COST = [
  {
    id: 1,
    title: "Nguyen Van A for Planning",
    activityType: "Planning",
    name: "PROJ-ACC-00001",
  },
  {
    id: 2,
    title: "Nguyen Van B for Planning",
    activityType: "Planning",
    name: "PROJ-ACC-00002",
  },
  {
    id: 3,
    title: "Nguyen Van C for Planning",
    activityType: "Planning",
    name: "PROJ-ACC-00003",
  },
  {
    id: 4,
    title: "Nguyen Van D for Planning",
    activityType: "Planning",
    name: "PROJ-ACC-00004",
  },
];

export const DATA_DELAYED_TASKS_SUMMARY = [
  {
    id: 1,
    task: "TASK-2022-00001",
    subject: "Subject 1",
    priority: "Low",
    progress: 5,
    expectedStartDate: "21-04-2022",
    expectedEndDate: "25-04-2022",
    delay: -15,
  },
  {
    id: 2,
    task: "TASK-2022-00002",
    subject: "Subject 2",
    priority: "Medium",
    progress: 5,
    expectedStartDate: "10-03-2021",
    expectedEndDate: "14-04-2022",
    delay: 0,
  },
  {
    id: 3,
    task: "TASK-2022-00003",
    subject: "Subject 3",
    priority: "Hight",
    progress: 5,
    expectedStartDate: "24-01-2022",
    expectedEndDate: "02-02-2022",
    delay: 0,
  },
];

export const DATA_PROJECT_PROFITABILITY = [
  {
    id: 1,
    company: "Vastbit",
    dateStart: "14-03-2022",
    dateEnd: "14-04-2022",
    customer: "Nguyen Van A",
    project: "A",
  },
  {
    id: 2,
    company: "Vastbit",
    dateStart: "10-03-2022",
    dateEnd: "10-04-2022",
    customer: "Nguyen Van B",
    project: "C",
  },
  {
    id: 3,
    company: "Vastbit",
    dateStart: "14-03-2022",
    dateEnd: "14-04-2022",
    customer: "Nguyen Van C",
    project: "C",
  },
];

export const DATA_PROJECT_WISE_STOCK_TRACKING = [
  {
    id: 1,
    projectId: "PROJ-0001",
    costOfPurchasedItems: 0,
    costOfIssuedItems: 0,
    name: "ACB project",
    img: "img1",
    projectStatus: "Open",
    company: "Vastbit",
    projectValue: 0,
    completionDate: "21-07-2021",
  },
  {
    id: 2,
    projectId: "PROJ-0002",
    costOfPurchasedItems: 0,
    costOfIssuedItems: 0,
    name: "ACB project",
    img: "img1",
    projectStatus: "Close",
    company: "Vastbit",
    projectValue: 0,
    completionDate: "21-07-2021",
  },
  {
    id: 3,
    projectId: "PROJ-0003",
    costOfPurchasedItems: 0,
    costOfIssuedItems: 0,
    name: "ACB project",
    img: "img1",
    projectStatus: "Open",
    company: "Vastbit",
    projectValue: 0,
    completionDate: "21-07-2021",
  },
];

export const DATA_TASK = [
  {
    id: 1,
    name: "Nguyen Van A",
    subject: "Project",
    img: "img1",
    project: "Project-0001",
    priority: "Low",
  },
  {
    id: 2,
    name: "Nguyen Van B",
    subject: "Project",
    img: "img1",
    project: "Project-0002",
    priority: "Medium",
  },
  {
    id: 3,
    name: "Nguyen Van C",
    subject: "Project",
    img: "img1",
    project: "Project-0003",
    priority: "Hight",
  },
  {
    id: 4,
    name: "Nguyen Van D",
    subject: "Project",
    img: "img1",
    project: "Project-0004",
    priority: "Urgent",
  },
];

export const DATA_DROPDOWN_LISTVIEW_PROJECT = [
  {
    id: 1,
    icon: "fas fa-list",
    name: "List",
    value: "list",
  },

  {
    id: 2,
    icon: "fas fa-grip-horizontal",
    name: "Kanban",
    value: "kanban",
  },
];
export const DATA_DROPDOWN_MENU_PROJECT = [
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

export const DATA_DROPDOWN_LISTVIEW_TASK = [
  {
    id: 1,
    icon: "fas fa-list",
    name: "List",
    value: "list",
  },

  {
    id: 2,
    icon: "fas fa-grip-horizontal",
    name: "Kanban",
    value: "kanban",
  },
];
export const DATA_DROPDOWN_MENU_TASK = [
  {
    id: 1,
    name: "Set as Open",
  },
  {
    id: 2,
    name: "Set as Competed",
  },
  {
    id: 3,
    name: "Import",
  },
  {
    id: 4,
    name: "User Permissions",
  },
  {
    id: 5,
    name: "Role Permissions Manager",
  },
  {
    id: 6,
    name: "Customize",
  },
  {
    id: 7,
    name: "Toggle Sidebar",
  },
  {
    id: 8,
    name: "Share URL",
  },
  {
    id: 9,
    name: "List Setting",
  },
];

export const DATA_DROPDOWN_LISTVIEW_TIMESHEET = [
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
    name: "Gantt",
  },
  {
    id: 4,
    icon: "bx bxs-layout",
    name: "Kanban",
  },
  {
    id: 5,
    icon: "bx bx-calendar-alt",
    name: "Calendar",
  },
];

export const TITLE_STATUS_PROJECT = {
  projectType: "project-type",
  project: "project",
  taskType: "task-type",
};

export const TABLE_COMMON = {
  dependencies: [
    {
      dataField: "task",
      text: "Task",
    },
    {
      dataField: "subject",
      text: "Subject",
    },
  ],
};

export const DATA_TABLE_COMMON = {
  user: [
    {
      dataField: "user",
      text: "User",
    },
    {
      dataField: "username",
      text: "User Name",
    },
    {
      dataField: "viewAttachments",
      text: "View attachments",
    },
  ],
  timesheets: [
    {
      dataField: "activityType",
      text: "Activity Type",
    },
    {
      dataField: "activityTypeObjId",
      text: "Activity Type",
      hidden: true,
    },
    {
      dataField: "billingRate",
      text: "Billing Rate",
      hidden: true,
    },

    {
      dataField: "costingRate",
      text: "Costing Rate",
      hidden: true,
    },

    {
      dataField: "totalBillableAmount",
      text: "Total Billable Amount",
      hidden: true,
    },

    {
      dataField: "totalCostingAmount",
      text: "Total Costing Amoun",
      hidden: true,
    },

    {
      dataField: "fromTime",
      text: "From Time",
      editor: {
        type: Type.DATE,
      },
    },
    {
      dataField: "hrs",
      text: "Hrs",
      validator: (newValue, row, column) => {
        if (!newValue) {
          return {
            valid: false,
            message: "Please Enter Hrs",
          };
        }
        return true;
      },
    },
    {
      dataField: "project",
      text: "Project",
    },
    {
      dataField: "IsBillable",
      text: "Is Billable",
      editor: {
        type: Type.CHECKBOX,
        value: "Y:N",
      },
      formatter: (cell, row, rowIndex) => {
        return (
          <Input type="checkbox" defaultChecked={cell === "Y" ? true : false} />
        );
      },
    },
  ],
};
