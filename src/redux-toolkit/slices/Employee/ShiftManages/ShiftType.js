import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  SHIFT_TYPE,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import { GET_SHIFT_TYPE, SHIFT_TYPE_QUERY } from "helpers/url_helper";

export const fetchShiftType = commonHandleHttpMethodGet(
  "ShiftType/fetchShiftType",
  GET_SHIFT_TYPE + SHIFT_TYPE_QUERY
);

export const getShiftTypeByID = commonHandleHttpMethodGet(
  "ShiftType/getShiftTypeByID",
  GET_SHIFT_TYPE
);

export const createShiftType = commonHandleHttpMethodPost(
  "ShiftType/createShiftType",
  GET_SHIFT_TYPE
);

export const updateShiftType = commonHandleHttpMethodPutV2(
  "ShiftType/updateShiftType",
  GET_SHIFT_TYPE
);

export const deleteShiftType = commonHandleHttpMethodMultipleDelete(
  "ShiftType/deleteShiftType",
  GET_SHIFT_TYPE
);

const initialState = {
  loading: false,
  fetched: false,
  shiftType: [],
  shiftTypeDetail: {},
};

const ShiftType = createSlice({
  name: "ShiftType",
  initialState,
  extraReducers: {
    [fetchShiftType.fulfilled]: (state, action) => {
      state.loading = true;
      state.fetched = true;
      state.shiftType = action.payload;
    },
    [getShiftTypeByID.fulfilled]: (state, action) => {
      state.loading = true;
      state.fetched = true;
      state.shiftTypeDetail = action.payload;
    },
    [getShiftTypeByID.pending]: (state, action) => {
      state.loading = true;
      state.shiftTypeDetail = action.payload;
    },
    [getShiftTypeByID.rejected]: (state, action) => {
      state.loading = true;
      state.shiftTypeDetail = action.payload;
    },
    [createShiftType.fulfilled]: (state, action) => {
      state.loading = true;
      state.shiftType = [
        ...state.shiftType,
        {
          objectId: action.payload.objectId,
          name: action.meta.arg.name,
          startTime: action.meta.arg.startTime,
          endTime: action.meta.arg.endTime,
          createdAt: action.payload.createdAt,
          updatedAt: action.payload.createdAt,
        },
      ];
      if (action.payload?.objectId) {
        toastrCRUDSuccess(SHIFT_TYPE, TEXT_POST);
      }
    },
    [createShiftType.rejected]: (state, action) => {
      state.loading = false;
      toastrError();
    },
    [updateShiftType.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(SHIFT_TYPE, TEXT_PUT);
      }
    },
    [deleteShiftType.fulfilled]: (state, action) => {
      toastrCRUDSuccess(SHIFT_TYPE, TEXT_DELETE);
    },
    [deleteShiftType.rejected]: state => {
      toastrError();
    },
  },
});

const { actions, reducer } = ShiftType;
export default reducer;
export const {} = actions;
