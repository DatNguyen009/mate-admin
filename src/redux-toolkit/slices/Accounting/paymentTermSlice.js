import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  PAYMENT_TERM,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import { GET_PAYMENT_TERM } from "helpers/url_helper";

export const fetchPaymentTerm = commonHandleHttpMethodGet(
  "PaymentTermSlice/fetchPaymentTerm",
  GET_PAYMENT_TERM
);

export const getPaymentTermByID = commonHandleHttpMethodGet(
  "PaymentTermSlice/getPaymentTermByID",
  GET_PAYMENT_TERM
);

export const createPaymentTerm = commonHandleHttpMethodPost(
  "PaymentTermSlice/createPaymentTerm",
  GET_PAYMENT_TERM
);

export const updatePaymentTerm = commonHandleHttpMethodPutV2(
  "PaymentTermSlice/updatePaymentTerm",
  GET_PAYMENT_TERM
);

export const deletePaymentTerm = commonHandleHttpMethodMultipleDelete(
  "PaymentTermSlice/deletePaymentTerm",
  GET_PAYMENT_TERM
);

const initialState = {
  loading: false,
  fetched: false,
  paymentTerms: [],
  paymentTermDetail: {},
};

const PaymentTermSlice = createSlice({
  name: "PaymentTermSlice",
  initialState,
  reducers: {
    setPaymentTermDetail: (state, action) => {
      state.paymentTermDetail = action.payload;
    },
  },
  extraReducers: {
    [fetchPaymentTerm.pending]: state => {
      state.loading = false;
    },
    [fetchPaymentTerm.fulfilled]: (state, action) => {
      state.loading = true;
      state.paymentTerms = action.payload;
      state.fetched = true;
    },
    [fetchPaymentTerm.rejected]: state => {
      state.loading = false;
    },

    [getPaymentTermByID.fulfilled]: (state, action) => {
      state.paymentTermDetail = action.payload;
      state.fetched = true;
    },
    [createPaymentTerm.pending]: state => {
      state.loading = false;
    },
    [createPaymentTerm.fulfilled]: (state, action) => {
      state.loading = true;
      toastrCRUDSuccess(PAYMENT_TERM, TEXT_POST);
    },
    [createPaymentTerm.rejected]: state => {
      state.loading = false;
      toastrError();
    },
    [deletePaymentTerm.fulfilled]: () => {
      toastrCRUDSuccess(PAYMENT_TERM, TEXT_DELETE);
    },
    [deletePaymentTerm.rejected]: () => {
      toastrError();
    },

    [updatePaymentTerm.fulfilled]: () => {
      toastrCRUDSuccess(PAYMENT_TERM, TEXT_PUT);
    },
    [updatePaymentTerm.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = PaymentTermSlice;
export default reducer;
export const { setPaymentTermDetail } = actions;
