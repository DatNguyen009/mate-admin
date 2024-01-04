import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodDelete,
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  GET_LEAVE_BLOCK_LIST,
  LEAVE_BLOCK_LIST_PARAMS,
} from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  leaveBlockList: [],
};

export const fetchLeaveBlockList = commonHandleHttpMethodGet(
  "LeaveBlockListSlice/fetchLeaveBlockList",
  GET_LEAVE_BLOCK_LIST + LEAVE_BLOCK_LIST_PARAMS
);
export const addLeaveBlockList = commonHandleHttpMethodPost(
  "LeaveBlockListSlice/addLeaveBlockList",
  GET_LEAVE_BLOCK_LIST
);
export const updateLeaveBlockList = commonHandleHttpMethodPutV2(
  "LeaveBlockListSlice/updateLeaveBlockList",
  GET_LEAVE_BLOCK_LIST
);
export const deleteLeaveBlockList = commonHandleHttpMethodMultipleDelete(
  "LeaveBlockListSlice/deleteLeaveBlockList",
  GET_LEAVE_BLOCK_LIST
);

const LeaveBlockListSlice = createSlice({
  name: "LeaveBlockListSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLeaveBlockList.fulfilled]: (state, action) => {
      state.leaveBlockList = action.payload;
    },
    [addLeaveBlockList.fulfilled]: (state, action) => {
      toastrCRUDSuccess("leave block list", TEXT_POST);
    },
    [updateLeaveBlockList.fulfilled]: (state, action) => {
      toastrCRUDSuccess("leave block list", TEXT_PUT);
    },
    [deleteLeaveBlockList.fulfilled]: (state, action) => {
      toastrCRUDSuccess("leave block list", TEXT_DELETE);
    },
  },
});

const { reducer } = LeaveBlockListSlice;
export default reducer;
