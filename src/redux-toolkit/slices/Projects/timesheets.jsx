import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";

import {
  TIMESHEET,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import { GET_TIMESHEET, GET_TIMESHEET_QUERY } from "helpers/url_helper";

export const fetchTimesheet = commonHandleHttpMethodGet(
  "Timesheet/fetchTimesheet",
  GET_TIMESHEET + GET_TIMESHEET_QUERY
);

export const fetchTimesheetByParams = commonHandleHttpMethodGetByParams(
  "Timesheet/fetchTimesheetByParams",
  GET_TIMESHEET
);

export const createTimesheet = commonHandleHttpMethodPost(
  "Timesheet/createTimesheet",
  GET_TIMESHEET
);

export const updateTimesheet = commonHandleHttpMethodPutV2(
  "Timesheet/updateTimesheet",
  GET_TIMESHEET
);

export const deleteTimesheet = commonHandleHttpMethodMultipleDelete(
  "Timesheet/deleteTimesheet",
  GET_TIMESHEET
);

const initialState = {
  fetched: false,
  timesheetDetail: {},
  timesheet: [],
};

const Timesheet = createSlice({
  name: "Timesheet",
  initialState,
  extraReducers: {
    [fetchTimesheet.fulfilled]: (state, action) => {
      state.fetched = true;
      state.timesheet = action.payload;
    },
    [fetchTimesheet.rejected]: (state, action) => {
      state.fetched = false;
    },
    [fetchTimesheetByParams.fulfilled]: (state, action) => {
      state.timesheetDetail = action.payload;
    },
    [createTimesheet.fulfilled]: (state, action) => {
      toastrCRUDSuccess(TIMESHEET, TEXT_POST);
      state.fetched = false;
    },
    [createTimesheet.rejected]: (state, action) => {
      toastrError();
    },
    [updateTimesheet.fulfilled]: (state, action) => {
      toastrCRUDSuccess(TIMESHEET, TEXT_PUT);
    },
    [updateTimesheet.rejected]: (state, action) => {
      toastrError();
    },
    [deleteTimesheet.fulfilled]: (state, action) => {
      state.fetched = false;
      toastrCRUDSuccess(TIMESHEET, TEXT_DELETE);
    },
    [deleteTimesheet.rejected]: (state, action) => {
      toastrError();
    },
  },
});

const { reducer } = Timesheet;
export default reducer;
