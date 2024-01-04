import { createSlice } from "@reduxjs/toolkit";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_ITEM, GET_ITEM_GROUP_QUERY } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { ITEM, TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

export const fetchItem = commonHandleHttpMethodGet(
  "ItemSlice/fetchItem",
  GET_ITEM + GET_ITEM_GROUP_QUERY
);

export const getItemByID = commonHandleHttpMethodGet(
  "ItemSlice/getCompanyByID",
  GET_ITEM
);

export const addItem = commonHandleHttpMethodPost(
  "ItemSlice/addItem",
  GET_ITEM
);

export const updateItem = commonHandleHttpMethodPutV2(
  "ItemSlice/updateItem",
  GET_ITEM
);

export const deleteItem = commonHandleHttpMethodMultipleDelete(
  "ItemSlice/deleteItem",
  GET_ITEM
);

const initialState = {
  loading: false,
  items: [],
  itemDetail: {},
};

const ItemSlice = createSlice({
  name: "itemSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchItem.pending]: (state, action) => {
      state.loading = true;
      state.fetched = true;
    },
    [fetchItem.fulfilled]: (state, action) => {
      state.loading = true;
      state.fetched = true;

      state.items = action.payload;
    },
    [getItemByID.fulfilled]: (state, action) => {
      state.loading = true;

      state.itemDetail = action.payload;
    },
    [fetchItem.rejected]: (state, action) => {
      state.loading = true;
    },
    [addItem.fulfilled]: (state, action) => {
      toastrCRUDSuccess(ITEM, TEXT_POST);
    },
    [updateItem.fulfilled]: (state, action) => {
      toastrCRUDSuccess(ITEM, TEXT_PUT);
    },
    [deleteItem.fulfilled]: (state, action) => {
      toastrCRUDSuccess(ITEM, TEXT_DELETE);
    },
  },
});

const { actions, reducer } = ItemSlice;
export default reducer;
export const {} = actions;
