import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  SUPPLIER,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import { GET_SUPPLIER, GET_SUPPLIER_QUERY } from "helpers/url_helper";

export const fetchSupplier = commonHandleHttpMethodGet(
  "SupplierSlice/fetchSupplier",
  GET_SUPPLIER + GET_SUPPLIER_QUERY
);

export const getSupplierByID = commonHandleHttpMethodGet(
  "SupplierSlice/getSupplierByID",
  GET_SUPPLIER
);

export const addSupplier = commonHandleHttpMethodPost(
  "SupplierSlice/addSupplier",
  GET_SUPPLIER
);

export const updateSupplier = commonHandleHttpMethodPutV2(
  "SupplierSlice/updateSupplier",
  GET_SUPPLIER
);

export const deleteSupplier = commonHandleHttpMethodMultipleDelete(
  "SupplierSlice/deleteSupplier",
  GET_SUPPLIER
);

const initialState = {
  loading: false,
  fetched: false,
  suppliers: [],
  supplierDetail: [],
};

const SupplierSlice = createSlice({
  name: "SupplierSlice",
  initialState,
  extraReducers: {
    [fetchSupplier.pending]: state => {
      state.loading = false;
    },
    [fetchSupplier.fulfilled]: (state, action) => {
      state.loading = true;
      state.suppliers = action.payload;
      state.fetched = true;
    },
    [fetchSupplier.rejected]: state => {
      state.loading = false;
    },

    [getSupplierByID.fulfilled]: (state, action) => {
      state.supplierDetail = action.payload;
      state.fetched = true;
    },
    [addSupplier.pending]: state => {
      state.loading = false;
    },
    [addSupplier.fulfilled]: state => {
      state.loading = true;
      toastrCRUDSuccess(SUPPLIER, TEXT_POST);
    },
    [addSupplier.rejected]: state => {
      state.loading = false;
      toastrError();
    },
    [deleteSupplier.fulfilled]: () => {
      toastrCRUDSuccess(SUPPLIER, TEXT_DELETE);
    },
    [deleteSupplier.rejected]: () => {
      toastrError();
    },

    [updateSupplier.fulfilled]: () => {
      toastrCRUDSuccess(SUPPLIER, TEXT_PUT);
    },
    [updateSupplier.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = SupplierSlice;
export default reducer;
export const { setSupplierDetail } = actions;
