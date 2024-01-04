import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { BANK_ACCOUNT_TYPE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import {
  GET_ITEM_LASTEST_AND,
  GET_BANK_ACCOUNT_TYPE,
} from "helpers/url_helper";

export const fetchBankAccountType = commonHandleHttpMethodGet(
  "BankAccountTypeSlice/fetchBankAccountType",
  GET_BANK_ACCOUNT_TYPE
);

export const getLastestBankAccountType = commonHandleHttpMethodGet(
  "BankAccountTypeSlice/getLastestBankAccountType",
  `${GET_BANK_ACCOUNT_TYPE}?${GET_ITEM_LASTEST_AND}`
);

export const getItemBankAccountTypeDetail = commonHandleHttpMethodGet(
  "BankAccountTypeSlice/getItemBankAccountTypeDetail",
  GET_BANK_ACCOUNT_TYPE
);

export const createBankAccountType = commonHandleHttpMethodPost(
  "BankAccountTypeSlice/createBankAccountType",
  GET_BANK_ACCOUNT_TYPE
);

export const getBankAccountTypeByParams = commonHandleHttpMethodGetByParams(
  "BankAccountTypeSlice/getBankAccountTypeByParams",
  GET_BANK_ACCOUNT_TYPE
);

export const updateBankAccountType = commonHandleHttpMethodPutV2(
  "BankAccountTypeSlice/updateBankAccountType",
  GET_BANK_ACCOUNT_TYPE
);

const initialState = {
  loading: false,
  BankAccountTypes: [],
  BankAccountTypeLastest: {},
  BankAccountTypeDetail: {},
};

const BankAccountTypeSlice = createSlice({
  name: "BankAccountTypeSlice",
  initialState,
  extraReducers: {
    [getItemBankAccountTypeDetail.fulfilled]: (state, action) => {
      state.BankAccountTypeDetail = action.payload;
    },
    [fetchBankAccountType.fulfilled]: (state, action) => {
      state.loading = true;

      state.BankAccountTypes = action.payload;
    },
    [fetchBankAccountType.pending]: state => {
      state.loading = false;
    },
    [getLastestBankAccountType.fulfilled]: (state, action) => {
      state.BankAccountTypeLastest = action.payload;
    },
    [fetchBankAccountType.rejected]: state => {
      state.loading = false;
    },

    [createBankAccountType.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(BANK_ACCOUNT_TYPE, TEXT_POST);
      }
    },

    [updateBankAccountType.fulfilled]: (state, action) => {
      if (action.payload?.updatedAt) {
        toastrCRUDSuccess(BANK_ACCOUNT_TYPE, TEXT_PUT);
      }
    },
  },
});

const { actions, reducer } = BankAccountTypeSlice;
export default reducer;
