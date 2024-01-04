import { createSlice } from "@reduxjs/toolkit";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_PRICE_LIST } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  PRICELIST,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";

export const fetchPriceList = commonHandleHttpMethodGet(
  "PriceListSlice/fetchPriceList",
  GET_PRICE_LIST
);

export const getPriceListByID = commonHandleHttpMethodGet(
  "PriceListSlice/getPriceListByID",
  GET_PRICE_LIST
);

export const addPriceList = commonHandleHttpMethodPost(
  "PriceListSlice/addPriceList",
  GET_PRICE_LIST
);

export const updatePriceList = commonHandleHttpMethodPutV2(
  "PriceListSlice/updatePriceList",
  GET_PRICE_LIST
);

export const deletePriceList = commonHandleHttpMethodMultipleDelete(
  "PriceListSlice/deletePriceList",
  GET_PRICE_LIST
);

const initialState = {
  loading: false,
  priceList: [],
  priceListDetail: {},
  fetched: false,
};

const PriceListSlice = createSlice({
  name: "PriceListSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPriceList.pending]: (state, action) => {
      state.loading = true;
      state.fetched = true;
    },
    [fetchPriceList.fulfilled]: (state, action) => {
      state.loading = true;
      state.fetched = true;

      state.priceList = action.payload;
    },
    [getPriceListByID.fulfilled]: (state, action) => {
      state.loading = true;

      state.priceListDetail = action.payload;
    },
    [fetchPriceList.rejected]: (state, action) => {
      state.loading = true;
    },
    [addPriceList.fulfilled]: (state, action) => {
      toastrCRUDSuccess(PRICELIST, TEXT_POST);
    },
    [updatePriceList.fulfilled]: (state, action) => {
      toastrCRUDSuccess(PRICELIST, TEXT_PUT);
    },
    [deletePriceList.fulfilled]: (state, action) => {
      toastrCRUDSuccess(PRICELIST, TEXT_DELETE);
    },
  },
});

const { actions, reducer } = PriceListSlice;
export default reducer;
export const {} = actions;
