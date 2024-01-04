import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  EMPLOYEE_SEPARATION_TEMPLATE,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import {
  GET_EMPLOYEE_SEPARATION_TEMPLATE,
  GET_EMPLOYEE_SEPARATION_TEMPLATE_DETAIL,
} from "helpers/url_helper";

export const fetchEmployeeSeparationTemplate = commonHandleHttpMethodGet(
  "EmployeeSeparationTemplateSlide/fetchEmployeeSeparationTemplate",
  GET_EMPLOYEE_SEPARATION_TEMPLATE_DETAIL
);

export const getEmployeeSeparationTemplateById = commonHandleHttpMethodGet(
  "EmployeeSeparationTemplateSlide/getEmployeeSeparationTemplateById",
  GET_EMPLOYEE_SEPARATION_TEMPLATE
);

export const createEmployeeSeparationTemplate = commonHandleHttpMethodPost(
  "EmployeeSeparationTemplateSlide/createEmployeeSeparationTemplate",
  GET_EMPLOYEE_SEPARATION_TEMPLATE
);

export const updateEmployeeSeparationTemplate = commonHandleHttpMethodPutV2(
  "EmployeeSeparationTemplateSlide/updateEmployeeSeparationTemplate",
  GET_EMPLOYEE_SEPARATION_TEMPLATE
);

export const deleteEmployeeSeparationTemplate =
  commonHandleHttpMethodMultipleDelete(
    "EmployeeSeparationTemplateSlide/deleteEmployeeSeparationTemplate",
    GET_EMPLOYEE_SEPARATION_TEMPLATE
  );

const initialState = {
  loading: false,
  fetched: false,
  employeeSeparationTemplates: [],
  employeeSeparationTemplateDetail: [],
};

const EmployeeSeparationTemplateSlide = createSlice({
  name: "EmployeeSeparationTemplateSlide",
  initialState,
  extraReducers: {
    [fetchEmployeeSeparationTemplate.pending]: state => {
      state.loading = false;
    },
    [fetchEmployeeSeparationTemplate.fulfilled]: (state, action) => {
      state.loading = true;
      state.employeeSeparationTemplates = action.payload;
      state.fetched = true;
    },
    [fetchEmployeeSeparationTemplate.rejected]: state => {
      state.loading = false;
    },
    [getEmployeeSeparationTemplateById.fulfilled]: (state, action) => {
      state.employeeSeparationTemplateDetail = action.payload;
      state.fetched = true;
    },
    [createEmployeeSeparationTemplate.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(EMPLOYEE_SEPARATION_TEMPLATE, TEXT_POST);
      }
    },
    [createEmployeeSeparationTemplate.rejected]: state => {
      state.loading = false;
      toastrError();
    },

    [updateEmployeeSeparationTemplate.fulfilled]: (state, action) => {
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(EMPLOYEE_SEPARATION_TEMPLATE, TEXT_PUT);
      }
    },

    [deleteEmployeeSeparationTemplate.fulfilled]: (state, action) => {
      toastrCRUDSuccess(EMPLOYEE_SEPARATION_TEMPLATE, TEXT_DELETE);
    },
    [deleteEmployeeSeparationTemplate.rejected]: state => {
      toastrError();
    },
  },
});

const { actions, reducer } = EmployeeSeparationTemplateSlide;
export default reducer;
