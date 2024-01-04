import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_PROJECT, GET_PROJECT_QUERY } from "helpers/url_helper";
import { PROJECT, TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

export const fetchProject = commonHandleHttpMethodGet(
  "Project/fetchProject",
  GET_PROJECT + GET_PROJECT_QUERY
);

export const getProjectByID = commonHandleHttpMethodGet(
  "Project/getProjectByID",
  GET_PROJECT
);

export const createProject = commonHandleHttpMethodPost(
  "Project/postProject",
  GET_PROJECT
);

export const updateProject = commonHandleHttpMethodPutV2(
  "Project/updateProject",
  GET_PROJECT
);

export const deleteProject = commonHandleHttpMethodMultipleDelete(
  "Project/updateProject",
  GET_PROJECT
);
const initialState = {
  fetched: false,
  projectList: [],
  projectDetail: {},
};

const Project = createSlice({
  name: "Project",
  initialState,
  extraReducers: {
    [fetchProject.fulfilled]: (state, action) => {
      state.fetched = true;
      state.projectList = action.payload;
    },
    [fetchProject.rejected]: (state, action) => {
      state.fetched = false;
    },
    [getProjectByID.fulfilled]: (state, action) => {
      state.projectDetail = action.payload;
      state.fetched = false;
    },
    [createProject.fulfilled]: (state, action) => {
      toastrCRUDSuccess(PROJECT, TEXT_POST);
      return {
        ...state,
        fetched: false,
      };
    },
    [createProject.rejected]: (state, action) => {
      toastrError();
    },
    [updateProject.fulfilled]: (state, action) => {
      toastrCRUDSuccess(PROJECT, TEXT_PUT);
      return {
        ...state,
        fetched: false,
      };
    },
    [updateProject.rejected]: (state, action) => {
      toastrError();
    },

    [deleteProject.fulfilled]: (state, action) => {
      toastrCRUDSuccess(PROJECT, TEXT_DELETE);
    },
  },
});

const { actions, reducer } = Project;
export default reducer;
export const {} = actions;
