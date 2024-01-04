import { createSlice } from "@reduxjs/toolkit";
import { commonHandleHttpMethodGet } from "helpers/erp_helper";
import { GET_COST_CENTERS } from "helpers/url_helper";

const initialState = {
  costCenters: [],
};

export const fetchCostCenters = commonHandleHttpMethodGet(
  "CostCenterSlice/fetchCostCenters",
  GET_COST_CENTERS
);

const CostCenterSlice = createSlice({
  name: "CostCenterSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCostCenters.fulfilled]: (state, action) => {
      state.costCenters = action.payload;
    },
  },
});

const { reducer } = CostCenterSlice;
export default reducer;
