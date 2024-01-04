import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPut,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  SHIFT_ASSIGNMENT,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import {
  GET_SHIFT_ASSIGNMENT,
  GET_SHIFT_ASSIGNMENT_QUERY,
} from "helpers/url_helper";

export const fetchShiftAssignment = commonHandleHttpMethodGet(
  "ShiftAssignment/fetchShiftAssignment",
  GET_SHIFT_ASSIGNMENT + GET_SHIFT_ASSIGNMENT_QUERY
);

export const getShiftAssignmentByID = commonHandleHttpMethodGet(
  "ShiftAssignment/getShiftAssignmentByID",
  GET_SHIFT_ASSIGNMENT
);

export const createShiftAssignment = commonHandleHttpMethodPost(
  "ShiftAssignment/createShiftAssignment",
  GET_SHIFT_ASSIGNMENT
);

export const updateShiftAssignment = commonHandleHttpMethodPutV2(
  "ShiftAssignment/updateShiftAssignment",
  GET_SHIFT_ASSIGNMENT
);

export const deleteShiftAssignment = commonHandleHttpMethodMultipleDelete(
  "ShiftAssignment/deleteShiftAssignment",
  GET_SHIFT_ASSIGNMENT
);

const initialState = {
  loading: false,
  fetched: false,
  shiftAssignments: [],
  ShiftAssignmentDetail: {},
};

const ShiftAssignment = createSlice({
  name: "ShiftAssignment",
  initialState,
  extraReducers: {
    [fetchShiftAssignment.fulfilled]: (state, action) => {
      state.loading = true;
      state.fetched = true;
      state.shiftAssignments = action.payload;
    },
    [getShiftAssignmentByID.fulfilled]: (state, action) => {
      state.loading = true;
      state.fetched = true;
      state.ShiftAssignmentDetail = action.payload;
    },
    [getShiftAssignmentByID.pending]: (state, action) => {
      state.loading = true;
      state.ShiftAssignmentDetail = action.payload;
    },
    [getShiftAssignmentByID.rejected]: state => {
      state.loading = true;
    },
    [createShiftAssignment.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(SHIFT_ASSIGNMENT, TEXT_POST);
      }
    },
    [createShiftAssignment.rejected]: state => {
      state.loading = false;
      toastrError();
    },
    [updateShiftAssignment.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(SHIFT_ASSIGNMENT, TEXT_PUT);
      }
    },
    [deleteShiftAssignment.fulfilled]: (state, action) => {
      toastrCRUDSuccess(SHIFT_ASSIGNMENT, TEXT_DELETE);
    },
    [deleteShiftAssignment.rejected]: state => {
      toastrError();
    },
  },
});

const { actions, reducer } = ShiftAssignment;
export default reducer;
export const {} = actions;
