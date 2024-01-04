import { createSlice } from "@reduxjs/toolkit";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodPost,
} from "helpers/erp_helper";
import { GET_COMPANY } from "helpers/url_helper";

export const fetchCompany = commonHandleHttpMethodGet(
  "CompanySlice/fetchCompany",
  GET_COMPANY
);

export const getCompanyByID = commonHandleHttpMethodGet(
  "CompanySlice/getCompanyByID",
  GET_COMPANY
);

export const createCompany = commonHandleHttpMethodPost(
  "CompanySlide/createCompany",
  GET_COMPANY
);

const initialState = {
  loading: false,
  companys: [],
  fetched: false,
  companyDetail: {},
};

const CompanySlice = createSlice({
  name: "CompanySlice",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCompany.pending]: (state, action) => {
      state.loading = false;
    },
    [fetchCompany.fulfilled]: (state, action) => {
      state.loading = true;
      state.companys = action.payload;
      state.fetched = true;
    },
    [getCompanyByID.fulfilled]: (state, action) => {
      state.loading = true;
      state.fetched = true;
      state.companyDetail = action.payload;
    },
    [fetchCompany.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { actions, reducer } = CompanySlice;
export default reducer;
export const {} = actions;
