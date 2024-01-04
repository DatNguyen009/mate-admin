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
  GET_EMPLOYEE_TAX_EXEMPTION_PROOF_SUBMISSION,
  GET_EMPLOYEE_TAX_EXEMPTION_PROOF_SUBMISSION_FULL,
} from "helpers/url_helper";

export const fetchEmployeeTaxExemptionProofSubmission =
  commonHandleHttpMethodGet(
    "EmployeeTaxExemptionProofSubmission/fetchEmployeeTaxExemptionProofSubmission",
    GET_EMPLOYEE_TAX_EXEMPTION_PROOF_SUBMISSION_FULL
  );

export const createEmployeeTaxExemptionProofSubmission =
  commonHandleHttpMethodPost(
    "EmployeeTaxExemptionProofSubmission/createEmployeeTaxExemptionProofSubmission",
    GET_EMPLOYEE_TAX_EXEMPTION_PROOF_SUBMISSION
  );

export const updateEmployeeTaxExemptionProofSubmission =
  commonHandleHttpMethodPutV2(
    "EmployeeTaxExemptionProofSubmission/updateEmployeeTaxExemptionProofSubmission",
    GET_EMPLOYEE_TAX_EXEMPTION_PROOF_SUBMISSION
  );

export const deleteEmployeeTaxExemptionProofSubmission =
  commonHandleHttpMethodMultipleDelete(
    "EmployeeTaxExemptionProofSubmission/deleteEmployeeTaxExemptionProofSubmission",
    GET_EMPLOYEE_TAX_EXEMPTION_PROOF_SUBMISSION
  );

const initialState = {
  fetched: false,
  employeeTaxExemptionProofSubmission: [],
};

const EmployeeTaxExemptionProofSubmission = createSlice({
  name: "EmployeeTaxExemptionProofSubmission",
  initialState,
  extraReducers: {
    [fetchEmployeeTaxExemptionProofSubmission.fulfilled]: (state, action) => {
      state.fetched = true;
      state.employeeTaxExemptionProofSubmission = action.payload;
    },
    [fetchEmployeeTaxExemptionProofSubmission.rejected]: (state, action) => {
      state.fetched = false;
    },
    [createEmployeeTaxExemptionProofSubmission.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Employee Tax Exemption Proof Submission", TEXT_POST);
      return {
        ...state,
        fetched: false,
      };
    },
    [createEmployeeTaxExemptionProofSubmission.rejected]: (state, action) => {
      toastrError();
    },
    [updateEmployeeTaxExemptionProofSubmission.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Employee Tax Exemption Proof Submission", TEXT_PUT);
      return {
        ...state,
        fetched: false,
      };
    },
    [updateEmployeeTaxExemptionProofSubmission.rejected]: (state, action) => {
      toastrError();
    },
    [deleteEmployeeTaxExemptionProofSubmission.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Employee Tax Exemption Proof Submission", TEXT_DELETE);
    },
    [deleteEmployeeTaxExemptionProofSubmission.rejected]: (state, action) => {
      toastrError();
    },
  },
});

const { actions, reducer } = EmployeeTaxExemptionProofSubmission;
export default reducer;
export const {} = actions;
