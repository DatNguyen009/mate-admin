import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { HR_SETTING, TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import { GET_HR_SETTING, GET_HR_SETTING_QUERY } from "helpers/url_helper";

export const fetchHrSetting = commonHandleHttpMethodGet(
  "HrSettingSlide/fetchHrSetting",
  GET_HR_SETTING + GET_HR_SETTING_QUERY
);

export const createHrSetting = commonHandleHttpMethodPost(
  "HrSettingSlide/createHrSetting",
  GET_HR_SETTING
);

export const getHrSettingByParams = commonHandleHttpMethodGetByParams(
  "HrSettingSlide/getHrSettingByParams",
  GET_HR_SETTING + GET_HR_SETTING_QUERY
);

export const updateHrSetting = commonHandleHttpMethodPutV2(
  "HrSettingSlide/updateHrSetting",
  GET_HR_SETTING
);

const initialState = {
  loading: false,
  hrSetting: [],
};

const HrSettingSlide = createSlice({
  name: "HrSettingSlide",
  initialState,
  extraReducers: {
    [fetchHrSetting.pending]: state => {
      state.loading = false;
    },
    [fetchHrSetting.fulfilled]: (state, action) => {
      state.loading = true;
      state.hrSetting = action.payload;
    },
    [fetchHrSetting.rejected]: state => {
      state.loading = false;
    },

    [createHrSetting.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(HR_SETTING, TEXT_POST);
      }
    },

    [updateHrSetting.pending]: state => {
      state.loading = false;
    },
    [updateHrSetting.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(HR_SETTING, TEXT_PUT);
      }
    },
    [updateHrSetting.rejected]: state => {
      state.loading = false;
      toastrError();
    },
  },
});

const { actions, reducer } = HrSettingSlide;
export default reducer;
