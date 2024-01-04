import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { VOUCHER, TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import { GET_VOUCHER, GET_VOUCHER_QUERY } from "helpers/url_helper";

export const fetchVoucher = commonHandleHttpMethodGet(
  "VoucherSlice/fetchVoucher",
  GET_VOUCHER + GET_VOUCHER_QUERY
);

export const getVoucherByID = commonHandleHttpMethodGet(
  "VoucherSlice/getVoucherByID",
  GET_VOUCHER
);

export const addVoucher = commonHandleHttpMethodPost(
  "VoucherSlice/addVoucher",
  GET_VOUCHER
);

export const updateVoucher = commonHandleHttpMethodPutV2(
  "VoucherSlice/updateVoucher",
  GET_VOUCHER
);

export const deleteVoucher = commonHandleHttpMethodMultipleDelete(
  "VoucherSlice/deleteVoucher",
  GET_VOUCHER
);

const initialState = {
  loading: false,
  fetched: false,
  vouchers: [],
  voucherDetail: [],
};

const VoucherSlice = createSlice({
  name: "VoucherSlice",
  initialState,
  reducers: {
    setVoucherDetail: (state, action) => {
      state.voucherDetail = action.payload;
    },
  },
  extraReducers: {
    [fetchVoucher.pending]: state => {
      state.loading = false;
    },
    [fetchVoucher.fulfilled]: (state, action) => {
      state.loading = true;
      state.vouchers = action.payload;
      state.fetched = true;
    },
    [fetchVoucher.rejected]: state => {
      state.loading = false;
    },

    [getVoucherByID.fulfilled]: (state, action) => {
      state.voucherDetail = action.payload;
      state.fetched = true;
    },
    [addVoucher.pending]: state => {
      state.loading = false;
    },
    [addVoucher.fulfilled]: state => {
      state.loading = true;
      toastrCRUDSuccess(VOUCHER, TEXT_POST);
    },
    [addVoucher.rejected]: state => {
      state.loading = false;
      toastrError();
    },
    [deleteVoucher.fulfilled]: () => {
      toastrCRUDSuccess(VOUCHER, TEXT_DELETE);
    },
    [deleteVoucher.rejected]: () => {
      toastrError();
    },

    [updateVoucher.fulfilled]: () => {
      toastrCRUDSuccess(VOUCHER, TEXT_PUT);
    },
    [updateVoucher.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = VoucherSlice;
export default reducer;
export const { setVoucherDetail } = actions;
