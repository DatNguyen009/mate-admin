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
  EMPLOYEE_BENEFIT_CLAIM,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import {
  GET_EMPLOYEE_BENEFIT_CLAIM,
  GET_EMPLOYEE_BENEFIT_CLAIM_FULL,
} from "helpers/url_helper";

import "toastr/build/toastr.min.css";

export const fetchEmployeeBenefitClaim = commonHandleHttpMethodGet(
  "EmployeeBenefitClaim/fetchEmployeeBenefitClaim",
  GET_EMPLOYEE_BENEFIT_CLAIM_FULL
);

export const getEmployeeBenefitClaimByID = commonHandleHttpMethodGet(
  "EmployeeBenefitClaim/getEmployeeBenefitClaimByID",
  GET_EMPLOYEE_BENEFIT_CLAIM
);

export const getEmployeeBenefitClaimByParams =
  commonHandleHttpMethodGetByParams(
    "EmployeeBenefitClaim/getEmployeeBenefitClaimByParams",
    GET_EMPLOYEE_BENEFIT_CLAIM_FULL
  );

export const createEmployeeBenefitClaim = commonHandleHttpMethodPost(
  "EmployeeBenefitClaim/createEmployeeBenefitClaim",
  GET_EMPLOYEE_BENEFIT_CLAIM
);

export const updateEmployeeBenefitClaim = commonHandleHttpMethodPutV2(
  "EmployeeBenefitClaim/updateEmployeeBenefitClaim",
  GET_EMPLOYEE_BENEFIT_CLAIM
);

export const deleteEmployeeBenefitClaim = commonHandleHttpMethodMultipleDelete(
  "EmployeeBenefitClaim/deleteEmployeeBenefitClaim",
  GET_EMPLOYEE_BENEFIT_CLAIM
);

const initialState = {
  loading: false,
  employeeBenefitClaim: [],
  employeeBenefitClaimDetail: {},
};

const EmployeeBenefitClaim = createSlice({
  name: "EmployeeBenefitClaim",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchEmployeeBenefitClaim.pending]: (state, action) => {
      state.loading = false;
    },
    [fetchEmployeeBenefitClaim.fulfilled]: (state, action) => {
      state.loading = true;
      state.employeeBenefitClaim = action.payload;
    },
    [fetchEmployeeBenefitClaim.rejected]: (state, action) => {
      state.loading = false;
    },

    [getEmployeeBenefitClaimByID.fulfilled]: (state, action) => {
      state.loading = true;
      state.employeeBenefitClaimDetail = action.payload;
    },
    [getEmployeeBenefitClaimByID.pending]: (state, action) => {
      state.loading = true;
      state.employeeBenefitClaimDetail = action.payload;
    },
    [getEmployeeBenefitClaimByID.rejected]: (state, action) => {
      state.loading = true;
      state.employeeBenefitClaimDetail = action.payload;
    },
    [createEmployeeBenefitClaim.pending]: (state, action) => {
      state.loading = false;
    },
    [createEmployeeBenefitClaim.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(EMPLOYEE_BENEFIT_CLAIM, TEXT_POST);
      }
    },
    [createEmployeeBenefitClaim.rejected]: (state, action) => {
      state.loading = false;
      toastrError();
    },

    [updateEmployeeBenefitClaim.pending]: (state, action) => {
      state.loading = false;
    },
    [updateEmployeeBenefitClaim.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(EMPLOYEE_BENEFIT_CLAIM, TEXT_PUT);
      }
    },
  },
});

const { actions, reducer } = EmployeeBenefitClaim;
export default reducer;
export const {} = actions;
