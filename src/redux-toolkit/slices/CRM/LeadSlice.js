import { createSlice } from "@reduxjs/toolkit";
import { toastrSuccessAlert } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { LEAD_URL } from "helpers/url_helper";

export const fetchLeads = commonHandleHttpMethodGet(
  "LeadSlice/fetchLeads",
  LEAD_URL
);

export const createLead = commonHandleHttpMethodPost(
  "LeadSlice/addLead",
  LEAD_URL
);

export const updateLead = commonHandleHttpMethodPutV2(
  "LeadSlice/updateLead",
  LEAD_URL
);

const initialState = {
  fetched: false,
  leads: [],
};

const leadSlice = createSlice({
  name: "LeadSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLeads.fulfilled]: (state, action) => {
      state.fetched = true;
      state.leads = action.payload;
    },
    [fetchLeads.rejected]: (state, action) => {
      state.fetched = false;
    },
    [createLead.fulfilled]: (state, action) => {
      if (action.payload?.createdAt) {
        toastrSuccessAlert("Tạo khách hàng tiềm năng thành công!");
      }
    },
    [updateLead.fulfilled]: (state, action) => {
      console.log(action);
      if (action.payload?.updatedAt) {
        toastrSuccessAlert("Cập nhật khách hàng tiềm năng thành công!");
      }
    },
  },
});

const { actions, reducer } = leadSlice;
export default reducer;
export const {} = actions;
