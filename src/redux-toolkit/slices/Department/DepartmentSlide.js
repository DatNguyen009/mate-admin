import { createSlice } from "@reduxjs/toolkit";
import {
  commonHandleHttpMethodDelete,
  commonHandleHttpMethodGet,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { ADD_DEPARTMENT, GET_DEPARTMENT } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

export const fetchDepartments = commonHandleHttpMethodGet(
  "DepartmentSlice/fetchCompany",
  GET_DEPARTMENT
);

export const getDepartmentByID = commonHandleHttpMethodGet(
  "DepartmentSlice/getCompanyByID",
  GET_DEPARTMENT
);

export const addDepartment = commonHandleHttpMethodPost(
  "DepartmentSlice/addDepartment",
  ADD_DEPARTMENT
);

export const updateDepartment = commonHandleHttpMethodPutV2(
  "DepartmentSlice/updateDepartment",
  ADD_DEPARTMENT
);

export const deleteDepartment = commonHandleHttpMethodDelete(
  "DepartmentSlice/deleteDepartment",
  ADD_DEPARTMENT
);

const initialState = {
  loading: false,
  departments: [],
  departmentDetail: {},
};

const DepartmentSlice = createSlice({
  name: "DepartmentSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchDepartments.pending]: (state, action) => {
      state.loading = false;
    },
    [fetchDepartments.fulfilled]: (state, action) => {
      state.loading = true;
      state.departments = action.payload;
    },
    [getDepartmentByID.fulfilled]: (state, action) => {
      state.loading = true;
      state.departmentDetail = action.payload;
    },
    [fetchDepartments.rejected]: (state, action) => {
      state.loading = false;
    },
    [addDepartment.fulfilled]: (state, action) => {
      toastrCRUDSuccess("department", TEXT_POST);
    },
    [updateDepartment.fulfilled]: (state, action) => {
      toastrCRUDSuccess("department", TEXT_PUT);
    },
    [deleteDepartment.fulfilled]: (state, action) => {
      toastrCRUDSuccess("department", TEXT_DELETE);
    },
  },
});

const { actions, reducer } = DepartmentSlice;
export default reducer;
export const {} = actions;
