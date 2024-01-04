import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodDelete,
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPut,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  SHIFT_REQUEST,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import { GET_SHIFT_REQUEST, GET_SHIFT_REQUEST_QUERY } from "helpers/url_helper";

export const fetchShiftRequest = commonHandleHttpMethodGet(
  "ShiftRequest/fetchShiftRequest",
  GET_SHIFT_REQUEST + GET_SHIFT_REQUEST_QUERY
);

export const getShiftRequestByID = commonHandleHttpMethodGet(
  "ShiftRequest/getShiftRequestByID",
  GET_SHIFT_REQUEST
);

export const createShiftRequest = commonHandleHttpMethodPost(
  "ShiftRequest/createShiftRequest",
  GET_SHIFT_REQUEST
);

export const updateShiftRequest = commonHandleHttpMethodPutV2(
  "ShiftRequest/updateShiftRequest",
  GET_SHIFT_REQUEST
);

export const deleteShiftRequest = commonHandleHttpMethodMultipleDelete(
  "ShiftRequest/deleteShiftRequest",
  GET_SHIFT_REQUEST
);

const initialState = {
  loading: false,
  fetched: false,
  shiftRequests: [],
  ShiftRequestDetail: {},
};

const ShiftRequest = createSlice({
  name: "ShiftRequest",
  initialState,
  extraReducers: {
    [fetchShiftRequest.fulfilled]: (state, action) => {
      state.loading = true;
      state.fetched = true;
      state.shiftRequests = action.payload;
    },
    [getShiftRequestByID.fulfilled]: (state, action) => {
      state.loading = true;
      state.fetched = true;
      state.ShiftRequestDetail = action.payload;
    },
    [getShiftRequestByID.pending]: (state, action) => {
      state.loading = true;
      state.ShiftRequestDetail = action.payload;
    },
    [getShiftRequestByID.rejected]: (state, action) => {
      state.loading = true;
      state.ShiftRequestDetail = action.payload;
    },
    [createShiftRequest.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(SHIFT_REQUEST, TEXT_POST);
      }
    },
    [createShiftRequest.rejected]: (state, action) => {
      state.loading = false;
      toastrError();
    },
    [updateShiftRequest.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(SHIFT_REQUEST, TEXT_PUT);
      }
    },
    [deleteShiftRequest.fulfilled]: (state, action) => {
      toastrCRUDSuccess(SHIFT_REQUEST, TEXT_DELETE);
    },
    [deleteShiftRequest.rejected]: state => {
      toastrError();
    },
  },
});

const { actions, reducer } = ShiftRequest;
export default reducer;
export const {} = actions;
