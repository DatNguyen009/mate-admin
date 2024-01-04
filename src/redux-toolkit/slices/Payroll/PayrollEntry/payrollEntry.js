import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { PAYROLL_ENTRY, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import { GET_PAYROLL_ENTRY, GET_PAYROLL_ENTRY_FULL } from "helpers/url_helper";

import "toastr/build/toastr.min.css";

export const fetchPayrollEntry = commonHandleHttpMethodGet(
  "PayrollEntry/fetchPayrollEntry",
  GET_PAYROLL_ENTRY_FULL
);

export const getPayrollEntryByID = commonHandleHttpMethodGet(
  "PayrollEntry/getPayrollEntryByID",
  GET_PAYROLL_ENTRY
);

export const createPayrollEntry = commonHandleHttpMethodPost(
  "PayrollEntry/createPayrollEntry",
  GET_PAYROLL_ENTRY
);

export const updatePayrollEntry = commonHandleHttpMethodPutV2(
  "PayrollEntry/updatePayrollEntry",
  GET_PAYROLL_ENTRY
);

export const deletePayrollEntry = commonHandleHttpMethodMultipleDelete(
  "PayrollEntry/deletePayrollEntry",
  GET_PAYROLL_ENTRY
);

const initialState = {
  loading: false,
  payrollEntry: [],
  payrollEntryDetail: {},
  fetched: false,
};

const PayrollEntry = createSlice({
  name: "PayrollEntry",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPayrollEntry.pending]: (state, action) => {
      state.loading = false;
    },
    [fetchPayrollEntry.fulfilled]: (state, action) => {
      state.loading = true;
      state.payrollEntry = action.payload;
      state.fetched = true;
    },
    [fetchPayrollEntry.rejected]: (state, action) => {
      state.loading = false;
    },

    [getPayrollEntryByID.fulfilled]: (state, action) => {
      state.loading = true;
      state.payrollEntryDetail = action.payload;
    },
    [getPayrollEntryByID.pending]: (state, action) => {
      state.loading = true;
      state.payrollEntryDetail = action.payload;
    },
    [getPayrollEntryByID.rejected]: (state, action) => {
      state.loading = true;
      state.payrollEntryDetail = action.payload;
    },
    [createPayrollEntry.pending]: (state, action) => {
      state.loading = false;
    },
    [createPayrollEntry.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(PAYROLL_ENTRY, TEXT_POST);
      }
    },
    [createPayrollEntry.rejected]: (state, action) => {
      state.loading = false;
      toastrError();
    },

    [updatePayrollEntry.pending]: (state, action) => {
      state.loading = false;
    },
    [updatePayrollEntry.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(PAYROLL_ENTRY, TEXT_PUT);
      }
    },
  },
});

const { actions, reducer } = PayrollEntry;
export default reducer;
export const {} = actions;
