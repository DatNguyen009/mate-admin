import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodDelete,
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPut,
} from "helpers/erp_helper";
import {
  ADD_EMPLOYEE_PROMOTION,
  GET_EMPLOYEE_PROMOTIONS,
} from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  EMPLOYEE_PROMOTION,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";

const initialState = {
  employeePromotions: [],
};

export const fetchEmployeePromotions = commonHandleHttpMethodGet(
  "employeePromotionSlice/fetchEmployeePromotions",
  GET_EMPLOYEE_PROMOTIONS
);
export const addEmployeePromotion = commonHandleHttpMethodPost(
  "employeePromotionSlice/addEmployeePromotion",
  ADD_EMPLOYEE_PROMOTION
);
export const updateEmployeePromotion = commonHandleHttpMethodPut(
  "employeePromotionSlice/updateEmployeePromotion",
  ADD_EMPLOYEE_PROMOTION
);
export const deleteEmployeePromotion = commonHandleHttpMethodDelete(
  "employeePromotionSlice/deleteEmployeePromotion",
  ADD_EMPLOYEE_PROMOTION
);

export const deleteEmployeePromotionMultiple =
  commonHandleHttpMethodMultipleDelete(
    "employeePromotionSlice/deleteEmployeePromotionMultiple",
    ADD_EMPLOYEE_PROMOTION
  );

const employeePromotionSlice = createSlice({
  name: "EmployeePromotion",
  initialState,
  extraReducers: {
    [fetchEmployeePromotions.fulfilled]: (state, action) => {
      state.employeePromotions = action.payload;
    },
    [addEmployeePromotion.fulfilled]: (state, action) => {
      toastrCRUDSuccess(EMPLOYEE_PROMOTION, TEXT_POST);
    },
    [updateEmployeePromotion.fulfilled]: (state, action) => {
      toastrCRUDSuccess(EMPLOYEE_PROMOTION, TEXT_PUT);
    },
    [deleteEmployeePromotion.fulfilled]: (state, action) => {
      toastrCRUDSuccess(EMPLOYEE_PROMOTION, TEXT_DELETE);
    },

    [deleteEmployeePromotionMultiple.fulfilled]: () => {
      toastrCRUDSuccess(EMPLOYEE_PROMOTION, TEXT_DELETE);
    },
    [deleteEmployeePromotionMultiple.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = employeePromotionSlice;
export default reducer;
export const {} = actions;
