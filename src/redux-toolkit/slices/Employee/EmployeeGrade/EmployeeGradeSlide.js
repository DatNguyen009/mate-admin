import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPut,
} from "helpers/erp_helper";
import {
  EMPLOYEE_GRADE,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import {
  GET_EMPLOYEE_GRADE,
  GET_EMPLOYEE_GRADE_DETAIL,
} from "helpers/url_helper";

export const fetchEmployeeGrade = commonHandleHttpMethodGet(
  "EmployeeGradeSlide/fetchEmployeeGrade",
  GET_EMPLOYEE_GRADE + GET_EMPLOYEE_GRADE_DETAIL
);

export const getEmployeeGradeById = commonHandleHttpMethodGet(
  "EmployeeGradeSlide/getEmployeeGradeById",
  GET_EMPLOYEE_GRADE
);

export const createEmployeeGrade = commonHandleHttpMethodPost(
  "EmployeeGradeSlide/createEmployeeGrade",
  GET_EMPLOYEE_GRADE
);

export const updateEmployeeGrade = commonHandleHttpMethodPut(
  "EmployeeGradeSlide/updateEmployeeGrade",
  GET_EMPLOYEE_GRADE
);

export const deleteEmployeeGrade = commonHandleHttpMethodMultipleDelete(
  "EmployeeGradeSlide/deleteEmployeeGrade",
  GET_EMPLOYEE_GRADE
);

const initialState = {
  loading: false,
  fetched: false,
  employeeGrades: [],
  employeeGradeDetail: [],
};

const EmployeeGradeSlide = createSlice({
  name: "EmployeeGradeSlide",
  initialState,
  reducers: {
    setEmployeeGradeDetail: (state, action) => {
      state.employeeGradeDetail = action.payload;
    },
  },
  extraReducers: {
    [fetchEmployeeGrade.pending]: (state, action) => {
      state.loading = false;
    },
    [fetchEmployeeGrade.fulfilled]: (state, action) => {
      state.loading = true;
      state.employeeGrades = action.payload;
      state.fetched = true;
    },
    [fetchEmployeeGrade.rejected]: (state, action) => {
      state.loading = false;
    },
    [getEmployeeGradeById.fulfilled]: (state, action) => {
      state.employeeGradeDetail = action.payload;
      state.fetched = true;
    },
    [createEmployeeGrade.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(EMPLOYEE_GRADE, TEXT_POST);
      }
    },
    [createEmployeeGrade.rejected]: (state, action) => {
      state.loading = false;
      toastrError();
    },

    [updateEmployeeGrade.fulfilled]: (state, action) => {
      if (action.payload?.updatedAt) {
        toastrCRUDSuccess(EMPLOYEE_GRADE, TEXT_PUT);
      }
    },

    [deleteEmployeeGrade.fulfilled]: (state, action) => {
      toastrCRUDSuccess(EMPLOYEE_GRADE, TEXT_DELETE);
    },
    [deleteEmployeeGrade.rejected]: state => {
      toastrError();
    },
  },
});

const { actions, reducer } = EmployeeGradeSlide;
export default reducer;
export const { setEmployeeGradeDetail } = actions;
