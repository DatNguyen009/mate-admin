import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPut,
} from "helpers/erp_helper";
import { EMPLOYEE_GROUP, TEXT_DELETE } from "helpers/name_helper";
import { GET_EMPLOYEE_GROUP } from "helpers/url_helper";

export const fetchEmployeeGroup = commonHandleHttpMethodGet(
  "EmployeeGroupSlide/fetchEmployeeGroup",
  GET_EMPLOYEE_GROUP
);

export const getEmployeeGroupByID = commonHandleHttpMethodGet(
  "EmployeeGroupSlide/getEmployeeGroupByID",
  GET_EMPLOYEE_GROUP
);

export const createEmployeeGroup = commonHandleHttpMethodPost(
  "EmployeeGroupSlide/createEmployeeGroup",
  GET_EMPLOYEE_GROUP
);

export const updateEmployeeGroup = commonHandleHttpMethodPut(
  "EmployeeGroupSlide/updateEmployeeGroup",
  GET_EMPLOYEE_GROUP
);

export const deleteEmployeeGroup = commonHandleHttpMethodMultipleDelete(
  "EmployeeGroupSlide/deleteEmployeeGroup",
  GET_EMPLOYEE_GROUP
);

const initialState = {
  loading: false,
  employeeGroup: [],
  currentEmployeeTable: [],
};

const EmployeeGroupSlide = createSlice({
  name: "EmployeeGroupSlide",
  initialState,
  extraReducers: {
    [fetchEmployeeGroup.pending]: (state, action) => {
      state.loading = false;
    },
    [fetchEmployeeGroup.fulfilled]: (state, action) => {
      state.loading = true;
      state.employeeGroup = action.payload;
    },
    [fetchEmployeeGroup.rejected]: (state, action) => {
      state.loading = false;
    },
    [createEmployeeGroup.pending]: (state, action) => {
      state.loading = false;
    },
    [createEmployeeGroup.fulfilled]: (state, action) => {
      state.loading = true;
      state.employeeGroup = [
        ...state.employeeGroup,
        {
          objectId: action.payload.objectId,
          name: action.meta.arg.name,
          createdAt: action.payload.createdAt,
          updatedAt: action.payload.createdAt,
        },
      ];
      toastrCRUDSuccess(EMPLOYEE_GROUP, "post");
    },
    [createEmployeeGroup.rejected]: (state, action) => {
      state.loading = false;
      toastrError();
    },

    [getEmployeeGroupByID.fulfilled]: (state, action) => {
      state.loading = true;
      state.currentEmployeeTable = action.payload;
    },

    [updateEmployeeGroup.pending]: (state, action) => {
      state.loading = false;
    },
    [updateEmployeeGroup.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(EMPLOYEE_GROUP, "put");
      }
    },
    [updateEmployeeGroup.rejected]: (state, action) => {
      state.loading = false;
      toastrError();
    },

    [deleteEmployeeGroup.fulfilled]: () => {
      toastrCRUDSuccess(EMPLOYEE_GROUP, TEXT_DELETE);
    },
    [deleteEmployeeGroup.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = EmployeeGroupSlide;
export default reducer;
export const {} = actions;
