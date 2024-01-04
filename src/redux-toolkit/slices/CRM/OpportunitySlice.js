import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpService from "services/httpService";
import {
  commonHandleHttpMethodDelete,
  commonHandleHttpMethodGet,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_OPPORTUNITY } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  opportunities: [],
};

export const fetchOpportunities = commonHandleHttpMethodGet(
  "opportunitySlice/fetchOpportunities",
  GET_OPPORTUNITY
);
export const addOpportunity = commonHandleHttpMethodPost(
  "opportunitySlice/addOpportunity",
  GET_OPPORTUNITY
);
export const updateOpportunity = commonHandleHttpMethodPutV2(
  "opportunitySlice/updateOpportunity",
  GET_OPPORTUNITY
);
export const deleteOpportunity = commonHandleHttpMethodDelete(
  "opportunitySlice/deleteOpportunity",
  GET_OPPORTUNITY
);

export const postBatchAction = createAsyncThunk(
  "opportunitySlice/postBatchAction",
  async requests => {
    return httpService.post("/parse/batch", { requests });
  }
);

const opportunitySlice = createSlice({
  name: "Opportunity",
  initialState,
  extraReducers: {
    [fetchOpportunities.fulfilled]: (state, action) => {
      state.opportunities = action.payload?.results;
    },
    [addOpportunity.fulfilled]: (state, action) => {
      toastrCRUDSuccess("opportunity", TEXT_POST);
    },
    [updateOpportunity.fulfilled]: (state, action) => {
      toastrCRUDSuccess("opportunity", TEXT_PUT);
    },
    [deleteOpportunity.fulfilled]: (state, action) => {
      toastrCRUDSuccess("opportunity", TEXT_DELETE);
    },
    [postBatchAction.fulfilled]: (state, action) => {},
  },
});

const { actions, reducer } = opportunitySlice;
export default reducer;
export const { setFetched } = actions;
