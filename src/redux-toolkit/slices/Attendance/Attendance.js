import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  ATTENDANCE,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import { GET_ATTENDANCE, GET_ATTENDANCE_INCLUDE } from "helpers/url_helper";

export const fetchAttendance = commonHandleHttpMethodGet(
  "AttendanceSlide/fetchAttendance",
  GET_ATTENDANCE + GET_ATTENDANCE_INCLUDE
);

export const getAttendanceByID = commonHandleHttpMethodGet(
  "AttendanceSlide/getAttendanceByID",
  GET_ATTENDANCE
);

export const createAttendance = commonHandleHttpMethodPost(
  "AttendanceSlide/createAttendance",
  GET_ATTENDANCE
);

export const updateAttendance = commonHandleHttpMethodPutV2(
  "AttendanceSlide/updateAttendance",
  GET_ATTENDANCE
);

export const deleteAttendance = commonHandleHttpMethodMultipleDelete(
  "AttendanceSlide/deleteAttendance",
  GET_ATTENDANCE
);

const initialState = {
  loading: false,
  fetched: false,
  attendances: [],
  attendanceDetail: [],
};

const AttendanceSlide = createSlice({
  name: "AttendanceSlide",
  initialState,
  reducers: {
    setAttendanceDetail: (state, action) => {
      state.attendanceDetail = action.payload;
    },
  },
  extraReducers: {
    [fetchAttendance.pending]: (state, action) => {
      state.loading = false;
    },
    [fetchAttendance.fulfilled]: (state, action) => {
      state.loading = true;
      state.attendances = action.payload;
      state.fetched = true;
    },
    [fetchAttendance.rejected]: (state, action) => {
      state.loading = false;
    },
    [createAttendance.pending]: (state, action) => {
      state.loading = false;
    },
    [createAttendance.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(ATTENDANCE, TEXT_POST);
      }
    },
    [createAttendance.rejected]: (state, action) => {
      state.loading = false;
      toastrError();
    },
    [getAttendanceByID.pending]: (state, action) => {
      state.loading = false;
    },
    [getAttendanceByID.fulfilled]: (state, action) => {
      state.loading = true;
      state.attendanceDetail = action.payload;
      state.fetched = true;
    },

    [updateAttendance.fulfilled]: () => {
      toastrCRUDSuccess(ATTENDANCE, TEXT_PUT);
    },
    [updateAttendance.rejected]: () => {
      toastrError();
    },

    [deleteAttendance.fulfilled]: () => {
      toastrCRUDSuccess(ATTENDANCE, TEXT_DELETE);
    },
    [deleteAttendance.rejected]: () => {
      toastrError();
    },

    [deleteAttendance.fulfilled]: () => {
      toastrCRUDSuccess(ATTENDANCE, TEXT_DELETE);
    },
    [deleteAttendance.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = AttendanceSlide;
export default reducer;
export const { setAttendanceDetail } = actions;
