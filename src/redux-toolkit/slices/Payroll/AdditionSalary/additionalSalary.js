import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  GET_ADDITIONAL_SALARY,
  GET_ADDITIONAL_SALARY_FULL,
} from "helpers/url_helper";
import { TEXT_POST, TEXT_PUT } from "helpers/name_helper";

export const fetchAdditionalSalary = commonHandleHttpMethodGet(
  "AdditionalSalary/fetchAdditionalSalary",
  GET_ADDITIONAL_SALARY_FULL
);

export const getAdditionalSalaryByID = commonHandleHttpMethodGet(
  "AdditionalSalary/getAdditionalSalaryByID",
  GET_ADDITIONAL_SALARY
);

export const createAdditionalSalary = commonHandleHttpMethodPost(
  "AdditionalSalary/postAdditionalSalary",
  GET_ADDITIONAL_SALARY
);

export const updateAdditionalSalary = commonHandleHttpMethodPutV2(
  "AdditionalSalary/updateAdditionalSalary",
  GET_ADDITIONAL_SALARY
);

export const deleteAdditionalSalary = commonHandleHttpMethodMultipleDelete(
  "AdditionalSalary/updateAdditionalSalary",
  GET_ADDITIONAL_SALARY
);
const initialState = {
  fetched: false,
  additionalSalaryList: [],
  additionalSalaryDetail: {},
};

const AdditionalSalary = createSlice({
  name: "AdditionalSalary",
  initialState,
  extraReducers: {
    [fetchAdditionalSalary.fulfilled]: (state, action) => {
      state.fetched = true;
      state.additionalSalaryList = action.payload;
    },
    [fetchAdditionalSalary.rejected]: (state, action) => {
      state.fetched = false;
    },
    [getAdditionalSalaryByID.fulfilled]: (state, action) => {
      state.additionalSalaryDetail = action.payload;
      state.fetched = false;
    },
    [createAdditionalSalary.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Additional Salary", TEXT_POST);
      return {
        ...state,
        fetched: false,
      };
    },
    [createAdditionalSalary.rejected]: (state, action) => {
      toastrError();
    },
    [updateAdditionalSalary.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Additional Salary", TEXT_PUT);
      return {
        ...state,
        fetched: false,
      };
    },
    [updateAdditionalSalary.rejected]: (state, action) => {
      toastrError();
    },
  },
});

const { actions, reducer } = AdditionalSalary;
export default reducer;
export const {} = actions;
