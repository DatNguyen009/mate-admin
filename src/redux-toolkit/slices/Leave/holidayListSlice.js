import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_HOLIDAY_LIST } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  holidayList: [],
};

export const fetchHolidayList = commonHandleHttpMethodGet(
  "HolidayListSlice/fetchHolidayList",
  GET_HOLIDAY_LIST
);

export const addHolidayList = commonHandleHttpMethodPost(
  "HolidayListSlice/addHolidayList",
  GET_HOLIDAY_LIST
);

export const updateHolidayList = commonHandleHttpMethodPutV2(
  "HolidayListSlice/updateHolidayList",
  GET_HOLIDAY_LIST
);

export const deleteHolidayList = commonHandleHttpMethodMultipleDelete(
  "HolidayListSlice/deleteHolidayList",
  GET_HOLIDAY_LIST
);

const holidayListSlice = createSlice({
  name: "HolidayListSlice",
  initialState,
  extraReducers: {
    [fetchHolidayList.fulfilled]: (state, action) => {
      state.holidayList = action.payload;
    },
    [addHolidayList.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Holiday List", TEXT_POST);
    },
    [updateHolidayList.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Holiday List", TEXT_PUT);
    },
    [deleteHolidayList.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Holiday List", TEXT_DELETE);
    },
  },
});

const { reducer } = holidayListSlice;
export default reducer;
