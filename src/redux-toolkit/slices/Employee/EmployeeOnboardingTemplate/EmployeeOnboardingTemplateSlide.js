import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPut,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  EMPLOYEE_ONBOARDING_TEMPLATE,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import {
  GET_EMPLOYEE_ONBOARDING_TEMPLATE,
  GET_EMPLOYEE_ONBOARDING_TEMPLATE_DETAIL,
} from "helpers/url_helper";

export const fetchEmployeeOnboardingTemplate = commonHandleHttpMethodGet(
  "EmployeeOnboardingTemplateSlide/fetchEmployeeOnboardingTemplate",
  GET_EMPLOYEE_ONBOARDING_TEMPLATE_DETAIL
);

export const getEmployeeOnboardingTemplateById = commonHandleHttpMethodGet(
  "EmployeeOnboardingTemplateSlide/getEmployeeOnboardingTemplateById",
  GET_EMPLOYEE_ONBOARDING_TEMPLATE
);

export const createEmployeeOnboardingTemplate = commonHandleHttpMethodPost(
  "EmployeeOnboardingTemplateSlide/createEmployeeOnboardingTemplate",
  GET_EMPLOYEE_ONBOARDING_TEMPLATE
);

export const updateEmployeeOnboardingTemplate = commonHandleHttpMethodPutV2(
  "EmployeeOnboardingTemplateSlide/updateEmployeeOnboardingTemplate",
  GET_EMPLOYEE_ONBOARDING_TEMPLATE
);

export const deleteEmployeeOnboardingTemplate =
  commonHandleHttpMethodMultipleDelete(
    "EmployeeOnboardingTemplateSlide/deleteEmployeeOnboardingTemplate",
    GET_EMPLOYEE_ONBOARDING_TEMPLATE
  );

const initialState = {
  loading: false,
  fetched: false,
  employeeOnboardingTemplates: [],
  employeeOnboardingTemplateDetail: [],
};

const EmployeeOnboardingTemplateSlide = createSlice({
  name: "EmployeeOnboardingTemplateSlide",
  initialState,
  extraReducers: {
    [fetchEmployeeOnboardingTemplate.pending]: state => {
      state.loading = false;
    },
    [fetchEmployeeOnboardingTemplate.fulfilled]: (state, action) => {
      state.loading = true;
      state.employeeOnboardingTemplates = action.payload;
      state.fetched = true;
    },
    [fetchEmployeeOnboardingTemplate.rejected]: state => {
      state.loading = false;
    },
    [getEmployeeOnboardingTemplateById.fulfilled]: (state, action) => {
      state.employeeOnboardingTemplateDetail = action.payload;
      state.fetched = true;
    },
    [createEmployeeOnboardingTemplate.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(EMPLOYEE_ONBOARDING_TEMPLATE, TEXT_POST);
      }
    },
    [createEmployeeOnboardingTemplate.rejected]: state => {
      state.loading = false;
      toastrError();
    },

    [updateEmployeeOnboardingTemplate.fulfilled]: (state, action) => {
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(EMPLOYEE_ONBOARDING_TEMPLATE, TEXT_PUT);
      }
    },

    [deleteEmployeeOnboardingTemplate.fulfilled]: (state, action) => {
      toastrCRUDSuccess(EMPLOYEE_ONBOARDING_TEMPLATE, TEXT_DELETE);
    },
    [deleteEmployeeOnboardingTemplate.rejected]: state => {
      toastrError();
    },
  },
});

const { actions, reducer } = EmployeeOnboardingTemplateSlide;
export default reducer;
export const {} = actions;
