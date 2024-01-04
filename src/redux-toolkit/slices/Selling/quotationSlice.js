import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_QUOTATIONS, QUOTATION_PARAMS } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  quotations: [],
};

export const fetchQuotations = commonHandleHttpMethodGet(
  "QuotationSlice/fetchQuotations",
  GET_QUOTATIONS + QUOTATION_PARAMS
);
export const addQuotation = commonHandleHttpMethodPost(
  "QuotationSlice/addQuotation",
  GET_QUOTATIONS
);
export const updateQuotation = commonHandleHttpMethodPutV2(
  "QuotationSlice/updateQuotation",
  GET_QUOTATIONS
);
export const deleteQuotation = commonHandleHttpMethodMultipleDelete(
  "QuotationSlice/deleteQuotation",
  GET_QUOTATIONS
);

const quotationSlice = createSlice({
  name: "QuotationSlice",
  initialState,
  extraReducers: {
    [fetchQuotations.fulfilled]: (state, action) => {
      state.quotations = action.payload;
    },
    [addQuotation.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Quotation", TEXT_POST);
    },
    [updateQuotation.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Quotation", TEXT_PUT);
    },
    [deleteQuotation.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Quotation", TEXT_DELETE);
    },
  },
});

const { reducer } = quotationSlice;
export default reducer;
