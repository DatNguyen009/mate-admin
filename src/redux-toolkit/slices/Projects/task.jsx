import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodDelete,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";

import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import {
  GET_TASK,
  GET_TASK_FULL,
  GET_TASK_QUERY,
  GET_USERS,
} from "helpers/url_helper";
import moment from "moment";
import httpService from "services/httpService";

const COMPLETED_STATUS = "completed";

export const fetchTasks = createAsyncThunk("Task/fetchTasks", async params => {
  const { results: tasks } = await httpService.get(GET_TASK, params);

  return tasks;
});

export const fetchTaskDetail = createAsyncThunk(
  "Task/fetchTaskDetail",
  async taskId => {
    const task = await httpService.get(
      `${GET_TASK}/${taskId}${GET_TASK_QUERY}`
    );

    if (!task.assignees || task.assignees.length === 0) return task;

    const { results: assignees } = await httpService.get(GET_USERS, {
      params: {
        where: {
          objectId: {
            $in: task.assignees,
          },
        },
      },
    });

    return {
      ...task,
      assignees: assignees,
    };
  }
);

// assignment
export const updateAssignees = createAsyncThunk(
  "Task/updateAssignees",
  async ({ taskId, assigneeIds, refresh }, thunkAPI) => {
    let localStoredUser = JSON.parse(localStorage.getItem("User"));
    await httpService.put(`${GET_TASK}/${taskId}`, {
      assignees: assigneeIds,
      assigner: {
        __type: "Pointer",
        className: "_User",
        objectId: localStoredUser.objectId,
      },
    });
    return thunkAPI.dispatch(refresh(taskId));
  }
);

export const addAssignee = createAsyncThunk(
  "Task/addAssignee",
  async ({ taskId, userId, refresh }, thunkAPI) => {
    let localStoredUser = JSON.parse(localStorage.getItem("User"));
    await httpService.put(`${GET_TASK}/${taskId}`, {
      assignees: { __op: "AddUnique", objects: [userId] },
      assigner: {
        __type: "Pointer",
        className: "_User",
        objectId: localStoredUser.objectId,
      },
    });
    return thunkAPI.dispatch(refresh(taskId));
  }
);

export const removeAssignee = createAsyncThunk(
  "Task/removeAssign",
  async ({ taskId, userId, refresh }, thunkAPI) => {
    await httpService.put(`${GET_TASK}/${taskId}`, {
      assignees: { __op: "Remove", objects: [userId] },
    });
    return thunkAPI.dispatch(refresh(taskId));
  }
);

export const postBatchAction = createAsyncThunk(
  "Task/postBatchAction",
  async requests => {
    return httpService.post("/parse/batch", { requests });
  }
);

// updateTaskDetail
export const updateTaskStatus = createAsyncThunk(
  "Task/updateTaskStatus",
  async ({ taskId, newStatus }) => {
    const localStoredUser = JSON.parse(localStorage.getItem("User"));

    let params = {
      status: newStatus,
      completedOn: "",
      completedBy: undefined,
    };

    if (newStatus === COMPLETED_STATUS) {
      params = {
        status: newStatus,
        completedOn: moment().format("YYYY-MM-DD"),
        completedBy: {
          __type: "Pointer",
          className: "_User",
          objectId: localStoredUser.objectId,
        },
      };
    }
    return httpService.put(`${GET_TASK}/${taskId}`, params);
  }
);

export const updateTaskDetail = createAsyncThunk(
  "Task/updateTaskDetail",
  async ({ taskId, params }) => {
    return httpService.put(`${GET_TASK}/${taskId}`, params);
  }
);

export const updateTaskOrder = createAsyncThunk(
  "Task/updateTaskOrder",
  async columns => {
    const requests = [];
    columns.forEach(column => {
      column.forEach((task, index) => {
        const request = {
          method: "PUT",
          path: `/parse/classes/Task/${task.objectId}`,
          body: {
            order: index,
          },
        };
        requests.push(request);
      });
    });
    return httpService.post("parse/batch", {
      requests,
    });
  }
);

// updateAttachments
export const attachFiles = createAsyncThunk(
  "Task/attachFiles",
  async ({ taskId, attachments, refresh }, thunkAPI) => {
    await httpService.put(`${GET_TASK}/${taskId}`, {
      attachments,
    });
    return thunkAPI.dispatch(refresh(taskId));
  }
);

export const updateTags = createAsyncThunk(
  "Task/updateTags",
  async ({ taskId, tags, refresh }, thunkAPI) => {
    await httpService.put(`${GET_TASK}/${taskId}`, {
      tags,
    });
    return thunkAPI.dispatch(refresh(taskId));
  }
);

export const createTask = commonHandleHttpMethodPost(
  "Task/createTask",
  GET_TASK
);

export const updateTask = commonHandleHttpMethodPutV2(
  "Task/updateTask",
  GET_TASK
);

export const deleteTask = commonHandleHttpMethodDelete(
  "Task/deleteTask",
  GET_TASK
);

export const deleteTasks = commonHandleHttpMethodMultipleDelete(
  "Task/deleteTasks",
  GET_TASK
);

const initialState = {
  fetched: false,
  taskDetail: {},
  tasks: [],
};

const Task = createSlice({
  name: "Task",
  initialState,
  extraReducers: {
    [fetchTasks.fulfilled]: (state, action) => {
      state.fetched = true;
      state.tasks = action.payload;
    },
    [fetchTasks.rejected]: (state, action) => {
      state.fetched = false;
    },

    [fetchTaskDetail.fulfilled]: (state, action) => {
      state.taskDetail = action.payload;
    },

    [createTask.fulfilled]: (state, action) => {
      state.fetched = false;
    },

    [updateTask.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Task", TEXT_PUT);
      state.fetched = false;
    },
    [updateTask.rejected]: (state, action) => {
      toastrError();
    },

    [deleteTask.fulfilled]: (state, action) => {
      state.fetched = false;
      toastrCRUDSuccess("Task", TEXT_DELETE);
    },
    [deleteTasks.fulfilled]: (state, action) => {
      state.fetched = false;
      // toastrCRUDSuccess("Task", TEXT_DELETE);
    },
    [deleteTasks.rejected]: (state, action) => {
      toastrError();
    },

    [updateAssignees.fulfilled]: state => {
      state.fetched = false;
    },
    [addAssignee.fulfilled]: state => {
      state.fetched = false;
    },
    [removeAssignee.fulfilled]: state => {
      state.fetched = false;
    },
    [postBatchAction.fulfilled]: state => {
      state.fetched = false;
    },
    [updateTaskStatus.fulfilled]: state => {
      // toastrCRUDSuccess("Task", TEXT_PUT);
      state.fetched = false;
    },
    [updateTaskDetail.fulfilled]: state => {
      state.fetched = false;
    },
    [updateTaskOrder.fulfilled]: state => {
      state.fetched = false;
    },
    [attachFiles.fulfilled]: state => {
      state.fetched = false;
    },
    [updateTags.fulfilled]: state => {
      state.fetched = false;
    },
  },
});

const { reducer } = Task;
export default reducer;
