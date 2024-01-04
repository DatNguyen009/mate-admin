import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodDelete,
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_APPRAISAL, GET_APPRAISAL_QUERY } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  APPRAISAL,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";

const initialState = {
  appraisal: [],
  fetched: false,
};

export const fetchAppraisal = commonHandleHttpMethodGet(
  "appraisal/fetchAppraisal",
  GET_APPRAISAL + GET_APPRAISAL_QUERY
);
export const addAppraisal = commonHandleHttpMethodPost(
  "appraisal/addAppraisal",
  GET_APPRAISAL
);
export const updateAppraisal = commonHandleHttpMethodPutV2(
  "appraisal/updateAppraisal",
  GET_APPRAISAL
);
export const deleteAppraisal = commonHandleHttpMethodDelete(
  "appraisal/deleteAppraisal",
  GET_APPRAISAL
);

export const deleteAppraisalMultiple = commonHandleHttpMethodMultipleDelete(
  "appraisal/deleteAppraisalMultiple",
  GET_APPRAISAL
);

const appraisal = createSlice({
  name: "Appraisal",
  initialState,
  extraReducers: {
    [fetchAppraisal.fulfilled]: (state, action) => {
      state.appraisal = action.payload;
      state.fetched = false;
    },
    [addAppraisal.fulfilled]: (state, action) => {
      toastrCRUDSuccess(APPRAISAL, TEXT_POST);
    },
    [updateAppraisal.fulfilled]: (state, action) => {
      toastrCRUDSuccess(APPRAISAL, TEXT_PUT);
      state.fetched = false;
    },
    [deleteAppraisal.fulfilled]: (state, action) => {
      toastrCRUDSuccess(APPRAISAL, TEXT_DELETE);
    },

    [deleteAppraisalMultiple.fulfilled]: () => {
      toastrCRUDSuccess(APPRAISAL, TEXT_DELETE);
    },
    [deleteAppraisalMultiple.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = appraisal;
export default reducer;
export const {} = actions;
