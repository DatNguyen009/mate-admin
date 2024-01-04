import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPut,
} from "helpers/erp_helper";
import {
  TERM_AND_CONDITION,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import { GET_TERM_AND_CONDITION } from "helpers/url_helper";

export const fetchTermAndCondition = commonHandleHttpMethodGet(
  "TermAndConditionSlide/fetchTermAndCondition",
  GET_TERM_AND_CONDITION
);

export const getTermAndConditionById = commonHandleHttpMethodGet(
  "TermAndConditionSlide/getTermAndConditionById",
  GET_TERM_AND_CONDITION
);

export const createTermAndCondition = commonHandleHttpMethodPost(
  "TermAndConditionSlide/createTermAndCondition",
  GET_TERM_AND_CONDITION
);

export const updateTermAndCondition = commonHandleHttpMethodPut(
  "TermAndConditionSlide/updateTermAndCondition",
  GET_TERM_AND_CONDITION
);

export const daleteTermAndCondition = commonHandleHttpMethodMultipleDelete(
  "TermAndConditionSlide/daleteTermAndCondition",
  GET_TERM_AND_CONDITION
);

const initialState = {
  loading: false,
  termAndConditions: [],
  termAndConditionDetail: [],
};

const TermAndConditionSlide = createSlice({
  name: "TermAndConditionSlide",
  initialState,
  extraReducers: {
    [fetchTermAndCondition.pending]: state => {
      state.loading = false;
    },
    [fetchTermAndCondition.fulfilled]: (state, action) => {
      state.loading = true;
      state.termAndConditions = action.payload;
    },
    [fetchTermAndCondition.rejected]: state => {
      state.loading = false;
    },
    [createTermAndCondition.pending]: state => {
      state.loading = false;
    },
    [createTermAndCondition.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(TERM_AND_CONDITION, TEXT_POST);
      }
    },
    [createTermAndCondition.rejected]: state => {
      state.loading = false;
      toastrError();
    },

    [getTermAndConditionById.fulfilled]: (state, action) => {
      state.loading = true;
      state.termAndConditionDetail = action.payload;
    },

    [updateTermAndCondition.pending]: state => {
      state.loading = false;
    },
    [updateTermAndCondition.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(TERM_AND_CONDITION, TEXT_PUT);
      }
    },
    [updateTermAndCondition.rejected]: state => {
      state.loading = false;
      toastrError();
    },

    [daleteTermAndCondition.fulfilled]: () => {
      toastrCRUDSuccess(TERM_AND_CONDITION, TEXT_DELETE);
    },
    [daleteTermAndCondition.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = TermAndConditionSlide;
export default reducer;
