import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodDelete,
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_VEHICLE_LOG, GET_VEHICLE_LOG_QUERY } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  VEHICLE_LOG,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";

const initialState = {
  vehicleLog: [],
  fetched: false,
};

export const fetchVehicleLog = commonHandleHttpMethodGet(
  "VehicleLog/fetchVehicleLog",
  GET_VEHICLE_LOG + GET_VEHICLE_LOG_QUERY
);
export const addVehicleLog = commonHandleHttpMethodPost(
  "VehicleLog/addVehicleLog",
  GET_VEHICLE_LOG
);
export const updateVehicleLog = commonHandleHttpMethodPutV2(
  "VehicleLog/updateVehicleLog",
  GET_VEHICLE_LOG
);
export const deleteVehicleLog = commonHandleHttpMethodDelete(
  "VehicleLog/deleteVehicleLog",
  GET_VEHICLE_LOG
);

export const deleteVehicleLogMultiple = commonHandleHttpMethodMultipleDelete(
  "VehicleLog/deleteVehicleLogMultiple",
  GET_VEHICLE_LOG
);

const VehicleLog = createSlice({
  name: "VehicleLog",
  initialState,
  extraReducers: {
    [fetchVehicleLog.fulfilled]: (state, action) => {
      state.vehicleLog = action.payload;
      state.fetched = false;
    },
    [addVehicleLog.fulfilled]: (state, action) => {
      toastrCRUDSuccess(VEHICLE_LOG, TEXT_POST);
    },
    [updateVehicleLog.fulfilled]: (state, action) => {
      toastrCRUDSuccess(VEHICLE_LOG, TEXT_PUT);
      state.fetched = false;
    },
    [deleteVehicleLog.fulfilled]: (state, action) => {
      toastrCRUDSuccess(VEHICLE_LOG, TEXT_DELETE);
    },

    [deleteVehicleLogMultiple.fulfilled]: () => {
      toastrCRUDSuccess(VEHICLE_LOG, TEXT_DELETE);
    },
    [deleteVehicleLogMultiple.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = VehicleLog;
export default reducer;
export const {} = actions;
