import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  CATEGORY,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import { GET_CATEGORY } from "helpers/url_helper";

export const fetchCategory = commonHandleHttpMethodGet(
  "CategorySlice/fetchCategory",
  GET_CATEGORY
);

export const getCategoryByParams = commonHandleHttpMethodGetByParams(
  "CategorySlice/getCategoryByParams",
  GET_CATEGORY
);

export const createCategory = commonHandleHttpMethodPost(
  "CategorySlice/createCategory",
  GET_CATEGORY
);

export const updateCategory = commonHandleHttpMethodPutV2(
  "CategorySlice/updateCategory",
  GET_CATEGORY
);

export const deleteCategory = commonHandleHttpMethodMultipleDelete(
  "CategorySlice/deleteCategory",
  GET_CATEGORY
);

const initialState = {
  loading: false,
  fetched: false,
  Categorys: [],
  CategoryDetail: {},
};

const CategorySlice = createSlice({
  name: "CategorySlice",
  initialState,
  reducers: {
    setCategoryDetail: (state, action) => {
      state.CategoryDetail = action.payload;
    },
  },
  extraReducers: {
    [fetchCategory.pending]: state => {
      state.loading = false;
    },
    [fetchCategory.fulfilled]: (state, action) => {
      state.loading = true;
      state.Categorys = action.payload;
      state.fetched = true;
    },
    [fetchCategory.rejected]: state => {
      state.loading = false;
    },

    [getCategoryByParams.fulfilled]: (state, action) => {
      state.CategoryDetail = action.payload;
      state.fetched = true;
    },
    [createCategory.pending]: state => {
      state.loading = false;
    },
    [createCategory.fulfilled]: state => {
      state.loading = true;
      toastrCRUDSuccess(CATEGORY, TEXT_POST);
    },
    [createCategory.rejected]: state => {
      state.loading = false;
      toastrError();
    },
    [deleteCategory.fulfilled]: () => {
      toastrCRUDSuccess(CATEGORY, TEXT_DELETE);
    },
    [deleteCategory.rejected]: () => {
      toastrError();
    },

    [updateCategory.fulfilled]: () => {
      toastrCRUDSuccess(CATEGORY, TEXT_PUT);
    },
    [updateCategory.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = CategorySlice;
export default reducer;
export const { setCategoryDetail } = actions;
