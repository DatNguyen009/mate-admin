import { createSlice } from "@reduxjs/toolkit";
import {
  commonHandleHttpMethodDelete,
  commonHandleHttpMethodGet,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_ITEM_GROUP } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  ITEM_GROUP,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";

export const fetchItemGroup = commonHandleHttpMethodGet(
  "ItemGroupSlice/fetchItemGroup",
  GET_ITEM_GROUP
);

export const getItemGroupByID = commonHandleHttpMethodGet(
  "ItemGroupSlice/getItemGroupByID",
  GET_ITEM_GROUP
);

export const addItemGroup = commonHandleHttpMethodPost(
  "ItemGroupSlice/addItemGroup",
  GET_ITEM_GROUP
);

export const updateItemGroup = commonHandleHttpMethodPutV2(
  "ItemGroupSlice/updateItemGroup",
  GET_ITEM_GROUP
);

export const deleteItemGroup = commonHandleHttpMethodDelete(
  "ItemGroupSlice/deleteItemGroup",
  GET_ITEM_GROUP
);

const initialState = {
  loading: false,
  itemGroup: [],
  itemGroupDetail: {},
};

const ItemGroupSlice = createSlice({
  name: "itemGroupSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchItemGroup.pending]: (state, action) => {
      state.loading = false;
    },
    [fetchItemGroup.fulfilled]: (state, action) => {
      state.loading = true;
      state.itemGroup = action.payload;
    },
    [getItemGroupByID.fulfilled]: (state, action) => {
      state.loading = true;
      state.itemGroupDetail = action.payload;
    },
    [fetchItemGroup.rejected]: (state, action) => {
      state.loading = false;
    },
    [addItemGroup.fulfilled]: (state, action) => {
      toastrCRUDSuccess(ITEM_GROUP, TEXT_POST);
    },
    [updateItemGroup.fulfilled]: (state, action) => {
      toastrCRUDSuccess(ITEM_GROUP, TEXT_PUT);
    },
    [deleteItemGroup.fulfilled]: (state, action) => {
      toastrCRUDSuccess(ITEM_GROUP, TEXT_DELETE);
    },
  },
});

const { actions, reducer } = ItemGroupSlice;
export default reducer;
export const {} = actions;
