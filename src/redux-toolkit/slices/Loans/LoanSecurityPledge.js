import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { LOAN_SECURITY_PLEDGE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import {
  GET_ITEM_LASTEST_AND,
  GET_LOAN_SECURITY_PRICE_PLEDGE,
} from "helpers/url_helper";

export const fetchLoanSecurityPledge = commonHandleHttpMethodGet(
  "LoanSecurityPledgeSlice/fetchLoanSecurityPledge",
  GET_LOAN_SECURITY_PRICE_PLEDGE
);

export const getLastestLoanSecurityPledge = commonHandleHttpMethodGet(
  "LoanSecurityPledgeSlice/getLastestLoanSecurityPledge",
  `${GET_LOAN_SECURITY_PRICE_PLEDGE}?${GET_ITEM_LASTEST_AND}`
);

export const getItemLoanSecurityPledgeDetail = commonHandleHttpMethodGet(
  "LoanSecurityPledgeSlice/getItemLoanSecurityPledgeDetail",
  GET_LOAN_SECURITY_PRICE_PLEDGE
);

export const createLoanSecurityPledge = commonHandleHttpMethodPost(
  "LoanSecurityPledgeSlice/createLoanSecurityPledge",
  GET_LOAN_SECURITY_PRICE_PLEDGE
);

export const getLoanSecurityPledgeByParams = commonHandleHttpMethodGetByParams(
  "LoanSecurityPledgeSlice/getLoanSecurityPledgeByParams",
  GET_LOAN_SECURITY_PRICE_PLEDGE
);

export const updateLoanSecurityPledge = commonHandleHttpMethodPutV2(
  "LoanSecurityPledgeSlice/updateLoanSecurityPledge",
  GET_LOAN_SECURITY_PRICE_PLEDGE
);

const initialState = {
  loading: false,
  loanSecurityPledges: [],
  loanSecurityPledgeLastest: {},
  loanSecurityPledgeDetail: {},
};

const LoanSecurityPledgeSlice = createSlice({
  name: "LoanSecurityPledgeSlice",
  initialState,
  extraReducers: {
    [getItemLoanSecurityPledgeDetail.fulfilled]: (state, action) => {
      state.loanSecurityPledgeDetail = action.payload;
    },
    [fetchLoanSecurityPledge.fulfilled]: (state, action) => {
      state.loading = true;

      state.loanSecurityPledges = action.payload;
    },
    [fetchLoanSecurityPledge.pending]: state => {
      state.loading = false;
    },
    [getLastestLoanSecurityPledge.fulfilled]: (state, action) => {
      state.loanSecurityPledgeLastest = action.payload;
    },
    [fetchLoanSecurityPledge.rejected]: state => {
      state.loading = false;
    },

    [createLoanSecurityPledge.fulfilled]: (state, action) => {
      if (action.payload?.objectId) {
        toastrCRUDSuccess(LOAN_SECURITY_PLEDGE, TEXT_POST);
      }
    },

    [updateLoanSecurityPledge.fulfilled]: (state, action) => {
      if (action.payload?.updatedAt) {
        toastrCRUDSuccess(LOAN_SECURITY_PLEDGE, TEXT_PUT);
      }
    },
  },
});

const { actions, reducer } = LoanSecurityPledgeSlice;
export default reducer;
