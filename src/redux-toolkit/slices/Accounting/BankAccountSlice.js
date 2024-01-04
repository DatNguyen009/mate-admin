import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { BANK_ACCOUNT, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import { GET_BANK_ACCOUNT, GET_BANK_ACCOUNT_PARAMS } from "helpers/url_helper";

export const fetchBankAccount = commonHandleHttpMethodGet(
  "BankAccountSlice/fetchBankAccount",
  GET_BANK_ACCOUNT
);

export const createBankAccount = commonHandleHttpMethodPost(
  "BankAccountSlice/createBankAccount",
  GET_BANK_ACCOUNT
);

export const getBankAccountByParams = commonHandleHttpMethodGetByParams(
  "BankAccountSlice/getBankAccountByParams",
  GET_BANK_ACCOUNT + GET_BANK_ACCOUNT_PARAMS
);

export const updateBankAccount = commonHandleHttpMethodPutV2(
  "BankAccountSlice/updateBankAccount",
  GET_BANK_ACCOUNT
);

const initialState = {
  loading: false,
  bankAccounts: [],
};

const BankAccountSlice = createSlice({
  name: "BankAccountSlice",
  initialState,
  extraReducers: {
    [fetchBankAccount.pending]: state => {
      state.loading = false;
    },
    [fetchBankAccount.fulfilled]: (state, action) => {
      state.loading = true;
      state.bankAccounts = action.payload;
    },
    [fetchBankAccount.rejected]: state => {
      state.loading = false;
    },

    [createBankAccount.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(BANK_ACCOUNT, TEXT_POST);
      }
    },

    [updateBankAccount.fulfilled]: (state, action) => {
      if (action.payload?.updatedAt) {
        toastrCRUDSuccess(BANK_ACCOUNT, TEXT_PUT);
      }
    },
  },
});

const { actions, reducer } = BankAccountSlice;
export default reducer;
