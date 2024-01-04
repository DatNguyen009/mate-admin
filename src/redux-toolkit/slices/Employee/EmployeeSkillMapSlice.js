import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodDelete,
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPut,
} from "helpers/erp_helper";
import {
  ADD_EMPLOYEE_SKILL_MAP,
  GET_EMPLOYEE_SKILL_MAPS,
} from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  EMPLOYEE_SKILL_MAP,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";

const initialState = {
  employeeSkillMaps: [],
};

export const fetchEmployeeSkillMaps = commonHandleHttpMethodGet(
  "employeeSkillMapSlice/fetchEmployeeSkillMaps",
  GET_EMPLOYEE_SKILL_MAPS
);
export const addEmployeeSkillMap = commonHandleHttpMethodPost(
  "employeeSkillMapSlice/addEmployeeSkillMap",
  ADD_EMPLOYEE_SKILL_MAP
);
export const updateEmployeeSkillMap = commonHandleHttpMethodPut(
  "employeeSkillMapSlice/updateEmployeeSkillMap",
  ADD_EMPLOYEE_SKILL_MAP
);
export const deleteEmployeeSkillMap = commonHandleHttpMethodDelete(
  "employeeSkillMapSlice/deleteEmployeeSkillMap",
  ADD_EMPLOYEE_SKILL_MAP
);

export const deleteEmployeeSkillMapMultiple =
  commonHandleHttpMethodMultipleDelete(
    "employeeSkillMapSlice/deleteEmployeeSkillMapMultiple",
    ADD_EMPLOYEE_SKILL_MAP
  );

const employeeSkillMapSlice = createSlice({
  name: "EmployeeSkillMap",
  initialState,
  extraReducers: {
    [fetchEmployeeSkillMaps.fulfilled]: (state, action) => {
      state.employeeSkillMaps = action.payload;
    },
    [addEmployeeSkillMap.fulfilled]: (state, action) => {
      toastrCRUDSuccess(EMPLOYEE_SKILL_MAP, TEXT_POST);
    },
    [updateEmployeeSkillMap.fulfilled]: (state, action) => {
      toastrCRUDSuccess(EMPLOYEE_SKILL_MAP, TEXT_PUT);
    },
    [deleteEmployeeSkillMap.fulfilled]: (state, action) => {
      toastrCRUDSuccess(EMPLOYEE_SKILL_MAP, TEXT_DELETE);
    },
    [deleteEmployeeSkillMapMultiple.fulfilled]: () => {
      toastrCRUDSuccess(EMPLOYEE_SKILL_MAP, TEXT_DELETE);
    },
    [deleteEmployeeSkillMapMultiple.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = employeeSkillMapSlice;
export default reducer;
export const {} = actions;
