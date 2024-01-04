import {
  toastrErrorAlert,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";
import {
  GET_CUSTOMERS,
  GET_EMPLOYEE,
  GET_EMPLOYEE_GROUP,
  GET_SYSCFG,
  LEAD_URL,
} from "helpers/url_helper";
import httpService from "services/httpService";

// Allotment-Lead

export const fetchSysCfgAllotment = async () => {
  const params = {
    where: {
      code: "allomentLead",
    },
  };
  try {
    const { results } = await httpService.get(GET_SYSCFG, { params });
    const data = results[0].Values;
    const configId = results[0];
    return { data, configId };
  } catch (error) {
    console.log("error", error);
  }
};

export const fetchEmployeeByGroup = async (
  selectedEmployee,
  modelName,
  setEmployee
) => {
  const res = await httpService.get(
    GET_EMPLOYEE +
      `?where={"groups":{"__type":"Pointer","className":"EmployeeGroup","objectId":"${selectedEmployee?.objectId}"}}`
  );

  return {
    res,
  };
};

export const fetchLeadAllotment = async (modelName, setLeads) => {
  try {
    const res = await httpService.get(
      modelName === "Lead" ? LEAD_URL : GET_CUSTOMERS
    );
    setLeads(
      res.results.filter(
        item => !item?.salesTeam || item?.salesTeam.objectId === "undefined"
      )
    );
  } catch (error) {
    toastrErrorAlert("Đã xảy ra lỗi, vui lòng thử lại!!");
  }
};

export const fetchEmployeeGroup = async (setLeadId, setEmployeeGroup) => {
  const localStoredUser = JSON.parse(localStorage.getItem("User"));
  try {
    const {
      results: [employee],
    } = await httpService.get(
      `${GET_EMPLOYEE}?where={"user":{"__type":"Pointer","className":"_User","objectId":"${localStoredUser.objectId}"}}`
    );
    const res = await httpService.get(
      GET_EMPLOYEE_GROUP + `?where={"isActive": true}`
    );
    setLeadId(employee?.objectId);
    setEmployeeGroup(res.results);
  } catch (error) {
    toastrErrorAlert("Đã xảy ra lỗi, vui lòng thử lại!!");
  }
};

export const createAllotmentData = async value => {
  try {
    const { configId } = await fetchSysCfgAllotment();
    await httpService.put(GET_SYSCFG + `/${configId.objectId}`, {
      Values: value,
    });
    toastrSuccessAlert("Phân bổ tự động thành công cho nhóm");
  } catch (error) {
    toastrErrorAlert("Đã xảy ra lỗi, vui lòng thử lại!!");
  }
};

export const fetchEvicAllot = async (type, field, teamId) => {
  const { data } = await fetchSysCfgAllotment();

  const indexTeam = data.findIndex(item => item.groupId === teamId);
  const indexEmployee = data[indexTeam].employees.findIndex(
    item => item.employeeId === field.oldEmployeeId
  );
  data[indexTeam].employees[indexEmployee].percentage = 0;

  if (type === 1 && field.newEmployeeId) {
    const url = "/api/v1/assign-lead";
    delete field.teamId;
    await httpService.post(url, field);
    await createAllotmentData(data);
    toastrSuccessAlert("Thu hồi thành công");
  }
  if (type === 2) {
    const url = "/api/v1/re-allotment-team";
    delete field.newEmployeeId;
    await httpService.post(url, field);
    await createAllotmentData(data);
    toastrSuccessAlert("Thu hồi thành công");
  }
  if (type === 3) {
  }
};
