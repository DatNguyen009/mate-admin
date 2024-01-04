import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  GET_LOAN_REPAYMENTS,
  LOAN_REPAYMENTS_PARAMS,
} from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  loanRepayments: [],
};

export const fetchLoanRepayments = commonHandleHttpMethodGet(
  "LoanRepaymentSlice/fetchLoanRepayments",
  GET_LOAN_REPAYMENTS + LOAN_REPAYMENTS_PARAMS
);
export const addLoanRepayment = commonHandleHttpMethodPost(
  "LoanRepaymentSlice/addLoanRepayment",
  GET_LOAN_REPAYMENTS
);
export const updateLoanRepayment = commonHandleHttpMethodPutV2(
  "LoanRepaymentSlice/updateLoanRepayment",
  GET_LOAN_REPAYMENTS
);
export const deleteLoanRepayment = commonHandleHttpMethodMultipleDelete(
  "LoanRepaymentSlice/deleteLoanRepayment",
  GET_LOAN_REPAYMENTS
);

const loanRepaymentSlice = createSlice({
  name: "LoanRepaymentSlice",
  initialState,
  extraReducers: {
    [fetchLoanRepayments.fulfilled]: (state, action) => {
      state.loanRepayments = action.payload;
    },
    [addLoanRepayment.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Loan Repayment", TEXT_POST);
    },
    [updateLoanRepayment.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Loan Repayment", TEXT_PUT);
    },
    [deleteLoanRepayment.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Loan Repayment", TEXT_DELETE);
    },
  },
});

const { reducer } = loanRepaymentSlice;
export default reducer;
