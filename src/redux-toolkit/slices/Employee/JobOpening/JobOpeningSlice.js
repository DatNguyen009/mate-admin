import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  JOB_OPENING,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import { GET_JOB_OPENING, POST_JOB_OPENING } from "helpers/url_helper";

export const fetchJobOpening = commonHandleHttpMethodGet(
  "JobOpeningSlice/fetchJobOpening",
  GET_JOB_OPENING
);

export const getJobOpeningById = commonHandleHttpMethodGet(
  "JobOpeningSlice/getJobOpeningById",
  POST_JOB_OPENING
);

export const createJobOpening = commonHandleHttpMethodPost(
  "JobOpeningSlice/createJobOpening",
  GET_JOB_OPENING
);

export const updateJobOpening = commonHandleHttpMethodPutV2(
  "JobOpeningSlice/updateJobOpening",
  POST_JOB_OPENING
);

export const deleteJobOpening = commonHandleHttpMethodMultipleDelete(
  "JobOpeningSlice/deleteJobOpening",
  POST_JOB_OPENING
);

const initialState = {
  loading: false,
  fetched: false,
  jobOpenings: [],
  jobOpeningDetail: [],
};

const JobOpeningSlice = createSlice({
  name: "JobOpeningSlice",
  initialState,
  extraReducers: {
    [fetchJobOpening.pending]: (state, action) => {
      state.loading = false;
    },
    [fetchJobOpening.fulfilled]: (state, action) => {
      state.loading = true;
      state.jobOpenings = action.payload;
      state.fetched = true;
    },
    [fetchJobOpening.rejected]: (state, action) => {
      state.loading = false;
    },
    [getJobOpeningById.fulfilled]: (state, action) => {
      state.jobOpeningDetail = action.payload;
      state.fetched = true;
    },
    [createJobOpening.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(JOB_OPENING, TEXT_POST);
      }
    },
    [createJobOpening.rejected]: (state, action) => {
      state.loading = false;
      toastrError();
    },

    [updateJobOpening.fulfilled]: () => {
      toastrCRUDSuccess(JOB_OPENING, TEXT_PUT);
    },

    [deleteJobOpening.fulfilled]: () => {
      toastrCRUDSuccess(JOB_OPENING, TEXT_DELETE);
    },
    [deleteJobOpening.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = JobOpeningSlice;
export default reducer;
