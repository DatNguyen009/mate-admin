import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { ADD_LEAVE_PERIOD, GET_LEAVE_PERIODS } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  leavePeriods: [],
};

export const fetchLeavePeriods = commonHandleHttpMethodGet(
  "LeavePeriodSlice/fetchLeavePeriods",
  GET_LEAVE_PERIODS
);
export const addLeavePeriod = commonHandleHttpMethodPost(
  "LeavePeriodSlice/addLeavePeriod",
  ADD_LEAVE_PERIOD
);
export const updateLeavePeriod = commonHandleHttpMethodPutV2(
  "LeavePeriodSlice/updateLeavePeriod",
  ADD_LEAVE_PERIOD
);
export const deleteLeavePeriod = commonHandleHttpMethodMultipleDelete(
  "LeavePeriodSlice/deleteLeavePeriod",
  ADD_LEAVE_PERIOD
);

const leavePeriodSlice = createSlice({
  name: "LeavePeriodSlice",
  initialState,
  extraReducers: {
    [fetchLeavePeriods.fulfilled]: (state, action) => {
      state.leavePeriods = action.payload;
    },
    [addLeavePeriod.fulfilled]: (state, action) => {
      toastrCRUDSuccess("leave period", TEXT_POST);
    },
    [updateLeavePeriod.fulfilled]: (state, action) => {
      toastrCRUDSuccess("leave period", TEXT_PUT);
    },
    [deleteLeavePeriod.fulfilled]: (state, action) => {
      toastrCRUDSuccess("leave period", TEXT_DELETE);
    },
  },
});

const { reducer } = leavePeriodSlice;
export default reducer;
