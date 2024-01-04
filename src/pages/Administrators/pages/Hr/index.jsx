import React, { useEffect, useState } from "react";
import VVSTable from "components/form-control/VVSTable";
import { getUserRole } from "helpers/erp_helper";
import httpService from "services/httpService";
import { GET_EMPLOYEE, GET_EMPLOYEE_GROUP } from "helpers/url_helper";

function index() {
  const [roles, setRoles] = useState();
  const [queryEmployee, setQueryEmployee] = useState({});

  useEffect(() => {
    const getRole = async () => {
      const roles = await getUserRole();
      setRoles(roles);
    };
    getRole();
    getEmployeeGroup();
  }, []);

  const getEmployee = async query => {
    const optional = {
      params: {
        include: "user",
        where: {
          ...query,
        },
      },
    };

    const { results: employee } = await httpService.get(GET_EMPLOYEE, optional);

    return employee;
  };

  const getEmployeeGroup = async () => {
    const localStoredUser = JSON.parse(localStorage.getItem("User"));
    const optional = {
      ...(localStoredUser?.objectId && {
        user: {
          __type: "Pointer",
          className: "_User",
          objectId: localStoredUser?.objectId,
        },
      }),
    };

    const resE = await getEmployee(optional);
    const resEG = await httpService.get(GET_EMPLOYEE_GROUP, {
      params: {
        where: {
          leader: {
            __type: "Pointer",
            className: "Employee",
            objectId: resE[0]?.objectId,
          },
        },
      },
    });

    const resEGMap = resEG.results.map(item => {
      return {
        __type: "Pointer",
        className: "EmployeeGroup",
        objectId: item.objectId,
      };
    });
    const optional1 = {
      groups: {
        $in: resEGMap,
      },
    };
    setQueryEmployee(optional1);
  };
  return (
    <>
      {roles?.includes("Master") ? (
        <VVSTable
          title="Danh sách Đội nhóm"
          name="EmployeeGroupReport"
          routingPath="/employee-group/new-employee-group"
        />
      ) : (
        <>
          {roles?.includes("Sale Leader") && queryEmployee && (
            <VVSTable
              name="EmployeeHr"
              title="Nhân viên"
              whereQuery={queryEmployee}
              routingPath="/employee/new-employee"
            />
          )}
        </>
      )}
    </>
  );
}

export default index;
