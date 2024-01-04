import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";

import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import { GET_TASK_TYPE } from "helpers/url_helper";

export const fetchTaskTypes = commonHandleHttpMethodGet(
  "TaskType/fetchTaskType",
  GET_TASK_TYPE
);

export const fetchTaskTypeByParams = commonHandleHttpMethodGetByParams(
  "TaskType/fetchTaskTypeByParams",
  GET_TASK_TYPE
);

export const createTaskType = commonHandleHttpMethodPost(
  "TaskType/createTaskType",
  GET_TASK_TYPE
);

export const updateTaskType = commonHandleHttpMethodPutV2(
  "TaskType/updateTaskType",
  GET_TASK_TYPE
);

export const deleteTaskType = commonHandleHttpMethodMultipleDelete(
  "TaskType/deleteTaskType",
  GET_TASK_TYPE
);

const initialState = {
  fetched: false,
  taskTypeDetail: {},
  taskTypes: [],
};

const TaskType = createSlice({
  name: "Task Type",
  initialState,
  extraReducers: {
    [fetchTaskTypes.fulfilled]: (state, action) => {
      state.fetched = true;
      state.taskTypes = action.payload;
    },
    [fetchTaskTypes.rejected]: (state, action) => {
      state.fetched = false;
    },
    [fetchTaskTypeByParams.fulfilled]: (state, action) => {
      state.taskTypeDetail = action.payload;
    },
    [createTaskType.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Task Type", TEXT_POST);
      state.fetched = false;
    },
    [createTaskType.rejected]: (state, action) => {
      toastrError();
    },
    [updateTaskType.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Task Type", TEXT_PUT);
      state.fetched = false;
    },
    [updateTaskType.rejected]: (state, action) => {
      toastrError();
    },
    [deleteTaskType.fulfilled]: (state, action) => {
      state.fetched = false;
      toastrCRUDSuccess("Task Type", TEXT_DELETE);
    },
    [deleteTaskType.rejected]: (state, action) => {
      toastrError();
    },
  },
});

const { reducer } = TaskType;
export default reducer;
