export const DATA_YOUR_SHORTCUTS = [
  {
    id: 1,
    typeBadge: "success",
    titleBadge: "Success",
    count: 4,
    path: "/user",
    title: "User",
  },
  {
    id: 2,
    typeBadge: "dark",
    titleBadge: "Success",
    count: 4,
    path: "/",
    title: "Role",
  },
  {
    id: 3,
    typeBadge: "danger",
    titleBadge: "Success",
    count: 4,
    path: "/",
    title: "Permission Manager",
  },
  {
    id: 4,
    typeBadge: "info",
    titleBadge: "Success",
    count: 4,
    path: "/",
    title: "User Profile",
  },
  {
    id: 5,
    typeBadge: "warning",
    titleBadge: "Success",
    count: 4,
    path: "/",
    title: "User Type",
  },
];

export const DATABOXTAGS = [
  {
    title: "Users",
    BoxTags: [
      {
        itemBoxTag: "User",
        path: "/user",
        countEmployee: [],
      },
      {
        itemBoxTag: "Role",
        countEmployee: [],
        path: "/",
      },
      {
        itemBoxTag: "Role Profile",
        countEmployee: [],
        path: "/",
      },
    ],
  },
  {
    title: "Logs",
    BoxTags: [
      {
        itemBoxTag: "Activity Log",
        countEmployee: [],
        path: "/",
      },
      {
        itemBoxTag: "Access Log",
        countEmployee: [],
        path: "/",
      },
    ],
  },
  {
    title: "Permission",
    BoxTags: [
      {
        itemBoxTag: "Role Permissions Manager",
        path: "/",
        countEmployee: [],
      },
      {
        itemBoxTag: "User Permissions",
        path: "/",
        countEmployee: [],
      },
      {
        itemBoxTag: "Role Permission for Page and Report",
        path: "/",
        countEmployee: [],
      },
      {
        itemBoxTag: "Permitted Documents For User",
        path: "/",
        countEmployee: [],
      },
      {
        itemBoxTag: "Document Share Report",
        path: "/",
        countEmployee: [],
      },
    ],
  },
];

