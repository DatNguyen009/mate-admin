import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  EMPLOYEE_GRIEVANCE,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import { GET_EMPLOYEE_GRIEVANCE } from "helpers/url_helper";

export const fetchEmployeeGrievance = commonHandleHttpMethodGet(
  "EmployeeGrievanceSlide/fetchEmployeeGrievance",
  GET_EMPLOYEE_GRIEVANCE
);

export const getEmployeeGrievanceById = commonHandleHttpMethodGet(
  "EmployeeGrievanceSlide/getEmployeeGrievanceById",
  GET_EMPLOYEE_GRIEVANCE
);

export const createEmployeeGrievance = commonHandleHttpMethodPost(
  "EmployeeGrievanceSlide/createEmployeeGrievance",
  GET_EMPLOYEE_GRIEVANCE
);

export const updateEmployeeGrievance = commonHandleHttpMethodPutV2(
  "EmployeeGrievanceSlide/updateEmployeeGrievance",
  GET_EMPLOYEE_GRIEVANCE
);

export const deleteEmployeeGrievance = commonHandleHttpMethodMultipleDelete(
  "EmployeeGrievanceSlide/deleteEmployeeGrievance",
  GET_EMPLOYEE_GRIEVANCE
);

const initialState = {
  loading: false,
  fetched: false,
  employeeGrievances: [],
  employeeGrievanceDetail: [],
};

const EmployeeGrievanceSlide = createSlice({
  name: "EmployeeGrievanceSlide",
  initialState,
  extraReducers: {
    [fetchEmployeeGrievance.pending]: state => {
      state.loading = false;
    },
    [fetchEmployeeGrievance.fulfilled]: (state, action) => {
      state.loading = true;
      state.employeeGrievances = action.payload;
      state.fetched = true;
    },
    [fetchEmployeeGrievance.rejected]: state => {
      state.loading = false;
    },
    [getEmployeeGrievanceById.fulfilled]: (state, action) => {
      state.employeeGrievanceDetail = action.payload;
      state.fetched = true;
    },
    [createEmployeeGrievance.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(EMPLOYEE_GRIEVANCE, TEXT_POST);
      }
    },
    [createEmployeeGrievance.rejected]: state => {
      state.loading = false;
      toastrError();
    },

    [updateEmployeeGrievance.fulfilled]: (state, action) => {
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(EMPLOYEE_GRIEVANCE, TEXT_PUT);
      }
    },

    [deleteEmployeeGrievance.fulfilled]: (state, action) => {
      toastrCRUDSuccess(EMPLOYEE_GRIEVANCE, TEXT_DELETE);
    },
    [deleteEmployeeGrievance.rejected]: state => {
      toastrError();
    },
  },
});

const { actions, reducer } = EmployeeGrievanceSlide;
export default reducer;
