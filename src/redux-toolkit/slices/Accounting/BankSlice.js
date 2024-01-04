import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { BANK, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import { GET_BANK } from "helpers/url_helper";

export const fetchBank = commonHandleHttpMethodGet(
  "BankSlice/fetchBank",
  GET_BANK
);

export const createBank = commonHandleHttpMethodPost(
  "BankSlice/createBank",
  GET_BANK
);

export const getBankByParams = commonHandleHttpMethodGetByParams(
  "BankSlice/getBankByParams",
  GET_BANK
);

export const updateBank = commonHandleHttpMethodPutV2(
  "BankSlice/updateBank",
  GET_BANK
);

const initialState = {
  loading: false,
  banks: [],
};

const BankSlice = createSlice({
  name: "BankSlice",
  initialState,
  extraReducers: {
    [fetchBank.pending]: state => {
      state.loading = false;
    },
    [fetchBank.fulfilled]: (state, action) => {
      state.loading = true;
      state.banks = action.payload;
    },
    [fetchBank.rejected]: state => {
      state.loading = false;
    },

    [createBank.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(BANK, TEXT_POST);
      }
    },

    [updateBank.fulfilled]: (state, action) => {
      if (action.payload?.updatedAt) {
        toastrCRUDSuccess(BANK, TEXT_PUT);
      }
    },
  },
});

const { actions, reducer } = BankSlice;
export default reducer;
