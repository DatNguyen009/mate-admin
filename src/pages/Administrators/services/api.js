import { getUserRole } from "helpers/erp_helper";
import _ from "lodash";
import httpService from "services/httpService";

// KPI Report
export const fetchDataForIncomeChart = async (dateFrom, dateTo) => {
  const url = "parse/functions/order-summary";
  try {
    const resp = await httpService.post(url, { dateFrom, dateTo });

    if (resp.result && resp.result.statusCode === 201) {
      return resp.result.data;
    }
  } catch (err) {
    console.error(err);
  }
};

export const fetchKPIEmployee = async employee => {
  const employeeUrl = "/parse/classes/Employee";
  const params = {
    params: {
      include: ["grade", "grade.branch"],
      where: {
        ...(employee && {
          group: {
            objectId: employee,
            className: "EmployeeGroup",
            __type: "Pointer",
          },
        }),
        grade: {
          $select: {
            query: {
              className: "EmployeeGrade",
              where: {
                isActive: true,
              },
            },
            key: "objectId",
          },
        },
      },
    },
  };
  const resEmployee = await httpService.get(employeeUrl, params);

  const employeeOption = resEmployee.results.map((item, index) => {
    return {
      text: item.fullName,
      value: item.objectId,
    };
  });
  const allEmployeeOption = [
    { text: "Tất cả nhân viên", value: "employeeId" },
    ...employeeOption,
  ];
  return allEmployeeOption;
};

export const fetchKPISumary = async (employee, group) => {
  const roles = await getUserRole();
  const kpiAssignmentUrl = `/parse/classes/KPIAssignment`;
  const employeeUrl = `/parse/classes/Employee`;
  const employeeGroupUrl = `/parse/classes/EmployeeGroup?where={"isActive": true}`;

  const params = {
    params: {
      include: ["team", "team.leader"],
      where: {
        ...(group === "groupId"
          ? ""
          : {
              isActive: true,
              team: {
                objectId: group,
                className: "EmployeeGroup",
                __type: "Pointer",
              },
            }),

        ...(employee === "employeeId"
          ? ""
          : {
              isActive: true,
              employee: {
                objectId: employee,
                className: "Employee",
                __type: "Pointer",
              },
            }),
      },
    },
  };

  const resKpiAssignment = await httpService.get(kpiAssignmentUrl, params);

  const kpiRoles = roles.includes("Master")
    ? resKpiAssignment.results.filter(item => item.type === "team")
    : resKpiAssignment.results.filter(item => item.type === "personal");
  const idGroup = kpiRoles.map(item => item.team?.objectId);

  const resEmployee = await httpService.get(employeeUrl, {
    params: {
      include: ["grade"],
      where: {
        ...(roles.includes("Master")
          ? {
              groups: {
                $in: idGroup.map(item => ({
                  objectId: item,
                  className: "EmployeeGroup",
                  __type: "Pointer",
                })),
              },
            }
          : employee !== "employeeId" && {
              objectId: employee,
            }),
      },
    },
  });

  const idKPIEmployee = resEmployee.results.map(item => item.objectId);
  const resKpiEmployee = await httpService.get(kpiAssignmentUrl, {
    params: {
      where: {
        employee: {
          $in: idKPIEmployee.map(item => ({
            objectId: item,
            className: "Employee",
            __type: "Pointer",
          })),
        },
      },
    },
  });
  const { results: resGroup } = await httpService.get(employeeGroupUrl);
  const idKPIGroup = resGroup.map(item => item.objectId);
  const resKpiGroup = await httpService.get(kpiAssignmentUrl, {
    params: {
      include: ["team"],
      where: {
        team: {
          $in: idKPIGroup.map(item => ({
            objectId: item,
            className: "EmployeeGroup",
            __type: "Pointer",
          })),
        },
      },
    },
  });

  const dataDetailGroup = resGroup.map(item => {
    const counter = type =>
      _.sumBy(
        resKpiGroup.results.filter(
          kpiEmployee => kpiEmployee.team.objectId === item.objectId
        ),
        type
      );
    return {
      objectId: item.objectId,
      fullName: item.name,
      bonus: counter("bonus"),
      commission: counter("commission"),
      total: counter("bonus") + counter("commission"),
    };
  });
  const dataDetail = resEmployee.results.map(item => {
    const counter = type =>
      _.sumBy(
        resKpiEmployee.results.filter(
          kpiEmployee => kpiEmployee.employee.objectId === item.objectId
        ),
        type
      );
    return {
      objectId: item.objectId,
      fullName: item.fullName,
      baseSalary: !item.grade?.baseSalary ? 0 : item.grade?.baseSalary,
      bonus: item.bonus ? counter("bonus") : 0,
      commission: item.commission ? counter("commission") : 0,
      total:
        (item.bonus ? counter("bonus") : 0) +
        (item.commission ? counter("commission") : 0) +
        (!item.grade?.baseSalary ? 0 : item.grade?.baseSalary),
    };
  });
  const totalDetail = dataDetail.reduce(
    (prev, cur, index, arr) => ({
      totalLength: arr.length,
      totalBaseSalary: _.sumBy(arr, "baseSalary"),
      totalComission: _.sumBy(arr, "commission"),
      totalBonus: _.sumBy(arr, "bonus"),
      total: _.sumBy(arr, "total"),
    }),
    {}
  );

  const totalDetailGroup = dataDetailGroup.reduce(
    (prev, cur, index, arr) => ({
      totalLength: arr.length,
      totalComission: _.sumBy(arr, "commission"),
      totalBonus: _.sumBy(arr, "bonus"),
      total: _.sumBy(arr, "total"),
    }),
    {}
  );

  const dataFindSumary = resKpiAssignment.results.reduce(
    (total, current) => {
      total.bonus += current.bonus;
      total.contractTotal += current.contractTotal;
      total.saleTotal += current.saleTotal;
      total.commission += current.commission;

      return total;
    },
    { bonus: 0, contractTotal: 0, saleTotal: 0, commission: 0 }
  );
  return {
    dataFindSumary,
    dataDetail,
    dataDetailGroup,
    totalDetail,
    totalDetailGroup,
  };
};

export const fetchAllKPI = async () => {
  const employeeGroupUrl = `/parse/classes/EmployeeGroup?where={"isActive": true}`;
  const employeeUrl = "/parse/classes/Employee";

  const res = await httpService.get(employeeGroupUrl);
  const dataGroup = res.results;

  const employeeGroupOption = dataGroup.map((item, index) => {
    return {
      text: item.name,
      value: item.objectId,
    };
  });

  const allGroupOption = [
    {
      text: "Tất cả đội nhóm",
      value: "groupId",
    },
    ...employeeGroupOption,
  ];

  const resEmployee = await httpService.get(employeeUrl);
  const dataEmployee = resEmployee.results;

  const employeeOption = dataEmployee.map((item, index) => {
    return {
      text: item.fullName,
      value: item.objectId,
    };
  });
  const allEmployeeOption = [
    { text: "Tất cả nhân viên", value: "employeeId" },
    ...employeeOption,
  ];
  return {
    allGroupOption,
    allEmployeeOption,
    dataGroup,
    dataEmployee,
  };
};
