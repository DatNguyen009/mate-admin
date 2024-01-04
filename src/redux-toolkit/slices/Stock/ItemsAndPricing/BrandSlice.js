import { createSlice } from "@reduxjs/toolkit";
import {
  commonHandleHttpMethodDelete,
  commonHandleHttpMethodGet,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_BRAND } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  BRAND,
  ITEM_GROUP,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";

export const fetchBrand = commonHandleHttpMethodGet(
  "BrandSlice/fetchBrand",
  GET_BRAND
);

export const getBrandByID = commonHandleHttpMethodGet(
  "BrandSlice/getBrandByID",
  GET_BRAND
);

export const addBrand = commonHandleHttpMethodPost(
  "BrandSlice/addBrand",
  GET_BRAND
);

export const updateBrand = commonHandleHttpMethodPutV2(
  "BrandSlice/updateItemGroup",
  GET_BRAND
);

export const deleteBrand = commonHandleHttpMethodDelete(
  "BrandSlice/deleteBrand",
  GET_BRAND
);

const initialState = {
  loading: false,
  brand: [],
  brandDetail: {},
};

const BrandSlice = createSlice({
  name: "BrandSlice",
  initialState,
  extraReducers: {
    [fetchBrand.pending]: (state, action) => {
      state.loading = false;
    },
    [fetchBrand.fulfilled]: (state, action) => {
      state.loading = true;
      state.brand = action.payload;
    },
    [getBrandByID.fulfilled]: (state, action) => {
      state.loading = true;
      state.brandDetail = action.payload;
    },
    [fetchBrand.rejected]: (state, action) => {
      state.loading = false;
    },
    [addBrand.fulfilled]: (state, action) => {
      toastrCRUDSuccess(BRAND, TEXT_POST);
    },
    [updateBrand.fulfilled]: (state, action) => {
      toastrCRUDSuccess(BRAND, TEXT_PUT);
    },
    [deleteBrand.fulfilled]: (state, action) => {
      toastrCRUDSuccess(BRAND, TEXT_DELETE);
    },
  },
});

const { actions, reducer } = BrandSlice;
export default reducer;
export const {} = actions;
