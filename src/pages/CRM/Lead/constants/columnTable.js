import React from "react";
import { Checkbox } from "antd";
import InputField from "components/form-control/InputField";
import VVSSelectModel from "components/form-control/VVSSelectModel";
import IDatePicker from "components/Common/DatePicker";
import moment from "moment";

// -Lead
export const HEADERS_GROUP_ALLOTMENTLEAD = (isGroup, setIsGroup) => {
  return [
    {
      text: "Nhóm sale",
      CellComponent: InputField,
      cellComponentProps: (formValue, indexOfRow) => ({
        name: `groups.${indexOfRow}.name`,
        disabled: true,
        conditionField: {
          isActive: true,
        },
      }),
    },
    {
      text: (
        <div className="d-flex align-items-center justify-content-between">
          <span>Phân bổ từ ngày</span>
        </div>
      ),
      CellComponent: IDatePicker,
      cellComponentProps: (formValue, indexOfRow) => ({
        name: `groups.${indexOfRow}.joinFrom`,
        formatDate: "DD/MM/YYYY",
        disabledDate: currentDate =>
          currentDate && currentDate < moment().subtract(1, "d"),
        onChange: value => {
          const { setValue } = formValue;
          const dayValue = moment(value).toISOString();
          setValue(`groups.${indexOfRow}.joinFrom`, dayValue);
        },
      }),
    },
    {
      text: (
        <div className="d-flex align-items-center justify-content-between">
          <span>Phân bổ theo %</span>
          <span>
            <Checkbox
              checked={isGroup}
              defaultChecked={isGroup}
              onClick={e => setIsGroup(e.target.checked)}
            />
            <span className="ms-2">Cân bằng </span>
          </span>
        </div>
      ),
      CellComponent: InputField,
      cellComponentProps: (formValue, indexOfRow) => {
        return {
          name: `groups.${indexOfRow}.percentage`,
          type: "number",
          min: 0,
          max: 100,
          disabled: isGroup,
        };
      },
    },
  ];
};

export const HEADERS_EMPLOYEE_ALLOTMENTLEAD = (isEmployee, setIsEmployee) => {
  return [
    {
      text: "Tên nhân viên",
      CellComponent: VVSSelectModel,
      cellComponentProps: (formValue, indexOfRow) => ({
        name: `employee.${indexOfRow}.name`,
        model: "EmployeeGroup",
        disabled: true,
      }),
    },
    {
      text: (
        <div className="d-flex align-items-center justify-content-between">
          <span>Phân bổ từ ngày</span>
        </div>
      ),
      CellComponent: IDatePicker,
      cellComponentProps: (formValue, indexOfRow) => ({
        name: `employee.${indexOfRow}.joinFrom`,
        formatDate: "DD/MM/YYYY",
        disabledDate: currentDate =>
          currentDate && currentDate < moment().subtract(1, "d"),
        onChange: value => {
          const { setValue } = formValue;
          const dayValue = moment(value).toISOString();
          setValue(`employee.${indexOfRow}.joinFrom`, dayValue);
        },
      }),
    },
    {
      text: (
        <div className="d-flex align-items-center justify-content-between">
          <span>Phân bổ theo %</span>
          <span>
            <Checkbox
              defaultChecked={isEmployee}
              onClick={e => setIsEmployee(e.target.checked)}
            />
            <span className="ms-2">Cân bằng </span>
          </span>
        </div>
      ),
      CellComponent: InputField,
      cellComponentProps: (formValue, indexOfRow) => ({
        name: `employee.${indexOfRow}.percentage`,
        type: "number",
        min: 0,
        max: 100,
        disabled: isEmployee,
      }),
    },
  ];
};
