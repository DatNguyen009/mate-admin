import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodDelete,
  commonHandleHttpMethodGet,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_CUSTOMER_GROUP } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  customerGroups: [],
};

export const fetchCustomerGroups = commonHandleHttpMethodGet(
  "customerGroupSlice/fetchCustomerGroups",
  GET_CUSTOMER_GROUP
);
export const addCustomerGroup = commonHandleHttpMethodPost(
  "customerGroupSlice/addCustomerGroup",
  GET_CUSTOMER_GROUP
);
export const updateCustomerGroup = commonHandleHttpMethodPutV2(
  "customerGroupSlice/updateCustomerGroup",
  GET_CUSTOMER_GROUP
);
export const deleteCustomerGroup = commonHandleHttpMethodDelete(
  "customerGroupSlice/deleteCustomerGroup",
  GET_CUSTOMER_GROUP
);

const customerGroupSlice = createSlice({
  name: "CustomerGroup",
  initialState,
  extraReducers: {
    [fetchCustomerGroups.fulfilled]: (state, action) => {
      state.customerGroups = action.payload;
    },
    [addCustomerGroup.fulfilled]: (state, action) => {
      toastrCRUDSuccess("customer group", TEXT_POST);
    },
    [updateCustomerGroup.fulfilled]: (state, action) => {
      toastrCRUDSuccess("customer group", TEXT_PUT);
    },
    [deleteCustomerGroup.fulfilled]: (state, action) => {
      toastrCRUDSuccess("customer group", TEXT_DELETE);
    },
  },
});

const { actions, reducer } = customerGroupSlice;
export default reducer;
export const {} = actions;
