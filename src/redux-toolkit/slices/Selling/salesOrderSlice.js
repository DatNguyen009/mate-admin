import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_SALES_ORDER, SALES_ORDER_PARAMS } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  salesOrders: [],
};

export const fetchSalesOrders = commonHandleHttpMethodGet(
  "SalesOrderSlice/fetchSalesOrders",
  GET_SALES_ORDER + SALES_ORDER_PARAMS
);
export const addSalesOrder = commonHandleHttpMethodPost(
  "SalesOrderSlice/addSalesOrder",
  GET_SALES_ORDER
);
export const updateSalesOrder = commonHandleHttpMethodPutV2(
  "SalesOrderSlice/updateSalesOrder",
  GET_SALES_ORDER
);
export const deleteSalesOrder = commonHandleHttpMethodMultipleDelete(
  "SalesOrderSlice/deleteSalesOrder",
  GET_SALES_ORDER
);

const salesOrderSlice = createSlice({
  name: "SalesOrderSlice",
  initialState,
  extraReducers: {
    [fetchSalesOrders.fulfilled]: (state, action) => {
      state.salesOrders = action.payload;
    },
    [addSalesOrder.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Sales Order", TEXT_POST);
    },
    [updateSalesOrder.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Sales Order", TEXT_PUT);
    },
    [deleteSalesOrder.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Sales Order", TEXT_DELETE);
    },
  },
});

const { reducer } = salesOrderSlice;
export default reducer;
