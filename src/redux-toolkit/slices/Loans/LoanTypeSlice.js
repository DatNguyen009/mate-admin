import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { LOAN_TYPE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import { GET_LOAN_TYPE, GET_LOAN_TYPE_PARAMS } from "helpers/url_helper";

export const fetchLoanType = commonHandleHttpMethodGet(
  "LoanTypeSlice/fetchLoanType",
  GET_LOAN_TYPE
);

export const createLoanType = commonHandleHttpMethodPost(
  "LoanTypeSlice/createLoanType",
  GET_LOAN_TYPE
);

export const getLoanTypeByParams = commonHandleHttpMethodGetByParams(
  "LoanTypeSlice/getLoanTypeByParams",
  GET_LOAN_TYPE + GET_LOAN_TYPE_PARAMS
);

export const updateLoanType = commonHandleHttpMethodPutV2(
  "LoanTypeSlice/updateLoanType",
  GET_LOAN_TYPE
);

const initialState = {
  loading: false,
  loanTypes: [],
};

const LoanTypeSlice = createSlice({
  name: "LoanTypeSlice",
  initialState,
  extraReducers: {
    [fetchLoanType.pending]: state => {
      state.loading = false;
    },
    [fetchLoanType.fulfilled]: (state, action) => {
      state.loading = true;
      state.loanTypes = action.payload;
    },
    [fetchLoanType.rejected]: state => {
      state.loading = false;
    },

    [createLoanType.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(LOAN_TYPE, TEXT_POST);
      }
    },

    [updateLoanType.fulfilled]: (state, action) => {
      if (action.payload?.updatedAt) {
        toastrCRUDSuccess(LOAN_TYPE, TEXT_PUT);
      }
    },
  },
});

const { actions, reducer } = LoanTypeSlice;
export default reducer;
