import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { BRAND, TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import { GET_BRAND } from "helpers/url_helper";

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
  "BrandSlice/updateBrand",
  GET_BRAND
);

export const deleteBrand = commonHandleHttpMethodMultipleDelete(
  "BrandSlice/deleteBrand",
  GET_BRAND
);

const initialState = {
  loading: false,
  fetched: false,
  brands: [],
  brandDetail: [],
};

const BrandSlice = createSlice({
  name: "BrandSlice",
  initialState,
  reducers: {
    setbrandDetail: (state, action) => {
      state.brandDetail = action.payload;
    },
  },
  extraReducers: {
    [fetchBrand.pending]: state => {
      state.loading = false;
    },
    [fetchBrand.fulfilled]: (state, action) => {
      state.loading = true;
      state.brands = action.payload;
      state.fetched = true;
    },
    [fetchBrand.rejected]: state => {
      state.loading = false;
    },

    [getBrandByID.fulfilled]: (state, action) => {
      state.brandDetail = action.payload;
      state.fetched = true;
    },
    [addBrand.pending]: state => {
      state.loading = false;
    },
    [addBrand.fulfilled]: state => {
      state.loading = true;
      toastrCRUDSuccess(BRAND, TEXT_POST);
    },
    [addBrand.rejected]: state => {
      state.loading = false;
      toastrError();
    },
    [deleteBrand.fulfilled]: () => {
      toastrCRUDSuccess(BRAND, TEXT_DELETE);
    },
    [deleteBrand.rejected]: () => {
      toastrError();
    },

    [updateBrand.fulfilled]: () => {
      toastrCRUDSuccess(BRAND, TEXT_PUT);
    },
    [updateBrand.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = BrandSlice;
export default reducer;
