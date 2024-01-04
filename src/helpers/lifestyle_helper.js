const MANAGER_TYPE = {
  NORMAL: 1,
  UPPER: 2,
};

export const roles = {
  SUPERVISOR: "Supervisor",
  DIRECTOR: "Supervisor.Director",
  MANAGER: "Supervisor.Director.Manager",
  EXPERT: "Supervisor.Director.Manager.Expert",
  USER: "Supervisor.Director.Manager.Expert.User",
};

export const getTextByRole = (role, type = MANAGER_TYPE.NORMAL) => {
  const res = {};
  switch (role) {
    case roles.SUPERVISOR:
      res.title = "Admin";
      break;
    case roles.DIRECTOR:
      res.title = type === MANAGER_TYPE.UPPER ? "Tổng giám đốc" : "Giám đốc";
      break;
    case roles.MANAGER:
      res.title = type === MANAGER_TYPE.UPPER ? "Tổng quản lý" : "Quản lý";
      break;
    case roles.EXPERT:
      res.title = "Đại lý";
      break;
    default:
      res.title = "Người dùng";
      break;
  }
  return res;
};
