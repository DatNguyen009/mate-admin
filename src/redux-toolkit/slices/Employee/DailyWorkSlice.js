import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { DAILY_WORK, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import { GET_DAILY_WORK } from "helpers/url_helper";

export const fetchDailyWork = commonHandleHttpMethodGet(
  "DailyWorkSlice/fetchDailyWork",
  GET_DAILY_WORK
);

export const createDailyWork = commonHandleHttpMethodPost(
  "DailyWorkSlice/createDailyWork",
  GET_DAILY_WORK
);

export const getDailyWorkByParams = commonHandleHttpMethodGetByParams(
  "DailyWorkSlice/getDailyWorkByParams",
  GET_DAILY_WORK
);

export const updateDailyWork = commonHandleHttpMethodPutV2(
  "DailyWorkSlice/updateDailyWork",
  GET_DAILY_WORK
);

const initialState = {
  loading: false,
  dailyWorks: [],
  dailyWorkDetail: [],
};

const DailyWorkSlice = createSlice({
  name: "DailyWorkSlice",
  initialState,
  extraReducers: {
    [fetchDailyWork.pending]: state => {
      state.loading = false;
    },
    [fetchDailyWork.fulfilled]: (state, action) => {
      state.loading = true;
      state.dailyWorks = action.payload;
    },
    [fetchDailyWork.rejected]: state => {
      state.loading = false;
    },

    [getDailyWorkByParams.fulfilled]: (state, action) => {
      state.loading = true;
      state.dailyWorkDetail = action.payload;
    },
    [createDailyWork.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(DAILY_WORK, TEXT_POST);
      }
    },

    [updateDailyWork.pending]: state => {
      state.loading = false;
    },
    [updateDailyWork.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(DAILY_WORK, TEXT_PUT);
      }
    },
    [updateDailyWork.rejected]: state => {
      state.loading = false;
      toastrError();
    },
  },
});

const { actions, reducer } = DailyWorkSlice;
export default reducer;
