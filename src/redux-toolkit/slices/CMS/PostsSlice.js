import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { POST, TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import { GET_POST, GET_POST_QUERY } from "helpers/url_helper";

export const fetchPosts = commonHandleHttpMethodGet(
  "PostsSlice/fetchPosts",
  GET_POST + GET_POST_QUERY
);

export const getPostsByID = commonHandleHttpMethodGet(
  "PostsSlice/getPostsByID",
  GET_POST
);

export const addPosts = commonHandleHttpMethodPost(
  "PostsSlice/addPosts",
  GET_POST
);

export const updatePosts = commonHandleHttpMethodPutV2(
  "PostsSlice/updatePosts",
  GET_POST
);

export const deletePosts = commonHandleHttpMethodMultipleDelete(
  "PostsSlice/deletePosts",
  GET_POST
);

const initialState = {
  loading: false,
  fetched: false,
  posts: [],
  postsDetail: [],
};

const PostsSlice = createSlice({
  name: "PostsSlice",
  initialState,
  reducers: {
    setPostsDetail: (state, action) => {
      state.postsDetail = action.payload;
    },
  },
  extraReducers: {
    [fetchPosts.pending]: state => {
      state.loading = false;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.loading = true;
      state.posts = action.payload;
      state.fetched = true;
    },
    [fetchPosts.rejected]: state => {
      state.loading = false;
    },

    [getPostsByID.fulfilled]: (state, action) => {
      state.postsDetail = action.payload;
      state.fetched = true;
    },
    [addPosts.pending]: state => {
      state.loading = false;
    },
    [addPosts.fulfilled]: state => {
      state.loading = true;
      toastrCRUDSuccess(POST, TEXT_POST);
    },
    [addPosts.rejected]: state => {
      state.loading = false;
      toastrError();
    },
    [deletePosts.fulfilled]: () => {
      toastrCRUDSuccess(POST, TEXT_DELETE);
    },
    [deletePosts.rejected]: () => {
      toastrError();
    },

    [updatePosts.fulfilled]: () => {
      toastrCRUDSuccess(POST, TEXT_PUT);
    },
    [updatePosts.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = PostsSlice;
export default reducer;

export const { setPostsDetail } = actions;
