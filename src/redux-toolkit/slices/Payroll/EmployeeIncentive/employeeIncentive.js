import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  GET_EMPLOYEE_INCENTIVE,
  GET_EMPLOYEE_INCENTIVE_FULL,
} from "helpers/url_helper";
import { TEXT_POST, TEXT_PUT } from "helpers/name_helper";

export const fetchEmployeeIncentive = commonHandleHttpMethodGet(
  "EmployeeIncentive/fetchEmployeeIncentive",
  GET_EMPLOYEE_INCENTIVE_FULL
);

export const getEmployeeIncentiveByID = commonHandleHttpMethodGet(
  "EmployeeIncentive/getEmployeeIncentiveByID",
  GET_EMPLOYEE_INCENTIVE
);

export const createEmployeeIncentive = commonHandleHttpMethodPost(
  "EmployeeIncentive/createEmployeeIncentive",
  GET_EMPLOYEE_INCENTIVE
);

export const updateEmployeeIncentive = commonHandleHttpMethodPutV2(
  "EmployeeIncentive/updateEmployeeIncentive",
  GET_EMPLOYEE_INCENTIVE
);

export const deleteEmployeeIncentive = commonHandleHttpMethodMultipleDelete(
  "EmployeeIncentive/updateEmployeeIncentive",
  GET_EMPLOYEE_INCENTIVE
);

const initialState = {
  fetched: false,
  employeeIncentive: [],
  employeeIncentiveDetail: {},
};

const EmployeeIncentive = createSlice({
  name: "EmployeeIncentive",
  initialState,
  extraReducers: {
    [fetchEmployeeIncentive.fulfilled]: (state, action) => {
      state.fetched = true;
      state.employeeIncentive = action.payload;
    },
    [fetchEmployeeIncentive.rejected]: (state, action) => {
      state.fetched = false;
    },
    [getEmployeeIncentiveByID.fulfilled]: (state, action) => {
      state.employeeIncentiveDetail = action.payload;
      state.fetched = false;
    },
    [createEmployeeIncentive.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Employee Incentive", TEXT_POST);
      state.fetched = false;
    },
    [createEmployeeIncentive.rejected]: (state, action) => {
      toastrError();
    },
    [updateEmployeeIncentive.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Employee Incentive", TEXT_PUT);
      state.fetched = false;
    },
    [updateEmployeeIncentive.rejected]: (state, action) => {
      toastrError();
    },
  },
});

const { actions, reducer } = EmployeeIncentive;
export default reducer;
export const {} = actions;
