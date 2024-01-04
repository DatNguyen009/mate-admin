import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  GET_EMPLOYEE_BENEFIT_APPLICATION,
  GET_EMPLOYEE_BENEFIT_APPLICATION_FULL,
} from "helpers/url_helper";
import { TEXT_POST, TEXT_PUT } from "helpers/name_helper";

export const fetchEmployeeBenefitApplication = commonHandleHttpMethodGet(
  "EmployeeBenefitApplication/fetchEmployeeBenefitApplication",
  GET_EMPLOYEE_BENEFIT_APPLICATION_FULL
);

export const getEmployeeBenefitApplicationByID = commonHandleHttpMethodGet(
  "EmployeeBenefitApplication/getEmployeeBenefitApplicationByID",
  GET_EMPLOYEE_BENEFIT_APPLICATION
);

export const createEmployeeBenefitApplication = commonHandleHttpMethodPost(
  "EmployeeBenefitApplication/createEmployeeBenefitApplication",
  GET_EMPLOYEE_BENEFIT_APPLICATION
);

export const updateEmployeeBenefitApplication = commonHandleHttpMethodPutV2(
  "EmployeeBenefitApplication/updateEmployeeBenefitApplication",
  GET_EMPLOYEE_BENEFIT_APPLICATION
);

export const deleteEmployeeBenefitApplication =
  commonHandleHttpMethodMultipleDelete(
    "EmployeeBenefitApplication/updateEmployeeBenefitApplication",
    GET_EMPLOYEE_BENEFIT_APPLICATION
  );

const initialState = {
  fetched: false,
  employeeBenefitApplication: [],
  employeeBenefitApplicationDetail: {},
};

const EmployeeBenefitApplication = createSlice({
  name: "EmployeeBenefitApplication",
  initialState,
  extraReducers: {
    [fetchEmployeeBenefitApplication.fulfilled]: (state, action) => {
      state.fetched = true;
      state.employeeBenefitApplication = action.payload;
    },
    [fetchEmployeeBenefitApplication.rejected]: (state, action) => {
      state.fetched = false;
    },
    [getEmployeeBenefitApplicationByID.fulfilled]: (state, action) => {
      state.employeeBenefitApplicationDetail = action.payload;
      state.fetched = false;
    },
    [createEmployeeBenefitApplication.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Employee Benefit Application", TEXT_POST);
      state.fetched = false;
    },
    [createEmployeeBenefitApplication.rejected]: (state, action) => {
      toastrError();
    },
    [updateEmployeeBenefitApplication.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Employee Benefit Application", TEXT_PUT);
      state.fetched = false;
    },
    [updateEmployeeBenefitApplication.rejected]: (state, action) => {
      toastrError();
    },
  },
});

const { actions, reducer } = EmployeeBenefitApplication;
export default reducer;
export const {} = actions;
