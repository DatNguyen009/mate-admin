import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  EMPLOYEE_TAX_EXEMPTION_SUB_CATEGORY,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import {
  GET_EMPLOYEE_TAX_EXEMPTION_SUB_CATEGORY,
  GET_EMPLOYEE_TAX_EXEMPTION_SUB_CATEGORY_QUERY,
} from "helpers/url_helper";

import "toastr/build/toastr.min.css";

export const fetchEmployeeTaxExemptionSubCategory = commonHandleHttpMethodGet(
  "EmployeeTaxExemptionSubCategory/fetchEmployeeTaxExemptionSubCategory",
  GET_EMPLOYEE_TAX_EXEMPTION_SUB_CATEGORY +
    GET_EMPLOYEE_TAX_EXEMPTION_SUB_CATEGORY_QUERY
);

export const getEmployeeTaxExemptionSubCategoryByID = commonHandleHttpMethodGet(
  "EmployeeTaxExemptionSubCategory/getEmployeeTaxExemptionSubCategoryByID",
  GET_EMPLOYEE_TAX_EXEMPTION_SUB_CATEGORY
);

export const createEmployeeTaxExemptionSubCategory = commonHandleHttpMethodPost(
  "EmployeeTaxExemptionSubCategory/createEmployeeTaxExemptionSubCategory",
  GET_EMPLOYEE_TAX_EXEMPTION_SUB_CATEGORY
);

export const updateEmployeeTaxExemptionSubCategory =
  commonHandleHttpMethodPutV2(
    "EmployeeTaxExemptionSubCategory/updateEmployeeTaxExemptionSubCategory",
    GET_EMPLOYEE_TAX_EXEMPTION_SUB_CATEGORY
  );

export const deleteEmployeeTaxExemptionSubCategory =
  commonHandleHttpMethodMultipleDelete(
    "EmployeeTaxExemptionSubCategory/deleteEmployeeTaxExemptionSubCategory",
    GET_EMPLOYEE_TAX_EXEMPTION_SUB_CATEGORY
  );

const initialState = {
  loading: false,
  employeeTaxExemptionSubCategory: [],
  employeeTaxExemptionSubCategoryDetail: {},
  fetched: false,
};

const EmployeeTaxExemptionSubCategory = createSlice({
  name: "EmployeeTaxExemptionSubCategory",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchEmployeeTaxExemptionSubCategory.fulfilled]: (state, action) => {
      state.loading = true;
      state.fetched = true;
      state.employeeTaxExemptionSubCategory = action.payload;
    },
    [getEmployeeTaxExemptionSubCategoryByID.fulfilled]: (state, action) => {
      state.loading = true;
      state.employeeTaxExemptionSubCategoryDetail = action.payload;
    },
    [getEmployeeTaxExemptionSubCategoryByID.pending]: (state, action) => {
      state.loading = true;
    },
    [getEmployeeTaxExemptionSubCategoryByID.rejected]: (state, action) => {
      state.loading = true;
      state.employeeTaxExemptionSubCategoryDetail = action.payload;
    },
    [createEmployeeTaxExemptionSubCategory.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(EMPLOYEE_TAX_EXEMPTION_SUB_CATEGORY, TEXT_POST);
      }
    },
    [createEmployeeTaxExemptionSubCategory.rejected]: (state, action) => {
      state.loading = false;
      toastrError();
    },
    [updateEmployeeTaxExemptionSubCategory.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(EMPLOYEE_TAX_EXEMPTION_SUB_CATEGORY, TEXT_PUT);
      }
    },
    [deleteEmployeeTaxExemptionSubCategory.fulfilled]: (state, action) => {
      toastrCRUDSuccess(EMPLOYEE_TAX_EXEMPTION_SUB_CATEGORY, TEXT_DELETE);
    },
    [deleteEmployeeTaxExemptionSubCategory.rejected]: (state, action) => {
      toastrError();
    },
  },
});

const { actions, reducer } = EmployeeTaxExemptionSubCategory;
export default reducer;
export const {} = actions;
