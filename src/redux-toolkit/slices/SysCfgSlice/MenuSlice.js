import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_MENU } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  menu: [],
};

export const fetchMenu = commonHandleHttpMethodGet(
  "MenuSlice/fetchMenu",
  GET_MENU
);

export const addMenu = commonHandleHttpMethodPost(
  "MenuSlice/addMenu",
  GET_MENU
);

export const updateMenu = commonHandleHttpMethodPutV2(
  "MenuSlice/updateMenu",
  GET_MENU
);

export const deleteMenu = commonHandleHttpMethodMultipleDelete(
  "MenuSlice/deleteMenu",
  GET_MENU
);

const menuSlice = createSlice({
  name: "MenuSlice",
  initialState,
  extraReducers: {
    [fetchMenu.fulfilled]: (state, action) => {
      state.menu = action.payload;
    },
    [addMenu.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Menu Item", TEXT_POST);
    },
    [updateMenu.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Menu Item", TEXT_PUT);
    },
    [deleteMenu.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Menu Item", TEXT_DELETE);
    },
  },
});

const { reducer } = menuSlice;
export default reducer;
