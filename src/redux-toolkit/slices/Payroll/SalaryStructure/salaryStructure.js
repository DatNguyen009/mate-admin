import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { SALARY_STRUCTURE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import {
  GET_SALARY_STRUCTURE,
  GET_SALARY_STRUCTURE_QUERY,
} from "helpers/url_helper";

export const fetchSalaryStructure = commonHandleHttpMethodGet(
  "SalaryStructure/fetchSalaryStructure",
  GET_SALARY_STRUCTURE + GET_SALARY_STRUCTURE_QUERY
);

export const getSalaryStructureByID = commonHandleHttpMethodGet(
  "SalaryStructure/getSalaryStructureByID",
  GET_SALARY_STRUCTURE
);

export const createSalaryStructure = commonHandleHttpMethodPost(
  "SalaryStructure/createSalaryStructure",
  GET_SALARY_STRUCTURE
);

export const updateSalaryStructure = commonHandleHttpMethodPutV2(
  "SalaryStructure/updateSalaryStructure",
  GET_SALARY_STRUCTURE
);

export const deleteSalaryStructure = commonHandleHttpMethodMultipleDelete(
  "SalaryStructure/deleteSalaryStructure",
  GET_SALARY_STRUCTURE
);

const initialState = {
  loading: true,
  fetched: false,
  salaryStructure: [],
  salaryStructureDetail: {},
};

const SalaryStructure = createSlice({
  name: "SalaryStructure",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSalaryStructure.pending]: (state, action) => {
      state.loading = true;
    },

    [fetchSalaryStructure.fulfilled]: (state, action) => {
      state.loading = false;
      state.salaryStructure = action.payload;
      state.fetched = true;
    },
    [getSalaryStructureByID.fulfilled]: (state, action) => {
      state.loading = false;
      state.salaryStructureDetail = action.payload;
      state.fetched = true;
    },

    [fetchSalaryStructure.rejected]: (state, action) => {
      state.loading = false;
    },
    [createSalaryStructure.pending]: (state, action) => {
      state.loading = true;
    },

    [createSalaryStructure.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(SALARY_STRUCTURE, TEXT_POST);
      }
    },

    [createSalaryStructure.rejected]: (state, action) => {
      state.loading = true;
      toastrError();
    },

    [updateSalaryStructure.pending]: (state, action) => {
      state.loading = true;
    },

    [updateSalaryStructure.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(SALARY_STRUCTURE, TEXT_PUT);
      }
    },
  },
});

const { actions, reducer } = SalaryStructure;
export default reducer;
export const {} = actions;
