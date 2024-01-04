import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  JOB_APPLICANT_SOURCE,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import { GET_JOB_APPLICANT_SOURCE } from "helpers/url_helper";

export const fetchJobApplicantSource = commonHandleHttpMethodGet(
  "JobApplicantSourceSlice/fetchJobApplicantSource",
  GET_JOB_APPLICANT_SOURCE
);

export const getJobApplicantSourceById = commonHandleHttpMethodGet(
  "JobApplicantSourceSlice/getJobApplicantSourceById",
  GET_JOB_APPLICANT_SOURCE
);

export const createJobApplicantSource = commonHandleHttpMethodPost(
  "JobApplicantSourceSlice/createJobApplicantSource",
  GET_JOB_APPLICANT_SOURCE
);

export const updateJobApplicantSource = commonHandleHttpMethodPutV2(
  "JobApplicantSourceSlice/updateJobApplicantSource",
  GET_JOB_APPLICANT_SOURCE
);

export const deleteJobApplicantSource = commonHandleHttpMethodMultipleDelete(
  "JobApplicantSourceSlice/deleteJobApplicantSource",
  GET_JOB_APPLICANT_SOURCE
);

const initialState = {
  loading: false,
  fetched: false,
  jobApplicantSources: [],
  jobApplicantSourceDetail: [],
};

const JobApplicantSourceSlice = createSlice({
  name: "JobApplicantSourceSlice",
  initialState,
  extraReducers: {
    [fetchJobApplicantSource.pending]: state => {
      state.loading = false;
    },
    [fetchJobApplicantSource.fulfilled]: (state, action) => {
      state.loading = true;
      state.jobApplicantSources = action.payload;
      state.fetched = true;
    },
    [fetchJobApplicantSource.rejected]: state => {
      state.loading = false;
    },
    [getJobApplicantSourceById.fulfilled]: (state, action) => {
      state.loading = true;
      state.jobApplicantSourceDetail = action.payload;
      state.fetched = true;
    },
    [createJobApplicantSource.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(JOB_APPLICANT_SOURCE, TEXT_POST);
      }
    },
    [createJobApplicantSource.rejected]: state => {
      state.loading = false;
      toastrError();
    },

    [updateJobApplicantSource.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.updatedAt) {
        toastrCRUDSuccess(JOB_APPLICANT_SOURCE, TEXT_PUT);
      }
    },
    [updateJobApplicantSource.rejected]: state => {
      state.loading = false;
      toastrError();
    },

    [deleteJobApplicantSource.fulfilled]: (state, action) => {
      toastrCRUDSuccess(JOB_APPLICANT_SOURCE, TEXT_DELETE);
    },
    [deleteJobApplicantSource.rejected]: state => {
      toastrError();
    },
  },
});

const { actions, reducer } = JobApplicantSourceSlice;
export default reducer;
export const {} = actions;
