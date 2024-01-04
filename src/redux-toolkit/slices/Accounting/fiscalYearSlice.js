import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  FISCAL_YEAR,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import { GET_FISCAL_YEAR, GET_FISCAL_YEAR_PARAMS } from "helpers/url_helper";

export const fetchFiscalYear = commonHandleHttpMethodGet(
  "FiscalYearSlice/fetchFiscalYear",
  GET_FISCAL_YEAR + GET_FISCAL_YEAR_PARAMS
);

export const getFiscalYearByParams = commonHandleHttpMethodGetByParams(
  "FiscalYearSlice/getFiscalYearByParams",
  GET_FISCAL_YEAR + GET_FISCAL_YEAR_PARAMS
);

export const createFiscalYear = commonHandleHttpMethodPost(
  "FiscalYearSlice/createFiscalYear",
  GET_FISCAL_YEAR
);

export const updateFiscalYear = commonHandleHttpMethodPutV2(
  "FiscalYearSlice/updateFiscalYear",
  GET_FISCAL_YEAR
);

export const deleteFiscalYear = commonHandleHttpMethodMultipleDelete(
  "FiscalYearSlice/deleteFiscalYear",
  GET_FISCAL_YEAR
);

const initialState = {
  loading: false,
  fetched: false,
  fiscalYears: [],
  fiscalYearDetail: {},
};

const FiscalYearSlice = createSlice({
  name: "FiscalYearSlice",
  initialState,
  reducers: {
    setFiscalYearDetail: (state, action) => {
      state.fiscalYearDetail = action.payload;
    },
  },
  extraReducers: {
    [fetchFiscalYear.pending]: state => {
      state.loading = false;
    },
    [fetchFiscalYear.fulfilled]: (state, action) => {
      state.loading = true;
      state.fiscalYears = action.payload;
      state.fetched = true;
    },
    [fetchFiscalYear.rejected]: state => {
      state.loading = false;
    },

    [getFiscalYearByParams.fulfilled]: (state, action) => {
      state.fiscalYearDetail = action.payload;
      state.fetched = true;
    },
    [createFiscalYear.pending]: state => {
      state.loading = false;
    },
    [createFiscalYear.fulfilled]: state => {
      state.loading = true;
      toastrCRUDSuccess(FISCAL_YEAR, TEXT_POST);
    },
    [createFiscalYear.rejected]: state => {
      state.loading = false;
      toastrError();
    },
    [deleteFiscalYear.fulfilled]: () => {
      toastrCRUDSuccess(FISCAL_YEAR, TEXT_DELETE);
    },
    [deleteFiscalYear.rejected]: () => {
      toastrError();
    },

    [updateFiscalYear.fulfilled]: () => {
      toastrCRUDSuccess(FISCAL_YEAR, TEXT_PUT);
    },
    [updateFiscalYear.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = FiscalYearSlice;
export default reducer;
export const { setFiscalYearDetail } = actions;
