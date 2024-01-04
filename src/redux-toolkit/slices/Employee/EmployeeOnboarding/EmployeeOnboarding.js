import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  EMPLOYEE_ONBOARDING,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import {
  GET_EMPLOYEE_ONBOARDING_DETAIL,
  GET_EMPLOYEE_ONBOARDING,
} from "helpers/url_helper";

export const fetchEmployeeOnboarding = commonHandleHttpMethodGet(
  "EmployeeOnboardingSlide/fetchEmployeeOnboarding",
  GET_EMPLOYEE_ONBOARDING_DETAIL
);

export const getEmployeeOnboardingById = commonHandleHttpMethodGet(
  "EmployeeOnboardingSlide/getEmployeeOnboardingById",
  GET_EMPLOYEE_ONBOARDING
);

export const createEmployeeOnboarding = commonHandleHttpMethodPost(
  "EmployeeOnboardingSlide/createEmployeeOnboarding",
  GET_EMPLOYEE_ONBOARDING
);

export const updateEmployeeOnboarding = commonHandleHttpMethodPutV2(
  "EmployeeOnboardingSlide/updateEmployeeOnboarding",
  GET_EMPLOYEE_ONBOARDING
);

export const deleteEmployeeOnboarding = commonHandleHttpMethodMultipleDelete(
  "EmployeeOnboardingSlide/deleteEmployeeOnboarding",
  GET_EMPLOYEE_ONBOARDING
);

const initialState = {
  loading: false,
  fetched: false,
  employeeOnboardings: [],
  employeeOnboardingDetail: [],
};

const EmployeeOnboardingSlide = createSlice({
  name: "EmployeeOnboardingSlide",
  initialState,
  extraReducers: {
    [fetchEmployeeOnboarding.pending]: state => {
      state.loading = false;
    },
    [fetchEmployeeOnboarding.fulfilled]: (state, action) => {
      state.loading = true;
      state.employeeOnboardings = action.payload;
      state.fetched = true;
    },
    [fetchEmployeeOnboarding.rejected]: state => {
      state.loading = false;
    },
    [getEmployeeOnboardingById.fulfilled]: (state, action) => {
      state.employeeOnboardingDetail = action.payload;
      state.fetched = true;
    },
    [createEmployeeOnboarding.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(EMPLOYEE_ONBOARDING, TEXT_POST);
      }
    },
    [createEmployeeOnboarding.rejected]: state => {
      state.loading = false;
      toastrError();
    },

    [updateEmployeeOnboarding.fulfilled]: (state, action) => {
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(EMPLOYEE_ONBOARDING, TEXT_PUT);
      }
    },

    [deleteEmployeeOnboarding.fulfilled]: (state, action) => {
      toastrCRUDSuccess(EMPLOYEE_ONBOARDING, TEXT_DELETE);
    },
    [deleteEmployeeOnboarding.rejected]: state => {
      toastrError();
    },
  },
});

const { actions, reducer } = EmployeeOnboardingSlide;
export default reducer;
export const {} = actions;
