import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  EMPLOYEE_SEPARATION,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import {
  GET_EMPLOYEE_SEPARATION_DETAIL,
  GET_EMPLOYEE_SEPARATION,
} from "helpers/url_helper";

export const fetchEmployeeSeparation = commonHandleHttpMethodGet(
  "EmployeeSeparationSlide/fetchEmployeeSeparation",
  GET_EMPLOYEE_SEPARATION_DETAIL
);

export const getEmployeeSeparationById = commonHandleHttpMethodGet(
  "EmployeeSeparationSlide/getEmployeeSeparationById",
  GET_EMPLOYEE_SEPARATION
);

export const createEmployeeSeparation = commonHandleHttpMethodPost(
  "EmployeeSeparationSlide/createEmployeeSeparation",
  GET_EMPLOYEE_SEPARATION
);

export const updateEmployeeSeparation = commonHandleHttpMethodPutV2(
  "EmployeeSeparationSlide/updateEmployeeSeparation",
  GET_EMPLOYEE_SEPARATION
);

export const deleteEmployeeSeparation = commonHandleHttpMethodMultipleDelete(
  "EmployeeSeparationSlide/deleteEmployeeSeparation",
  GET_EMPLOYEE_SEPARATION
);

const initialState = {
  loading: false,
  fetched: false,
  employeeSeparations: [],
  employeeSeparationDetail: [],
};

const EmployeeSeparationSlide = createSlice({
  name: "EmployeeSeparationSlide",
  initialState,
  extraReducers: {
    [fetchEmployeeSeparation.pending]: state => {
      state.loading = false;
    },
    [fetchEmployeeSeparation.fulfilled]: (state, action) => {
      state.loading = true;
      state.employeeSeparations = action.payload;
      state.fetched = true;
    },
    [fetchEmployeeSeparation.rejected]: state => {
      state.loading = false;
    },
    [getEmployeeSeparationById.fulfilled]: (state, action) => {
      state.employeeSeparationDetail = action.payload;
      state.fetched = true;
    },
    [createEmployeeSeparation.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(EMPLOYEE_SEPARATION, TEXT_POST);
      }
    },
    [createEmployeeSeparation.rejected]: state => {
      state.loading = false;
      toastrError();
    },

    [updateEmployeeSeparation.fulfilled]: (state, action) => {
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(EMPLOYEE_SEPARATION, TEXT_PUT);
      }
    },

    [deleteEmployeeSeparation.fulfilled]: (state, action) => {
      toastrCRUDSuccess(EMPLOYEE_SEPARATION, TEXT_DELETE);
    },
    [deleteEmployeeSeparation.rejected]: state => {
      toastrError();
    },
  },
});

const { actions, reducer } = EmployeeSeparationSlide;
export default reducer;
export const {} = actions;
