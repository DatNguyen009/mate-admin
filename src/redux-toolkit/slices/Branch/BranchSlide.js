import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { BRANCH, TEXT_DELETE, TEXT_PUT } from "helpers/name_helper";
import { GET_BRANCH } from "helpers/url_helper";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

export const fetchBranch = commonHandleHttpMethodGet(
  "BranchSlice/fetchBranch",
  GET_BRANCH
);

export const getBranchByID = commonHandleHttpMethodGet(
  "BranchSlice/getBranchByID",
  GET_BRANCH
);

export const addBranch = commonHandleHttpMethodPost(
  "BranchSlice/addBranch",
  GET_BRANCH
);

export const updateBranch = commonHandleHttpMethodPutV2(
  "BranchSlice/updateBranch",
  GET_BRANCH
);

export const deleteBranch = commonHandleHttpMethodMultipleDelete(
  "BranchSlice/deleteBranch",
  GET_BRANCH
);

const initialState = {
  loading: false,
  branchs: [],
};

const BranchSlice = createSlice({
  name: "BranchSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBranch.pending]: (state, action) => {
      state.loading = false;
    },
    [fetchBranch.fulfilled]: (state, action) => {
      state.loading = true;
      state.branchs = action.payload;
    },
    [fetchBranch.rejected]: (state, action) => {
      state.loading = false;
    },
    [addBranch.pending]: (state, action) => {
      state.loading = false;
    },
    [addBranch.fulfilled]: (state, action) => {
      state.loading = true;
      state.branchs = [
        ...state.branchs,
        {
          objectId: action.payload.objectId,
          branch: action.meta.arg.branch,
          name: action.meta.arg.name,
          createdAt: action.payload.createdAt,
          updatedAt: action.payload.createdAt,
        },
      ];
      toastr.success("Successfully created Branch", "Success");
    },
    [addBranch.rejected]: (state, action) => {
      state.loading = false;
      toastr.error(
        "Error! Error! An error occurred. Please try again later.",
        "Error"
      );
    },
    [updateBranch.fulfilled]: () => {
      toastrCRUDSuccess(BRANCH, TEXT_PUT);
    },
    [deleteBranch.fulfilled]: () => {
      toastrCRUDSuccess(BRANCH, TEXT_DELETE);
    },
    [deleteBranch.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = BranchSlice;
export default reducer;
export const {} = actions;
