import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_ACTIVITY_TYPE } from "helpers/url_helper";
import { ACTIVITY_TYPE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

export const fetchActivityType = commonHandleHttpMethodGet(
  "ActivityType/fetchActivityType",
  GET_ACTIVITY_TYPE
);

export const getActivityTypeByID = commonHandleHttpMethodGet(
  "ActivityType/getActivityTypeByID",
  GET_ACTIVITY_TYPE
);

export const createActivityType = commonHandleHttpMethodPost(
  "ActivityType/postActivityType",
  GET_ACTIVITY_TYPE
);

export const updateActivityType = commonHandleHttpMethodPutV2(
  "ActivityType/updateActivityType",
  GET_ACTIVITY_TYPE
);

export const deleteActivityType = commonHandleHttpMethodMultipleDelete(
  "ActivityType/updateActivityType",
  GET_ACTIVITY_TYPE
);
const initialState = {
  fetched: false,
  activityTypeList: [],
  activityTypeDetail: {},
};

const ActivityType = createSlice({
  name: "ActivityType",
  initialState,
  extraReducers: {
    [fetchActivityType.fulfilled]: (state, action) => {
      state.fetched = true;
      state.activityTypeList = action.payload;
    },
    [fetchActivityType.rejected]: (state, action) => {
      state.fetched = false;
    },
    [getActivityTypeByID.fulfilled]: (state, action) => {
      state.activityTypeDetail = action.payload;
      state.fetched = false;
    },
    [createActivityType.fulfilled]: (state, action) => {
      toastrCRUDSuccess(ACTIVITY_TYPE, TEXT_POST);
      return {
        ...state,
        fetched: false,
      };
    },
    [createActivityType.rejected]: (state, action) => {
      toastrError();
    },
    [updateActivityType.fulfilled]: (state, action) => {
      toastrCRUDSuccess(ACTIVITY_TYPE, TEXT_PUT);
      return {
        ...state,
        fetched: false,
      };
    },
    [updateActivityType.rejected]: (state, action) => {
      toastrError();
    },
  },
});

const { actions, reducer } = ActivityType;
export default reducer;
export const {} = actions;
