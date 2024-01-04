import { createSlice } from "@reduxjs/toolkit";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_ITEM_ATTRIBUTE } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  ITEMATTRIBUTE,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";

export const fetchItemAttribute = commonHandleHttpMethodGet(
  "ItemAttributeSlice/fetchItemAttribute",
  GET_ITEM_ATTRIBUTE
);

export const getItemAttributeByID = commonHandleHttpMethodGet(
  "ItemAttributeSlice/getItemAttributeByID",
  GET_ITEM_ATTRIBUTE
);

export const addItemAttribute = commonHandleHttpMethodPost(
  "ItemAttributeSlice/addItemAttribute",
  GET_ITEM_ATTRIBUTE
);

export const updateItemAttribute = commonHandleHttpMethodPutV2(
  "ItemAttributeSlice/updateItemAttribute",
  GET_ITEM_ATTRIBUTE
);

export const deleteItemAttribute = commonHandleHttpMethodMultipleDelete(
  "ItemAttributeSlice/deleteItemAttribute",
  GET_ITEM_ATTRIBUTE
);

const initialState = {
  loading: false,
  itemAttribute: [],
  itemAttributeDetail: {},
};

const ItemAttributeSlice = createSlice({
  name: "ItemAttribute",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchItemAttribute.pending]: (state, action) => {
      state.loading = true;
      state.fetched = true;
    },
    [fetchItemAttribute.fulfilled]: (state, action) => {
      state.loading = true;
      state.fetched = true;

      state.itemAttribute = action.payload;
    },
    [getItemAttributeByID.fulfilled]: (state, action) => {
      state.loading = true;

      state.itemAttributeDetail = action.payload;
    },
    [fetchItemAttribute.rejected]: (state, action) => {
      state.loading = true;
    },
    [addItemAttribute.fulfilled]: (state, action) => {
      toastrCRUDSuccess(ITEMATTRIBUTE, TEXT_POST);
    },
    [updateItemAttribute.fulfilled]: (state, action) => {
      toastrCRUDSuccess(ITEMATTRIBUTE, TEXT_PUT);
    },
    [deleteItemAttribute.fulfilled]: (state, action) => {
      toastrCRUDSuccess(ITEMATTRIBUTE, TEXT_DELETE);
    },
  },
});

const { actions, reducer } = ItemAttributeSlice;
export default reducer;
export const {} = actions;
