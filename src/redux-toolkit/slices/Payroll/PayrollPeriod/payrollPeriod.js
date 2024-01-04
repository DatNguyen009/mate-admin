import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodDelete,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  PAYROLL_PERIOD,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import { GET_PAYROLL_PERIOD } from "helpers/url_helper";

import "toastr/build/toastr.min.css";

export const fetchPayrollPeriod = commonHandleHttpMethodGet(
  "PayrollPeriod/fetchPayrollPeriod",
  GET_PAYROLL_PERIOD
);

export const getPayrollPeriodByID = commonHandleHttpMethodGet(
  "PayrollPeriod/getPayrollPeriodByID",
  GET_PAYROLL_PERIOD
);

export const fetchPayrollPeriodByParams = commonHandleHttpMethodGetByParams(
  "PayrollPeriod/fetchPayrollPeriodByParams",
  GET_PAYROLL_PERIOD
);

export const createPayrollPeriod = commonHandleHttpMethodPost(
  "PayrollPeriod/createPayrollPeriod",
  GET_PAYROLL_PERIOD
);

export const updatePayrollPeriod = commonHandleHttpMethodPutV2(
  "PayrollPeriod/updatePayrollPeriod",
  GET_PAYROLL_PERIOD
);

export const deletePayrollPeriod = commonHandleHttpMethodDelete(
  "PayrollPeriod/deletePayrollPeriod",
  GET_PAYROLL_PERIOD
);

export const deleteMultiplePayrollPeriod = commonHandleHttpMethodMultipleDelete(
  "PayrollPeriod/deleteMultiplePayrollPeriod",
  GET_PAYROLL_PERIOD
);

const initialState = {
  loading: false,
  payrollPeriod: [],
  payrollPeriodDetail: {},
  fetched: false,
};

const PayrollPeriod = createSlice({
  name: "PayrollPeriod",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPayrollPeriod.fulfilled]: (state, action) => {
      state.loading = true;
      state.payrollPeriod = action.payload;
      state.fetched = true;
    },
    [getPayrollPeriodByID.fulfilled]: (state, action) => {
      state.loading = true;
      state.payrollPeriodDetail = action.payload;
    },
    [getPayrollPeriodByID.pending]: (state, action) => {
      state.loading = true;
      state.PayrollPeriodDetail = action.payload;
    },
    [getPayrollPeriodByID.rejected]: (state, action) => {
      state.loading = true;
      state.PayrollPeriodDetail = action.payload;
    },
    [createPayrollPeriod.fulfilled]: (state, action) => {
      state.loading = true;
      state.payrollPeriod = [
        ...state.payrollPeriod,
        { ...action.meta.arg, objectId: action.payload?.objectId },
      ];
      if (action.payload?.objectId) {
        toastrCRUDSuccess(PAYROLL_PERIOD, TEXT_POST);
      }
    },
    [createPayrollPeriod.rejected]: (state, action) => {
      state.loading = false;
      toastrError();
    },
    [updatePayrollPeriod.fulfilled]: (state, action) => {
      state.loading = true;
      state.fetched = false;
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(PAYROLL_PERIOD, TEXT_PUT);
      }
    },
    [deleteMultiplePayrollPeriod.fulfilled]: (state, action) => {
      toastrCRUDSuccess(PAYROLL_PERIOD, TEXT_DELETE);
    },
    [deleteMultiplePayrollPeriod.rejected]: (state, action) => {
      toastrError();
    },
  },
});

const { actions, reducer } = PayrollPeriod;
export default reducer;
export const {} = actions;
