import { createSlice } from "@reduxjs/toolkit";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_WAREHOUSE, GET_WAREHOUSE_QUERY } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
  WAREHOUSE,
} from "helpers/name_helper";

export const fetchWarehouse = commonHandleHttpMethodGet(
  "WarehouseSlice/fetchWarehouse",
  GET_WAREHOUSE + GET_WAREHOUSE_QUERY
);

export const getWarehouseByID = commonHandleHttpMethodGet(
  "WarehouseSlice/getWarehouseByID",
  GET_WAREHOUSE
);

export const addWarehouse = commonHandleHttpMethodPost(
  "WarehouseSlice/addWarehouse",
  GET_WAREHOUSE
);

export const updateWarehouse = commonHandleHttpMethodPutV2(
  "WarehouseSlice/updateWarehouse",
  GET_WAREHOUSE
);

export const deleteWarehouse = commonHandleHttpMethodMultipleDelete(
  "WarehouseSlice/deleteWarehouse",
  GET_WAREHOUSE
);

const initialState = {
  loading: false,
  warehouse: [],
  warehouseDetail: {},
};

const warehouseSlice = createSlice({
  name: "WarehouseSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchWarehouse.pending]: (state, action) => {
      state.loading = true;
      state.fetched = true;
    },
    [fetchWarehouse.fulfilled]: (state, action) => {
      state.loading = true;
      state.fetched = true;

      state.warehouse = action.payload;
    },
    [getWarehouseByID.fulfilled]: (state, action) => {
      state.loading = true;

      state.warehouseDetail = action.payload;
    },
    [fetchWarehouse.rejected]: (state, action) => {
      state.loading = true;
    },
    [addWarehouse.fulfilled]: (state, action) => {
      toastrCRUDSuccess(WAREHOUSE, TEXT_POST);
    },
    [updateWarehouse.fulfilled]: (state, action) => {
      toastrCRUDSuccess(WAREHOUSE, TEXT_PUT);
    },
    [deleteWarehouse.fulfilled]: (state, action) => {
      toastrCRUDSuccess(WAREHOUSE, TEXT_DELETE);
    },
  },
});

const { actions, reducer } = warehouseSlice;
export default reducer;
export const {} = actions;
