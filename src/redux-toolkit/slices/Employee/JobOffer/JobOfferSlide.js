import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPut,
} from "helpers/erp_helper";
import {
  JOB_OFFER,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import { GET_JOB_OFFER, GET_JOB_OFFER_DETAIL } from "helpers/url_helper";

export const fetchJobOffer = commonHandleHttpMethodGet(
  "JobOfferSlide/fetchJobOffer",
  GET_JOB_OFFER_DETAIL
);

export const getJobOfferById = commonHandleHttpMethodGet(
  "JobOfferSlide/getJobOfferById",
  GET_JOB_OFFER
);

export const createJobOffer = commonHandleHttpMethodPost(
  "JobOfferSlide/createJobOffer",
  GET_JOB_OFFER
);

export const updateJobOffer = commonHandleHttpMethodPut(
  "JobOfferSlide/JobOfferSlide",
  GET_JOB_OFFER
);

export const deleteJobOffer = commonHandleHttpMethodMultipleDelete(
  "JobOfferSlide/deleteJobOffer",
  GET_JOB_OFFER
);

const initialState = {
  loading: false,
  fetched: false,
  jobOffers: [],
  jobOfferDetail: [],
};

const JobOfferSlide = createSlice({
  name: "JobOfferSlide",
  initialState,
  reducers: {
    setJobOfferDetail: state => {
      state.jobOfferDetail = [];
    },
  },
  extraReducers: {
    [fetchJobOffer.pending]: state => {
      state.loading = false;
    },
    [fetchJobOffer.fulfilled]: (state, action) => {
      state.loading = true;
      state.jobOffers = action.payload;
      state.fetched = true;
    },
    [fetchJobOffer.rejected]: state => {
      state.loading = false;
    },
    [createJobOffer.pending]: state => {
      state.loading = false;
    },
    [createJobOffer.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(JOB_OFFER, TEXT_POST);
      }
    },
    [createJobOffer.rejected]: state => {
      state.loading = false;
      toastrError();
    },

    [getJobOfferById.fulfilled]: (state, action) => {
      state.loading = true;
      state.jobOfferDetail = action.payload;
    },

    [updateJobOffer.pending]: state => {
      state.loading = false;
    },
    [updateJobOffer.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(JOB_OFFER, TEXT_PUT);
      }
    },
    [updateJobOffer.rejected]: state => {
      state.loading = false;
      toastrError();
    },

    [deleteJobOffer.fulfilled]: () => {
      toastrCRUDSuccess(JOB_OFFER, TEXT_DELETE);
    },
    [deleteJobOffer.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = JobOfferSlide;
export default reducer;
export const { setJobOfferDetail } = actions;
