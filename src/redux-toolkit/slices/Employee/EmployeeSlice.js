import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_EMPLOYEE, GET_EMPLOYEE_QUERY } from "helpers/url_helper";
import "toastr/build/toastr.min.css";
import {
  TEXT_POST,
  TEXT_PUT,
  EMPLOYEE,
  TEXT_DELETE,
} from "helpers/name_helper";
import moment from "moment";
import _ from "lodash";

export const fetchEmployee = commonHandleHttpMethodGet(
  "employeeSlice/fetchEmployee",
  GET_EMPLOYEE + GET_EMPLOYEE_QUERY
);

export const getEmployeeByID = commonHandleHttpMethodGet(
  "employeeSlice/getEmployeeByID",
  GET_EMPLOYEE
);

export const addEmployee = commonHandleHttpMethodPost(
  "employeeSlice/addEmployee",
  GET_EMPLOYEE
);

export const updateEmployee = commonHandleHttpMethodPutV2(
  "employeeSlice/updateEmployee",
  GET_EMPLOYEE
);

export const deleteEmployee = commonHandleHttpMethodMultipleDelete(
  "employeeSlice/deleteEmployee",
  GET_EMPLOYEE
);

const initialState = {
  loading: false,
  fetched: false,
  employees: [],
  employeeDetail: {},
  employeeFilter: [],
  checkedEmployee: [],
};

const employeeSlice = createSlice({
  name: "employeeSlice",
  initialState,
  reducers: {
    filterEmployee: (state, action) => {
      const { attendancesFilter, date, filter } = action.payload;
      const employeeFilterDate = state.employees.filter(employee =>
        moment(employee.doj).isSameOrBefore(date)
      );

      const employeeFilterArray = employeeFilterDate.filter(function (item) {
        for (let key in filter) {
          if (!key.includes(".")) {
            if (
              (item[key] === undefined || item[key] !== filter[key]) &&
              filter[key] !== "" &&
              item[key] !== ""
            )
              return false;
            return;
          }
          let split = key.split(".");
          if (item[split[0]][split[1]] !== filter[key] && filter[key] !== "")
            return false;
        }
        return true;
      });

      const employees = employeeFilterArray.reduce(
        (newEmployee, currentEmployee) => {
          const findEmployee = attendancesFilter.find(
            attendance =>
              attendance.employee.objectId === currentEmployee.objectId &&
              attendance.date.iso.slice(0, 10) === date
          );

          if (!findEmployee) newEmployee.push(currentEmployee);

          return newEmployee;
        },
        []
      );

      state.employeeFilter = employees;
    },

    checkAll: state => {
      var checkboxes = document.querySelectorAll('input[type="checkbox"]');
      for (var checkbox of checkboxes) {
        checkbox.checked = true;
      }
      state.checkedEmployee = [
        ...state.employeeFilter.map(item => item.objectId),
      ];
    },

    unCheckAll: state => {
      var checkboxes = document.querySelectorAll('input[type="checkbox"]');
      for (var checkbox of checkboxes) {
        checkbox.checked = false;
      }
      state.checkedEmployee = [];
    },

    handleCheckedEmployee: (state, action) => {
      const objectIdSelected = state.checkedEmployee?.findIndex(
        c => c === action.payload
      );

      if (objectIdSelected != -1) {
        state.checkedEmployee = [
          ...state.checkedEmployee?.filter(c => c !== action.payload),
        ];
        return;
      }
      state.checkedEmployee = [...state.checkedEmployee, action.payload];
    },
  },
  extraReducers: {
    [fetchEmployee.pending]: state => {
      state.loading = false;
    },
    [fetchEmployee.fulfilled]: (state, action) => {
      state.loading = true;
      state.employees = action.payload;
      state.fetched = true;
    },
    [getEmployeeByID.fulfilled]: (state, action) => {
      state.loading = true;
      state.employeeDetail = action.payload;
      state.fetched = true;
    },
    [fetchEmployee.rejected]: state => {
      state.loading = false;
    },
    [updateEmployee.pending]: state => {
      state.loading = false;
    },
    [updateEmployee.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.updatedAt) {
        toastrCRUDSuccess(EMPLOYEE, TEXT_PUT);
      }
    },
    [updateEmployee.rejected]: state => {
      state.loading = false;
    },
    [addEmployee.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(EMPLOYEE, TEXT_POST);
      }
    },
    [deleteEmployee.fulfilled]: () => {
      toastrCRUDSuccess(EMPLOYEE, TEXT_DELETE);
    },
    [deleteEmployee.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = employeeSlice;
export default reducer;
export const {
  filterEmployee,
  filterBranch,
  filterDepartment,
  checkAll,
  unCheckAll,
  handleCheckedEmployee,
} = actions;
