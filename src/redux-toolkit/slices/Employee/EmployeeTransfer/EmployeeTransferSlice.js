import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  EMPLOYEE_TRANSFER,
  TEXT_POST,
  TEXT_PUT,
  TEXT_DELETE,
} from "helpers/name_helper";
import {
  GET_EMPLOYEE_TRANSFER,
  GET_EMPLOYEE_TRANSFER_DETAIL,
} from "helpers/url_helper";

export const fetchEmployeeTransfer = commonHandleHttpMethodGet(
  "EmployeeTransferSlide/fetchEmployeeTransfer",
  GET_EMPLOYEE_TRANSFER_DETAIL
);

export const getEmployeeTransferById = commonHandleHttpMethodGet(
  "EmployeeTransferSlide/getEmployeeTransferById",
  GET_EMPLOYEE_TRANSFER
);

export const createEmployeeTransfer = commonHandleHttpMethodPost(
  "EmployeeTransferSlide/createEmployeeTransfer",
  GET_EMPLOYEE_TRANSFER
);

export const updateEmployeeTransfer = commonHandleHttpMethodPutV2(
  "EmployeeTransferSlide/updateEmployeeTransfer",
  GET_EMPLOYEE_TRANSFER
);

export const deleteEmployeeTransfer = commonHandleHttpMethodMultipleDelete(
  "EmployeeTransferSlide/deleteEmployeeTransfer",
  GET_EMPLOYEE_TRANSFER
);
const initialState = {
  loading: false,
  fetched: false,
  employeeTransfers: [],
  employeeTransferDetail: [],
};

const EmployeeTransferSlide = createSlice({
  name: "EmployeeTransferSlide",
  initialState,
  extraReducers: {
    [fetchEmployeeTransfer.pending]: state => {
      state.loading = false;
    },
    [fetchEmployeeTransfer.fulfilled]: (state, action) => {
      state.loading = true;
      state.employeeTransfers = action.payload;
      state.fetched = true;
    },
    [fetchEmployeeTransfer.rejected]: state => {
      state.loading = false;
    },
    [createEmployeeTransfer.pending]: state => {
      state.loading = false;
    },
    [createEmployeeTransfer.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(EMPLOYEE_TRANSFER, TEXT_POST);
      }
    },
    [createEmployeeTransfer.rejected]: state => {
      state.loading = false;
      toastrError();
    },

    [getEmployeeTransferById.fulfilled]: (state, action) => {
      state.loading = true;
      state.employeeTransferDetail = action.payload;
    },

    [updateEmployeeTransfer.pending]: state => {
      state.loading = false;
    },
    [updateEmployeeTransfer.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(EMPLOYEE_TRANSFER, TEXT_PUT);
      }
    },
    [updateEmployeeTransfer.rejected]: state => {
      state.loading = false;
      toastrError();
    },

    [deleteEmployeeTransfer.fulfilled]: () => {
      toastrCRUDSuccess(EMPLOYEE_TRANSFER, TEXT_DELETE);
    },
    [deleteEmployeeTransfer.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = EmployeeTransferSlide;
export default reducer;
