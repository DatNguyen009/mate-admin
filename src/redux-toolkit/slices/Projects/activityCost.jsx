import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_ACTIVITY_COST, GET_ACTIVITY_COST_QUERY } from "helpers/url_helper";
import { ACTIVITY_COST, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

export const fetchActivityCost = commonHandleHttpMethodGet(
  "ActivityCost/fetchActivityCost",
  GET_ACTIVITY_COST + GET_ACTIVITY_COST_QUERY
);

export const getActivityCostByID = commonHandleHttpMethodGet(
  "ActivityCost/getActivityCostByID",
  GET_ACTIVITY_COST
);

export const createActivityCost = commonHandleHttpMethodPost(
  "ActivityCost/postActivityCost",
  GET_ACTIVITY_COST
);

export const updateActivityCost = commonHandleHttpMethodPutV2(
  "ActivityCost/updateActivityCost",
  GET_ACTIVITY_COST
);

export const deleteActivityCost = commonHandleHttpMethodMultipleDelete(
  "ActivityCost/updateActivityCost",
  GET_ACTIVITY_COST
);
const initialState = {
  fetched: false,
  activityCostList: [],
  activityCostDetail: {},
};

const ActivityCost = createSlice({
  name: "ActivityCost",
  initialState,
  extraReducers: {
    [fetchActivityCost.fulfilled]: (state, action) => {
      state.fetched = true;
      state.activityCostList = action.payload;
    },
    [fetchActivityCost.rejected]: (state, action) => {
      state.fetched = false;
    },
    [getActivityCostByID.fulfilled]: (state, action) => {
      state.activityCostDetail = action.payload;
      state.fetched = false;
    },
    [createActivityCost.fulfilled]: (state, action) => {
      toastrCRUDSuccess(ACTIVITY_COST, TEXT_POST);
      return {
        ...state,
        fetched: false,
      };
    },
    [createActivityCost.rejected]: (state, action) => {
      toastrError();
    },
    [updateActivityCost.fulfilled]: (state, action) => {
      toastrCRUDSuccess(ACTIVITY_COST, TEXT_PUT);
      return {
        ...state,
        fetched: false,
      };
    },
    [updateActivityCost.rejected]: (state, action) => {
      toastrError();
    },
  },
});

const { actions, reducer } = ActivityCost;
export default reducer;
export const {} = actions;
