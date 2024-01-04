import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  GET_ORDERS,
  ADD_NEW_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
  ORDER_PARAMS,
} from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  orders: [],
};

export const fetchOrders = commonHandleHttpMethodGet(
  "OrderSlice/fetchOrders",
  GET_ORDERS + ORDER_PARAMS
);
export const addOrder = commonHandleHttpMethodPost(
  "OrderSlice/addOrder",
  ADD_NEW_ORDER
);
export const updateOrder = commonHandleHttpMethodPutV2(
  "OrderSlice/updateOrder",
  UPDATE_ORDER
);
export const deleteOrder = commonHandleHttpMethodMultipleDelete(
  "OrderSlice/deleteOrder",
  DELETE_ORDER
);

const orderSlice = createSlice({
  name: "OrderSlice",
  initialState,
  extraReducers: {
    [fetchOrders.fulfilled]: (state, action) => {
      state.orders = action.payload;
    },
    [addOrder.fulfilled]: (state, action) => {
      toastrCRUDSuccess("order", TEXT_POST);
    },
    [updateOrder.fulfilled]: (state, action) => {
      toastrCRUDSuccess("order", TEXT_PUT);
    },
    [deleteOrder.fulfilled]: (state, action) => {
      toastrCRUDSuccess("order", TEXT_DELETE);
    },
  },
});

const { reducer } = orderSlice;
export default reducer;
