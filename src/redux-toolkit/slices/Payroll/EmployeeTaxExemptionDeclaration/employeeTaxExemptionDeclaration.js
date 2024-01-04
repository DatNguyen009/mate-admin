import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";

import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import {
  GET_EMPLOYEE_TAX_EXEMPTION_DECLARATION,
  GET_EMPLOYEE_TAX_EXEMPTION_DECLARATION_FULL,
} from "helpers/url_helper";

export const fetchEmployeeTaxExemptionDeclaration = commonHandleHttpMethodGet(
  "EmployeeTaxExemptionDeclaration/fetchEmployeeTaxExemptionDeclarationb",
  GET_EMPLOYEE_TAX_EXEMPTION_DECLARATION_FULL
);

export const createEmployeeTaxExemptionDeclaration = commonHandleHttpMethodPost(
  "EmployeeTaxExemptionDeclaration/postEmployeeTaxExemptionDeclaration",
  GET_EMPLOYEE_TAX_EXEMPTION_DECLARATION
);

export const updateEmployeeTaxExemptionDeclaration =
  commonHandleHttpMethodPutV2(
    "EmployeeTaxExemptionDeclaration/updateEmployeeTaxExemptionDeclaration",
    GET_EMPLOYEE_TAX_EXEMPTION_DECLARATION
  );

export const deleteEmployeeTaxExemptionDeclaration =
  commonHandleHttpMethodMultipleDelete(
    "PayrollPeriod/deleteEmployeeTaxExemptionDeclaration",
    GET_EMPLOYEE_TAX_EXEMPTION_DECLARATION
  );

const initialState = {
  fetched: false,
  employeeTaxExemptionDeclaration: [],
};

const EmployeeTaxExemptionDeclaration = createSlice({
  name: "EmployeeTaxExemptionDeclaration",
  initialState,
  extraReducers: {
    [fetchEmployeeTaxExemptionDeclaration.fulfilled]: (state, action) => {
      state.fetched = true;
      state.employeeTaxExemptionDeclaration = action.payload;
    },
    [fetchEmployeeTaxExemptionDeclaration.rejected]: (state, action) => {
      state.fetched = false;
    },
    [createEmployeeTaxExemptionDeclaration.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Employee Tax Exemption Declaration", TEXT_POST);
      return {
        ...state,
        fetched: false,
      };
    },
    [createEmployeeTaxExemptionDeclaration.rejected]: (state, action) => {
      toastrError();
    },
    [updateEmployeeTaxExemptionDeclaration.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Employee Tax Exemption Declaration", TEXT_PUT);
      return {
        ...state,
        fetched: false,
      };
    },
    [updateEmployeeTaxExemptionDeclaration.rejected]: (state, action) => {
      toastrError();
    },
    [deleteEmployeeTaxExemptionDeclaration.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Employee Tax Exemption Declaration", TEXT_DELETE);
    },
    [deleteEmployeeTaxExemptionDeclaration.rejected]: (state, action) => {
      toastrError();
    },
  },
});

const { actions, reducer } = EmployeeTaxExemptionDeclaration;
export default reducer;
export const {} = actions;
