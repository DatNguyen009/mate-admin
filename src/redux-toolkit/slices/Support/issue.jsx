import { createSlice } from "@reduxjs/toolkit";
import { commonHandleHttpMethodGet } from "helpers/erp_helper";
import { GET_ISSUE } from "helpers/url_helper";

export const fetchIssue = commonHandleHttpMethodGet(
  "Issue/fetchIssue",
  GET_ISSUE
);

const initialState = {
  fetched: false,
  issueList: [],
};

const Issue = createSlice({
  name: "Issue",
  initialState,
  extraReducers: {
    [fetchIssue.fulfilled]: (state, action) => {
      state.fetched = true;
      state.issueList = action.payload;
    },
    [fetchIssue.rejected]: (state, action) => {
      state.fetched = false;
    },
  },
});

const { actions, reducer } = Issue;
export default reducer;
export const {} = actions;
