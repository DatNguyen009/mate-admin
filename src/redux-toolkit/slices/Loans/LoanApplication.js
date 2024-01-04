import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { LOAN_APPLICATION, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import {
  GET_ITEM_LASTEST,
  GET_ITEM_LASTEST_AND,
  GET_LOAN_APPLICATION,
  GET_LOAN_APPLICATION_QUERY,
} from "helpers/url_helper";

export const fetchLoanApplication = commonHandleHttpMethodGet(
  "LoanApplicationSlice/fetchLoanApplication",
  GET_LOAN_APPLICATION
);

export const getLastestLoanApplication = commonHandleHttpMethodGet(
  "LoanApplicationSlice/fetchLoanApplication",
  `${GET_LOAN_APPLICATION}?${GET_LOAN_APPLICATION_QUERY}${GET_ITEM_LASTEST_AND}`
);

export const getItemLoanApplicationDetail = commonHandleHttpMethodGet(
  "LoanApplicationSlice/fetchLoanApplication",
  GET_LOAN_APPLICATION
);

export const createLoanApplication = commonHandleHttpMethodPost(
  "LoanApplicationSlice/createLoanApplication",
  GET_LOAN_APPLICATION
);

export const getLoanApplicationByParams = commonHandleHttpMethodGetByParams(
  "LoanApplicationSlice/getLoanApplicationByParams",
  GET_LOAN_APPLICATION + GET_LOAN_APPLICATION_QUERY
);

export const updateLoanApplication = commonHandleHttpMethodPutV2(
  "LoanApplicationSlice/updateLoanApplication",
  GET_LOAN_APPLICATION
);

const initialState = {
  loading: false,
  loanApplications: [],
  loanApplicationLastest: {},
  loanApplicationDetail: {},
};

const LoanApplicationSlice = createSlice({
  name: "LoanApplicationSlice",
  initialState,
  extraReducers: {
    [getItemLoanApplicationDetail.fulfilled]: (state, action) => {
      state.loanApplicationDetail = action.payload;
    },
    [fetchLoanApplication.fulfilled]: (state, action) => {
      state.loading = true;
      state.loanApplications = action.payload;
    },
    [fetchLoanApplication.pending]: state => {
      state.loading = false;
    },
    [getLastestLoanApplication.fulfilled]: (state, action) => {
      state.loanApplicationLastest = action.payload;
    },
    [fetchLoanApplication.rejected]: state => {
      state.loading = false;
    },

    [createLoanApplication.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(LOAN_APPLICATION, TEXT_POST);
      }
    },

    [updateLoanApplication.fulfilled]: (state, action) => {
      if (action.payload?.updatedAt) {
        toastrCRUDSuccess(LOAN_APPLICATION, TEXT_PUT);
      }
    },
  },
});

const { actions, reducer } = LoanApplicationSlice;
export default reducer;
