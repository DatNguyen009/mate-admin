import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPut,
} from "helpers/erp_helper";
import {
  EMPLOYEE_TAX_EXEMPTION_CATEGORY,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import { GET_EMPLOYEE_TAX_EXEMPTION_CATEGORY } from "helpers/url_helper";

import "toastr/build/toastr.min.css";

export const fetchEmployeeTaxExemptionCategory = commonHandleHttpMethodGet(
  "EmployeeTaxExemptionCategory/fetchEmployeeTaxExemptionCategory",
  GET_EMPLOYEE_TAX_EXEMPTION_CATEGORY
);

export const fetchEmployeeTaxExemptionCategoryByParams =
  commonHandleHttpMethodGetByParams(
    "EmployeeTaxExemptionCategory/fetchEmployeeTaxExemptionCategory",
    GET_EMPLOYEE_TAX_EXEMPTION_CATEGORY
  );

export const getEmployeeTaxExemptionCategoryByID = commonHandleHttpMethodGet(
  "EmployeeTaxExemptionCategory/getEmployeeTaxExemptionCategoryByID",
  GET_EMPLOYEE_TAX_EXEMPTION_CATEGORY
);

export const createEmployeeTaxExemptionCategory = commonHandleHttpMethodPost(
  "EmployeeTaxExemptionCategory/createEmployeeTaxExemptionCategory",
  GET_EMPLOYEE_TAX_EXEMPTION_CATEGORY
);

export const updateEmployeeTaxExemptionCategory = commonHandleHttpMethodPut(
  "EmployeeTaxExemptionCategory/updateEmployeeTaxExemptionCategory",
  GET_EMPLOYEE_TAX_EXEMPTION_CATEGORY
);

export const deleteEmployeeTaxExemptionCategory =
  commonHandleHttpMethodMultipleDelete(
    "EmployeeTaxExemptionCategory/deleteEmployeeTaxExemptionCategory",
    GET_EMPLOYEE_TAX_EXEMPTION_CATEGORY
  );

const initialState = {
  loading: false,
  employeeTaxExemptionCategory: [],
  employeeTaxExemptionCategoryDetail: {},
};

const EmployeeTaxExemptionCategory = createSlice({
  name: "EmployeeTaxExemptionCategory",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchEmployeeTaxExemptionCategory.fulfilled]: (state, action) => {
      state.loading = true;
      state.employeeTaxExemptionCategory = action.payload;
    },
    [getEmployeeTaxExemptionCategoryByID.fulfilled]: (state, action) => {
      state.loading = true;
      state.employeeTaxExemptionCategoryDetail = action.payload;
    },
    [getEmployeeTaxExemptionCategoryByID.pending]: (state, action) => {
      state.loading = true;
    },
    [getEmployeeTaxExemptionCategoryByID.rejected]: (state, action) => {
      state.loading = true;
      state.employeeTaxExemptionCategoryDetail = action.payload;
    },
    [createEmployeeTaxExemptionCategory.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(EMPLOYEE_TAX_EXEMPTION_CATEGORY, TEXT_POST);
      }
    },
    [createEmployeeTaxExemptionCategory.rejected]: (state, action) => {
      state.loading = false;
      toastrError();
    },
    [updateEmployeeTaxExemptionCategory.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(EMPLOYEE_TAX_EXEMPTION_CATEGORY, TEXT_PUT);
      }
    },
    [deleteEmployeeTaxExemptionCategory.fulfilled]: (state, action) => {
      toastrCRUDSuccess(EMPLOYEE_TAX_EXEMPTION_CATEGORY, TEXT_DELETE);
    },
    [deleteEmployeeTaxExemptionCategory.rejected]: (state, action) => {
      toastrError();
    },
  },
});

const { actions, reducer } = EmployeeTaxExemptionCategory;
export default reducer;
export const {} = actions;
