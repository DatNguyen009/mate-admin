import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_PRODUCTS, PRODUCT_PARAMS } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  products: [],
};

export const fetchProducts = commonHandleHttpMethodGet(
  "ProductSlice/fetchProducts",
  GET_PRODUCTS + PRODUCT_PARAMS
);
export const addProduct = commonHandleHttpMethodPost(
  "ProductSlice/addProduct",
  GET_PRODUCTS
);
export const updateProduct = commonHandleHttpMethodPutV2(
  "ProductSlice/updateProduct",
  GET_PRODUCTS
);
export const deleteProduct = commonHandleHttpMethodMultipleDelete(
  "ProductSlice/deleteProduct",
  GET_PRODUCTS
);

const productSlice = createSlice({
  name: "ProductSlice",
  initialState,
  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [addProduct.fulfilled]: (state, action) => {
      toastrCRUDSuccess("product", TEXT_POST);
    },
    [updateProduct.fulfilled]: (state, action) => {
      toastrCRUDSuccess("product", TEXT_PUT);
    },
    [deleteProduct.fulfilled]: (state, action) => {
      toastrCRUDSuccess("product", TEXT_DELETE);
    },
  },
});

const { reducer } = productSlice;
export default reducer;
