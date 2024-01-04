import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_LOAN_WRITE_OFFS, LOAN_WRITE_OFF_PARAMS } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  loanWriteOffs: [],
};

export const fetchLoanWriteOffs = commonHandleHttpMethodGet(
  "LoanWriteOffSlice/fetchLoanWriteOffs",
  GET_LOAN_WRITE_OFFS + LOAN_WRITE_OFF_PARAMS
);
export const addLoanWriteOff = commonHandleHttpMethodPost(
  "LoanWriteOffSlice/addLoanWriteOff",
  GET_LOAN_WRITE_OFFS
);
export const updateLoanWriteOff = commonHandleHttpMethodPutV2(
  "LoanWriteOffSlice/updateLoanWriteOff",
  GET_LOAN_WRITE_OFFS
);
export const deleteLoanWriteOff = commonHandleHttpMethodMultipleDelete(
  "LoanWriteOffSlice/deleteLoanWriteOff",
  GET_LOAN_WRITE_OFFS
);

const loanWriteOffSlice = createSlice({
  name: "LoanWriteOffSlice",
  initialState,
  extraReducers: {
    [fetchLoanWriteOffs.fulfilled]: (state, action) => {
      state.loanWriteOffs = action.payload;
    },
    [addLoanWriteOff.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Loan Write Off", TEXT_POST);
    },
    [updateLoanWriteOff.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Loan Write Off", TEXT_PUT);
    },
    [deleteLoanWriteOff.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Loan Write Off", TEXT_DELETE);
    },
  },
});

const { reducer } = loanWriteOffSlice;
export default reducer;
