import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  BANK_ACCOUNT_SUB_TYPE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import {
  GET_ITEM_LASTEST_AND,
  GET_BANK_ACCOUNT_SUB_TYPE,
} from "helpers/url_helper";

export const fetchBankAccountSubType = commonHandleHttpMethodGet(
  "BankAccountSubTypeSlice/fetchBankAccountSubType",
  GET_BANK_ACCOUNT_SUB_TYPE
);

export const getLastestBankAccountSubType = commonHandleHttpMethodGet(
  "BankAccountSubTypeSlice/getLastestBankAccountSubType",
  `${GET_BANK_ACCOUNT_SUB_TYPE}?${GET_ITEM_LASTEST_AND}`
);

export const getItemBankAccountSubTypeDetail = commonHandleHttpMethodGet(
  "BankAccountSubTypeSlice/getItemBankAccountSubTypeDetail",
  GET_BANK_ACCOUNT_SUB_TYPE
);

export const createBankAccountSubType = commonHandleHttpMethodPost(
  "BankAccountSubTypeSlice/createBankAccountSubType",
  GET_BANK_ACCOUNT_SUB_TYPE
);

export const getBankAccountSubTypeByParams = commonHandleHttpMethodGetByParams(
  "BankAccountSubTypeSlice/getBankAccountSubTypeByParams",
  GET_BANK_ACCOUNT_SUB_TYPE
);

export const updateBankAccountSubType = commonHandleHttpMethodPutV2(
  "BankAccountSubTypeSlice/updateBankAccountSubType",
  GET_BANK_ACCOUNT_SUB_TYPE
);

const initialState = {
  loading: false,
  BankAccountSubTypes: [],
  BankAccountSubTypeLastest: {},
  BankAccountSubTypeDetail: {},
};

const BankAccountSubTypeSlice = createSlice({
  name: "BankAccountSubTypeSlice",
  initialState,
  extraReducers: {
    [getItemBankAccountSubTypeDetail.fulfilled]: (state, action) => {
      state.BankAccountSubTypeDetail = action.payload;
    },
    [fetchBankAccountSubType.fulfilled]: (state, action) => {
      state.loading = true;

      state.BankAccountSubTypes = action.payload;
    },
    [fetchBankAccountSubType.pending]: state => {
      state.loading = false;
    },
    [getLastestBankAccountSubType.fulfilled]: (state, action) => {
      state.BankAccountSubTypeLastest = action.payload;
    },
    [fetchBankAccountSubType.rejected]: state => {
      state.loading = false;
    },

    [createBankAccountSubType.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(BANK_ACCOUNT_SUB_TYPE, TEXT_POST);
      }
    },

    [updateBankAccountSubType.fulfilled]: (state, action) => {
      if (action.payload?.updatedAt) {
        toastrCRUDSuccess(BANK_ACCOUNT_SUB_TYPE, TEXT_PUT);
      }
    },
  },
});

const { actions, reducer } = BankAccountSubTypeSlice;
export default reducer;
