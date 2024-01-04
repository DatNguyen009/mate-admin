import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  EMPLOYEE_OTHER_INCOME,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import {
  GET_EMPLOYEE_OTHER_INCOME,
  GET_EMPLOYEE_OTHER_INCOME_QUERY,
} from "helpers/url_helper";

import "toastr/build/toastr.min.css";

export const fetchEmployeeOtherIncome = commonHandleHttpMethodGet(
  "EmployeeOtherIncome/fetchEmployeeOtherIncome",
  GET_EMPLOYEE_OTHER_INCOME + GET_EMPLOYEE_OTHER_INCOME_QUERY
);

export const fetchEmployeeOtherIncomeByParams =
  commonHandleHttpMethodGetByParams(
    "EmployeeOtherIncome/fetchEmployeeOtherIncomeByParams",
    GET_EMPLOYEE_OTHER_INCOME + GET_EMPLOYEE_OTHER_INCOME_QUERY
  );

export const getEmployeeOtherIncomeByID = commonHandleHttpMethodGet(
  "EmployeeOtherIncome/getEmployeeOtherIncomeByID",
  GET_EMPLOYEE_OTHER_INCOME
);

export const createEmployeeOtherIncome = commonHandleHttpMethodPost(
  "EmployeeOtherIncome/createEmployeeOtherIncome",
  GET_EMPLOYEE_OTHER_INCOME
);

export const updateEmployeeOtherIncome = commonHandleHttpMethodPutV2(
  "EmployeeOtherIncome/updateEmployeeOtherIncome",
  GET_EMPLOYEE_OTHER_INCOME
);

export const deleteEmployeeOtherIncome = commonHandleHttpMethodMultipleDelete(
  "PayrollPeriod/deleteEmployeeOtherIncome",
  GET_EMPLOYEE_OTHER_INCOME
);

const initialState = {
  loading: false,
  employeeOtherIncome: [],
  employeeOtherIncomeDetail: {},
};

const EmployeeOtherIncome = createSlice({
  name: "EmployeeOtherIncome",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchEmployeeOtherIncome.fulfilled]: (state, action) => {
      state.loading = true;
      state.employeeOtherIncome = action.payload;
    },
    [getEmployeeOtherIncomeByID.fulfilled]: (state, action) => {
      state.loading = true;
      state.employeeOtherIncomeDetail = action.payload;
    },
    [getEmployeeOtherIncomeByID.pending]: (state, action) => {
      state.loading = true;
    },
    [getEmployeeOtherIncomeByID.rejected]: (state, action) => {
      state.loading = true;
      state.EmployeeOtherIncomeDetail = action.payload;
    },
    [createEmployeeOtherIncome.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(EMPLOYEE_OTHER_INCOME, TEXT_POST);
      }
    },
    [createEmployeeOtherIncome.rejected]: (state, action) => {
      state.loading = false;
      toastrError();
    },
    [updateEmployeeOtherIncome.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(EMPLOYEE_OTHER_INCOME, TEXT_PUT);
      }
    },
    [deleteEmployeeOtherIncome.fulfilled]: (state, action) => {
      toastrCRUDSuccess(EMPLOYEE_OTHER_INCOME, TEXT_DELETE);
    },
    [deleteEmployeeOtherIncome.rejected]: (state, action) => {
      toastrError();
    },
  },
});

const { actions, reducer } = EmployeeOtherIncome;
export default reducer;
export const {} = actions;
