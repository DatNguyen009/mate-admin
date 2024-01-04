import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_TAX_WITHHOLDING_CATEGORIES } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  taxWithholdingCategories: [],
};

export const fetchTaxWithholdingCategories = commonHandleHttpMethodGet(
  "TaxWithholdingCategorySlice/fetchTaxWithholdingCategories",
  GET_TAX_WITHHOLDING_CATEGORIES
);

export const addTaxWithholdingCategory = commonHandleHttpMethodPost(
  "TaxWithholdingCategorySlice/addTaxWithholdingCategory",
  GET_TAX_WITHHOLDING_CATEGORIES
);

export const updateTaxWithholdingCategory = commonHandleHttpMethodPutV2(
  "TaxWithholdingCategorySlice/updateTaxWithholdingCategory",
  GET_TAX_WITHHOLDING_CATEGORIES
);

export const deleteTaxWithholdingCategory =
  commonHandleHttpMethodMultipleDelete(
    "TaxWithholdingCategorySlice/deleteTaxWithholdingCategory",
    GET_TAX_WITHHOLDING_CATEGORIES
  );

const taxWithholdingCategorySlice = createSlice({
  name: "TaxWithholdingCategorySlice",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTaxWithholdingCategories.fulfilled]: (state, action) => {
      state.taxWithholdingCategories = action.payload;
    },
    [addTaxWithholdingCategory.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Tax Withholding Category", TEXT_POST);
    },
    [updateTaxWithholdingCategory.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Tax Withholding Category", TEXT_PUT);
    },
    [deleteTaxWithholdingCategory.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Tax Withholding Category", TEXT_DELETE);
    },
  },
});

const { reducer } = taxWithholdingCategorySlice;
export default reducer;
