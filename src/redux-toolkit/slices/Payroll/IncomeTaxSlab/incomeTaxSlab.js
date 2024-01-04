import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";

import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import {
  GET_INCOME_TAX_SLAB,
  GET_INCOME_TAX_SLAB_FULL,
} from "helpers/url_helper";

export const fetchIncomeTaxSlabs = commonHandleHttpMethodGet(
  "IncomeTaxSlab/fetchIncomeTaxSlab",
  GET_INCOME_TAX_SLAB_FULL
);

export const getIncomeTaxSlabByID = commonHandleHttpMethodGet(
  "IncomeTaxSlab/getIncomeTaxSlabByID",
  GET_INCOME_TAX_SLAB
);

export const createIncomeTaxSlab = commonHandleHttpMethodPost(
  "IncomeTaxSlab/postIncomeTaxSlab",
  GET_INCOME_TAX_SLAB
);

export const updateIncomeTaxSlab = commonHandleHttpMethodPutV2(
  "IncomeTaxSlab/updateIncomeTaxSlab",
  GET_INCOME_TAX_SLAB
);

export const deleteIncomeTaxSlab = commonHandleHttpMethodMultipleDelete(
  "PayrollPeriod/deleteIncomeTaxSlab",
  GET_INCOME_TAX_SLAB
);

const initialState = {
  fetched: false,
  incomeTaxSlabs: [],
  incomeTaxSlabDetail: {},
};

const IncomeTaxSlab = createSlice({
  name: "IncomeTaxSlab",
  initialState,
  extraReducers: {
    [fetchIncomeTaxSlabs.fulfilled]: (state, action) => {
      state.fetched = true;
      state.incomeTaxSlabs = action.payload;
    },
    [fetchIncomeTaxSlabs.rejected]: (state, action) => {
      state.fetched = false;
    },
    [getIncomeTaxSlabByID.fulfilled]: (state, action) => {
      state.incomeTaxSlabDetail = action.payload;
    },
    [createIncomeTaxSlab.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Income Tax Slab", TEXT_POST);
      return {
        ...state,
        fetched: false,
      };
    },
    [createIncomeTaxSlab.rejected]: (state, action) => {
      toastrError();
    },
    [updateIncomeTaxSlab.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Income Tax Slab", TEXT_PUT);
      return {
        ...state,
        fetched: false,
      };
    },
    [updateIncomeTaxSlab.rejected]: (state, action) => {
      toastrError();
    },
    [deleteIncomeTaxSlab.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Income Tax Slab", TEXT_DELETE);
    },
    [deleteIncomeTaxSlab.rejected]: (state, action) => {
      toastrError();
    },
  },
});

const { actions, reducer } = IncomeTaxSlab;
export default reducer;
export const {} = actions;
