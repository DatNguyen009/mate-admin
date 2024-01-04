import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodDelete,
  commonHandleHttpMethodGet,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPostV2,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_APPOINTMENT } from "helpers/url_helper";
import {
  toastrCRUDSuccess,
  toastrErrorAlert,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";

import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  appointments: [],
};

export const fetchAppointments = commonHandleHttpMethodGet(
  "appointmentSlice/fetchAppointments",
  GET_APPOINTMENT
);
export const addAppointment = commonHandleHttpMethodPost(
  "appointmentSlice/addAppointment",
  GET_APPOINTMENT
);
export const addAppointmentV2 = commonHandleHttpMethodPostV2(
  "appointmentSlice/addAppointmentV2",
  GET_APPOINTMENT
);
export const updateAppointment = commonHandleHttpMethodPutV2(
  "appointmentSlice/updateAppointment",
  GET_APPOINTMENT
);
export const deleteAppointment = commonHandleHttpMethodDelete(
  "appointmentSlice/deleteAppointment",
  GET_APPOINTMENT
);

const appointmentSlice = createSlice({
  name: "Appointment",
  initialState,
  extraReducers: {
    [fetchAppointments.fulfilled]: (state, action) => {
      state.appointments = action.payload;
    },
    [addAppointment.fulfilled]: (state, action) => {
      toastrCRUDSuccess("appointment", TEXT_POST);
    },
    [addAppointmentV2.fulfilled]: (state, action) => {
      if (action.payload?.objectId) {
        toastrSuccessAlert("Tạo cuộc hẹn thành công!!");
        return;
      }
      toastrErrorAlert("Tạo cuộc hẹn không thành công!!");
    },
    [updateAppointment.fulfilled]: (state, action) => {
      toastrCRUDSuccess("appointment", TEXT_PUT);
    },
    [deleteAppointment.fulfilled]: (state, action) => {
      toastrCRUDSuccess("appointment", TEXT_DELETE);
    },
  },
});

const { actions, reducer } = appointmentSlice;
export default reducer;
export const {} = actions;
