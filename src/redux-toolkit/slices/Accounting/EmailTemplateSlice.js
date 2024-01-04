import { createSlice } from "@reduxjs/toolkit";
import { commonHandleHttpMethodGet } from "helpers/erp_helper";
import { GET_EMAIL_TEMPLATE } from "helpers/url_helper";

export const fetchEmailTemplate = commonHandleHttpMethodGet(
  "EmailTemplateSlice/fetchEmailTemplate",
  GET_EMAIL_TEMPLATE
);

const initialState = {
  loading: false,
  emailTemplates: [],
};

const EmailTemplateSlice = createSlice({
  name: "EmailTemplateSlice",
  initialState,
  extraReducers: {
    [fetchEmailTemplate.pending]: state => {
      state.loading = false;
    },
    [fetchEmailTemplate.fulfilled]: (state, action) => {
      state.loading = true;
      state.emailTemplates = action.payload;
    },
    [fetchEmailTemplate.rejected]: state => {
      state.loading = false;
    },
  },
});

const { actions, reducer } = EmailTemplateSlice;
export default reducer;
