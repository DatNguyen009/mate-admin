import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_ADDRESSES } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  addresses: [],
};

export const fetchAddresses = commonHandleHttpMethodGet(
  "AddressSlice/fetchAddresses",
  GET_ADDRESSES
);
export const fetchAddressById = commonHandleHttpMethodGet(
  "AddressSlice/fetchAddressById",
  GET_ADDRESSES
);
export const addAddress = commonHandleHttpMethodPost(
  "AddressSlice/addAddress",
  GET_ADDRESSES
);
export const updateAddress = commonHandleHttpMethodPutV2(
  "AddressSlice/updateAddress",
  GET_ADDRESSES
);
export const deleteAddress = commonHandleHttpMethodMultipleDelete(
  "AddressSlice/deleteAddress",
  GET_ADDRESSES
);

const addressSlice = createSlice({
  name: "AddressSlice",
  initialState,
  extraReducers: {
    [fetchAddresses.fulfilled]: (state, action) => {
      state.addresses = action.payload;
    },
    [addAddress.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Address", TEXT_POST);
    },
    [updateAddress.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Address", TEXT_PUT);
    },
    [deleteAddress.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Address", TEXT_DELETE);
    },
  },
});

const { reducer } = addressSlice;
export default reducer;
