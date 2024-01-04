import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodDelete,
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_DRIVER, GET_DRIVER_QUERY } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { DRIVER, TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  driver: [],
  fetched: false,
};

export const fetchDriver = commonHandleHttpMethodGet(
  "Driver/fetchDriver",
  GET_DRIVER + GET_DRIVER_QUERY
);
export const addDriver = commonHandleHttpMethodPost(
  "Driver/addDriver",
  GET_DRIVER
);
export const updateDriver = commonHandleHttpMethodPutV2(
  "Driver/updateDriver",
  GET_DRIVER
);
export const deleteDriver = commonHandleHttpMethodDelete(
  "Driver/deleteDriver",
  GET_DRIVER
);

export const deleteDriverMultiple = commonHandleHttpMethodMultipleDelete(
  "Driver/deleteDriverMultiple",
  GET_DRIVER
);

const Driver = createSlice({
  name: "Driver",
  initialState,
  extraReducers: {
    [fetchDriver.fulfilled]: (state, action) => {
      state.driver = action.payload;
      state.fetched = false;
    },
    [addDriver.fulfilled]: (state, action) => {
      toastrCRUDSuccess(DRIVER, TEXT_POST);
    },
    [updateDriver.fulfilled]: (state, action) => {
      toastrCRUDSuccess(DRIVER, TEXT_PUT);
      state.fetched = false;
    },
    [deleteDriver.fulfilled]: (state, action) => {
      toastrCRUDSuccess(DRIVER, TEXT_DELETE);
    },

    [deleteDriverMultiple.fulfilled]: () => {
      toastrCRUDSuccess(DRIVER, TEXT_DELETE);
    },
    [deleteDriverMultiple.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = Driver;
export default reducer;
export const {} = actions;
