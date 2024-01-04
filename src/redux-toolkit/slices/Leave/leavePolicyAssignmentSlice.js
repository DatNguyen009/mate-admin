import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  GET_LEAVE_POLICY_ASSIGNMENT,
  LEAVE_POLICY_ASSIGNMENT_PARAMS,
} from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  leavePolicyAssignment: [],
};

export const fetchLeavePolicyAssignment = commonHandleHttpMethodGet(
  "LeavePolicyAssignmentSlice/fetchLeavePolicyAssignment",
  GET_LEAVE_POLICY_ASSIGNMENT + LEAVE_POLICY_ASSIGNMENT_PARAMS
);
export const addLeavePolicyAssignment = commonHandleHttpMethodPost(
  "LeavePolicyAssignmentSlice/addLeavePolicyAssignment",
  GET_LEAVE_POLICY_ASSIGNMENT
);
export const updateLeavePolicyAssignment = commonHandleHttpMethodPutV2(
  "LeavePolicyAssignmentSlice/updateLeavePolicyAssignment",
  GET_LEAVE_POLICY_ASSIGNMENT
);
export const deleteLeavePolicyAssignment = commonHandleHttpMethodMultipleDelete(
  "LeavePolicyAssignmentSlice/deleteLeavePolicyAssignment",
  GET_LEAVE_POLICY_ASSIGNMENT
);

const leavePolicyAssignmentSlice = createSlice({
  name: "LeavePolicyAssignmentSlice",
  initialState,
  extraReducers: {
    [fetchLeavePolicyAssignment.fulfilled]: (state, action) => {
      state.leavePolicyAssignment = action.payload;
    },
    [addLeavePolicyAssignment.fulfilled]: (state, action) => {
      toastrCRUDSuccess("leave policy assignment", TEXT_POST);
    },
    [updateLeavePolicyAssignment.fulfilled]: (state, action) => {
      toastrCRUDSuccess("leave policy assignment", TEXT_PUT);
    },
    [deleteLeavePolicyAssignment.fulfilled]: (state, action) => {
      toastrCRUDSuccess("leave policy assignment", TEXT_DELETE);
    },
  },
});

const { reducer } = leavePolicyAssignmentSlice;
export default reducer;
