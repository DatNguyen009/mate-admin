import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import { GET_CATEGORY } from "helpers/url_helper";

export const fetchCategory = commonHandleHttpMethodGet(
  "CategorySlice/fetchCategory",
  GET_CATEGORY
);

export const addCategory = commonHandleHttpMethodPost(
  "CategorySlice/addCategory",
  GET_CATEGORY
);

export const updateCategory = commonHandleHttpMethodPutV2(
  "CategorySlice/updateCategory",
  GET_CATEGORY
);

const initialState = {
  loading: false,
  fetched: false,
  categories: [],
};

const CategorySlice = createSlice({
  name: "CategorySlice",
  initialState,
  extraReducers: {
    [fetchCategory.pending]: state => {
      state.loading = false;
    },
    [fetchCategory.fulfilled]: (state, action) => {
      state.loading = true;
      state.categories = action.payload;
      state.fetched = true;
    },
    [fetchCategory.rejected]: state => {
      state.loading = false;
    },
    [addCategory.fulfilled]: () => {
      toastrCRUDSuccess("Category", TEXT_POST);
    },
    [updateCategory.fulfilled]: () => {
      toastrCRUDSuccess("Category", TEXT_PUT);
    },
  },
});

const { actions, reducer } = CategorySlice;
export default reducer;
