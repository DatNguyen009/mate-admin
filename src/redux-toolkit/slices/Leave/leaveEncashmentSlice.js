import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  GET_LEAVE_ENCASHMENT,
  LEAVE_ENCASHMENT_PARAMS,
} from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  leaveEncashments: [],
};

export const fetchLeaveEncashments = commonHandleHttpMethodGet(
  "LeaveEncashmentSlice/fetchLeaveEncashments",
  GET_LEAVE_ENCASHMENT + LEAVE_ENCASHMENT_PARAMS
);
export const addLeaveEncashment = commonHandleHttpMethodPost(
  "LeaveEncashmentSlice/addLeaveEncashment",
  GET_LEAVE_ENCASHMENT
);
export const updateLeaveEncashment = commonHandleHttpMethodPutV2(
  "LeaveEncashmentSlice/updateLeaveEncashment",
  GET_LEAVE_ENCASHMENT
);
export const deleteLeaveEncashment = commonHandleHttpMethodMultipleDelete(
  "LeaveEncashmentSlice/deleteLeaveEncashment",
  GET_LEAVE_ENCASHMENT
);

const LeaveEncashmentSlice = createSlice({
  name: "LeaveEncashmentSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLeaveEncashments.fulfilled]: (state, action) => {
      state.leaveEncashments = action.payload;
    },
    [addLeaveEncashment.fulfilled]: (state, action) => {
      toastrCRUDSuccess("leave encashment", TEXT_POST);
    },
    [updateLeaveEncashment.fulfilled]: (state, action) => {
      toastrCRUDSuccess("leave encashment", TEXT_PUT);
    },
    [deleteLeaveEncashment.fulfilled]: (state, action) => {
      toastrCRUDSuccess("leave encashment", TEXT_DELETE);
    },
  },
});

const { reducer } = LeaveEncashmentSlice;
export default reducer;
