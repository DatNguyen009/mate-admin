import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  LOAN_SECURITY_UNPLEDGE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import {
  GET_ITEM_LASTEST_AND,
  GET_LOAN_SECURITY_PRICE_UNPLEDGE,
} from "helpers/url_helper";

export const fetchLoanSecurityUnpledge = commonHandleHttpMethodGet(
  "LoanSecurityUnpledgeSlice/fetchLoanSecurityUnpledge",
  GET_LOAN_SECURITY_PRICE_UNPLEDGE
);

export const getLastestLoanSecurityUnpledge = commonHandleHttpMethodGet(
  "LoanSecurityUnpledgeSlice/getLastestLoanSecurityUnpledge",
  `${GET_LOAN_SECURITY_PRICE_UNPLEDGE}?${GET_ITEM_LASTEST_AND}`
);

export const getItemLoanSecurityUnpledgeDetail = commonHandleHttpMethodGet(
  "LoanSecurityUnpledgeSlice/getItemLoanSecurityUnpledgeDetail",
  GET_LOAN_SECURITY_PRICE_UNPLEDGE
);

export const createLoanSecurityUnpledge = commonHandleHttpMethodPost(
  "LoanSecurityUnpledgeSlice/createLoanSecurityUnpledge",
  GET_LOAN_SECURITY_PRICE_UNPLEDGE
);

export const getLoanSecurityUnpledgeByParams =
  commonHandleHttpMethodGetByParams(
    "LoanSecurityUnpledgeSlice/getLoanSecurityUnpledgeByParams",
    GET_LOAN_SECURITY_PRICE_UNPLEDGE
  );

export const updateLoanSecurityUnpledge = commonHandleHttpMethodPutV2(
  "LoanSecurityUnpledgeSlice/updateLoanSecurityUnpledge",
  GET_LOAN_SECURITY_PRICE_UNPLEDGE
);

const initialState = {
  loading: false,
  loanSecurityUnpledges: [],
  loanSecurityUnpledgeLastest: {},
  loanSecurityUnpledgeDetail: {},
};

const LoanSecurityUnpledgeSlice = createSlice({
  name: "LoanSecurityUnpledgeSlice",
  initialState,
  extraReducers: {
    [getItemLoanSecurityUnpledgeDetail.fulfilled]: (state, action) => {
      state.loanSecurityUnpledgeDetail = action.payload;
    },
    [fetchLoanSecurityUnpledge.fulfilled]: (state, action) => {
      state.loading = true;

      state.loanSecurityUnpledges = action.payload;
    },
    [fetchLoanSecurityUnpledge.pending]: state => {
      state.loading = false;
    },
    [getLastestLoanSecurityUnpledge.fulfilled]: (state, action) => {
      state.loanSecurityUnpledgeLastest = action.payload;
    },
    [fetchLoanSecurityUnpledge.rejected]: state => {
      state.loading = false;
    },

    [createLoanSecurityUnpledge.fulfilled]: (state, action) => {
      if (action.payload?.objectId) {
        toastrCRUDSuccess(LOAN_SECURITY_UNPLEDGE, TEXT_POST);
      }
    },

    [updateLoanSecurityUnpledge.fulfilled]: (state, action) => {
      if (action.payload?.updatedAt) {
        toastrCRUDSuccess(LOAN_SECURITY_UNPLEDGE, TEXT_PUT);
      }
    },
  },
});

const { actions, reducer } = LoanSecurityUnpledgeSlice;
export default reducer;
