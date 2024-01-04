import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { LOAN, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import {
  GET_ITEM_LASTEST_AND,
  GET_LOAN,
  GET_LOAN_QUERY,
} from "helpers/url_helper";

export const fetchLoan = commonHandleHttpMethodGet(
  "LoanSlice/fetchLoan",
  GET_LOAN
);

export const getLastestLoan = commonHandleHttpMethodGet(
  "LoanSlice/fetchLoan",
  `${GET_LOAN}?${GET_LOAN_QUERY}${GET_ITEM_LASTEST_AND}`
);

export const getItemLoanDetail = commonHandleHttpMethodGet(
  "LoanSlice/fetchLoan",
  GET_LOAN
);

export const createLoan = commonHandleHttpMethodPost(
  "LoanSlice/createLoan",
  GET_LOAN
);

export const getLoanByParams = commonHandleHttpMethodGetByParams(
  "LoanSlice/getLoanByParams",
  GET_LOAN + GET_LOAN_QUERY
);

export const updateLoan = commonHandleHttpMethodPutV2(
  "LoanSlice/updateLoan",
  GET_LOAN
);

const initialState = {
  loading: false,
  loans: [],
  loanLastest: {},
  loanDetail: {},
};

const LoanSlice = createSlice({
  name: "LoanSlice",
  initialState,
  extraReducers: {
    [getItemLoanDetail.fulfilled]: (state, action) => {
      state.loanDetail = action.payload;
    },
    [fetchLoan.fulfilled]: (state, action) => {
      state.loading = true;
      state.loans = action.payload;
    },
    [fetchLoan.pending]: state => {
      state.loading = false;
    },
    [getLastestLoan.fulfilled]: (state, action) => {
      state.loanLastest = action.payload;
    },
    [fetchLoan.rejected]: state => {
      state.loading = false;
    },

    [createLoan.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(LOAN, TEXT_POST);
      }
    },

    [updateLoan.fulfilled]: (state, action) => {
      if (action.payload?.updatedAt) {
        toastrCRUDSuccess(LOAN, TEXT_PUT);
      }
    },
  },
});

const { actions, reducer } = LoanSlice;
export default reducer;
