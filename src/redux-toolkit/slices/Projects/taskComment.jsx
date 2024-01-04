import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodDelete,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";

import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import { GET_TASK_COMMENT } from "helpers/url_helper";
import httpService from "services/httpService";

export const fetchTaskComments = createAsyncThunk(
  "TaskComment/fetchTaskComments",
  async params => {
    const { results: taskComments } = await httpService.get(
      GET_TASK_COMMENT,
      params
    );

    return taskComments;
  }
);

export const createTaskComment = commonHandleHttpMethodPost(
  "TaskComment/createTaskComment",
  GET_TASK_COMMENT
);

export const updateTaskComment = commonHandleHttpMethodPutV2(
  "TaskComment/updateTaskComment",
  GET_TASK_COMMENT
);

export const deleteTaskComment = commonHandleHttpMethodDelete(
  "TaskComment/deleteTaskComment",
  GET_TASK_COMMENT
);

const initialState = {
  taskCommentDetail: {},
  taskComments: [],
};

const TaskComment = createSlice({
  name: "TaskComment",
  initialState,
  extraReducers: {
    [fetchTaskComments.fulfilled]: (state, action) => {
      state.fetched = true;
      state.taskComments = action.payload;
    },
    [fetchTaskComments.rejected]: (state, action) => {
      state.fetched = false;
    },

    [createTaskComment.fulfilled]: (state, action) => {
      state.fetched = false;
    },

    [updateTaskComment.fulfilled]: (state, action) => {
      // toastrCRUDSuccess("TaskComment", TEXT_PUT);
      state.fetched = false;
    },
    [updateTaskComment.rejected]: (state, action) => {
      toastrError();
    },

    [deleteTaskComment.fulfilled]: (state, action) => {
      state.fetched = false;
      // toastrCRUDSuccess("TaskComment", TEXT_DELETE);
    },
  },
});

const { reducer } = TaskComment;
export default reducer;
