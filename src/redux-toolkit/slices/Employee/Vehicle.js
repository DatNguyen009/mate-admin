import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodDelete,
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_VEHICLE, GET_VEHICLE_QUERY } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { VEHICLE, TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  vehicle: [],
  fetched: false,
};

export const fetchVehicle = commonHandleHttpMethodGet(
  "Vehicle/fetchVehicle",
  GET_VEHICLE + GET_VEHICLE_QUERY
);
export const addVehicle = commonHandleHttpMethodPost(
  "Vehicle/addVehicle",
  GET_VEHICLE
);
export const updateVehicle = commonHandleHttpMethodPutV2(
  "Vehicle/updateVehicle",
  GET_VEHICLE
);
export const deleteVehicle = commonHandleHttpMethodDelete(
  "Vehicle/deleteVehicle",
  GET_VEHICLE
);

export const deleteVehicleMultiple = commonHandleHttpMethodMultipleDelete(
  "Vehicle/deleteVehicleMultiple",
  GET_VEHICLE
);

const Vehicle = createSlice({
  name: "Vehicle",
  initialState,
  extraReducers: {
    [fetchVehicle.fulfilled]: (state, action) => {
      state.vehicle = action.payload;
      state.fetched = false;
    },
    [addVehicle.fulfilled]: (state, action) => {
      toastrCRUDSuccess(VEHICLE, TEXT_POST);
    },
    [updateVehicle.fulfilled]: (state, action) => {
      toastrCRUDSuccess(VEHICLE, TEXT_PUT);
      state.fetched = false;
    },
    [deleteVehicle.fulfilled]: (state, action) => {
      toastrCRUDSuccess(VEHICLE, TEXT_DELETE);
    },

    [deleteVehicleMultiple.fulfilled]: () => {
      toastrCRUDSuccess(VEHICLE, TEXT_DELETE);
    },
    [deleteVehicleMultiple.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = Vehicle;
export default reducer;
export const {} = actions;
