import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { LOAN_SECURITY_PRICE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import {
  GET_ITEM_LASTEST_AND,
  GET_LOAN_SECURITY_PRICE,
} from "helpers/url_helper";

export const fetchLoanSecurityPrice = commonHandleHttpMethodGet(
  "LoanSecurityPriceSlice/fetchLoanSecurityPrice",
  GET_LOAN_SECURITY_PRICE
);

export const getLastestLoanSecurityPrice = commonHandleHttpMethodGet(
  "LoanSecurityPriceSlice/getLastestLoanSecurityPrice",
  `${GET_LOAN_SECURITY_PRICE}?${GET_ITEM_LASTEST_AND}`
);

export const getItemLoanSecurityPriceDetail = commonHandleHttpMethodGet(
  "LoanSecurityPriceSlice/getItemLoanSecurityPriceDetail",
  GET_LOAN_SECURITY_PRICE
);

export const createLoanSecurityPrice = commonHandleHttpMethodPost(
  "LoanSecurityPriceSlice/createLoanSecurityPrice",
  GET_LOAN_SECURITY_PRICE
);

export const getLoanSecurityPriceByParams = commonHandleHttpMethodGetByParams(
  "LoanSecurityPriceSlice/getLoanSecurityPriceByParams",
  GET_LOAN_SECURITY_PRICE
);

export const updateLoanSecurityPrice = commonHandleHttpMethodPutV2(
  "LoanSecurityPriceSlice/updateLoanSecurityPrice",
  GET_LOAN_SECURITY_PRICE
);

const initialState = {
  loading: false,
  loanSecurityPrices: [],
  loanSecurityPriceLastest: {},
  loanSecurityPriceDetail: {},
};

const LoanSecurityPriceSlice = createSlice({
  name: "LoanSecurityPriceSlice",
  initialState,
  extraReducers: {
    [getItemLoanSecurityPriceDetail.fulfilled]: (state, action) => {
      state.loanSecurityPriceDetail = action.payload;
    },
    [fetchLoanSecurityPrice.fulfilled]: (state, action) => {
      state.loading = true;

      state.loanSecurityPrices = action.payload;
    },
    [fetchLoanSecurityPrice.pending]: state => {
      state.loading = false;
    },
    [getLastestLoanSecurityPrice.fulfilled]: (state, action) => {
      state.loanSecurityPriceLastest = action.payload;
    },
    [fetchLoanSecurityPrice.rejected]: state => {
      state.loading = false;
    },

    [createLoanSecurityPrice.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(LOAN_SECURITY_PRICE, TEXT_POST);
      }
    },

    [updateLoanSecurityPrice.fulfilled]: (state, action) => {
      if (action.payload?.updatedAt) {
        toastrCRUDSuccess(LOAN_SECURITY_PRICE, TEXT_PUT);
      }
    },
  },
});

const { actions, reducer } = LoanSecurityPriceSlice;
export default reducer;
