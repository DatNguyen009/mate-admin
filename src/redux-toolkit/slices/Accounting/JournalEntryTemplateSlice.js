import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  JOURNAL_ENTRY_TEMPLATE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import {
  GET_JOURNAL_ENTRY_TEMPLATE,
  GET_JOURNAL_ENTRY_TEMPLATE_PARAMS,
} from "helpers/url_helper";

export const fetchJournalEntryTemplate = commonHandleHttpMethodGet(
  "journalEntryTemplateSlice/fetchJournalEntryTemplate",
  GET_JOURNAL_ENTRY_TEMPLATE
);

export const createJournalEntryTemplate = commonHandleHttpMethodPost(
  "journalEntryTemplateSlice/createJournalEntryTemplate",
  GET_JOURNAL_ENTRY_TEMPLATE
);

export const getJournalEntryTemplateByParams =
  commonHandleHttpMethodGetByParams(
    "journalEntryTemplateSlice/getJournalEntryTemplateByParams",
    GET_JOURNAL_ENTRY_TEMPLATE + GET_JOURNAL_ENTRY_TEMPLATE_PARAMS
  );

export const updateJournalEntryTemplate = commonHandleHttpMethodPutV2(
  "journalEntryTemplateSlice/updateJournalEntryTemplate",
  GET_JOURNAL_ENTRY_TEMPLATE
);

const initialState = {
  loading: false,
  journalEntryTemplates: [],
};

const JournalEntryTemplateSlice = createSlice({
  name: "journalEntryTemplateSlice",
  initialState,
  extraReducers: {
    [fetchJournalEntryTemplate.pending]: state => {
      state.loading = false;
    },
    [fetchJournalEntryTemplate.fulfilled]: (state, action) => {
      state.loading = true;
      state.journalEntryTemplates = action.payload;
    },
    [fetchJournalEntryTemplate.rejected]: state => {
      state.loading = false;
    },

    [createJournalEntryTemplate.fulfilled]: (statoe, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(JOURNAL_ENTRY_TEMPLATE, TEXT_POST);
      }
    },

    [updateJournalEntryTemplate.fulfilled]: (state, action) => {
      if (action.payload?.updatedAt) {
        toastrCRUDSuccess(JOURNAL_ENTRY_TEMPLATE, TEXT_PUT);
      }
    },
  },
});

const { actions, reducer } = JournalEntryTemplateSlice;
export default reducer;
