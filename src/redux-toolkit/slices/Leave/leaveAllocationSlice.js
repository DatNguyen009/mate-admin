import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  GET_LEAVE_ALLOCATIONS,
  LEAVE_ALLOCATION_PARAMS,
} from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  leaveAllocations: [],
};

export const fetchLeaveAllocations = commonHandleHttpMethodGet(
  "LeaveAllocationSlice/fetchLeaveAllocations",
  GET_LEAVE_ALLOCATIONS + LEAVE_ALLOCATION_PARAMS
);
export const addLeaveAllocation = commonHandleHttpMethodPost(
  "LeaveAllocationSlice/addLeaveAllocation",
  GET_LEAVE_ALLOCATIONS
);
export const updateLeaveAllocation = commonHandleHttpMethodPutV2(
  "LeaveAllocationSlice/updateLeaveAllocation",
  GET_LEAVE_ALLOCATIONS
);
export const deleteLeaveAllocation = commonHandleHttpMethodMultipleDelete(
  "LeaveAllocationSlice/deleteLeaveAllocation",
  GET_LEAVE_ALLOCATIONS
);

const leaveAllocationSlice = createSlice({
  name: "LeaveAllocationSlice",
  initialState,
  extraReducers: {
    [fetchLeaveAllocations.fulfilled]: (state, action) => {
      state.leaveAllocations = action.payload;
    },
    [addLeaveAllocation.fulfilled]: (state, action) => {
      toastrCRUDSuccess("leave allocation", TEXT_POST);
    },
    [updateLeaveAllocation.fulfilled]: (state, action) => {
      toastrCRUDSuccess("leave allocation", TEXT_PUT);
    },
    [deleteLeaveAllocation.fulfilled]: (state, action) => {
      toastrCRUDSuccess("leave allocation", TEXT_DELETE);
    },
  },
});

const { reducer } = leaveAllocationSlice;
export default reducer;
