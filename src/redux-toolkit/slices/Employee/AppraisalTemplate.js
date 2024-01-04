import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodDelete,
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_APPRAISAL_TEMPLATE } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  APPRAISAL_TEMPLATE,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";

const initialState = {
  appraisalTemplate: [],
};

export const fetchAppraisalTemplate = commonHandleHttpMethodGet(
  "appraisalTemplate/fetchAppraisalTemplate",
  GET_APPRAISAL_TEMPLATE
);
export const addAppraisalTemplate = commonHandleHttpMethodPost(
  "appraisalTemplate/addAppraisalTemplate",
  GET_APPRAISAL_TEMPLATE
);
export const updateAppraisalTemplate = commonHandleHttpMethodPutV2(
  "appraisalTemplate/updateAppraisalTemplate",
  GET_APPRAISAL_TEMPLATE
);
export const deleteAppraisalTemplate = commonHandleHttpMethodDelete(
  "appraisalTemplate/deleteAppraisalTemplate",
  GET_APPRAISAL_TEMPLATE
);

export const deleteAppraisalTemplateMultiple =
  commonHandleHttpMethodMultipleDelete(
    "appraisalTemplate/deleteAppraisalTemplateMultiple",
    GET_APPRAISAL_TEMPLATE
  );

const appraisalTemplate = createSlice({
  name: "AppraisalTemplate",
  initialState,
  extraReducers: {
    [fetchAppraisalTemplate.fulfilled]: (state, action) => {
      state.appraisalTemplate = action.payload;
    },
    [addAppraisalTemplate.fulfilled]: (state, action) => {
      toastrCRUDSuccess(APPRAISAL_TEMPLATE, TEXT_POST);
    },
    [updateAppraisalTemplate.fulfilled]: (state, action) => {
      toastrCRUDSuccess(APPRAISAL_TEMPLATE, TEXT_PUT);
    },
    [deleteAppraisalTemplate.fulfilled]: (state, action) => {
      toastrCRUDSuccess(APPRAISAL_TEMPLATE, TEXT_DELETE);
    },

    [deleteAppraisalTemplateMultiple.fulfilled]: () => {
      toastrCRUDSuccess(APPRAISAL_TEMPLATE, TEXT_DELETE);
    },
    [deleteAppraisalTemplateMultiple.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = appraisalTemplate;
export default reducer;
export const {} = actions;
