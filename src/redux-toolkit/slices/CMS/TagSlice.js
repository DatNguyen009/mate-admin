import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { TAG, TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import { GET_TAG } from "helpers/url_helper";

export const fetchTag = commonHandleHttpMethodGet("TagSlice/fetchTag", GET_TAG);

export const getTagByID = commonHandleHttpMethodGet(
  "TagSlice/getTagByID",
  GET_TAG
);

export const addTag = commonHandleHttpMethodPost("TagSlice/addTag", GET_TAG);

export const updateTag = commonHandleHttpMethodPutV2(
  "TagSlice/updateTag",
  GET_TAG
);

export const deleteTag = commonHandleHttpMethodMultipleDelete(
  "TagSlice/deleteTag",
  GET_TAG
);

const initialState = {
  loading: false,
  fetched: false,
  tags: [],
  tagDetail: [],
};

const TagSlice = createSlice({
  name: "TagSlice",
  initialState,
  reducers: {
    setTagDetail: (state, action) => {
      state.tagDetail = action.payload;
    },
  },
  extraReducers: {
    [fetchTag.pending]: state => {
      state.loading = false;
    },
    [fetchTag.fulfilled]: (state, action) => {
      state.loading = true;
      state.tags = action.payload;
      state.fetched = true;
    },
    [fetchTag.rejected]: state => {
      state.loading = false;
    },

    [getTagByID.fulfilled]: (state, action) => {
      state.tagDetail = action.payload;
      state.fetched = true;
    },
    [addTag.pending]: state => {
      state.loading = false;
    },
    [addTag.fulfilled]: state => {
      state.loading = true;
      toastrCRUDSuccess(TAG, TEXT_POST);
    },
    [addTag.rejected]: state => {
      state.loading = false;
      toastrError();
    },
    [deleteTag.fulfilled]: () => {
      toastrCRUDSuccess(TAG, TEXT_DELETE);
    },
    [deleteTag.rejected]: () => {
      toastrError();
    },

    [updateTag.fulfilled]: () => {
      toastrCRUDSuccess(TAG, TEXT_PUT);
    },
    [updateTag.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = TagSlice;
export default reducer;
export const { setTagDetail } = actions;
