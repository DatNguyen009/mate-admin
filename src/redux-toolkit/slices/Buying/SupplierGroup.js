import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  SUPPLIER_GROUP,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import {
  GET_SUPPLIER_GROUP,
  GET_SUPPLIER_GROUP_QUERY,
} from "helpers/url_helper";

export const fetchSupplierGroup = commonHandleHttpMethodGet(
  "SupplierGroupSlice/fetchSupplierGroup",
  GET_SUPPLIER_GROUP + GET_SUPPLIER_GROUP_QUERY
);

export const getSupplierGroupByID = commonHandleHttpMethodGet(
  "SupplierGroupSlice/getSupplierGroupByID",
  GET_SUPPLIER_GROUP
);

export const addSupplierGroup = commonHandleHttpMethodPost(
  "SupplierGroupSlice/addSupplierGroup",
  GET_SUPPLIER_GROUP
);

export const updateSupplierGroup = commonHandleHttpMethodPutV2(
  "SupplierGroupSlice/updateSupplierGroup",
  GET_SUPPLIER_GROUP
);

export const deleteSupplierGroup = commonHandleHttpMethodMultipleDelete(
  "SupplierGroupSlice/deleteSupplierGroup",
  GET_SUPPLIER_GROUP
);

const initialState = {
  loading: false,
  fetched: false,
  supplierGroups: [],
  supplierGroupDetail: [],
};

const SupplierGroupSlice = createSlice({
  name: "SupplierGroupSlice",
  initialState,
  extraReducers: {
    [fetchSupplierGroup.pending]: state => {
      state.loading = false;
    },
    [fetchSupplierGroup.fulfilled]: (state, action) => {
      state.loading = true;
      state.supplierGroups = action.payload;
      state.fetched = true;
    },
    [fetchSupplierGroup.rejected]: state => {
      state.loading = false;
    },

    [getSupplierGroupByID.fulfilled]: (state, action) => {
      state.supplierGroupDetail = action.payload;
      state.fetched = true;
    },
    [addSupplierGroup.pending]: state => {
      state.loading = false;
    },
    [addSupplierGroup.fulfilled]: state => {
      state.loading = true;
      toastrCRUDSuccess(SUPPLIER_GROUP, TEXT_POST);
    },
    [addSupplierGroup.rejected]: state => {
      state.loading = false;
      toastrError();
    },
    [deleteSupplierGroup.fulfilled]: () => {
      toastrCRUDSuccess(SUPPLIER_GROUP, TEXT_DELETE);
    },
    [deleteSupplierGroup.rejected]: () => {
      toastrError();
    },

    [updateSupplierGroup.fulfilled]: () => {
      toastrCRUDSuccess(SUPPLIER_GROUP, TEXT_PUT);
    },
    [updateSupplierGroup.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = SupplierGroupSlice;
export default reducer;
export const { setSupplierGroupDetail } = actions;
