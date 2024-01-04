import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_PROJECT_TYPE, ORDER_BY } from "helpers/url_helper";
import { PROJECT_TYPE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

export const fetchProjectType = commonHandleHttpMethodGet(
  "ProjectType/fetchProjectType",
  GET_PROJECT_TYPE + ORDER_BY
);

export const getProjectTypeByID = commonHandleHttpMethodGet(
  "ProjectType/getProjectTypeByID",
  GET_PROJECT_TYPE
);

export const createProjectType = commonHandleHttpMethodPost(
  "ProjectType/postProjectType",
  GET_PROJECT_TYPE
);

export const updateProjectType = commonHandleHttpMethodPutV2(
  "ProjectType/updateProjectType",
  GET_PROJECT_TYPE
);

export const deleteProjectType = commonHandleHttpMethodMultipleDelete(
  "ProjectType/updateProjectType",
  GET_PROJECT_TYPE
);
const initialState = {
  fetched: false,
  projectTypeList: [],
  projectTypeDetail: {},
};

const ProjectType = createSlice({
  name: "ProjectType",
  initialState,
  extraReducers: {
    [fetchProjectType.fulfilled]: (state, action) => {
      state.fetched = true;
      state.projectTypeList = action.payload;
    },
    [fetchProjectType.rejected]: (state, action) => {
      state.fetched = false;
    },
    [getProjectTypeByID.fulfilled]: (state, action) => {
      state.projectTypeDetail = action.payload;
      state.fetched = false;
    },
    [createProjectType.fulfilled]: (state, action) => {
      toastrCRUDSuccess(PROJECT_TYPE, TEXT_POST);
      return {
        ...state,
        fetched: false,
      };
    },
    [createProjectType.rejected]: (state, action) => {
      toastrError();
    },
    [updateProjectType.fulfilled]: (state, action) => {
      toastrCRUDSuccess(PROJECT_TYPE, TEXT_PUT);
      return {
        ...state,
        fetched: false,
      };
    },
    [updateProjectType.rejected]: (state, action) => {
      toastrError();
    },
  },
});

const { actions, reducer } = ProjectType;
export default reducer;
export const {} = actions;
