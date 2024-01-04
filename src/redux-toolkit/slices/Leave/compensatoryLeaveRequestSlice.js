import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  GET_COMPENSATORY_LEAVE_REQUEST,
  COMPENSATORY_LEAVE_REQUEST_PARAMS,
} from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  compensatoryLeaveRequests: [],
};

export const fetchCompensatoryLeaveRequests = commonHandleHttpMethodGet(
  "CompensatoryLeaveRequestSlice/fetchCompensatoryLeaveRequests",
  GET_COMPENSATORY_LEAVE_REQUEST + COMPENSATORY_LEAVE_REQUEST_PARAMS
);
export const addCompensatoryLeaveRequest = commonHandleHttpMethodPost(
  "CompensatoryLeaveRequestSlice/addCompensatoryLeaveRequest",
  GET_COMPENSATORY_LEAVE_REQUEST
);
export const updateCompensatoryLeaveRequest = commonHandleHttpMethodPutV2(
  "CompensatoryLeaveRequestSlice/updateCompensatoryLeaveRequest",
  GET_COMPENSATORY_LEAVE_REQUEST
);
export const deleteCompensatoryLeaveRequest =
  commonHandleHttpMethodMultipleDelete(
    "CompensatoryLeaveRequestSlice/deleteCompensatoryLeaveRequest",
    GET_COMPENSATORY_LEAVE_REQUEST
  );

const compensatoryLeaveRequestSlice = createSlice({
  name: "LeaveAllocationSlice",
  initialState,
  extraReducers: {
    [fetchCompensatoryLeaveRequests.fulfilled]: (state, action) => {
      const newCompensatoryLeaveRequests = action.payload.map(item => {
        const { createdAt, updatedAt, ...other } = item;
        return other;
      });
      state.compensatoryLeaveRequests = newCompensatoryLeaveRequests;
    },
    [addCompensatoryLeaveRequest.fulfilled]: (state, action) => {
      toastrCRUDSuccess("compensatory leave request", TEXT_POST);
    },
    [updateCompensatoryLeaveRequest.fulfilled]: (state, action) => {
      toastrCRUDSuccess("compensatory leave request", TEXT_PUT);
    },
    [deleteCompensatoryLeaveRequest.fulfilled]: (state, action) => {
      toastrCRUDSuccess("compensatory leave request", TEXT_DELETE);
    },
  },
});

const { reducer } = compensatoryLeaveRequestSlice;
export default reducer;