export const DATA_DROPDOWN_LISTVIEW_CRM = [
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

export const DATA_DROPDOWN_MENU_CRM = [
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

export const TITLE_STATUS_USERS = {
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
};

export const USER_ROLE = [
  {
    id: 1,
    title: "Academics User",
  },
  {
    id: 2,
    title: "Accounts Manager",
  },
  {
    id: 3,
    title: "Accounts User",
  },
  {
    id: 4,
    title: "Agriculture Manager",
  },
  {
    id: 5,
    title: "Agriculture User",
  },
  {
    id: 6,
    title: "Analytics",
  },
  {
    id: 7,
    title: "Auditor",
  },
  {
    id: 8,
    title: "Blogger",
  },
  {
    id: 9,
    title: "Customer",
  },
  {
    id: 10,
    title: "Dashboard Manager",
  },
  {
    id: 11,
    title: "Education Manager",
  },
  {
    id: 12,
    title: "Employee",
  },
  {
    id: 13,
    title: "Employee Self Service",
  },
  {
    id: 14,
    title: "Expense Approver",
  },
  {
    id: 15,
    title: "Fleet Manager",
  },
  {
    id: 16,
    title: "Fulfillment User",
  },
  {
    id: 17,
    title: "Healthcare Administrator",
  },
  {
    id: 18,
    title: "HR Manager",
  },
  {
    id: 19,
    title: "HR User",
  },
  {
    id: 20,
    title: "Inbox User",
  },
  {
    id: 21,
    title: "Instructor",
  },
  {
    id: 22,
    title: "Item Manager",
  },
  {
    id: 23,
    title: "Knowledge Base Contributor",
  },
  {
    id: 24,
    title: "Knowledge Base Editor",
  },
  {
    id: 25,
    title: "Laboratory User",
  },
  {
    id: 26,
    title: "LabTest Approver",
  },
  {
    id: 27,
    title: "Leave Approver",
  },
  {
    id: 28,
    title: "LMS User",
  },
  {
    id: 29,
    title: "Loan Manager",
  },
  {
    id: 30,
    title: "Maintenance Manager",
  },
  {
    id: 31,
    title: "Maintenance User",
  },
  {
    id: 32,
    title: "Manufacturing Manager",
  },
  {
    id: 33,
    title: "Manufacturing User",
  },
  {
    id: 34,
    title: "Newsletter Manager",
  },
  {
    id: 35,
    title: "Non Profit Manager",
  },
  {
    id: 36,
    title: "Non Profit Member",
  },
  {
    id: 37,
    title: "Non Profit Portal User",
  },
  {
    id: 38,
    title: "Nursing User",
  },
  {
    id: 39,
    title: "Patient",
  },
  {
    id: 40,
    title: "Physician",
  },
  {
    id: 41,
    title: "Prepared Report User",
  },
  {
    id: 42,
    title: "Projects Manager",
  },
  {
    id: 43,
    title: "Projects User",
  },
  {
    id: 44,
    title: "Purchase Manager",
  },
  {
    id: 45,
    title: "Purchase Master Manager",
  },
  {
    id: 46,
    title: "Purchase User",
  },
  {
    id: 47,
    title: "Quality Manager",
  },
  {
    id: 48,
    title: "Report Manager",
  },
  {
    id: 49,
    title: "Sales Manager",
  },
  {
    id: 50,
    title: "Sales Master Manager",
  },
  {
    id: 51,
    title: "Sales User",
  },
  {
    id: 52,
    title: "Script Manager",
  },
  {
    id: 53,
    title: "Stock Manager",
  },
  {
    id: 54,
    title: "Stock User",
  },
  {
    id: 55,
    title: "Student",
  },
  {
    id: 56,
    title: "Supplier",
  },
  {
    id: 57,
    title: "Support Team",
  },
  {
    id: 58,
    title: "System Manager",
  },
  {
    id: 59,
    title: "Translator",
  },
  {
    id: 60,
    title: "Website Manager",
  },
];

export const USER_ALLOW_MODULES = [
  {
    id: 1,
    title: "Core",
  },
  {
    id: 2,
    title: "Website",
  },
  {
    id: 3,
    title: "Workflow",
  },
  {
    id: 4,
    title: "Email",
  },
  {
    id: 5,
    title: "Custom",
  },
  {
    id: 6,
    title: "Geo",
  },
  {
    id: 7,
    title: "Desk",
  },
  {
    id: 8,
    title: "Integrations",
  },
  {
    id: 9,
    title: "Printing",
  },
  {
    id: 10,
    title: "Contacts",
  },
  {
    id: 11,
    title: "Data Migration",
  },
  {
    id: 12,
    title: "Chat",
  },
  {
    id: 13,
    title: "Social",
  },
  {
    id: 14,
    title: "Automation",
  },
  {
    id: 15,
    title: "Event Streaming",
  },
  {
    id: 16,
    title: "Accounts",
  },
  {
    id: 17,
    title: "CRM",
  },
  {
    id: 18,
    title: "Buying",
  },
  {
    id: 19,
    title: "Projects",
  },
  {
    id: 20,
    title: "Selling",
  },
  {
    id: 21,
    title: "Setup",
  },
  {
    id: 22,
    title: "HR",
  },
  {
    id: 23,
    title: "Manufacturing",
  },
  {
    id: 24,
    title: "Stock",
  },
  {
    id: 25,
    title: "Support",
  },
  {
    id: 26,
    title: "Utilities",
  },
  {
    id: 27,
    title: "Shopping Cart",
  },
  {
    id: 28,
    title: "Assets",
  },
  {
    id: 29,
    title: "Portal",
  },
  {
    id: 30,
    title: "Maintenance",
  },
  {
    id: 31,
    title: "Regional",
  },
  {
    id: 32,
    title: "Healthcare",
  },
  {
    id: 33,
    title: "Restaurant",
  },
  {
    id: 34,
    title: "ERPNext Integrations",
  },
  {
    id: 35,
    title: "Hotels",
  },
  {
    id: 36,
    title: "Hub Node",
  },
  {
    id: 37,
    title: "Quality Management",
  },
  {
    id: 38,
    title: "Communication",
  },
  {
    id: 39,
    title: "Loan Management",
  },
  {
    id: 40,
    title: "Payroll",
  },
  {
    id: 41,
    title: "Telephony",
  },
  {
    id: 42,
    title: "Agriculture",
  },
  {
    id: 43,
    title: "Education",
  },
  {
    id: 44,
    title: "Non Profit",
  },
];

export const LANGUAGE_OPTIONS = [
  { index: 1, name: "en", value: "en" },
  { index: 2, name: "vn", value: "vn" },
  { index: 3, name: "fr", value: "fr" },
];

export const GENDER_OPTIONS = [
  { index: 0, name: "", value: "" },
  { index: 1, name: "Prefer not to say", value: "PreferNotToSay" },
  { index: 2, name: "Non-Conforming", value: "NonConforming" },
  { index: 3, name: "Genderqueer", value: "Genderqueer" },
  { index: 4, name: "Transgender", value: "Transgender" },
  { index: 5, name: "Other", value: "Other" },
  { index: 6, name: "Male", value: "Male" },
  { index: 7, name: "Female", value: "Female" },
];

export const THEME_OPTIONS = [
  { index: 1, name: "Light", value: "Light" },
  { index: 2, name: "Dark", value: "Dark" },
];

export const FREQUENCY_OPTIONS = [
  { index: 1, name: "Hourly", value: "Hourly" },
  { index: 2, name: "Daily", value: "Daily" },
  { index: 3, name: "Weekly", value: "Weekly" },
];

export const USER_TYPE_OPTIONS = [
  { index: 1, name: "System User", value: "System User" },
  { index: 2, name: "Employee Self Service", value: "Employee Self Service" },
  { index: 3, name: "Website User", value: "Website User" },
];
