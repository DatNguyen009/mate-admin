import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_CURRENT_USER, GET_USERS, USER_PARAMS } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  users: [],
  user: {},
  userProfile: {},
};

export const fetchUsers = commonHandleHttpMethodGet(
  "UserSlice/fetchUsers",
  GET_USERS + USER_PARAMS
);

export const getUsersById = commonHandleHttpMethodGet(
  "UserSlice/getUsersById",
  GET_USERS
);

export const getUsersByParams = commonHandleHttpMethodGetByParams(
  "UserSlice/fetchUsers",
  GET_USERS
);

export const getCurrentUser = commonHandleHttpMethodGet(
  "UserSlice/getCurrentUser",
  GET_CURRENT_USER
);

export const addUser = commonHandleHttpMethodPost(
  "UserSlice/addUser",
  GET_USERS
);
export const updateUser = commonHandleHttpMethodPutV2(
  "UserSlice/updateUser",
  GET_USERS
);
export const deleteUser = commonHandleHttpMethodMultipleDelete(
  "UserSlice/deleteUser",
  GET_USERS
);

const userSlice = createSlice({
  name: "UserSlice",
  initialState,
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
    },
    [getUsersById.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [getCurrentUser.fulfilled]: (state, action) => {
      state.userProfile = action.payload;
    },
    [addUser.fulfilled]: (state, action) => {
      toastrCRUDSuccess("User", TEXT_POST);
    },
    [updateUser.fulfilled]: (state, action) => {
      toastrCRUDSuccess("User", TEXT_PUT);
    },
    [deleteUser.fulfilled]: (state, action) => {
      toastrCRUDSuccess("User", TEXT_DELETE);
    },
  },
});

const { reducer } = userSlice;
export default reducer;
