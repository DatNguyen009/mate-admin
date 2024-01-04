import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  ADD_NEW_CUSTOMER,
  DELETE_CUSTOMER,
  GET_CUSTOMERS,
  UPDATE_CUSTOMER,
  CUSTOMER_PARAMS,
} from "helpers/url_helper";
import {
  toastrCRUDSuccess,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  customers: [],
  customer: {},
};

export const fetchCustomers = commonHandleHttpMethodGet(
  "customerSlice/fetchCustomers",
  GET_CUSTOMERS + CUSTOMER_PARAMS
);
export const getCustomerById = commonHandleHttpMethodGet(
  "customerSlice/getCustomerById",
  GET_CUSTOMERS
);
export const addCustomer = commonHandleHttpMethodPost(
  "customerSlice/addCustomer",
  ADD_NEW_CUSTOMER
);
export const updateCustomer = commonHandleHttpMethodPutV2(
  "customerSlice/updateCustomer",
  UPDATE_CUSTOMER
);
export const deleteCustomer = commonHandleHttpMethodMultipleDelete(
  "customerSlice/deleteCustomer",
  DELETE_CUSTOMER
);

const customerSlice = createSlice({
  name: "Customer",
  initialState,
  extraReducers: {
    [fetchCustomers.fulfilled]: (state, action) => {
      state.customers = action.payload;
    },
    [getCustomerById.fulfilled]: (state, action) => {
      state.customer = action.payload;
    },
    [addCustomer.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Customer", TEXT_POST);
    },
    [updateCustomer.fulfilled]: (state, action) => {
      toastrSuccessAlert("Cập nhật khách hàng thành công");
    },
    [deleteCustomer.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Customer", TEXT_DELETE);
    },
  },
});

const { actions, reducer } = customerSlice;
export default reducer;
export const {} = actions;
