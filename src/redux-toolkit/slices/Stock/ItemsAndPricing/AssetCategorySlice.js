import { createSlice } from "@reduxjs/toolkit";
import {
  commonHandleHttpMethodDelete,
  commonHandleHttpMethodGet,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_ASSET_CATEGORY } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

export const fetchAssetCategory = commonHandleHttpMethodGet(
  "AssetCategorySlice/fetchAssetCategory",
  GET_ASSET_CATEGORY
);

export const getAssetCategoryByID = commonHandleHttpMethodGet(
  "AssetCategorySlice/getAssetCategoryByID",
  GET_ASSET_CATEGORY
);

export const addAssetCategory = commonHandleHttpMethodPost(
  "AssetCategorySlice/addAssetCategory",
  GET_ASSET_CATEGORY
);

export const updateAssetCategory = commonHandleHttpMethodPutV2(
  "AssetCategorySlice/updateAssetCategory",
  GET_ASSET_CATEGORY
);

export const deleteAssetCategory = commonHandleHttpMethodDelete(
  "AssetCategorySlice/deleteAssetCategory",
  GET_ASSET_CATEGORY
);

const initialState = {
  loading: false,
  assetCategory: [],
  assetCategorydetail: {},
};

const AssetCategorySlice = createSlice({
  name: "AssetCategorySlice",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAssetCategory.pending]: (state, action) => {
      state.loading = false;
    },
    [fetchAssetCategory.fulfilled]: (state, action) => {
      state.loading = true;
      state.assetCategory = action.payload;
    },
    [getAssetCategoryByID.fulfilled]: (state, action) => {
      state.loading = true;
      state.assetCategorydetail = action.payload;
    },
    [fetchAssetCategory.rejected]: (state, action) => {
      state.loading = false;
    },
    [addAssetCategory.fulfilled]: (state, action) => {
      toastrCRUDSuccess("AssetCategory", TEXT_POST);
    },
    [updateAssetCategory.fulfilled]: (state, action) => {
      toastrCRUDSuccess("AssetCategory", TEXT_PUT);
    },
    [deleteAssetCategory.fulfilled]: (state, action) => {
      toastrCRUDSuccess("AssetCategory", TEXT_DELETE);
    },
  },
});

const { actions, reducer } = AssetCategorySlice;
export default reducer;
export const {} = actions;
