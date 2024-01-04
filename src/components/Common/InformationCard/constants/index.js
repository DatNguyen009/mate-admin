export const REMOVE_SCHEMA = [
  "_User",
  "_Role",
  "_Session",
  "_Installation",
  "login",
  "SysCfg",
  "User",
  "Account",
  "HrSetting",
  "uestion",
  "Log",
  "File",
  "LeaveAllocation",
];
export const parseName = name => {
  switch (name) {
    case "name":
      return "Tên";
      break;
    case "status":
      return "Trạng thái";
      break;
    case "fullName":
      return "Họ và tên";
      break;
    case "phone":
      return "Số điện thoại";
      break;
    case "email":
      return "Mail";
      break;
    case "street":
      return "Đường";
      break;
    case "ward":
      return "Phường";
      break;
    case "ward":
      return "Phường";
      break;
    default:
      return name;
      break;
  }
};
export const types = {
  TASK: "task",
  CHART: "chart",
};
export const optionChart = [
  // {
  //   value: "table",
  //   name: "Table",
  // },
  {
    value: "pie",
    name: "Pie",
  },
  {
    value: "line",
    name: "Line",
  },
  {
    value: "bar",
    name: "Bar",
  },
];
