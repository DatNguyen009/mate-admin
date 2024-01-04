import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { LOAN_DISBURSEMENT, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import {
  GET_LOAN_DISBURSEMENT,
  GET_LOAN_DISBURSEMENT_NEWEST_PARAMS,
  GET_LOAN_DISBURSEMENT_PARAMS,
} from "helpers/url_helper";

export const fetchLoanDisbursement = commonHandleHttpMethodGet(
  "LoanDisbursementSlice/fetchLoanDisbursement",
  GET_LOAN_DISBURSEMENT
);

export const createLoanDisbursement = commonHandleHttpMethodPost(
  "LoanDisbursementSlice/createLoanDisbursement",
  GET_LOAN_DISBURSEMENT
);

export const getLoanDisbursementByParams = commonHandleHttpMethodGetByParams(
  "LoanDisbursementSlice/getLoanDisbursementByParams",
  GET_LOAN_DISBURSEMENT + GET_LOAN_DISBURSEMENT_PARAMS
);

export const getLoanDisbursementNewest = commonHandleHttpMethodGet(
  "LoanDisbursementSlice/getLoanDisbursementNewest",
  GET_LOAN_DISBURSEMENT + GET_LOAN_DISBURSEMENT_NEWEST_PARAMS
);

export const updateLoanDisbursement = commonHandleHttpMethodPutV2(
  "LoanDisbursementSlice/updateLoanDisbursement",
  GET_LOAN_DISBURSEMENT
);

const initialState = {
  loading: false,
  loanDisbursements: [],
};

const LoanDisbursementSlice = createSlice({
  name: "LoanDisbursementSlice",
  initialState,
  extraReducers: {
    [fetchLoanDisbursement.pending]: state => {
      state.loading = false;
    },
    [fetchLoanDisbursement.fulfilled]: (state, action) => {
      state.loading = true;
      state.loanDisbursements = action.payload;
    },
    [fetchLoanDisbursement.rejected]: state => {
      state.loading = false;
    },

    [createLoanDisbursement.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(LOAN_DISBURSEMENT, TEXT_POST);
      }
    },

    [updateLoanDisbursement.fulfilled]: (state, action) => {
      if (action.payload?.updatedAt) {
        toastrCRUDSuccess(LOAN_DISBURSEMENT, TEXT_PUT);
      }
    },
  },
});

const { actions, reducer } = LoanDisbursementSlice;
export default reducer;
