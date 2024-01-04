import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { LOAN_SECURITY, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import { GET_ITEM_LASTEST_AND, GET_LOAN_SECURITY } from "helpers/url_helper";

export const fetchLoanSecurity = commonHandleHttpMethodGet(
  "LoanSecuritySlice/fetchLoanSecurity",
  GET_LOAN_SECURITY
);

export const getLastestLoanSecurity = commonHandleHttpMethodGet(
  "LoanSecuritySlice/getLastestLoanSecurity",
  `${GET_LOAN_SECURITY}?${GET_ITEM_LASTEST_AND}`
);

export const getItemLoanSecurityDetail = commonHandleHttpMethodGet(
  "LoanSecuritySlice/getItemLoanSecurityDetail",
  GET_LOAN_SECURITY
);

export const createLoanSecurity = commonHandleHttpMethodPost(
  "LoanSecuritySlice/createLoanSecurity",
  GET_LOAN_SECURITY
);

export const getLoanSecurityByParams = commonHandleHttpMethodGetByParams(
  "LoanSecuritySlice/getLoanSecurityByParams",
  GET_LOAN_SECURITY
);

export const updateLoanSecurity = commonHandleHttpMethodPutV2(
  "LoanSecuritySlice/updateLoanSecurity",
  GET_LOAN_SECURITY
);

const initialState = {
  loading: false,
  loanSecuritys: [],
  loanSecurityLastest: {},
  loanSecurityDetail: {},
};

const LoanSecuritySlice = createSlice({
  name: "LoanSecuritySlice",
  initialState,
  extraReducers: {
    [getItemLoanSecurityDetail.fulfilled]: (state, action) => {
      state.loanSecurityDetail = action.payload;
    },
    [fetchLoanSecurity.fulfilled]: (state, action) => {
      state.loading = true;

      state.loanSecuritys = action.payload;
    },
    [fetchLoanSecurity.pending]: state => {
      state.loading = false;
    },
    [getLastestLoanSecurity.fulfilled]: (state, action) => {
      state.loanSecurityLastest = action.payload;
    },
    [fetchLoanSecurity.rejected]: state => {
      state.loading = false;
    },

    [createLoanSecurity.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(LOAN_SECURITY, TEXT_POST);
      }
    },

    [updateLoanSecurity.fulfilled]: (state, action) => {
      if (action.payload?.updatedAt) {
        toastrCRUDSuccess(LOAN_SECURITY, TEXT_PUT);
      }
    },
  },
});

const { actions, reducer } = LoanSecuritySlice;
export default reducer;
