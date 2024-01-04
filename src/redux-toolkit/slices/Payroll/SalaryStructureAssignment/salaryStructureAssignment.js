import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  SALARY_STRUCTURE_ASSIGNMENT,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import {
  GET_SALARY_STRUCTURE_ASSIGNMENT,
  GET_SALARY_STRUCTURE_ASSIGNMENT_FULL,
} from "helpers/url_helper";

export const fetchSalaryStructureAssignment = commonHandleHttpMethodGet(
  "SalaryStructureAssignment/fetchSalaryStructureAssignment",
  GET_SALARY_STRUCTURE_ASSIGNMENT_FULL
);

export const getSalaryStructureAssignmentByID = commonHandleHttpMethodGet(
  "SalaryStructureAssignment/getSalaryStructureByIDStructureAssignment",
  GET_SALARY_STRUCTURE_ASSIGNMENT
);

export const createSalaryStructureAssignment = commonHandleHttpMethodPost(
  "SalaryStructureAssignment/createSalaryStructureAssignment",
  GET_SALARY_STRUCTURE_ASSIGNMENT
);

export const updateSalaryStructureAssignment = commonHandleHttpMethodPutV2(
  "SalaryStructureAssignment/updateSalaryStructureAssignment",
  GET_SALARY_STRUCTURE_ASSIGNMENT
);

export const deleteSalaryStructureAssignment =
  commonHandleHttpMethodMultipleDelete(
    "SalaryStructureAssignment/deleteSalaryStructureAssignment",
    GET_SALARY_STRUCTURE_ASSIGNMENT
  );

const initialState = {
  loading: false,
  salaryStructureAssignment: [],
  fetched: false,
};

const SalaryStructureAssignment = createSlice({
  name: "SalaryStructureAssignment",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSalaryStructureAssignment.pending]: (state, action) => {
      state.loading = false;
    },
    [fetchSalaryStructureAssignment.fulfilled]: (state, action) => {
      state.loading = true;
      state.fetched = true;
      state.salaryStructureAssignment = action.payload;
    },
    [fetchSalaryStructureAssignment.rejected]: (state, action) => {
      state.loading = false;
    },
    [createSalaryStructureAssignment.pending]: (state, action) => {
      state.loading = false;
    },
    [createSalaryStructureAssignment.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(SALARY_STRUCTURE_ASSIGNMENT, TEXT_POST);
      }
    },
    [updateSalaryStructureAssignment.rejected]: (state, action) => {
      state.loading = false;
      toastrError();
    },

    [updateSalaryStructureAssignment.pending]: (state, action) => {
      state.loading = false;
    },
    [updateSalaryStructureAssignment.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(SALARY_STRUCTURE_ASSIGNMENT, TEXT_PUT);
      }
    },
  },
});

const { actions, reducer } = SalaryStructureAssignment;
export default reducer;
export const {} = actions;
