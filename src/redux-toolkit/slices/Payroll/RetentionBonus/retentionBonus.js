import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { RETENTION_BONUS, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import {
  GET_RETENTION_BONUS,
  GET_RETENTION_BONUS_QUERY,
} from "helpers/url_helper";

import "toastr/build/toastr.min.css";

export const fetchRetentionBonus = commonHandleHttpMethodGet(
  "RetentionBonus/fetchRetentionBonus",
  GET_RETENTION_BONUS + GET_RETENTION_BONUS_QUERY
);

export const getRetentionBonusByID = commonHandleHttpMethodGet(
  "RetentionBonus/getRetentionBonusByID",
  GET_RETENTION_BONUS
);

export const createRetentionBonus = commonHandleHttpMethodPost(
  "RetentionBonus/createRetentionBonus",
  GET_RETENTION_BONUS
);

export const updateRetentionBonus = commonHandleHttpMethodPutV2(
  "RetentionBonus/updateRetentionBonus",
  GET_RETENTION_BONUS
);

export const deleteRetentionBonus = commonHandleHttpMethodMultipleDelete(
  "RetentionBonus/deleteRetentionBonus",
  GET_RETENTION_BONUS
);

const initialState = {
  loading: false,
  retentionBonus: [],
  RetentionBonusDetail: {},
  fetched: false,
};

const RetentionBonus = createSlice({
  name: "RetentionBonus",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRetentionBonus.fulfilled]: (state, action) => {
      state.loading = true;
      state.retentionBonus = action.payload;
      state.fetched = true;
    },
    [getRetentionBonusByID.fulfilled]: (state, action) => {
      state.loading = true;
      state.retentionBonusDetail = action.payload;
    },
    [getRetentionBonusByID.pending]: (state, action) => {
      state.loading = true;
      state.retentionBonusDetail = action.payload;
    },
    [getRetentionBonusByID.rejected]: (state, action) => {
      state.loading = true;
      state.retentionBonusDetail = action.payload;
    },
    [createRetentionBonus.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(RETENTION_BONUS, TEXT_POST);
      }
    },
    [createRetentionBonus.rejected]: (state, action) => {
      state.loading = false;
      toastrError();
    },
    [updateRetentionBonus.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(RETENTION_BONUS, TEXT_PUT);
      }
    },
  },
});

const { actions, reducer } = RetentionBonus;
export default reducer;
export const {} = actions;
