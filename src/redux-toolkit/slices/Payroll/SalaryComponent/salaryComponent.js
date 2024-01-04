import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { SALARY_COMPONENT, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import { GET_SALARY_COMPONENT } from "helpers/url_helper";

import "toastr/build/toastr.min.css";

export const fetchSalaryComponent = commonHandleHttpMethodGet(
  "SalaryComponent/fetchSalaryComponent",
  GET_SALARY_COMPONENT
);

export const getSalaryComponentByID = commonHandleHttpMethodGet(
  "SalaryComponent/getSalaryComponentByID",
  GET_SALARY_COMPONENT
);

export const createSalaryComponent = commonHandleHttpMethodPost(
  "SalaryComponent/createSalaryComponent",
  GET_SALARY_COMPONENT
);

export const updateSalaryComponent = commonHandleHttpMethodPutV2(
  "SalaryComponent/updateSalaryComponent",
  GET_SALARY_COMPONENT
);

export const deleteSalaryComponent = commonHandleHttpMethodMultipleDelete(
  "SalaryComponent/deleteSalaryComponent",
  GET_SALARY_COMPONENT
);

const initialState = {
  loading: false,
  salaryComponent: [],
  salaryComponentDetail: {},
  fetched: false,
};

const SalaryComponent = createSlice({
  name: "SalaryComponent",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSalaryComponent.pending]: (state, action) => {
      state.loading = false;
    },
    [fetchSalaryComponent.fulfilled]: (state, action) => {
      state.loading = true;
      state.salaryComponent = action.payload;
      state.fetched = true;
    },
    [fetchSalaryComponent.rejected]: (state, action) => {
      state.loading = false;
    },
    [getSalaryComponentByID.fulfilled]: (state, action) => {
      state.salaryComponentDetail = action.payload;
    },
    [createSalaryComponent.pending]: (state, action) => {
      state.loading = false;
    },
    [createSalaryComponent.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(SALARY_COMPONENT, TEXT_POST);
      }
    },
    [createSalaryComponent.rejected]: (state, action) => {
      state.loading = false;
      toastrError();
    },

    [updateSalaryComponent.pending]: (state, action) => {
      state.loading = false;
    },
    [updateSalaryComponent.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(SALARY_COMPONENT, TEXT_PUT);
      }
    },
  },
});

const { actions, reducer } = SalaryComponent;
export default reducer;
export const {} = actions;
