import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPut,
} from "helpers/erp_helper";
import {
  JOB_APPLICANT,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import { GET_JOB_APPLICANT, POST_JOB_APPLICANT } from "helpers/url_helper";

export const fetchJobApplicant = commonHandleHttpMethodGet(
  "JobApplicant/fetchJobApplicant",
  GET_JOB_APPLICANT
);

export const getJobApplicantById = commonHandleHttpMethodGet(
  "JobApplicant/getJobApplicantById",
  POST_JOB_APPLICANT
);

export const createJobApplicant = commonHandleHttpMethodPost(
  "JobApplicant/createJobApplicant",
  POST_JOB_APPLICANT
);

export const updateJobApplicant = commonHandleHttpMethodPut(
  "JobApplicant/updateJobApplicant",
  POST_JOB_APPLICANT
);

export const deleteJobApplicant = commonHandleHttpMethodMultipleDelete(
  "JobApplicant/deleteJobApplicant",
  POST_JOB_APPLICANT
);

const initialState = {
  loading: false,
  fetched: false,
  jobApplicants: [],
  jobApplicantDetail: [],
};

const JobApplicant = createSlice({
  name: "JobApplicant",
  initialState,
  reducers: {
    setEmployeeGradeDetail: state => {
      state.jobApplicantDetail = [];
    },
  },
  extraReducers: {
    [fetchJobApplicant.pending]: (state, action) => {
      state.loading = false;
    },
    [fetchJobApplicant.fulfilled]: (state, action) => {
      state.loading = true;
      state.jobApplicants = action.payload;
      state.fetched = true;
    },
    [fetchJobApplicant.rejected]: (state, action) => {
      state.loading = false;
    },
    [getJobApplicantById.fulfilled]: (state, action) => {
      state.jobApplicantDetail = action.payload;
      state.fetched = true;
    },
    [createJobApplicant.fulfilled]: (state, action) => {
      state.loading = true;
      toastrCRUDSuccess(JOB_APPLICANT, TEXT_POST);
      if (action.payload?.objectId) {
      }
    },
    [createJobApplicant.rejected]: (state, action) => {
      state.loading = false;
      toastrError();
    },

    [updateJobApplicant.fulfilled]: (state, action) => {
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(JOB_APPLICANT, TEXT_PUT);
      }
    },

    [deleteJobApplicant.fulfilled]: () => {
      toastrCRUDSuccess(JOB_APPLICANT, TEXT_DELETE);
    },
    [deleteJobApplicant.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = JobApplicant;
export default reducer;
export const { setJobApplicantDetail } = actions;
