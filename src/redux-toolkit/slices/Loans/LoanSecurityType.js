import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { LOAN_SECURITY_TYPE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import {
  GET_ITEM_LASTEST_AND,
  GET_LOAN_SECURITY_TYPE,
} from "helpers/url_helper";

export const fetchLoanSecurityType = commonHandleHttpMethodGet(
  "LoanSecurityTypeSlice/fetchLoanSecurityType",
  GET_LOAN_SECURITY_TYPE
);

export const getLastestLoanSecurityType = commonHandleHttpMethodGet(
  "LoanSecurityTypeSlice/getLastestLoanSecurityType",
  `${GET_LOAN_SECURITY_TYPE}?${GET_ITEM_LASTEST_AND}`
);

export const getItemLoanSecurityTypeDetail = commonHandleHttpMethodGet(
  "LoanSecurityTypeSlice/getItemLoanSecurityTypeDetail",
  GET_LOAN_SECURITY_TYPE
);

export const createLoanSecurityType = commonHandleHttpMethodPost(
  "LoanSecurityTypeSlice/createLoanSecurityType",
  GET_LOAN_SECURITY_TYPE
);

export const getLoanSecurityTypeByParams = commonHandleHttpMethodGetByParams(
  "LoanSecurityTypeSlice/getLoanSecurityTypeByParams",
  GET_LOAN_SECURITY_TYPE
);

export const updateLoanSecurityType = commonHandleHttpMethodPutV2(
  "LoanSecurityTypeSlice/updateLoanSecurityType",
  GET_LOAN_SECURITY_TYPE
);

const initialState = {
  loading: false,
  loanSecurityTypes: [],
  loanSecurityTypeLastest: {},
  loanSecurityTypeDetail: {},
};

const LoanSecurityTypeSlice = createSlice({
  name: "LoanSecurityTypeSlice",
  initialState,
  extraReducers: {
    [getItemLoanSecurityTypeDetail.fulfilled]: (state, action) => {
      state.loanSecurityTypeDetail = action.payload;
    },
    [fetchLoanSecurityType.fulfilled]: (state, action) => {
      state.loading = true;

      state.loanSecurityTypes = action.payload;
    },
    [fetchLoanSecurityType.pending]: state => {
      state.loading = false;
    },
    [getLastestLoanSecurityType.fulfilled]: (state, action) => {
      state.loanSecurityTypeLastest = action.payload;
    },
    [fetchLoanSecurityType.rejected]: state => {
      state.loading = false;
    },

    [createLoanSecurityType.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(LOAN_SECURITY_TYPE, TEXT_POST);
      }
    },

    [updateLoanSecurityType.fulfilled]: (state, action) => {
      if (action.payload?.updatedAt) {
        toastrCRUDSuccess(LOAN_SECURITY_TYPE, TEXT_PUT);
      }
    },
  },
});

const { actions, reducer } = LoanSecurityTypeSlice;
export default reducer;
