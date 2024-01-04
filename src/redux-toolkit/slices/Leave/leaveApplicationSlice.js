import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  GET_LEAVE_APPLICATIONS,
  LEAVE_APPLICATIONS_PARAMS,
} from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  leaveApplications: [],
};

export const fetchLeaveApplications = commonHandleHttpMethodGet(
  "LeaveApplicationSlice/fetchLeaveApplications",
  GET_LEAVE_APPLICATIONS + LEAVE_APPLICATIONS_PARAMS
);
export const addLeaveApplication = commonHandleHttpMethodPost(
  "LeaveApplicationSlice/addLeaveApplication",
  GET_LEAVE_APPLICATIONS
);
export const updateLeaveApplication = commonHandleHttpMethodPutV2(
  "LeaveApplicationSlice/updateLeaveApplication",
  GET_LEAVE_APPLICATIONS
);
export const deleteLeaveApplication = commonHandleHttpMethodMultipleDelete(
  "LeaveApplicationSlice/deleteLeaveApplication",
  GET_LEAVE_APPLICATIONS
);

const leaveApplicationSlice = createSlice({
  name: "LeaveApplicationSlice",
  initialState,
  extraReducers: {
    [fetchLeaveApplications.fulfilled]: (state, action) => {
      state.leaveApplications = action.payload;
    },
    [addLeaveApplication.fulfilled]: (state, action) => {
      toastrCRUDSuccess("leave application", TEXT_POST);
    },
    [updateLeaveApplication.fulfilled]: (state, action) => {
      toastrCRUDSuccess("leave application", TEXT_PUT);
    },
    [deleteLeaveApplication.fulfilled]: (state, action) => {
      toastrCRUDSuccess("leave application", TEXT_DELETE);
    },
  },
});

const { reducer } = leaveApplicationSlice;
export default reducer;
