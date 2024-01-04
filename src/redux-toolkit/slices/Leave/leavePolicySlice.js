import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_LEAVE_POLICY } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  leavePolicies: [],
};

export const fetchLeavePolicies = commonHandleHttpMethodGet(
  "LeavePolicySlice/fetchLeavePolicies",
  GET_LEAVE_POLICY
);
export const addLeavePolicy = commonHandleHttpMethodPost(
  "LeavePolicySlice/addLeavePolicy",
  GET_LEAVE_POLICY
);
export const updateLeavePolicy = commonHandleHttpMethodPutV2(
  "LeavePolicySlice/updateLeavePolicy",
  GET_LEAVE_POLICY
);
export const deleteLeavePolicy = commonHandleHttpMethodMultipleDelete(
  "LeavePolicySlice/deleteLeavePolicy",
  GET_LEAVE_POLICY
);

const leavePolicySlice = createSlice({
  name: "LeavePolicySlice",
  initialState,
  extraReducers: {
    [fetchLeavePolicies.fulfilled]: (state, action) => {
      state.leavePolicies = action.payload;
    },
    [addLeavePolicy.fulfilled]: (state, action) => {
      toastrCRUDSuccess("leave policy", TEXT_POST);
    },
    [updateLeavePolicy.fulfilled]: (state, action) => {
      toastrCRUDSuccess("leave policy", TEXT_PUT);
    },
    [deleteLeavePolicy.fulfilled]: (state, action) => {
      toastrCRUDSuccess("leave policy", TEXT_DELETE);
    },
  },
});

const { reducer } = leavePolicySlice;
export default reducer;
