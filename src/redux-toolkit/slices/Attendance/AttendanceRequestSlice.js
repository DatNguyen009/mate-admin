import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  ATTENDANCE_REQUEST,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import {
  GET_ATTENDANCE_REQUEST,
  GET_ATTENDANCE_REQUEST_INCLUDE,
} from "helpers/url_helper";

export const fetchAttendanceRequest = commonHandleHttpMethodGet(
  "AttendanceRequestSlide/fetchAttendanceRequest",
  GET_ATTENDANCE_REQUEST + GET_ATTENDANCE_REQUEST_INCLUDE
);

export const getAttendanceRequestByID = commonHandleHttpMethodGet(
  "AttendanceRequestSlide/getAttendanceRequestByID",
  GET_ATTENDANCE_REQUEST
);

export const createAttendanceRequest = commonHandleHttpMethodPost(
  "AttendanceRequestSlide/createAttendanceRequest",
  GET_ATTENDANCE_REQUEST
);

export const updateAttendanceRequest = commonHandleHttpMethodPutV2(
  "AttendanceRequestSlide/updateAttendanceRequest",
  GET_ATTENDANCE_REQUEST
);

export const deleteAttendanceRequest = commonHandleHttpMethodMultipleDelete(
  "AttendanceRequestSlide/deleteAttendanceRequest",
  GET_ATTENDANCE_REQUEST
);

const initialState = {
  loading: false,
  fetched: false,
  attendanceRequests: [],
  attendanceRequestDetail: [],
};

const AttendanceRequestSlide = createSlice({
  name: "AttendanceRequestSlide",
  initialState,
  reducers: {
    setAttendanceRequestDetail: (state, action) => {
      state.attendanceRequestDetail = action.payload;
    },
  },
  extraReducers: {
    [fetchAttendanceRequest.pending]: (state, action) => {
      state.loading = false;
    },
    [fetchAttendanceRequest.fulfilled]: (state, action) => {
      state.loading = true;
      state.attendanceRequests = action.payload;
      state.fetched = true;
    },
    [fetchAttendanceRequest.rejected]: (state, action) => {
      state.loading = false;
    },
    [createAttendanceRequest.pending]: (state, action) => {
      state.loading = false;
    },
    [createAttendanceRequest.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(ATTENDANCE_REQUEST, TEXT_POST);
      }
    },
    [createAttendanceRequest.rejected]: (state, action) => {
      state.loading = false;
      toastrError();
    },
    [getAttendanceRequestByID.pending]: (state, action) => {
      state.loading = false;
    },
    [getAttendanceRequestByID.fulfilled]: (state, action) => {
      state.loading = true;
      state.attendanceRequestDetail = action.payload;
      state.fetched = true;
    },

    [updateAttendanceRequest.fulfilled]: () => {
      toastrCRUDSuccess(ATTENDANCE_REQUEST, TEXT_PUT);
    },
    [updateAttendanceRequest.rejected]: () => {
      toastrError();
    },

    [deleteAttendanceRequest.fulfilled]: () => {
      toastrCRUDSuccess(ATTENDANCE_REQUEST, TEXT_DELETE);
    },
    [deleteAttendanceRequest.rejected]: () => {
      toastrError();
    },

    [deleteAttendanceRequest.fulfilled]: () => {
      toastrCRUDSuccess(ATTENDANCE_REQUEST, TEXT_DELETE);
    },
    [deleteAttendanceRequest.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = AttendanceRequestSlide;
export default reducer;
export const { setAttendanceRequestDetail } = actions;
