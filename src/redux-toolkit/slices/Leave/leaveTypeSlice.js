import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { ADD_LEAVE_TYPE, GET_LEAVE_TYPES } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  leaveTypes: [],
};

export const fetchLeaveTypes = commonHandleHttpMethodGet(
  "LeaveTypeSlice/fetchLeaveTypes",
  GET_LEAVE_TYPES
);
export const addLeaveType = commonHandleHttpMethodPost(
  "LeaveTypeSlice/addLeaveType",
  ADD_LEAVE_TYPE
);
export const updateLeaveType = commonHandleHttpMethodPutV2(
  "LeaveTypeSlice/updateLeaveType",
  ADD_LEAVE_TYPE
);
export const deleteLeaveType = commonHandleHttpMethodMultipleDelete(
  "LeaveTypeSlice/deleteLeaveType",
  ADD_LEAVE_TYPE
);

const leaveTypeSlice = createSlice({
  name: "LeaveTypeSlice",
  initialState,
  extraReducers: {
    [fetchLeaveTypes.fulfilled]: (state, action) => {
      state.leaveTypes = action.payload;
    },
    [addLeaveType.fulfilled]: (state, action) => {
      toastrCRUDSuccess("leave type", TEXT_POST);
    },
    [updateLeaveType.fulfilled]: (state, action) => {
      toastrCRUDSuccess("leave type", TEXT_PUT);
    },
    [deleteLeaveType.fulfilled]: (state, action) => {
      toastrCRUDSuccess("leave type", TEXT_DELETE);
    },
  },
});

const { reducer } = leaveTypeSlice;
export default reducer;
