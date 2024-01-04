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
  "PaymentTermSlide/fetchPaymentTerm",
  GET_PAYMENT_TERM
);

export const getPaymentTermById = commonHandleHttpMethodGet(
  "PaymentTermSlide/getPaymentTermById",
  GET_PAYMENT_TERM
);

export const createPaymentTerm = commonHandleHttpMethodPost(
  "PaymentTermSlide/createPaymentTerm",
  GET_PAYMENT_TERM
);

export const updatePaymentTerm = commonHandleHttpMethodPutV2(
  "PaymentTermSlide/updatePaymentTerm",
  GET_PAYMENT_TERM
);

export const deletePaymentTerm = commonHandleHttpMethodMultipleDelete(
  "PaymentTermSlide/deletePaymentTerm",
  GET_PAYMENT_TERM
);

const initialState = {
  loading: false,
  fetched: false,
  paymentTerms: [],
  paymentTermDetail: [],
};

const PaymentTermSlide = createSlice({
  name: "PaymentTermSlide",
  initialState,
  reducers: {
    setPaymentTermDetail: (state, action) => {
      state.paymentTermDetail = action.payload;
    },
  },
  extraReducers: {
    [fetchPaymentTerm.pending]: (state, action) => {
      state.loading = false;
    },
    [fetchPaymentTerm.fulfilled]: (state, action) => {
      state.loading = true;
      state.paymentTerms = action.payload;
      state.fetched = true;
    },
    [fetchPaymentTerm.rejected]: (state, action) => {
      state.loading = false;
    },
    [getPaymentTermById.fulfilled]: (state, action) => {
      state.paymentDetail = action.payload;
      state.fetched = true;
    },
    [createPaymentTerm.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(PAYMENT_TERM, TEXT_POST);
      }
    },
    [createPaymentTerm.rejected]: (state, action) => {
      state.loading = false;
      toastrError();
    },

    [updatePaymentTerm.fulfilled]: (state, action) => {
      if (action.payload?.updatedAt) {
        toastrCRUDSuccess(PAYMENT_TERM, TEXT_PUT);
      }
    },

    [deletePaymentTerm.fulfilled]: (state, action) => {
      toastrCRUDSuccess(PAYMENT_TERM, TEXT_DELETE);
    },
    [deletePaymentTerm.rejected]: state => {
      toastrError();
    },
  },
});

const { actions, reducer } = PaymentTermSlide;
export default reducer;
export const { setPaymentTermDetail } = actions;
