import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { ACCOUNT, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import { GET_ACCOUNT, GET_ACCOUNT_PARAMS } from "helpers/url_helper";

export const fetchAccount = commonHandleHttpMethodGet(
  "AccountSlice/fetchAccount",
  GET_ACCOUNT
);

export const createAccount = commonHandleHttpMethodPost(
  "AccountSlice/createAccount",
  GET_ACCOUNT
);

export const getAccountByParams = commonHandleHttpMethodGetByParams(
  "AccountSlice/getAccountByParams",
  GET_ACCOUNT + GET_ACCOUNT_PARAMS
);

export const updateAccount = commonHandleHttpMethodPutV2(
  "AccountSlice/updateAccount",
  GET_ACCOUNT
);

const initialState = {
  loading: false,
  accounts: [],
};

const AccountSlice = createSlice({
  name: "AccountSlice",
  initialState,
  extraReducers: {
    [fetchAccount.pending]: state => {
      state.loading = false;
    },
    [fetchAccount.fulfilled]: (state, action) => {
      state.loading = true;
      state.accounts = action.payload;
    },
    [fetchAccount.rejected]: state => {
      state.loading = false;
    },

    [createAccount.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(ACCOUNT, TEXT_POST);
      }
    },

    [updateAccount.fulfilled]: (state, action) => {
      if (action.payload?.updatedAt) {
        toastrCRUDSuccess(ACCOUNT, TEXT_PUT);
      }
    },
  },
});

const { actions, reducer } = AccountSlice;
export default reducer;
