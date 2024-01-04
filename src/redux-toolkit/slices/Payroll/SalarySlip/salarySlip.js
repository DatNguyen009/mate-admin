import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { SALARY_SLIP, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import { GET_SALARY_SLIP, GET_SALARY_SLIP_FULL } from "helpers/url_helper";

import "toastr/build/toastr.min.css";

export const fetchSalarySlip = commonHandleHttpMethodGet(
  "SalarySlip/fetchSalarySlip",
  GET_SALARY_SLIP_FULL
);

export const getSalarySlipByID = commonHandleHttpMethodGet(
  "SalarySlip/getSalarySlipByID",
  GET_SALARY_SLIP
);

export const createSalarySlip = commonHandleHttpMethodPost(
  "SalarySlip/createSalarySlip",
  GET_SALARY_SLIP
);

export const updateSalarySlip = commonHandleHttpMethodPutV2(
  "SalarySlip/updateSalarySlip",
  GET_SALARY_SLIP
);

export const deleteSalarySlip = commonHandleHttpMethodMultipleDelete(
  "SalarySlip/deleteSalarySlip",
  GET_SALARY_SLIP
);

const initialState = {
  loading: false,
  salarySlip: [],
  salarySlipDetail: {},
  fetched: false,
};

const SalarySlip = createSlice({
  name: "SalarySlip",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSalarySlip.pending]: (state, action) => {
      state.loading = false;
    },
    [fetchSalarySlip.fulfilled]: (state, action) => {
      state.loading = true;
      state.fetched = true;

      state.salarySlip = action.payload;
    },
    [fetchSalarySlip.rejected]: (state, action) => {
      state.loading = false;
    },
    [createSalarySlip.pending]: (state, action) => {
      state.loading = false;
    },
    [createSalarySlip.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(SALARY_SLIP, TEXT_POST);
      }
    },
    [createSalarySlip.rejected]: (state, action) => {
      state.loading = false;
      toastrError();
    },

    [updateSalarySlip.pending]: (state, action) => {
      state.loading = false;
    },
    [updateSalarySlip.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(SALARY_SLIP, TEXT_PUT);
      }
    },
  },
});

const { actions, reducer } = SalarySlip;
export default reducer;
export const {} = actions;
